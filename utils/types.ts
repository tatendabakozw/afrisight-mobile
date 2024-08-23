export interface GigItemProps {
  title: string;
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
}

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}
