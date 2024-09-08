import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    RegisterScreen: { emailAddress: string };
    ExploreScreen: undefined;
    // Add other screen names and their params here
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;