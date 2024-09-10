import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { RootStackParamList } from '@/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '@/components/ui/Text';
import { Fonts, Typography } from '@/constants/typography';
import Button from '@/design-system/Button';
import { Dots } from '@/design-system/Pager';
import { useDerivedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface OnboardingItem {
    id: string;
    title: string;
    description: string;
}

const onboardingData: OnboardingItem[] = [
    {
        id: '1',
        title: 'Welcome to CXMappers',
        description: 'Your gateway to shaping products and services through valuable feedback.',
    },
    {
        id: '2',
        title: 'Your Opinion Matters',
        description: 'Participate in surveys, influence decisions, and earn rewards for your insights.',
    },
    {
        id: '3',
        title: 'Watch Your Impact Grow',
        description: 'Track your contributions, see your earnings, and witness how your voice makes a difference.',
    },
];

function OnboardingScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const renderItem = ({ item }: { item: OnboardingItem }) => (
        <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    const handleSkip = async () => {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        if (hasSeenOnboarding) {
            navigation.navigate('Main');
        } else {
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
            navigation.navigate('Auth');
        }
    };

    const handleNext = async () => {
        if (currentIndex < onboardingData.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
            setCurrentIndex(currentIndex + 1);
        } else {
            const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
            if (hasSeenOnboarding) {
                navigation.navigate('Main');
            } else {
                await AsyncStorage.setItem('hasSeenOnboarding', 'true');
                navigation.navigate('Auth');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={onboardingData}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
            />
            <View style={styles.pagination}>
                <Dots activeIndex={currentIndex} count={onboardingData.length} />
            </View>
            <View style={styles.buttonContainer}>

                <Button onPress={handleSkip} text='Skip' variant='surface' />
                <Button onPress={handleNext} text={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'} variant='accent' />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.design.white,
    },
    slide: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: Typography.heading,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: Fonts.Inter_700Bold,
        color: Colors.design.highContrastText,
    },
    description: {
        fontSize: Typography.body,
        textAlign: 'center',
        color: Colors.design.mutedText,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.design.surfaceOnSurface,
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: Colors.design.accent,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    skipButton: {
        padding: 10,
    },
    skipButtonText: {
        color: Colors.design.mutedText,
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: Colors.design.accent,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    nextButtonText: {
        color: Colors.design.white,

    },
});

export default OnboardingScreen;