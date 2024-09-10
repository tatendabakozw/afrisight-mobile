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
import Input from '@/design-system/Input';
import { Fonts, Typography } from '@/constants/typography';
import Colors from '@/constants/Colors';
import { axiosInstance } from '@/utils/axios';
import { AUTH_ROUTES } from '@/constants/routers';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const schema = z.object({
    preferredCategories: z.array(z.string()),
    maxSurveyDuration: z.number().min(5).max(120),
    minPayoutThreshold: z.number().min(1),
});

type FormData = z.infer<typeof schema>;

const categories = ['Technology', 'Health', 'Finance', 'Education', 'Entertainment'];

const SurveyPreferences = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            preferredCategories: [],
            maxSurveyDuration: 30,
            minPayoutThreshold: 5,
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await axiosInstance.put(AUTH_ROUTES.SURVEY_PREFERENCES, data);
            navigation.goBack();
        } catch (error) {
            console.error("Failed to update survey preferences:", error);
        }
    };



    return (
        <ModalStackWrapper>
            <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.subheading, marginBottom: 20, color: Colors.design.highContrastText }}>
                    Preferred Survey Categories
                </Text>
                {categories.map((category) => (
                    <Controller
                        key={category}
                        control={control}
                        name="preferredCategories"
                        render={({ field: { onChange, value } }) => (
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>{category}</Text>
                                <Switch
                                    onValueChange={(isChecked) => {
                                        const newValue = isChecked
                                            ? [...value, category]
                                            : value.filter((c) => c !== category);
                                        onChange(newValue);
                                    }}
                                    value={value.includes(category)}
                                />
                            </Row>
                        )}
                    />
                ))}

                <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.subheading, marginTop: 20, marginBottom: 10, color: Colors.design.highContrastText }}>
                    Maximum Survey Duration (minutes)
                </Text>
                <Controller
                    control={control}
                    name="maxSurveyDuration"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            keyboardType="numeric"
                            onChangeText={(text) => onChange(parseInt(text, 10))}
                            value={value.toString()}
                        />
                    )}
                />

                <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.subheading, marginTop: 20, marginBottom: 10, color: Colors.design.highContrastText }}>
                    Minimum Payout Threshold ($)
                </Text>
                <Controller
                    control={control}
                    name="minPayoutThreshold"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            keyboardType="numeric"
                            onChangeText={(text) => onChange(parseFloat(text))}
                            value={value.toString()}
                        />
                    )}
                />

                <Button
                    text="Save Preferences"
                    variant="accent"
                    size='medium'
                    onPress={handleSubmit(onSubmit)}
                    style={{ marginTop: 20 }}
                />
            </BottomSheetScrollView>
        </ModalStackWrapper>
    );
};

export default SurveyPreferences;