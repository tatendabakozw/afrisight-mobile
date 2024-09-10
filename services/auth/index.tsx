import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AUTH_ROUTES } from '@/constants/routers';
import axios from 'axios';
import { apiUrl } from '@/utils/apiUrl';
import { axiosInstance } from '@/utils/axios';
import { usePostHog } from 'posthog-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSystemPreferences } from '@/contexts/SystemPreferencesContext';
import { useSavedSurveys } from '@/contexts/SavedSurveysContext';


interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    signInWithEmailAndPassword: (email: string, password: string) => void;
    signIn: (tokens: { accessToken: string; refreshToken: string }) => void;
    signOut: () => Promise<void>;
    fetchProfile: () => Promise<void>;
    updateUser: (user: Partial<User>) => Promise<void>;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: | "PARTICIPANT";
    isEmailVerified: boolean;
    emailVerificationToken: string | null;
    emailVerificationTokenExpires: Date | null;
    phoneNumber: string;
    isPhoneVerified: boolean;
    isSocialConnectedUser: boolean
    phoneOtp: string | undefined;
    phoneOtpExpiry: Date | undefined;
    refreshTokens: string[];
    createdAt: Date;
    updatedAt: Date;
    balance: number;
    profile: any
    userInventory: {
        items: any[]
    }
    xp: {
        points: number
    }
    gigsCompleted: any
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { resetPreferences, updatePreference } = useSystemPreferences()
    const { resetSavedSurveys } = useSavedSurveys()
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const posthog = usePostHog()

    useEffect(() => {
        checkAuthStatus();
    }, []);

    useEffect(() => {
        if (user && posthog) {
            posthog.identify(user.email, {
                email: user.email,
            })
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            updatePreference("hasCompletedPostAuthOnboarding", !!user.profile.firstname)
        }
    }, [user])

    const checkAuthStatus = async () => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (accessToken && refreshToken) {
                await refreshTokenIfNeeded();
                setIsAuthenticated(true);
                await fetchProfile();
            } else {
                throw new Error('No tokens available');
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            await signOut();
        } finally {
            setIsLoading(false);
        }
    };

    const refreshTokenIfNeeded = async () => {
        try {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (!refreshToken) throw new Error('No refresh token available');

            const response = await axios.post(`${apiUrl}/v2${AUTH_ROUTES.REFRESH_TOKEN}`, {
                refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;
            await SecureStore.setItemAsync('accessToken', accessToken);
            await SecureStore.setItemAsync('refreshToken', newRefreshToken);

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    };

    const signInWithEmailAndPassword = async (email: string, password: string) => {
        const response = await axios.post(`${apiUrl}${AUTH_ROUTES.PASSWORD_SIGNIN}`)
        await signIn(response.data)
    }

    const signIn = async (tokens: { accessToken: string; refreshToken: string }) => {
        await SecureStore.setItemAsync('accessToken', tokens.accessToken);
        await SecureStore.setItemAsync('refreshToken', tokens.refreshToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
        setIsAuthenticated(true);
        await fetchProfile();
    };

    const signOut = async () => {
        try {
            if (user?.isSocialConnectedUser) {
                await GoogleSignin.configure()
                await GoogleSignin.signOut()
            }
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');
            await AsyncStorage.removeItem('savedSurveys');
            await resetPreferences()
            await resetSavedSurveys()

            delete axiosInstance.defaults.headers.common['Authorization'];
            setIsAuthenticated(false);
            setUser(null);
            // TODO: Navigate to login screen
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get(AUTH_ROUTES.USER_OBJECT);
            const profileResponse = await axiosInstance.get(`${AUTH_ROUTES.USER_PROFILE}/${response.data._id}`);
            setUser({
                ...response.data,
                profile: profileResponse.data,
                userInventory: profileResponse.data.userInventory,
                xp: profileResponse.data.points,
                gigsCompleted: profileResponse.data.gigsCompleted,
                balance: profileResponse.data.balance
            });
        } catch (error) {
            console.error('Error fetching profile', error);
            await signOut();
        }
    };

    const updateUser = async (_user: Pick<Partial<User>, "profile">) => {
        await axiosInstance.put(AUTH_ROUTES.UPDATE_PROFILE(user?._id as string), { ..._user.profile })
        setUser(prevUser => {
            if (!prevUser) return null;
            return {
                ...prevUser,
                profile: {
                    ...prevUser.profile,
                    ..._user.profile
                }
            };
        });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, signOut, signIn, signInWithEmailAndPassword, fetchProfile, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

