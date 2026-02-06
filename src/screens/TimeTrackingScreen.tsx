import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/theme';
import { timeEntries } from '../constants/mockData';

export function TimeTrackingScreen() {
  const [isTracking, setIsTracking] = useState(false);

  const todayHours = timeEntries.filter((e) => e.date === 'Today').reduce((sum, e) => sum + e.hours, 0);
  const weekHours = timeEntries.reduce((sum, e) => sum + e.hours, 0);
  const billableHours = timeEntries.filter((e) => e.billable).reduce((sum, e) => sum + e.hours, 0);

  const groupedEntries = timeEntries.reduce<Record<string, typeof timeEntries>>((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Time Tracking</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.timerSection}>
        <Card style={styles.timerCard}>
          <Text style={styles.timerLabel}>{isTracking ? 'Currently Tracking' : 'Timer Stopped'}</Text>
          <Text style={styles.timerDisplay}>
            {isTracking ? '02:34:15' : '00:00:00'}
          </Text>
          {isTracking && (
            <Text style={styles.timerProject}>Kitchen Remodel - Cabinet installation</Text>
          )}
          <View style={styles.timerButtons}>
            <TouchableOpacity
              style={[styles.timerButton, isTracking ? styles.stopButton : styles.startButton]}
              onPress={() => setIsTracking(!isTracking)}
            >
              <Ionicons name={isTracking ? 'stop' : 'play'} size={20} color={Colors.white} />
              <Text style={styles.timerButtonText}>{isTracking ? 'Stop' : 'Start'}</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{todayHours}h</Text>
          <Text style={styles.miniStatLabel}>Today</Text>
        </Card>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{weekHours}h</Text>
          <Text style={styles.miniStatLabel}>This Week</Text>
        </Card>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{billableHours}h</Text>
          <Text style={styles.miniStatLabel}>Billable</Text>
        </Card>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {Object.entries(groupedEntries).map(([date, entries]) => (
          <View key={date}>
            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.dateTotalText}>
                {entries.reduce((sum, e) => sum + e.hours, 0)}h total
              </Text>
            </View>
            {entries.map((entry) => (
              <Card key={entry.id} style={styles.entryCard}>
                <View style={styles.entryRow}>
                  <View style={[styles.entryDot, { backgroundColor: entry.billable ? Colors.success : Colors.textLight }]} />
                  <View style={styles.entryContent}>
                    <Text style={styles.entryProject}>{entry.project}</Text>
                    <Text style={styles.entryDescription}>{entry.description}</Text>
                  </View>
                  <View style={styles.entryHours}>
                    <Text style={styles.entryHoursText}>{entry.hours}h</Text>
                    {entry.billable && (
                      <Text style={styles.billableTag}>Billable</Text>
                    )}
                  </View>
                </View>
              </Card>
            ))}
          </View>
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
  timerSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  timerCard: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.primaryDark,
  },
  timerLabel: {
    fontSize: FontSizes.sm,
    color: Colors.primaryLight,
    marginBottom: Spacing.xs,
  },
  timerDisplay: {
    fontSize: 44,
    fontWeight: '200',
    color: Colors.white,
    fontVariant: ['tabular-nums'],
  },
  timerProject: {
    fontSize: FontSizes.sm,
    color: Colors.primaryLight,
    marginTop: Spacing.xs,
  },
  timerButtons: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    gap: Spacing.xs,
  },
  startButton: {
    backgroundColor: Colors.success,
  },
  stopButton: {
    backgroundColor: Colors.danger,
  },
  timerButtonText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
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
    marginTop: Spacing.md,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  dateText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  dateTotalText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  entryCard: {
    marginBottom: Spacing.sm,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.sm,
  },
  entryContent: {
    flex: 1,
  },
  entryProject: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  entryDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  entryHours: {
    alignItems: 'flex-end',
  },
  entryHoursText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  billableTag: {
    fontSize: FontSizes.xs,
    color: Colors.success,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: Spacing.xl,
  },
});
