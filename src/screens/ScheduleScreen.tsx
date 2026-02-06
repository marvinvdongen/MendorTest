import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/theme';
import { scheduleEvents } from '../constants/mockData';

const typeConfig: Record<string, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  'site-visit': { icon: 'location', color: Colors.primary },
  meeting: { icon: 'people', color: Colors.secondary },
  deadline: { icon: 'flag', color: Colors.danger },
  delivery: { icon: 'cube', color: Colors.warningDark },
  inspection: { icon: 'clipboard', color: Colors.success },
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [3, 4, 5, 6, 7, 8, 9];

export function ScheduleScreen() {
  const groupedEvents = scheduleEvents.reduce<Record<string, typeof scheduleEvents>>((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Schedule</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <Card style={styles.weekCard}>
        <View style={styles.monthRow}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.monthText}>February 2026</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.weekRow}>
          {weekDays.map((day, index) => {
            const isToday = index === 3;
            return (
              <TouchableOpacity key={day} style={styles.dayColumn}>
                <Text style={[styles.dayLabel, isToday && styles.dayLabelActive]}>{day}</Text>
                <View style={[styles.dateCircle, isToday && styles.dateCircleActive]}>
                  <Text style={[styles.dateNumber, isToday && styles.dateNumberActive]}>
                    {dates[index]}
                  </Text>
                </View>
                {(index === 3 || index === 4) && (
                  <View style={styles.dotIndicator} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {Object.entries(groupedEvents).map(([date, events]) => (
          <View key={date}>
            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.eventCount}>{events.length} events</Text>
            </View>
            {events.map((event) => {
              const config = typeConfig[event.type] || typeConfig['site-visit'];
              return (
                <TouchableOpacity key={event.id} activeOpacity={0.7}>
                  <Card style={styles.eventCard}>
                    <View style={styles.eventRow}>
                      <View style={[styles.eventIcon, { backgroundColor: config.color + '15' }]}>
                        <Ionicons name={config.icon} size={20} color={config.color} />
                      </View>
                      <View style={styles.eventContent}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventProject}>{event.project}</Text>
                        <View style={styles.eventMeta}>
                          {event.time ? (
                            <View style={styles.metaItem}>
                              <Ionicons name="time-outline" size={12} color={Colors.textLight} />
                              <Text style={styles.metaText}>{event.time}</Text>
                            </View>
                          ) : null}
                          <View style={styles.metaItem}>
                            <Ionicons name="location-outline" size={12} color={Colors.textLight} />
                            <Text style={styles.metaText}>{event.location}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
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
  weekCard: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  monthText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  dayLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  dateCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCircleActive: {
    backgroundColor: Colors.primary,
  },
  dateNumber: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  dateNumberActive: {
    color: Colors.white,
    fontWeight: '700',
  },
  dotIndicator: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.primary,
    marginTop: Spacing.xs,
  },
  list: {
    flex: 1,
    marginTop: Spacing.sm,
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
  eventCount: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  eventCard: {
    marginBottom: Spacing.sm,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  eventProject: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  eventMeta: {
    flexDirection: 'row',
    marginTop: Spacing.xs,
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: FontSizes.xs,
    color: Colors.textLight,
  },
  bottomSpacer: {
    height: Spacing.xl,
  },
});
