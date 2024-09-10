import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalStackWrapper } from '@/design-system/Modal/ModalStackWrapper';
import Text from '../ui/Text';
import Row from '@/design-system/Row';
import { Fonts, Typography } from '@/constants/typography';
import Colors from '@/constants/Colors';
import { axiosInstance } from '@/utils/axios';
import { AUTH_ROUTES } from '@/constants/routers';
import { SF_ICONS } from '@/constants/icons';

type WithdrawalRecord = {
    id: string;
    date: string;
    method: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
};

const WithdrawalHistory = () => {
    const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>([]);

    useEffect(() => {
        fetchWithdrawalHistory();
    }, []);

    const fetchWithdrawalHistory = async () => {
        try {
            const response = await axiosInstance.get(AUTH_ROUTES.WITHDRAWAL_HISTORY);
            setWithdrawals(response.data);
        } catch (error) {
            console.error("Failed to fetch withdrawal history:", error);
        }
    };

    const renderItem = ({ item }: { item: WithdrawalRecord }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.design.separator }}>
            <Row style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontFamily: Fonts.Inter_600SemiBold, fontSize: Typography.body }}>
                    {new Date(item.date).toLocaleDateString()}
                </Text>
                <Text style={{ fontFamily: Fonts.Inter_700Bold, fontSize: Typography.body, color: Colors.design.accent }}>
                    ${item.amount.toFixed(2)}
                </Text>
            </Row>
            <Row style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: Fonts.Inter_400Regular, fontSize: Typography.body, color: Colors.design.mutedText }}>
                    {item.method}
                </Text>
                <Text style={{
                    fontFamily: Fonts.Inter_600SemiBold,
                    color: item.status === 'completed' ? Colors.design.greenText :
                        item.status === 'pending' ? Colors.design.warning :
                            Colors.design.redText
                }}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
            </Row>
        </View>
    );

    return (
        <ModalStackWrapper>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={withdrawals}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={
                        <Text style={{
                            fontFamily: Fonts.Inter_700Bold,
                            fontSize: Typography.subheading,
                            marginBottom: 16,
                            marginTop: 16,
                            marginLeft: 16
                        }}>
                            Withdrawal History
                        </Text>
                    }
                />
            </SafeAreaView>
        </ModalStackWrapper>
    );
};

export default WithdrawalHistory;