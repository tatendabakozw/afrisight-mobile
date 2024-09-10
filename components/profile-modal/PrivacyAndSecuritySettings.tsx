import React, { useState } from 'react';
import { View, ScrollView, Switch } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalStackWrapper } from '@/design-system/Modal/ModalStackWrapper';
import Text from '../ui/Text';
import Row from '@/design-system/Row';
import Button from '@/design-system/Button';
import Input from '@/design-system/Input';
import { Fonts, Typography } from '@/constants/typography';
import Colors from '@/constants/Colors';
import { axiosInstance } from '@/utils/axios';
import { AUTH_ROUTES } from '@/constants/routers';
import { SF_ICONS } from '@/constants/icons';
import { ProfileStackParamList } from '.';

const schema = z.object({
    isProfilePublic: z.boolean(),
    showEmail: z.boolean(),
    showPhone: z.boolean(),
    twoFactorEnabled: z.boolean(),
    email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

const PrivacyAndSecuritySettings = () => {
    const navigation = useNavigation<NavigationProp<ProfileStackParamList, 'PrivacyAndSecuritySettings'>>();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            isProfilePublic: false,
            showEmail: false,
            showPhone: false,
            twoFactorEnabled: false,
            email: '',
        },
    });
    const [activeSessions, setActiveSessions] = useState(2);

    const onSubmit = async (data: FormData) => {
        try {
            await axiosInstance.put(AUTH_ROUTES.PRIVACY_SETTINGS, data);
            navigation.goBack();
        } catch (error) {
            console.error("Failed to update privacy and security settings:", error);
        }
    };

    return (
        <ModalStackWrapper>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.subheading, marginBottom: 20 }}>
                        Privacy Settings
                    </Text>
                    <Controller
                        control={control}
                        name="isProfilePublic"
                        render={({ field: { onChange, value } }) => (
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>Public Profile</Text>
                                <Switch
                                    onValueChange={onChange}
                                    value={value}
                                />
                            </Row>
                        )}
                    />
                    <Controller
                        control={control}
                        name="showEmail"
                        render={({ field: { onChange, value } }) => (
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>Show Email</Text>
                                <Switch
                                    onValueChange={onChange}
                                    value={value}
                                />
                            </Row>
                        )}
                    />
                    <Controller
                        control={control}
                        name="showPhone"
                        render={({ field: { onChange, value } }) => (
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>Show Phone Number</Text>
                                <Switch
                                    onValueChange={onChange}
                                    value={value}
                                />
                            </Row>
                        )}
                    />

                    <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.subheading, marginBottom: 20, marginTop: 20 }}>
                        Security Settings
                    </Text>
                    <Controller
                        control={control}
                        name="twoFactorEnabled"
                        render={({ field: { onChange, value } }) => (
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>Two-Factor Authentication</Text>
                                <Switch
                                    onValueChange={onChange}
                                    value={value}
                                />
                            </Row>
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Email Address"
                                placeholder="Enter your email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        )}
                    />


                    <Button
                        text="Change Password"
                        onPress={() => navigation.navigate('ChangePassword')}
                        style={{ marginVertical: 20 }}
                        leftIcon={SF_ICONS.lock_filled}
                    />
                    <Button
                        text="Save Changes"
                        variant="accent"
                        size='medium'
                        onPress={handleSubmit(onSubmit)}
                        leftIcon={SF_ICONS.checkmark_filled}
                    />
                </ScrollView>
            </SafeAreaView>
        </ModalStackWrapper>
    );
};

export default PrivacyAndSecuritySettings;