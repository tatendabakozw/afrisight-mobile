import PasswordInput from "@/components/ui/PasswordInput";
import { useSignUp } from "@clerk/clerk-expo";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Formik } from "formik";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const CreateProfileDetails = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const { emailAddress }: { emailAddress: string } = useLocalSearchParams();
    const router = useRouter();

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


            });
            created.update({
                lastName: values.lastName,
                firstName: values.firstName,

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
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                paddingHorizontal: 16,
                backgroundColor: "#fff",
                paddingTop: 8,
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
                        <Text style={{ fontSize: 28, fontWeight: "700" }}>
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

                                    }}
                                    autoCapitalize="none"
                                    onChangeText={handleChange("emailAddress")}
                                    onBlur={handleBlur("emailAddress")}
                                    value={values.emailAddress}
                                />
                                <Text>Please provide a working email. You will need to verify the email address with an OTP.</Text>
                            </View>
                            <View style={{ gap: 12 }}>
                                <Text style={{ fontWeight: "600" }}>Password</Text>
                                <PasswordInput
                                    value={values.password}
                                    onValueChange={(val) => setFieldValue("password", val)}
                                />
                            </View>
                            <View>
                                <Text>
                                    By selecting Agree and continue, I agree to CXMaper's Terms of
                                    Service, and acknowledge the Privacy Policy.
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
                                    style={{ fontWeight: "700", fontSize: 16, color: "#fff" }}
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
