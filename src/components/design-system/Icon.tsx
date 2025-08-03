import React from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';

// Icon registry - will be dynamically populated as new icons are processed
export const iconRegistry: Record<string, ImageSourcePropType> = {
  // Navigation icons
  'nav-home': require('../../../assets/icons/nav-home.png'),
  'nav-profile': require('../../../assets/icons/nav-profile.png'),
  'nav-settings': require('../../../assets/icons/nav-settings.png'),

  // Action icons
  'action-send': require('../../../assets/icons/action-send.png'),
  'action-edit': require('../../../assets/icons/action-edit.png'),
  'action-delete': require('../../../assets/icons/action-delete.png'),

  // Status icons
  'status-online': require('../../../assets/icons/status-online.png'),
  'status-offline': require('../../../assets/icons/status-offline.png'),
  'status-success': require('../../../assets/icons/status-success.png'),
  'status-error': require('../../../assets/icons/status-error.png'),
};

export type IconName = keyof typeof iconRegistry;

export interface IconProps {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  style?: ViewStyle;
  testID?: string;
}

const iconSizes = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export const Icon: React.FC<IconProps> = ({ name, size = 'md', color, style, testID }) => {
  const iconSource = iconRegistry[name];

  if (!iconSource) {
    console.warn(`Icon "${name}" not found in icon registry`);
    return null;
  }

  const iconStyle: ImageStyle = {
    width: iconSizes[size],
    height: iconSizes[size],
    tintColor: color,
  };

  const containerStyle = [
    styles.container,
    {
      width: iconSizes[size],
      height: iconSizes[size],
    },
    style,
  ];

  return (
    <View style={containerStyle} testID={testID}>
      <Image source={iconSource} style={iconStyle} resizeMode="contain" />
    </View>
  );
};

// Helper function to register new icons dynamically
export const registerIcon = (name: string, source: ImageSourcePropType) => {
  iconRegistry[name] = source;
};

// Helper function to register multiple icons at once
export const registerIcons = (icons: Record<string, ImageSourcePropType>) => {
  Object.assign(iconRegistry, icons);
};

// Helper function to get all available icon names
export const getAvailableIcons = (): string[] => {
  return Object.keys(iconRegistry);
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
