import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from './theme';

type SpacingKey = keyof typeof theme.spacing;
type ShadowKey = keyof typeof theme.shadows;
type BorderRadiusKey = keyof typeof theme.borderRadius;

export interface CardProps {
  children: React.ReactNode;
  padding?: SpacingKey;
  shadow?: ShadowKey;
  radius?: BorderRadiusKey;
  style?: ViewStyle;
  testID?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 4,
  shadow = 'base',
  radius = 'base',
  style,
  testID,
}) => {
  const cardStyle = [
    styles.base,
    {
      padding: theme.spacing[padding],
      borderRadius: theme.borderRadius[radius],
      ...theme.shadows[shadow],
    },
    style,
  ];

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.background.light,
  },
});
