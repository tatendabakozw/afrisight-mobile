import React from 'react';
import { View, Switch } from 'react-native';
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
import { useBottomSheetContext } from '@/design-system/Modal/BottomSheetContext';

const schema = z.object({
    isProfilePublic: z.boolean(),
    showEmail: z.boolean(),
    showPhone: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const PrivacySettings = () => {
    const navigation = useNavigation();
    const { control, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            isProfilePublic: false,
            showEmail: false,
            showPhone: false,
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await axiosInstance.put(AUTH_ROUTES.PRIVACY_SETTINGS, data);
            navigation.goBack();
        } catch (error) {
            console.error("Failed to update privacy settings:", error);
        }
    };


    return (
        <ModalStackWrapper>
            <SafeAreaView>
                <View style={{ padding: 20, gap: 20 }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>Public Profile</Text>
                                <Switch
                                    onValueChange={onChange}
                                    value={value}
                                />
                            </Row>
                        )}
                        name="isProfilePublic"
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>Show Email</Text>
                                <Switch
                                    onValueChange={onChange}
                                    value={value}
                                />
                            </Row>
                        )}
                        name="showEmail"
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>Show Phone Number</Text>
                                <Switch
                                    onValueChange={onChange}
                                    value={value}
                                />
                            </Row>
                        )}
                        name="showPhone"
                    />
                    <Row style={{ gap: 20, alignItems: "center" }}>
                        <Button text="Cancel" colorScheme="primary" variant="primary" onPress={() => navigation.goBack()} size='medium' />
                        <Button style={{ flex: 1 }} text="Save Changes" variant="accent" size='medium' onPress={handleSubmit(onSubmit)} />
                    </Row>
                </View>
            </SafeAreaView>
        </ModalStackWrapper>
    );
};

export default PrivacySettings;