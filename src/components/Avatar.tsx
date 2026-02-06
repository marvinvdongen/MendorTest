import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, BorderRadius } from '../constants/theme';

interface AvatarProps {
  initials: string;
  size?: number;
  color?: string;
}

export function Avatar({ initials, size = 44, color = Colors.primary }: AvatarProps) {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: '700',
  },
});
