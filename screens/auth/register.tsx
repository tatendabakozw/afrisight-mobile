import PasswordInput from "@/components/ui/PasswordInput";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput as BaseTextInput, TouchableOpacity, View, NativeSyntheticEvent, TextInputKeyPressEventData, ActivityIndicator } from "react-native";
import { Formik, FormikHelpers } from "formik";
import Colors from "@/constants/Colors";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import TextInput from "@/components/ui/TextInput";
import AnimatedLoader from "@/components/ui/AnimatedLoader";
import * as Yup from "yup"
import RegisterSuccessModal from "@/components/modals/RegisterSuccessModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useMemo, useRef, useState } from "react";
import tw from "twrnc";
import AnimatedModal from "@/components/ui/AnimatedModal";
import useDisclosure from "@/hooks/useDisclosure";
import { axiosInstance } from "../../utils/axios";
import { AUTH_ROUTES } from "@/constants/routers";
import { useAuth } from "@/services/auth/hooks";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
    const { emailAddress }: { emailAddress: string } = {
        emailAddress: ""
    };
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onAgreeAndContinue = async (values: {
        emailAddress: string;
        firstName: string;
        password: string;
        lastName: string;
    }, helpers: FormikHelpers<any>) => {

        try {
            await axiosInstance.post(AUTH_ROUTES.EMAIL_REGISTRATION, {
                email: values.emailAddress,
                ...values,
                role: "PARTICIPANT"
            })
            helpers.setSubmitting(false)
            onOpen();
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            // console.error(JSON.stringify(err, null, 2));
        } finally {
            helpers.setSubmitting(false)
        }
    };

    const closeVerificationModal = () => {

        onClose()
    }



    return (
        <ScrollView
            style={{
                flex: 1,
                paddingHorizontal: 16,
                backgroundColor: "#fff",
            }}
            contentContainerStyle={{
                paddingBottom: 24
            }}
        >
            <Formik
                initialValues={{
                    emailAddress,
                    password: "",
                    firstName: "",
                    lastName: "",
                }}
                validationSchema={Yup.object({
                    emailAddress: Yup.string().email("Email is not valid").required("Email address is required"),
                    password: Yup.string().min(8, "Password should have a minimum of 8 characters").max(20, "Password should have a maximum of 20 characters").required("Password is required"),
                    firstName: Yup.string().min(3).max(20).required("First name is required"),
                    lastName: Yup.string().min(3).max(20).required("Surname is required"),
                })}
                onSubmit={(values, helpers) => {
                    onAgreeAndContinue(values, helpers);
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    submitForm,
                    values,
                    errors,
                    dirty,
                    setFieldValue,
                    isSubmitting,
                    isValid
                }) => {
                    console.log({ dirty, isValid })
                    return (
                        <>
                            <VerificationModal emailAddress={values.emailAddress} isOpen={isOpen} onClose={closeVerificationModal} mode="email" />

                            <Text
                                style={{
                                    fontSize: Typography.largeHeading,
                                    marginBottom: 20,
                                    fontFamily: Fonts.Inter_700Bold,
                                    color: Colors.design.highContrastText
                                }}
                            >
                                Create your account
                            </Text>
                            <View style={{ gap: 24 }}>
                                <View >
                                    <TextInput
                                        withEmbeddedLabel
                                        style={{
                                            height: 54,
                                            borderRadius: 8,
                                            borderColor: "#d0d0d0",
                                            borderWidth: 1,
                                            borderStyle: "solid",
                                            padding: 10,
                                            fontFamily: Fonts.Inter_400Regular,
                                            fontSize: Typography.base,
                                        }}
                                        placeholder="First name"
                                        onChangeText={handleChange("firstName")}
                                        onBlur={handleBlur("firstName")}
                                        value={values.firstName}
                                    />
                                </View>
                                <View >
                                    <TextInput
                                        withEmbeddedLabel
                                        style={{
                                            height: 54,
                                            borderRadius: 8,
                                            borderColor: "#d0d0d0",
                                            borderWidth: 1,
                                            borderStyle: "solid",
                                            padding: 10,
                                            fontFamily: Fonts.Inter_400Regular,
                                            fontSize: Typography.base,
                                        }}
                                        placeholder="Last name"
                                        onChangeText={handleChange("lastName")}
                                        onBlur={handleBlur("lastName")}
                                        value={values.lastName}

                                    />
                                </View>

                                <View >
                                    <TextInput
                                        withEmbeddedLabel
                                        style={{
                                            height: 54,
                                            borderRadius: 8,
                                            borderColor: "#d0d0d0",
                                            borderWidth: 1,
                                            borderStyle: "solid",
                                            padding: 10,
                                            fontFamily: Fonts.Inter_400Regular,
                                            fontSize: Typography.base,
                                        }}
                                        placeholder="Email address"
                                        autoCapitalize="none"
                                        onChangeText={handleChange("emailAddress")}
                                        onBlur={handleBlur("emailAddress")}
                                        value={values.emailAddress}
                                    />
                                    <Text style={{ fontSize: 13, fontFamily: Fonts.Inter_400Regular, color: Colors.design.text, marginTop: 10 }}>
                                        We will email your a verification code.
                                    </Text>
                                </View>
                                <View >
                                    <PasswordInput
                                        value={values.password}
                                        onValueChange={(val) => setFieldValue("password", val)}
                                    />
                                </View>
                                <View>
                                    <Text style={{ fontFamily: Fonts.Inter_400Regular, color: Colors.design.highContrastText }}>
                                        By selecting Agree and continue, I agree to CXMaper's{" "}
                                        <Text
                                            style={{
                                                fontFamily: Fonts.Inter_600SemiBold,
                                                color: Colors.design.highContrastText
                                            }}
                                        >
                                            Terms of Service
                                        </Text>
                                        , and acknowledge the{" "}
                                        <Text
                                            style={{
                                                fontFamily: Fonts.Inter_600SemiBold,
                                                color: Colors.design.highContrastText

                                            }}
                                        >
                                            Privacy Policy
                                        </Text>
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={submitForm}
                                    style={{
                                        height: 54,
                                        width: "100%",
                                        borderRadius: 8,
                                        backgroundColor: !dirty || !isValid ? Colors.design.interactiveSurface : Colors.design.accent,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    disabled={!dirty || !isValid || isSubmitting}
                                >
                                    {!isSubmitting && <Text
                                        style={{
                                            fontFamily: Fonts.Inter_700Bold,
                                            fontSize: Typography.paragraph,
                                            color: "#fff",
                                        }}
                                    >
                                        Agree and continue
                                    </Text>}
                                    {isSubmitting && <ActivityIndicator size={24} color={Colors.design.white} />}
                                </TouchableOpacity>
                            </View>
                        </>
                    )
                }}
            </Formik>
        </ScrollView >
    );
};

const VerificationModal = (props: {
    isOpen: boolean,
    onClose: () => void
    mode: "email" | "phone",
    emailAddress: string
}) => {
    const navigator = useNavigation()
    const auth = useAuth()
    const insets = useSafeAreaInsets();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputs = useRef<(BaseTextInput | null)[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const isValid = useMemo(() => {
        return code.filter(item => !item).length === 0
    }, [code])

    const handleChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
        setError(false);

        if (text && index < inputs.current.length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (
        event: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        if (event.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
            inputs.current[index - 1]?.focus();
        }
    };



    const onPressVerify = async () => {
        setLoading(true)

        try {
            if (props.mode === "email") {
                const result = await axiosInstance.post(AUTH_ROUTES.VERIFY_EMAIL, {
                    otp: code.join(""),
                    email: props.emailAddress
                })

                const { data } = result
                await auth.signIn({ accessToken: data.accessToken, refreshToken: data.refreshToken })
                navigator.navigate("Main", { screen: 'ExploreScreen' })
            }

        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        } finally {
            setLoading(false)
        }
    }

    const resendOTP = async () => {

    }

    const onClose = () => {
        props.onClose()
    }

    return (
        <AnimatedModal fullHeight isOpen={props.isOpen} onClose={props.onClose}>
            <KeyboardAvoidingView
                behavior="padding" enabled keyboardVerticalOffset={64}
                style={[tw`bg-white`, { flex: 1, }]}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: Typography.heading, fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText, marginBottom: 10 }}>
                        Enter your verification code
                    </Text>
                    <View style={tw`gap-4 w-full `}>
                        <Text style={{ fontFamily: Fonts.Inter_400Regular, color: Colors.design.highContrastText }}>
                            Enter the code we sent to {props.emailAddress}

                        </Text>
                        <View style={[tw`flex flex-row h-[40px] gap-2`, { marginBottom: 20 }]}>
                            {code.map((digit, index) => (
                                <BaseTextInput
                                    key={index}
                                    ref={(el) => (inputs.current[index] = el)}
                                    style={[
                                        tw`aspect-square text-center border border-zinc-400/50 rounded-[8px]`,
                                        error && code[index] === ""
                                            ? tw`border-red-500`
                                            : { borderColor: Colors.design.separator },
                                        {
                                            fontWeight: "400",
                                            outlineWidth: 2,
                                            outlineColor: "#121212",
                                            outlineStyle: "solid",
                                        }
                                    ]}
                                    placeholder="-"
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    onChangeText={(text) => handleChange(text, index)}
                                    onKeyPress={(event) => handleKeyPress(event, index)}
                                    value={digit}
                                />
                            ))}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontFamily: Fonts.Inter_400Regular, color: Colors.design.highContrastText }}>
                                Haven't received a code?{" "}
                            </Text>
                            <TouchableOpacity onPress={resendOTP}>
                                <Text style={{ fontFamily: Fonts.Inter_700Bold, color: Colors.design.highContrastText, textDecorationLine: "underline" }}>
                                    Send again
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {isValid && <TouchableOpacity disabled={loading} onPress={onPressVerify} style={{ ...styles.primaryButton, }}>
                    {!loading && <Text style={{ color: Colors.design.white, fontSize: Typography.paragraph, fontFamily: Fonts.Inter_600SemiBold }}>
                        Verify and continue
                    </Text>}
                    {loading && <ActivityIndicator size={24} color={Colors.design.white} />}
                </TouchableOpacity>}
                <RegisterSuccessModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </KeyboardAvoidingView>
        </AnimatedModal>

    );

}

const styles = StyleSheet.create({
    primaryButton: {
        height: 54,
        borderRadius: 8,
        backgroundColor: Colors.design.accent,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"

    },
    secondaryButton: {
        ...tw`bg-transparent`,
    },
    disabledButton: {

    },
});
export default RegisterScreen;
