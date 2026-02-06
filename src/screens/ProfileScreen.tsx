import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/theme';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  color?: string;
  showBadge?: boolean;
}

const menuSections: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Business',
    items: [
      { icon: 'business', label: 'Company Profile', subtitle: "Mike's Construction LLC" },
      { icon: 'document-text', label: 'License & Insurance', subtitle: 'License #BC-12345' },
      { icon: 'card', label: 'Payment Methods', subtitle: '2 methods configured' },
      { icon: 'pricetags', label: 'Service Rates', subtitle: '$85/hr default rate' },
    ],
  },
  {
    title: 'App Settings',
    items: [
      { icon: 'notifications', label: 'Notifications', showBadge: true },
      { icon: 'moon', label: 'Appearance', subtitle: 'Light mode' },
      { icon: 'language', label: 'Language', subtitle: 'English' },
      { icon: 'cloud-upload', label: 'Backup & Sync', subtitle: 'Last sync: 5 min ago' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle', label: 'Help Center' },
      { icon: 'chatbubble', label: 'Contact Support' },
      { icon: 'star', label: 'Rate the App' },
      { icon: 'information-circle', label: 'About', subtitle: 'Version 1.0.0' },
    ],
  },
  {
    title: '',
    items: [
      { icon: 'log-out', label: 'Sign Out', color: Colors.danger },
    ],
  },
];

export function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.profileCard}>
        <View style={styles.profileRow}>
          <Avatar initials="MC" size={64} color={Colors.primary} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Mike Carter</Text>
            <Text style={styles.profileBusiness}>Mike's Construction LLC</Text>
            <Text style={styles.profileEmail}>mike@mikesconstruction.com</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={22} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileStats}>
          <View style={styles.profileStatItem}>
            <Text style={styles.profileStatValue}>156</Text>
            <Text style={styles.profileStatLabel}>Projects</Text>
          </View>
          <View style={styles.profileStatDivider} />
          <View style={styles.profileStatItem}>
            <Text style={styles.profileStatValue}>48</Text>
            <Text style={styles.profileStatLabel}>Clients</Text>
          </View>
          <View style={styles.profileStatDivider} />
          <View style={styles.profileStatItem}>
            <Text style={styles.profileStatValue}>4.9</Text>
            <Text style={styles.profileStatLabel}>Rating</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.subscriptionCard}>
        <View style={styles.subscriptionRow}>
          <View>
            <View style={styles.proBadge}>
              <Ionicons name="diamond" size={14} color={Colors.white} />
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
            <Text style={styles.subscriptionText}>Professional Plan</Text>
            <Text style={styles.subscriptionSubtext}>Renews Mar 15, 2026</Text>
          </View>
          <TouchableOpacity style={styles.manageButton}>
            <Text style={styles.manageButtonText}>Manage</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.menuSection}>
          {section.title ? <Text style={styles.sectionTitle}>{section.title}</Text> : null}
          <Card style={styles.menuCard}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.menuItem,
                  itemIndex < section.items.length - 1 && styles.menuItemBorder,
                ]}
              >
                <View style={[styles.menuIcon, { backgroundColor: (item.color || Colors.primary) + '12' }]}>
                  <Ionicons name={item.icon} size={20} color={item.color || Colors.primary} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={[styles.menuLabel, item.color ? { color: item.color } : null]}>
                    {item.label}
                  </Text>
                  {item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
                </View>
                {item.showBadge && (
                  <View style={styles.menuBadge}>
                    <Text style={styles.menuBadgeText}>3</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
              </TouchableOpacity>
            ))}
          </Card>
        </View>
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
  profileCard: {
    marginBottom: Spacing.md,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  profileInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  profileName: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  profileBusiness: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  profileEmail: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
  },
  profileStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  profileStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.primary,
  },
  profileStatLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  profileStatDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  subscriptionCard: {
    backgroundColor: Colors.primaryDark,
    marginBottom: Spacing.md,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warningDark,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: Spacing.xs,
  },
  proBadgeText: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  subscriptionText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.white,
  },
  subscriptionSubtext: {
    fontSize: FontSizes.sm,
    color: Colors.primaryLight,
    marginTop: 2,
  },
  manageButton: {
    backgroundColor: Colors.white + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  manageButtonText: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  menuSection: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  menuCard: {
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
    marginTop: 1,
  },
  menuBadge: {
    backgroundColor: Colors.danger,
    borderRadius: BorderRadius.full,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  menuBadgeText: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: Spacing.xl,
  },
});
