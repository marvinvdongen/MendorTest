import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { SearchBar } from '../components/SearchBar';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/theme';
import { clients } from '../constants/mockData';

const avatarColors = [Colors.primary, Colors.secondary, Colors.success, Colors.warningDark, Colors.danger, '#7B61FF', '#00BFA5', Colors.primaryDark];

export function ClientsScreen() {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Clients</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchArea}>
        <SearchBar placeholder="Search clients..." value={search} onChangeText={setSearch} />
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{clients.length}</Text>
          <Text style={styles.miniStatLabel}>Total Clients</Text>
        </Card>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{clients.filter((c) => c.projectCount > 0).length}</Text>
          <Text style={styles.miniStatLabel}>Active</Text>
        </Card>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{clients.filter((c) => c.projectCount === 0).length}</Text>
          <Text style={styles.miniStatLabel}>No Projects</Text>
        </Card>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filteredClients.map((client, index) => (
          <TouchableOpacity key={client.id} activeOpacity={0.7}>
            <Card style={styles.clientCard}>
              <View style={styles.clientRow}>
                <Avatar initials={client.avatar} color={avatarColors[index % avatarColors.length]} />
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <Text style={styles.clientEmail}>{client.email}</Text>
                  <Text style={styles.clientPhone}>{client.phone}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
              </View>
              <View style={styles.clientFooter}>
                <View style={styles.clientStat}>
                  <Ionicons name="folder-outline" size={14} color={Colors.textSecondary} />
                  <Text style={styles.clientStatText}>{client.projectCount} projects</Text>
                </View>
                <View style={styles.clientStat}>
                  <Ionicons name="cash-outline" size={14} color={Colors.textSecondary} />
                  <Text style={styles.clientStatText}>{client.totalSpent}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchArea: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  miniStat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  miniStatValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.primary,
  },
  miniStatLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.md,
  },
  clientCard: {
    marginBottom: Spacing.sm,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientInfo: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  clientName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  clientEmail: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  clientPhone: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
  },
  clientFooter: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.lg,
  },
  clientStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  clientStatText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  bottomSpacer: {
    height: Spacing.xl,
  },
});
