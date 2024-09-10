import React from 'react';
import { View, ScrollView, Switch } from 'react-native';
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
import { Picker } from '@react-native-picker/picker';

const schema = z.object({
    newSurveyNotifications: z.boolean(),
    notificationFrequency: z.enum(['immediate', 'daily', 'weekly']),
});

type FormData = z.infer<typeof schema>;

const NotificationSettings = () => {
    const navigation = useNavigation();
    const { control, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            newSurveyNotifications: true,
            notificationFrequency: 'immediate',
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await axiosInstance.put(AUTH_ROUTES.NOTIFICATION_SETTINGS, data);
            navigation.goBack();
        } catch (error) {
            console.error("Failed to update notification settings:", error);
        }
    };

    return (
        <ModalStackWrapper>
            <SafeAreaView>
                <ScrollView>
                    <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.subheading, marginBottom: 20 }}>
                        Notification Settings
                    </Text>
                    <Controller
                        control={control}
                        name="newSurveyNotifications"
                        render={({ field: { onChange, value } }) => (
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>New Survey Notifications</Text>
                                <Switch
                                    onValueChange={onChange}
                                    value={value}
                                />
                            </Row>
                        )}
                    />
                    <Controller
                        control={control}
                        name="notificationFrequency"
                        render={({ field: { onChange, value } }) => (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body, marginBottom: 10 }}>Notification Frequency</Text>

                            </View>
                        )}
                    />
                    <Button
                        text="Save Settings"
                        variant="accent"
                        size='medium'
                        onPress={handleSubmit(onSubmit)}
                    />
                </ScrollView>
            </SafeAreaView>
        </ModalStackWrapper>
    );
};

export default NotificationSettings;