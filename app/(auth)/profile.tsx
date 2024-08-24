import PasswordInput from "@/components/ui/PasswordInput";
import { useSignUp } from "@clerk/clerk-expo";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import useAxiosInstance from "../utils/axios";

const CreateProfileDetails = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const { emailAddress }: { emailAddress: string } = useLocalSearchParams();
    const router = useRouter();
    const axiosInstance = useAxiosInstance()

    const onAgreeAndContinue = async (values: {
        emailAddress: string;
        firstName: string;
        password: string;
        lastName: string;
    }) => {
        if (!isLoaded) return;

        try {
            const created = await signUp.create({
                emailAddress: values.emailAddress.replaceAll(" ", ""),
                password: values.password,

            }).then(res => {
                console.log({ res })
                return res
            });

            console.log({ created })

            // TODO. Save the user info at the database
            await axiosInstance.post("/profile", {
                firstName: values.firstName,
                lastName: values.lastName,
                userId: created.id
            })

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            router.push({
                pathname: "/(auth)/verification",
                params: {
                    emailAddress,
                },
            });
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            // console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                paddingHorizontal: 16,
                backgroundColor: "#fff",
                paddingTop: 40,
            }}
        >
            <Formik
                initialValues={{
                    emailAddress,
                    password: "",
                    firstName: "",
                    lastName: "",
                }}
                // validationSchema={Yup.object({
                //     emailAddress: Yup.string()
                //         .email("Invalid email address")
                //         .required("Required"),
                //     password: Yup.string()
                //         .min(6, "Password must be at least 6 characters")
                //         .required("Required"),
                //     firstName: Yup.string().required("Required"),
                //     lastName: Yup.string().required("Required"),
                //     dateOfBirth: Yup.string(),
                // })}
                onSubmit={(values) => {
                    console.log({ values });
                    onAgreeAndContinue(values);
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    submitForm,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                }) => (
                    <>
                        <Text
                            style={{
                                fontSize: Typography.largeHeading,
                                marginBottom: 24,
                                fontFamily: Fonts.Inter_600SemiBold,
                            }}
                        >
                            Finish signing up
                        </Text>
                        <View style={{ marginTop: 16, gap: 24 }}>
                            <View style={{ gap: 12 }}>
                                <Text style={{ fontWeight: "600" }}>First name</Text>
                                <TextInput
                                    style={{
                                        height: 54,
                                        borderRadius: 8,
                                        borderColor: "#d0d0d0",
                                        borderWidth: 1,
                                        borderStyle: "solid",
                                        padding: 10,
                                        fontFamily: Fonts.Inter_400Regular,
                                        fontSize: Typography.paragraph,
                                    }}
                                    placeholder="First name"
                                    onChangeText={handleChange("firstName")}
                                    onBlur={handleBlur("firstName")}
                                    value={values.firstName}
                                />
                            </View>
                            <View style={{ gap: 12 }}>
                                <Text style={{ fontWeight: "600" }}>Last name</Text>
                                <TextInput
                                    style={{
                                        height: 54,
                                        borderRadius: 8,
                                        borderColor: "#d0d0d0",
                                        borderWidth: 1,
                                        borderStyle: "solid",
                                        padding: 10,
                                        fontFamily: Fonts.Inter_400Regular,
                                        fontSize: Typography.paragraph,
                                    }}
                                    placeholder="Last name"
                                    onChangeText={handleChange("lastName")}
                                    onBlur={handleBlur("lastName")}
                                    value={values.lastName}
                                />
                            </View>

                            <View style={{ gap: 12 }}>
                                <Text style={{ fontWeight: "600" }}>Email address</Text>
                                <TextInput
                                    style={{
                                        height: 54,
                                        borderRadius: 8,
                                        borderColor: "#d0d0d0",
                                        borderWidth: 1,
                                        borderStyle: "solid",
                                        padding: 10,
                                        fontFamily: Fonts.Inter_400Regular,
                                        fontSize: Typography.paragraph,
                                    }}
                                    autoCapitalize="none"
                                    onChangeText={handleChange("emailAddress")}
                                    onBlur={handleBlur("emailAddress")}
                                    value={values.emailAddress}
                                />
                                <Text style={{ color: Colors.design.text }}>
                                    Please provide a working email. You will need to verify the
                                    email address with an OTP.
                                </Text>
                            </View>
                            <View style={{ gap: 12 }}>
                                <Text style={{ fontWeight: "600" }}>Password</Text>
                                <PasswordInput
                                    value={values.password}
                                    onValueChange={(val) => setFieldValue("password", val)}
                                />
                            </View>
                            <View>
                                <Text style={{ color: Colors.design.text }}>
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
                                    backgroundColor: Colors.light.primary,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: Fonts.Inter_700Bold,
                                        fontSize: Typography.buttonText,
                                        color: "#fff",
                                    }}
                                >
                                    Agree and continue
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </ScrollView>
    );
};

export default CreateProfileDetails;
