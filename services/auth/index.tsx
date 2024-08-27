import React, { createContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { axiosInstance } from '@/app/utils/axios';
import { AUTH_ROUTES } from '@/constants/routers';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
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
    phoneOtp: string | undefined;
    phoneOtpExpiry: Date | undefined;
    refreshTokens: string[];
    createdAt: Date;
    updatedAt: Date;
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
            if (accessToken) {
                setIsAuthenticated(true);
                await fetchProfile();
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithEmailAndPassword = async (idToken: string) => { }

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
        setIsAuthenticated(true);
        await fetchProfile();
    };


    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');
            setIsAuthenticated(false);
            setUser(null);
            router.push('/(auth)');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get(AUTH_ROUTES.USER_PROFILE);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, signOut, signIn, }}>
            {children}
        </AuthContext.Provider>
    );
};

