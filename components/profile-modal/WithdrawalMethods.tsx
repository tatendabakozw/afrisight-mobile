import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalStackWrapper } from '@/design-system/Modal/ModalStackWrapper';
import Text from '../ui/Text';
import Row from '@/design-system/Row';
import Button from '@/design-system/Button';
import { Fonts, Typography } from '@/constants/typography';
import Colors from '@/constants/Colors';
import { axiosInstance } from '@/utils/axios';
import { AUTH_ROUTES } from '@/constants/routers';
import { SF_ICONS } from '@/constants/icons';
import Input from '@/design-system/Input';
import { ProfileStackParamList } from '.';

const schema = z.object({
    phoneNumber: z.string().regex(/^(\+263|0)7[7-8][0-9]{7}$/, "Invalid Ecocash phone number"),
});

type FormData = z.infer<typeof schema>;

type WithdrawalMethod = {
    id: string;
    phoneNumber: string;
    isDefault: boolean;
};

const WithdrawalMethods = () => {
    const navigation = useNavigation<NavigationProp<ProfileStackParamList, 'WithdrawalMethods'>>();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const [methods, setMethods] = useState<WithdrawalMethod[]>([]);

    useEffect(() => {
        fetchWithdrawalMethods();
    }, []);

    const fetchWithdrawalMethods = async () => {
        try {
            const response = await axiosInstance.get(AUTH_ROUTES.WITHDRAWAL_METHODS);
            setMethods(response.data);
        } catch (error) {
            console.error("Failed to fetch withdrawal methods:", error);
        }
    };

    const onSubmit = async (data: FormData) => {
        if (methods.length >= 3) {
            alert("You can only add up to 3 Ecocash numbers");
            return;
        }
        try {
            const response = await axiosInstance.post(AUTH_ROUTES.ADD_WITHDRAWAL_METHOD, data);
            setMethods([...methods, response.data]);
            reset();
        } catch (error) {
            console.error("Failed to add withdrawal method:", error);
        }
    };

    const setDefaultMethod = async (id: string) => {
        try {
            await axiosInstance.put(AUTH_ROUTES.SET_DEFAULT_WITHDRAWAL_METHOD, { id });
            setMethods(methods.map(method => ({
                ...method,
                isDefault: method.id === id
            })));
        } catch (error) {
            console.error("Failed to set default withdrawal method:", error);
        }
    };

    const removeMethod = async (id: string) => {
        try {
            await axiosInstance.delete(`${AUTH_ROUTES.REMOVE_WITHDRAWAL_METHOD}/${id}`);
            setMethods(methods.filter(method => method.id !== id));
        } catch (error) {
            console.error("Failed to remove withdrawal method:", error);
        }
    };

    return (
        <ModalStackWrapper>
            <SafeAreaView>
                <ScrollView style={{ padding: 20 }}>
                    <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.subheading, marginBottom: 20 }}>
                        Your Ecocash Numbers
                    </Text>
                    {methods.map((method) => (
                        <Row key={method.id} style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <View>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>
                                    {SF_ICONS.phone} {method.phoneNumber}
                                </Text>
                                {method.isDefault && (
                                    <Text style={{ color: Colors.design.accent, fontSize: Typography.body }}>Default</Text>
                                )}
                            </View>
                            <Row>
                                {!method.isDefault && (
                                    <TouchableOpacity onPress={() => setDefaultMethod(method.id)}>
                                        <Text style={{ color: Colors.design.accent, marginRight: 10 }}>Set as Default</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={() => removeMethod(method.id)}>
                                    <Text style={{ color: Colors.design.redText }}>{SF_ICONS.trash}</Text>
                                </TouchableOpacity>
                            </Row>
                        </Row>
                    ))}

                    {methods.length < 3 && (
                        <>
                            <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.subheading, marginTop: 30, marginBottom: 20 }}>
                                Add New Ecocash Number
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input

                                        label="Ecocash Number"
                                        placeholder="Enter Ecocash number"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="phoneNumber"
                            />
                            <Button
                                text="Add Ecocash Number"
                                variant="accent"
                                size='medium'
                                onPress={handleSubmit(onSubmit)}
                                style={{ marginTop: 20 }}
                            />
                        </>
                    )}

                    <Button
                        text="View Withdrawal History"
                        variant="outline"
                        size='medium'
                        onPress={() => navigation.navigate('WithdrawalHistory')}
                        style={{ marginTop: 20 }}
                    />
                </ScrollView>
            </SafeAreaView>
        </ModalStackWrapper>
    );
};

export default WithdrawalMethods;