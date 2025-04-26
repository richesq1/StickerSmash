import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors } from '../constants/theme';

interface ThemedTextProps extends TextProps {
  variant?: 'primary' | 'secondary';
}

export function ThemedText({ 
  style, 
  variant = 'primary', 
  ...props 
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: variant === 'primary' ? colors.text.primary : colors.text.secondary },
        style,
      ]}
      {...props}
    />
  );
}