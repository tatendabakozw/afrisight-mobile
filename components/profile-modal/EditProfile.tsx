import React, { useEffect } from 'react';
import { ImageBackground, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Text from "../ui/Text";
import Row from "@/design-system/Row";
import Button from "@/design-system/Button";
import styled from "styled-components/native";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import { SF_ICONS } from "@/constants/icons";
import IconText from "@/design-system/Text/IconText";
import Separator from "@/design-system/Separator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomSheetContext } from "@/design-system/Modal/BottomSheetContext";
import { useLayoutEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import { ModalStackWrapper } from '@/design-system/Modal/ModalStackWrapper';
import { axiosInstance } from "@/utils/axios";
import { AUTH_ROUTES } from '@/constants/routers';
import { ProfileStackParamList } from '.';

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    bio: z.string().max(160, "Bio must be 160 characters or less"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});

type FormData = z.infer<typeof schema>;

const EditProfile = () => {
    const navigation = useNavigation<NavigationProp<ProfileStackParamList, 'EditProfile'>>();
    const { setHeight } = useBottomSheetContext();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await axiosInstance.put(AUTH_ROUTES.USER_PROFILE, data);
            navigation.goBack();
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    useLayoutEffect(() => {
        setHeight(560);
    }, [setHeight]);

    const translateY = useSharedValue(50);
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    useEffect(() => {
        const timeout = setTimeout(() => {
            translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
            opacity.value = withDelay(150, withSpring(1, { damping: 20, stiffness: 100 }));
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <ModalStackWrapper>
            <SafeAreaView>
                <Animated.ScrollView
                    style={[{ paddingTop: 0, flex: 0 }, animatedStyle]}
                    contentContainerStyle={{ gap: 20, paddingTop: 0 }}
                >
                    <Row style={{ justifyContent: "center", marginBottom: 10 }}>
                        <ImageBackground source={require("@/assets/images/backgrounds/background-night-stars.png")} imageStyle={{ borderRadius: 100 }} style={{ width: 100, height: 100, borderRadius: 100, backgroundColor: Colors.design.surfaceOnSurface, alignItems: "center", justifyContent: "center" }}>
                            <IconText style={{ fontSize: 28, lineHeight: 34 * 1.2, color: Colors.design.white }}>
                                {SF_ICONS.image}
                            </IconText>
                        </ImageBackground>
                    </Row>
                    <View>
                        <Separator />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Row style={{ gap: 20, alignItems: "center", paddingVertical: 6 }}>
                                    <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.body, color: Colors.design.highContrastText, lineHeight: Typography.body * 1.5, width: 64 }}>Name</Text>
                                    <KeyboardAvoidingView style={{ flex: 1 }}>
                                        <Input
                                            placeholder="Add a display name"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    </KeyboardAvoidingView>
                                </Row>
                            )}
                            name="name"
                        />
                        {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
                        <Separator />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Row style={{ gap: 20, alignItems: "center", paddingVertical: 6 }}>
                                    <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.body, color: Colors.design.highContrastText, lineHeight: Typography.body * 1.5, width: 64 }}>Bio</Text>
                                    <KeyboardAvoidingView style={{ flex: 1 }}>
                                        <Input
                                            placeholder="Add a bio"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    </KeyboardAvoidingView>
                                </Row>
                            )}
                            name="bio"
                        />
                        {errors.bio && <Text style={{ color: 'red' }}>{errors.bio.message}</Text>}
                        <Separator />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Row style={{ gap: 20, alignItems: "center", paddingVertical: 6 }}>
                                    <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.body, color: Colors.design.highContrastText, lineHeight: Typography.body * 1.5, width: 64 }}>Phone</Text>
                                    <KeyboardAvoidingView style={{ flex: 1 }}>
                                        <Input
                                            placeholder="Add a phone number"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    </KeyboardAvoidingView>
                                </Row>
                            )}
                            name="phone"
                        />
                        {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message}</Text>}
                    </View>

                    <View>
                        <Button leftIcon={SF_ICONS.forgot_password} text="Reset password" variant="text" colorScheme="danger" onPress={() => navigation.navigate("ChangePassword")} />
                    </View>
                    <Row style={{ gap: 20, alignItems: "center" }}>
                        <Button text="Cancel" colorScheme="primary" variant="primary" onPress={() => navigation.goBack()} size='medium' />
                        <Button style={{ flex: 1, height: 54, alignItems: "center", justifyContent: "center", gap: 2 }} leftIcon={SF_ICONS.checkmark_filled} text="Save" variant="accent" size='medium' onPress={handleSubmit(onSubmit)} />
                    </Row>
                </Animated.ScrollView>
            </SafeAreaView>
        </ModalStackWrapper>
    );
};

const Input = styled.TextInput`
    border-radius: 10px;
    padding: 10px;
    padding-left: 15px;
    font-family: ${Fonts.Inter_600SemiBold};
    font-size: ${Typography.body};
`

export default EditProfile;