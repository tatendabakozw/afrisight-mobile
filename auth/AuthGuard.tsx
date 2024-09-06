import { useEffect } from "react";
import { useAuth } from "./hooks";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import { NavigationStackProps } from "@/screens";
import { AuthGuard } from "@/services/auth/AuthGuard";

export { AuthGuard }