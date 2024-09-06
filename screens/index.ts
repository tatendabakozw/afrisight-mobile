import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type NavigationStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: { emailAddress: string };
    ExploreScreen: undefined;
    GiftShopScreen: undefined;
    MyGigsScreen: undefined;
    MyProfileScreen: undefined;
    NotFoundScreen: undefined
};

export type NavigationStackProps<T extends keyof NavigationStackParamList> = NativeStackNavigationProp<NavigationStackParamList, T>;