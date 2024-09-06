import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AUTH_ROUTES } from '@/constants/routers';
import axios from 'axios';
import { apiUrl } from '@/utils/apiUrl';
import { axiosInstance } from '@/utils/axios';


interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    signInWithEmailAndPassword: (email: string, password: string) => void;
    signIn: (tokens: { accessToken: string; refreshToken: string }) => void;
    signOut: () => Promise<void>;
}

interface User {
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

    profile: any
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (accessToken && refreshToken) {
                // Verify the token's validity
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

    const signInWithPhoneNumber = async (idToken: string) => { }

    const registerWithEmailAndPassword = async (profileData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) => { }

    const verifyOTP = async (idToken: string) => { }

    const resendOTP = async (idToken: string) => { }

    const forgotPassword = async (idToken: string) => { }

    const updateUserPassword = async (idToken: string) => { }


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
            delete axiosInstance.defaults.headers.common['Authorization'];
            setIsAuthenticated(false);
            setUser(null);
            // TODO: Redirect to login page
            // router.push('/(auth)');
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
                profile: profileResponse.data
            });
        } catch (error) {
            console.error('Error fetching profile', error);
            await signOut();
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, signOut, signIn, signInWithEmailAndPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

