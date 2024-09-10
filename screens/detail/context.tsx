import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { z } from 'zod';
import { Survey, SurveyStatus, Form } from '@/types';

// Define types
interface SurveyContextType {
    completedSurveys: Partial<Survey>[];
    inProgressSurveys: Partial<Survey>[];
    draftSurveys: Partial<Survey>[];
    addCompletedSurvey: (survey: Partial<Survey>) => Promise<void>;
    updateInProgressSurvey: (survey: Partial<Survey>) => Promise<void>;
    saveDraft: (survey: Partial<Survey>) => Promise<void>;
    deleteDraft: (surveyId: string) => Promise<void>;
    getSurvey: (surveyId: string) => Partial<Survey> | undefined;
}

// Create context
const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

// Zod schema for validation
const SurveySchema = z.object({
    _id: z.string(),
    id: z.string(),
    name: z.string(),
    description: z.string(),
    client: z.string(),
    reward: z.object({
        id: z.string(),
        type: z.string(),
        value: z.union([z.number(), z.object({ amount: z.number() })]),
    }),
    dollarRewardValue: z.number(),
    targetParticipants: z.number(),
    completedParticipants: z.number(),
    difficulty: z.string(),
    category: z.string(),
    surveyLink: z.string(),
    location: z.string().optional(),
    minAge: z.number().optional(),
    maxAge: z.number().optional(),
    duration: z.string(),
    coverImage: z.string().optional(),
    status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED']),
    views: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    form: z.union([z.string(), z.lazy(() => FormSchema)]),
    createdAt: z.string(),
    updatedAt: z.string(),
});

const FormSchema: z.ZodType<Form> = z.object({
    _id: z.string(),
    id: z.string(),
    description: z.string(),
    name: z.string(),
    sections: z.array(z.object({
        id: z.number(),
        options: z.array(z.object({
            name: z.string(),
            _id: z.string(),
        })),
        required: z.boolean().optional(),
        type: z.object({
            name: z.string(),
            _id: z.string(),
        }),
        value: z.string(),
    })),
    createdBy: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Provider component
export function SurveyProvider({ children }: { children: React.ReactNode }) {
    const [completedSurveys, setCompletedSurveys] = useState<Partial<Survey>[]>([]);
    const [inProgressSurveys, setInProgressSurveys] = useState<Partial<Survey>[]>([]);
    const [draftSurveys, setDraftSurveys] = useState<Partial<Survey>[]>([]);

    const db = SQLite.openDatabaseSync('surveys.db', { useNewConnection: true });

    useEffect(() => {
        db.withTransactionSync(() => {
            db.execSync(
                'CREATE TABLE IF NOT EXISTS surveys (id TEXT PRIMARY KEY, data TEXT, status TEXT)'
            );
        });

        loadSurveys();
    }, []);

    const loadSurveys = async () => {
        const result = await db.getAllAsync('SELECT * FROM surveys');
        const completed: Survey[] = [];
        const inProgress: Survey[] = [];
        const drafts: Survey[] = [];

        result.forEach((row: any) => {
            const survey = JSON.parse(row.value) as Survey;
            switch (row.status) {
                case 'COMPLETED':
                    completed.push(survey);
                    break;
                case 'ACTIVE':
                    inProgress.push(survey);
                    break;
                case 'DRAFT':
                    drafts.push(survey);
                    break;
            }
        });

        setCompletedSurveys(completed);
        setInProgressSurveys(inProgress);
        setDraftSurveys(drafts);

    };

    const saveSurveyToDatabase = (survey: Partial<Survey>, status: SurveyStatus) => {
        db.execAsync(`INSERT OR REPLACE INTO surveys (id, data, status) VALUES ('${survey.id}', '${JSON.stringify(survey)}', '${status}')`);
    };

    const addCompletedSurvey = async (survey: Partial<Survey>) => {
        setCompletedSurveys([...completedSurveys, survey]);
        setInProgressSurveys(inProgressSurveys.filter(s => s.id !== survey.id));
        saveSurveyToDatabase(survey, 'COMPLETED');
    };

    const updateInProgressSurvey = async (survey: Partial<Survey>) => {
        const validatedSurvey = SurveySchema.parse(survey);
        const updatedSurveys = inProgressSurveys.map(s =>
            s.id === survey.id ? validatedSurvey : s
        );
        setInProgressSurveys(updatedSurveys);
        saveSurveyToDatabase(validatedSurvey, 'ACTIVE');
    };

    const saveDraft = async (survey: Partial<Survey>) => {
        const validatedSurvey = SurveySchema.parse(survey);
        setDraftSurveys([...draftSurveys, validatedSurvey]);
        saveSurveyToDatabase(validatedSurvey, 'DRAFT');
    };

    const deleteDraft = async (surveyId: string) => {
        setDraftSurveys(draftSurveys.filter(s => s.id !== surveyId));
        db.execAsync(`DELETE FROM surveys WHERE id = '${surveyId}'`);
    };

    const getSurvey = (surveyId: string) => {
        return [...completedSurveys, ...inProgressSurveys, ...draftSurveys].find(s => s.id === surveyId);
    };

    const value: SurveyContextType = {
        completedSurveys,
        inProgressSurveys,
        draftSurveys,
        addCompletedSurvey,
        updateInProgressSurvey,
        saveDraft,
        deleteDraft,
        getSurvey,
    };

    return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
}

// Custom hook
export function useSurvey() {
    const context = useContext(SurveyContext);
    if (context === undefined) {
        throw new Error('useSurvey must be used within a SurveyProvider');
    }
    return context;
}
