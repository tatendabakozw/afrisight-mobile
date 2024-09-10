export interface GigItemProps {
    title: string;
    name: string;
    desc: string;
    description: string;
    type: string;
    reward: {
        type: string;
        name: string;
    };
    points: string;
    location: string;
    image: any;
    _id: string;
    requirements: any;
    deadline?: string;
    difficulty?: string;
    duration: number;
    price: number;
    age: number;
}

export interface TokenCache {
    getToken: (key: string) => Promise<string | undefined | null>;
    saveToken: (key: string, token: string) => Promise<void>;
    clearToken?: (key: string) => void;
}
export interface OptionType {
    name: string;
    _id: string;
}
export interface SectionType {
    id: number;
    options: Array<OptionType>;
    required?: boolean
    type: {
        name: string;
        _id: string;
    };
    value: string;
}

export interface DocumentType {
    description: string;
    name: string;
    sections: Array<SectionType>;
}

export interface FormType {
    id: string;
    form: DocumentType;
}

export interface Form {
    _id: string;
    id: string;
    description: string;
    name: string;
    sections: SectionType[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export type SurveyStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED";

export interface Survey {
    _id: string;
    id: string;
    name: string;
    description: string;
    client: string; // This would be the client's user ID
    reward: {
        id: string;
        type: string;
        value:
        | number
        | {
            amount: number;
        };
    };
    dollarRewardValue: number;
    targetParticipants: number;
    completedParticipants: number;
    difficulty: string;
    category: string;
    surveyLink: string;
    location?: string;
    minAge?: number;
    maxAge?: number;
    duration: string;
    coverImage?: string;
    status: SurveyStatus;
    views: number;
    startDate: string;
    endDate: string;
    form: string | Form; // This can be either the form ID or the full Form object
    createdAt: string;
    updatedAt: string;
}
