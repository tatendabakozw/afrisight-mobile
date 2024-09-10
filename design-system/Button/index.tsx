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
  state?: 'default' | 'disabled' | 'loading';
  isLoading?: boolean;
  text: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingIndicatorColor?: "light" | "dark";
}

const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  opacity: ${(props: ButtonProps) => props.disabled ? 0.2 : props.isLoading ? 0.4 : 1};
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

  ${(props: ButtonProps) => {
    switch (props.colorScheme) {
      case 'danger':
        return css`background-color: ${Colors.design.redSurface};`;
      case 'warning':
        return css`background-color: ${Colors.design.warning};`;
      case 'accent':
        return css`background-color: ${Colors.design.accent};`;
      case 'success':
        return css`background-color: ${Colors.design.green};`;
      case 'info':
        return css`background-color: ${Colors.design.accent};`;
      default:
        return '';
    }
  }}
  
  ${(props: ButtonProps) => {
    switch (props.variant) {
      case 'primary':
        return css`background-color: ${Colors.design.surfaceOnSurface};`;
      case 'accent':
        return css`background-color: ${Colors.design.accent};`;
      case 'outline':
        return css`
          background-color: transparent;
          border: 3px solid ${Colors.design.surfaceOnSurface};
        `;
      case 'ghost':
        return css`background-color: transparent;`;
      case 'surface':
        return css`background-color: ${Colors.design.surfaceOnSurface};`;
      case 'text':
        return css`
          background-color: transparent;
          justify-content: flex-start;
          padding: 4px 0px;
        `;
      default:
        return '';
    }
  }}
  
  ${(props: ButtonProps) => props.state === 'disabled' && css`
    background-color: ${Colors.design.surfaceOnSurface};
  `}
`;

const ButtonText = styled.Text<ButtonProps>`
  font-family: ${Fonts.Inter_600SemiBold};
  font-size: ${Typography.body}px;
  color: ${Colors.design.text};

  ${(props: ButtonProps) => {
    if (props.variant === 'surface' || props.variant === 'primary' || props.variant === 'text') {
      return css`color: ${Colors.design.highContrastText};`;
    }
    switch (props.variant) {
      case 'accent':
        return css`color: ${Colors.design.white};`;
      case 'outline':
        return css`color: ${Colors.design.text};`;
      default:
        return '';
    }
  }}

  ${(props: ButtonProps) => {
    switch (props.colorScheme) {
      case 'danger':
        return css`color: ${Colors.design.redText};`;
      case 'warning':
        return css`color: ${Colors.design.warning};`;
      case 'success':
        return css`color: ${Colors.design.green};`;
      case 'info':
      case 'cta':
      case 'accent':
        return css`color: ${Colors.design.accent};`;
      default:
        return props.variant === 'text' ? css`color: ${Colors.design.highContrastText};` : '';
    }
  }}

  ${(props: ButtonProps) => props.size === 'small' && css`
    font-size: 14px;
  `}

  ${(props: ButtonProps) => props.size === 'large' && css`
    font-size: ${Typography.body}px;
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
    <ButtonContainer variant={variant} colorScheme={colorScheme} size={size} leftIcon={leftIcon} rightIcon={rightIcon} isLoading={isLoading} {...props}>
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
  );
};

export default Button;