import { useEffect } from "react";
import { useAuth } from "./hooks";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            // TODO: Redirect to login page
            navigation.navigate("Auth");
        }
        if (isAuthenticated) {
            navigation.navigate("Main")
        }
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
        return <LoadingScreen />; // Create a LoadingScreen component
    }

    console.log({ isAuthenticated, isLoading })

    return isAuthenticated ? <>{children}</> : null;
};