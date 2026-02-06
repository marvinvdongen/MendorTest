import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, BorderRadius, Spacing } from '../constants/theme';

type Status = 'active' | 'completed' | 'on-hold' | 'pending' | 'paid' | 'overdue' | 'draft';

const statusColors: Record<Status, { bg: string; text: string }> = {
  active: { bg: '#E8F5E9', text: Colors.success },
  completed: { bg: '#E3F2FD', text: '#1565C0' },
  'on-hold': { bg: '#FFF3E0', text: '#E65100' },
  pending: { bg: '#FFF8E1', text: '#F57F17' },
  paid: { bg: '#E8F5E9', text: Colors.success },
  overdue: { bg: '#FFEBEE', text: Colors.danger },
  draft: { bg: '#F5F5F5', text: Colors.textSecondary },
};

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = statusColors[status] || statusColors.pending;
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xl,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
});
