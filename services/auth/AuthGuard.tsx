import { useEffect } from "react";
import { useAuth } from "./hooks";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { NavigationStackProps } from "@/screens";
import { useNavigation } from "@react-navigation/native";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigation = useNavigation<NavigationStackProps<"">>();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            // TODO: Redirect to login page
            navigation.navigate("LoginScreen");
        }
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
        return <LoadingScreen />; // Create a LoadingScreen component
    }

    return isAuthenticated ? <>{children}</> : null;
};