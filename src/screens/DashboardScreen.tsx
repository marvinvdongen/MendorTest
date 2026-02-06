import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/theme';
import { dashboardStats, recentActivity } from '../constants/mockData';

const statCards = [
  { label: 'Active Projects', value: dashboardStats.activeProjects, icon: 'construct' as const, color: Colors.primary },
  { label: 'Pending Invoices', value: dashboardStats.pendingInvoices, icon: 'document-text' as const, color: Colors.warning },
  { label: 'Revenue (MTD)', value: dashboardStats.totalRevenue, icon: 'cash' as const, color: Colors.success },
  { label: 'Hours This Week', value: dashboardStats.hoursThisWeek, icon: 'time' as const, color: Colors.secondary },
];

const quickActions = [
  { label: 'New Project', icon: 'add-circle' as const, color: Colors.primary },
  { label: 'Log Time', icon: 'timer' as const, color: Colors.secondary },
  { label: 'New Invoice', icon: 'receipt' as const, color: Colors.success },
  { label: 'Add Client', icon: 'person-add' as const, color: Colors.warningDark },
];

export function DashboardScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>Mike's Construction</Text>
        </View>
        <TouchableOpacity style={styles.notifButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
          <View style={styles.notifBadge}>
            <Text style={styles.notifBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
              <Ionicons name={stat.icon} size={22} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      <SectionHeader title="Quick Actions" />
      <View style={styles.actionsRow}>
        {quickActions.map((action, index) => (
          <TouchableOpacity key={index} style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
              <Ionicons name={action.icon} size={24} color={action.color} />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.alertCard}>
        <Ionicons name="alert-circle" size={20} color={Colors.danger} />
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>2 overdue invoices</Text>
          <Text style={styles.alertText}>Total outstanding: $16,100</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
      </View>

      <SectionHeader title="Recent Activity" actionText="View All" />
      {recentActivity.map((activity) => (
        <Card key={activity.id} style={styles.activityCard}>
          <View style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: Colors.primaryLight + '20' }]}>
              <Ionicons name={activity.icon} size={18} color={Colors.primary} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>{activity.text}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        </Card>
      ))}

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  name: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  notifButton: {
    position: 'relative',
    padding: Spacing.sm,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.danger,
    borderRadius: BorderRadius.full,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    width: '48%',
    flexGrow: 1,
    minWidth: 150,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  actionLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.danger + '10',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.danger,
  },
  alertContent: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  alertTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.danger,
  },
  alertText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  activityCard: {
    marginBottom: Spacing.sm,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  activityTime: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
    marginTop: 2,
  },
  bottomSpacer: {
    height: Spacing.xl,
  },
});
