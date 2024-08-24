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
