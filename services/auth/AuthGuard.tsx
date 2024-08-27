import { useEffect } from "react";
import { useAuth } from "./hooks";
import { router } from "expo-router";
import LoadingScreen from "@/components/ui/LoadingScreen";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace('/(auth)');
        }
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
        return <LoadingScreen />; // Create a LoadingScreen component
    }

    return isAuthenticated ? <>{children}</> : null;
};