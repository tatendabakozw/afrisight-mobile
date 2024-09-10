import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SavedSurvey {
    _id: string;
    name: string;
    description: string;
    dollarRewardValue: number;
    rewardType: 'voucher' | 'points';
    type: 'saved' | 'completed';
}

interface SavedSurveysContextType {
    savedSurveys: SavedSurvey[];
    addSavedSurvey: (survey: SavedSurvey) => Promise<void>;
    removeSavedSurvey: (id: string) => Promise<void>;
    isSaved: (id: string) => boolean;
    resetSavedSurveys: () => Promise<void>;
}

const SavedSurveysContext = createContext<SavedSurveysContextType | undefined>(undefined);

export const useSavedSurveys = () => {
    const context = useContext(SavedSurveysContext);
    if (!context) {
        throw new Error('useSavedSurveys must be used within a SavedSurveysProvider');
    }
    return context;
};

export const SavedSurveysProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [savedSurveys, setSavedSurveys] = useState<SavedSurvey[]>([]);

    useEffect(() => {
        loadSavedSurveys();
    }, []);

    const loadSavedSurveys = async () => {
        try {
            const storedSurveys = await AsyncStorage.getItem('savedSurveys');
            if (storedSurveys) {
                setSavedSurveys(JSON.parse(storedSurveys));
            }
        } catch (error) {
            console.error('Error loading saved surveys:', error);
        }
    };

    const addSavedSurvey = async (survey: SavedSurvey) => {
        try {
            const updatedSurveys = [...savedSurveys, survey];
            if (isSaved(survey._id)) {
                return;
            }
            setSavedSurveys(updatedSurveys);
            await AsyncStorage.setItem('savedSurveys', JSON.stringify(updatedSurveys));
        } catch (error) {
            console.error('Error saving survey:', error);
        }
    };

    const removeSavedSurvey = async (id: string) => {
        try {
            const updatedSurveys = savedSurveys.filter(survey => survey._id !== id);
            setSavedSurveys(updatedSurveys);
            await AsyncStorage.setItem('savedSurveys', JSON.stringify(updatedSurveys));
        } catch (error) {
            console.error('Error removing saved survey:', error);
        }
    };

    const isSaved = (id: string) => {
        return savedSurveys.some(survey => survey._id === id);
    };

    const resetSavedSurveys = async () => {
        try {
            await AsyncStorage.removeItem('savedSurveys');
            setSavedSurveys([]);
        } catch (error) {
            console.error('Error resetting saved surveys:', error);
        }
    };


    return (
        <SavedSurveysContext.Provider value={{ savedSurveys, addSavedSurvey, removeSavedSurvey, isSaved, resetSavedSurveys }}>
            {children}
        </SavedSurveysContext.Provider>
    );
};