// components/Button.tsx
import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Fonts, Typography } from '@/constants/typography';

// Define the button variants
type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ButtonContainer = styled(AnimatedTouchableOpacity) <{ variant: ButtonVariant; disabled: boolean }>`
  padding: 12px 24px;
  height: 54px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  
  ${({ variant, disabled }) => {
        switch (variant) {
            case 'primary':
                return `
          background-color: ${disabled ? '#A0AEC0' : '#4299E1'};
        `;
            case 'secondary':
                return `
          background-color: ${disabled ? '#E2E8F0' : '#EDF2F7'};
        `;
            case 'outline':
                return `
          background-color: transparent;
          border-width: 1px;
          border-color: ${disabled ? '#A0AEC0' : '#4299E1'};
        `;
            default:
                return '';
        }
    }}
`;

const ButtonText = styled(Text) <{ variant: ButtonVariant; disabled: boolean }>`
  font-size: ${Typography.body}px;
  font-family: ${Fonts.Inter_700Bold};
  
  ${({ variant, disabled }) => {
        switch (variant) {
            case 'primary':
                return `color: ${disabled ? '#718096' : '#FFFFFF'};`;
            case 'secondary':
                return `color: ${disabled ? '#718096' : '#2D3748'};`;
            case 'outline':
                return `color: ${disabled ? '#A0AEC0' : '#4299E1'};`;
            default:
                return '';
        }
    }}
`;

const Button: React.FC<ButtonProps> = ({
    onPress,
    title,
    variant = 'primary',
    disabled = false,
    loading = false,
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    return (
        <ButtonContainer
            onPress={onPress}
            variant={variant}
            disabled={disabled || loading}
            style={animatedStyle}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            {loading ? (
                <ActivityIndicator size="small" color={variant === 'primary' ? '#FFFFFF' : '#4299E1'} />
            ) : (
                <ButtonText variant={variant} disabled={disabled}>
                    {title}
                </ButtonText>
            )}
        </ButtonContainer>
    );
};

export default Button;
