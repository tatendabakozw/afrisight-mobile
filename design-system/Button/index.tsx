import React from 'react';
import { ActivityIndicator, TouchableOpacityProps, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import Colors from '@/constants/Colors';
import { Fonts, Typography } from '@/constants/typography';
import Spinner from '../Spinner';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'accent' | 'outline' | 'text' | 'ghost' | 'surface';
    colorScheme?: 'primary' | 'accent' | 'surface' | 'danger' | 'warning' | 'success' | 'info' | 'cta';
    size?: 'small' | 'medium' | 'large' | 'icon';
    isLoading?: boolean;
    text: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    loadingIndicatorColor?: "light" | "dark";
}

const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  opacity: ${(props: ButtonProps) => props.disabled ? 0.5 : 1};
  flex-direction: row;

  ${(props: ButtonProps) => props.size === 'small' && css`
    padding: ${props.leftIcon || props.rightIcon ? '4px 12px' : '4px 16px'};
  `}

  ${(props: ButtonProps) => props.size === 'icon' && css`
    width: 40px;
    height: 40px;
  `}

  ${(props: ButtonProps) => props.size === 'medium' && css`
    padding: ${props.leftIcon || props.rightIcon ? '12px 16px' : '12px 20px'};
  `}

  ${(props: ButtonProps) => props.size === 'large' && css`
    padding: ${props.leftIcon || props.rightIcon ? '16px 20px' : '16px 24px'};
  `}

  ${(props: ButtonProps) => props.colorScheme === 'danger' && css`
    background-color: ${Colors.design.redSurface};
  `}

  ${(props: ButtonProps) => props.colorScheme === 'warning' && css`
    background-color: ${Colors.design.warning};
  `}

    ${(props: ButtonProps) => props.colorScheme === 'accent' && css`
    background-color: ${Colors.design.accent};
  `}

  ${(props: ButtonProps) => props.colorScheme === 'success' && css`
    background-color: ${Colors.design.green};
  `}

  ${(props: ButtonProps) => props.colorScheme === 'info' && css`
    background-color: ${Colors.design.accent};
  `}
  
   ${(props: ButtonProps) => props.variant === 'primary' && css`
    background-color: ${Colors.design.surfaceOnSurface};
  `}

  ${(props: ButtonProps) => props.variant === 'accent' && css`
    background-color: ${Colors.design.accent};
  `}

  ${(props: ButtonProps) => props.variant === 'outline' && css`
    background-color: transparent;
    border: 2px solid ${Colors.design.surfaceOnSurface};
  `}

  ${(props: ButtonProps) => props.variant === 'ghost' && css`
    background-color: transparent;
  `}

  ${(props: ButtonProps) => props.variant === 'surface' && css`
    background-color: ${Colors.design.surfaceOnSurface};
  `}

  ${(props: ButtonProps) => props.variant === 'text' && css`
    background-color: transparent;
    justify-content: flex-start;
    padding: 4px 0px;
  `}
  
`;

const ButtonText = styled.Text<ButtonProps>`
  font-family: ${Fonts.Inter_600SemiBold};
  font-size: ${Typography.paragraph}px;
  color: ${Colors.design.text};

  ${(props: ButtonProps) => props.variant === 'primary' && css`
    color: ${Colors.design.highContrastText};
  `}

  ${(props: ButtonProps) => props.variant === 'accent' && css`
    color: ${Colors.design.white};
  `}

  ${(props: ButtonProps) => props.variant === 'outline' && css`
    color: ${Colors.design.text};
  `}

  ${(props: ButtonProps) => props.colorScheme === 'danger' && css`
    color: ${Colors.design.redText};
  `}

  ${(props: ButtonProps) => props.colorScheme === 'warning' && css`
    color: ${Colors.design.warning};
  `}

  ${(props: ButtonProps) => props.colorScheme === 'success' && css`
    color: ${Colors.design.green};
  `}

  ${(props: ButtonProps) => props.colorScheme === 'info' && css`
    color: ${Colors.design.accent};
  `}

  ${(props: ButtonProps) => props.colorScheme === 'cta' && css`
    color: ${Colors.design.accent};
  `}

  ${(props: ButtonProps) => props.colorScheme === 'accent' && css`
    color: ${Colors.design.accent};
  `}

  ${(props: ButtonProps) => props.size === 'small' && css`
    font-size: 14px;
  `}

  ${(props: ButtonProps) => props.size === 'large' && css`
    font-size: ${Typography.paragraph}px;
  `}
`;



const IconWrapper = styled.View<{ position: 'left' | 'right' }>`
  ${({ position }: { position: 'left' | 'right' }) => position === 'left' && css`
    margin-right: 8px;
  `}

  ${({ position }: { position: 'left' | 'right' }) => position === 'right' && css`
    margin-left: 8px;
  `}
`;

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    colorScheme = 'primary',
    isLoading = false,
    text,
    leftIcon,
    rightIcon,
    loadingIndicatorColor = 'white',
    ...props
}) => {
    return (
        (
            <ButtonContainer variant={variant} colorScheme={colorScheme} size={size} leftIcon={leftIcon} rightIcon={rightIcon} {...props}>
                {isLoading ? (
                    <Spinner size={size === 'small' ? 16 : size === 'medium' ? 20 : 24} />
                ) : (
                    <>
                        {leftIcon && <IconWrapper position="left">
                            {typeof leftIcon === 'string' ? <ButtonText style={{ fontSize: 24 }} size={size} variant={variant} colorScheme={colorScheme}>{leftIcon}</ButtonText> : leftIcon}
                        </IconWrapper>}
                        <ButtonText variant={variant} colorScheme={colorScheme} size={size}>{text}</ButtonText>
                        {rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
                    </>
                )}
            </ButtonContainer>
        )
    )
};

export default Button;