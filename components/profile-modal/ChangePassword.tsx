import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalStackWrapper } from '@/design-system/Modal/ModalStackWrapper';
import Text from '../ui/Text';
import Row from '@/design-system/Row';
import Button from '@/design-system/Button';
import { Fonts, Typography } from '@/constants/typography';
import Colors from '@/constants/Colors';
import { axiosInstance } from '@/utils/axios';
import { AUTH_ROUTES } from '@/constants/routers';
import TextInput from '../ui/TextInput';
import Input from '@/design-system/Input';

const schema = z.object({
    currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

const ChangePassword = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await axiosInstance.put(AUTH_ROUTES.CHANGE_PASSWORD, {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });
            navigation.goBack();
        } catch (error) {
            console.error("Failed to change password:", error);
        }
    };

    return (
        <ModalStackWrapper>
            <SafeAreaView>
                <KeyboardAvoidingView behavior="padding">
                    <View style={{ gap: 20 }}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    withEmbeddedLabel
                                    placeholder="Current password"
                                    secureTextEntry
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="currentPassword"
                        />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label="New Password"
                                    placeholder="Enter new password"
                                    secureTextEntry
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="newPassword"
                        />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label="Confirm New Password"
                                    placeholder="Confirm new password"
                                    secureTextEntry
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="confirmPassword"
                        />
                        <Row style={{ gap: 20, alignItems: "center" }}>
                            <Button text="Cancel" colorScheme="primary" variant="primary" onPress={() => navigation.goBack()} size='medium' />
                            <Button style={{ flex: 1 }} text="Change Password" variant="accent" size='medium' onPress={handleSubmit(onSubmit)} />
                        </Row>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ModalStackWrapper>
    );
};

export default ChangePassword;