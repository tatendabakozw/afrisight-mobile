import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type ModalStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: { emailAddress: string };
};

const ModalStack = createNativeStackNavigator<ModalStackParamList>();



export default ModalStack;