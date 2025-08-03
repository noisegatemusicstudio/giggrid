import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { theme } from './theme';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled = false,
  fullWidth = true,
  size = 'md',
  variant = 'outline',
  style,
  inputStyle,
  testID,
  ...props
}) => {
  const containerStyle = [
    styles.container,
    fullWidth && styles.fullWidth,
    style,
  ];

  const inputContainerStyle = [
    styles.inputContainer,
    styles[variant],
    styles[size],
    error && styles.error,
    disabled && styles.disabled,
  ];

  const textInputStyle = [
    styles.input,
    styles[`${size}Text` as keyof typeof styles],
    inputStyle,
  ];

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={inputContainerStyle}>
        <TextInput
          style={textInputStyle}
          editable={!disabled}
          placeholderTextColor={theme.colors.gray[400]}
          testID={testID}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing[4],
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  inputContainer: {
    borderRadius: theme.borderRadius.base,
    overflow: 'hidden',
  },
  
  // Variants
  outline: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    backgroundColor: theme.colors.background.light,
  },
  filled: {
    backgroundColor: theme.colors.gray[100],
    borderWidth: 0,
  },
  
  // Sizes
  sm: {
    minHeight: 36,
    paddingHorizontal: theme.spacing[3],
  },
  md: {
    minHeight: 44,
    paddingHorizontal: theme.spacing[4],
  },
  lg: {
    minHeight: 52,
    paddingHorizontal: theme.spacing[5],
  },
  
  input: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
  },
  
  // Text sizes
  smText: {
    fontSize: theme.typography.fontSize.sm,
  },
  mdText: {
    fontSize: theme.typography.fontSize.base,
  },
  lgText: {
    fontSize: theme.typography.fontSize.lg,
  },
  
  error: {
    borderColor: theme.colors.error[500],
  },
  errorText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.error[500],
    marginTop: theme.spacing[1],
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
});
