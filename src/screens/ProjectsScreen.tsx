import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressBar } from '../components/ProgressBar';
import { SearchBar } from '../components/SearchBar';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/theme';
import { projects, ProjectStatus } from '../constants/mockData';

const filters: { label: string; value: ProjectStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'On Hold', value: 'on-hold' },
  { label: 'Completed', value: 'completed' },
];

export function ProjectsScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | 'all'>('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'all' || p.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Projects</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchArea}>
        <SearchBar placeholder="Search projects..." value={search} onChangeText={setSearch} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            style={[styles.filterChip, activeFilter === filter.value && styles.filterChipActive]}
            onPress={() => setActiveFilter(filter.value)}
          >
            <Text style={[styles.filterText, activeFilter === filter.value && styles.filterTextActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filteredProjects.map((project) => (
          <TouchableOpacity key={project.id} activeOpacity={0.7}>
            <Card style={styles.projectCard}>
              <View style={styles.projectHeader}>
                <View style={styles.projectTitleRow}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <StatusBadge status={project.status} />
                </View>
                <Text style={styles.projectClient}>
                  <Ionicons name="person-outline" size={13} color={Colors.textSecondary} /> {project.client}
                </Text>
                <Text style={styles.projectAddress}>
                  <Ionicons name="location-outline" size={13} color={Colors.textLight} /> {project.address}
                </Text>
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressValue}>{project.progress}%</Text>
                </View>
                <ProgressBar progress={project.progress} />
              </View>

              <View style={styles.projectFooter}>
                <View style={styles.footerItem}>
                  <Text style={styles.footerLabel}>Budget</Text>
                  <Text style={styles.footerValue}>{project.budget}</Text>
                </View>
                <View style={styles.footerItem}>
                  <Text style={styles.footerLabel}>Spent</Text>
                  <Text style={styles.footerValue}>{project.spent}</Text>
                </View>
                <View style={styles.footerItem}>
                  <Text style={styles.footerLabel}>Timeline</Text>
                  <Text style={styles.footerValue}>{project.startDate} - {project.endDate}</Text>
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
  filterScroll: {
    maxHeight: 44,
    marginBottom: Spacing.sm,
  },
  filterContainer: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: Colors.white,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.md,
  },
  projectCard: {
    marginBottom: Spacing.sm,
  },
  projectHeader: {
    marginBottom: Spacing.sm,
  },
  projectTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  projectName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.sm,
  },
  projectClient: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  projectAddress: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
  },
  progressSection: {
    marginBottom: Spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  progressLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  progressValue: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textLight,
    marginBottom: 2,
  },
  footerValue: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  bottomSpacer: {
    height: Spacing.xl,
  },
});
