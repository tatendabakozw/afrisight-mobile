import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/design-system/Button';
import Colors from '@/constants/Colors';
import { Fonts, Typography } from '@/constants/typography';
import { Dots } from '@/design-system/Pager';
import Row from '@/design-system/Row';

interface OnboardingScreenBaseProps {
    title: string;
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onBack?: () => void;
    children: React.ReactNode;
}

const OnboardingScreenBase: React.FC<OnboardingScreenBaseProps> = ({
    title,
    currentStep,
    totalSteps,
    onNext,
    onBack,
    children,
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                {children}
            </View>
            <View style={styles.footer}>
                <Row style={styles.dotsContainer}>
                    <Dots activeIndex={currentStep} count={totalSteps} />
                </Row>
                <View style={styles.buttonContainer}>
                    {onBack && (
                        <Button text="Back" onPress={onBack} variant="outline" style={styles.button} />
                    )}
                    <Button text={currentStep === totalSteps ? "Finish" : "Next"} onPress={onNext} style={styles.button} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.design.white,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontFamily: Fonts.Inter_600SemiBold,
        fontSize: Typography.largeHeading,
        color: Colors.design.highContrastText,
        marginBottom: 20,
    },
    footer: {
        padding: 20,
        gap: 20
    },
    dotsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default OnboardingScreenBase;