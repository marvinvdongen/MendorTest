import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { SearchBar } from '../components/SearchBar';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/theme';
import { invoices, InvoiceStatus } from '../constants/mockData';

const filters: { label: string; value: InvoiceStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Draft', value: 'draft' },
];

export function InvoicesScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<InvoiceStatus | 'all'>('all');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.number.toLowerCase().includes(search.toLowerCase()) ||
      inv.client.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'all' || inv.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPending = invoices
    .filter((i) => i.status === 'pending')
    .reduce((sum, i) => sum + parseFloat(i.amount.replace(/[$,]/g, '')), 0);
  const totalOverdue = invoices
    .filter((i) => i.status === 'overdue')
    .reduce((sum, i) => sum + parseFloat(i.amount.replace(/[$,]/g, '')), 0);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Invoices</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryRow}>
        <Card style={[styles.summaryCard, { borderLeftColor: Colors.warning }]}>
          <Text style={styles.summaryLabel}>Pending</Text>
          <Text style={styles.summaryValue}>${totalPending.toLocaleString()}</Text>
        </Card>
        <Card style={[styles.summaryCard, { borderLeftColor: Colors.danger }]}>
          <Text style={styles.summaryLabel}>Overdue</Text>
          <Text style={[styles.summaryValue, { color: Colors.danger }]}>${totalOverdue.toLocaleString()}</Text>
        </Card>
      </View>

      <View style={styles.searchArea}>
        <SearchBar placeholder="Search invoices..." value={search} onChangeText={setSearch} />
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
        {filteredInvoices.map((invoice) => (
          <TouchableOpacity key={invoice.id} activeOpacity={0.7}>
            <Card style={styles.invoiceCard}>
              <View style={styles.invoiceHeader}>
                <View>
                  <Text style={styles.invoiceNumber}>{invoice.number}</Text>
                  <Text style={styles.invoiceClient}>{invoice.client}</Text>
                </View>
                <View style={styles.invoiceAmountSection}>
                  <Text style={styles.invoiceAmount}>{invoice.amount}</Text>
                  <StatusBadge status={invoice.status} />
                </View>
              </View>
              <View style={styles.invoiceDetails}>
                <View style={styles.invoiceDetail}>
                  <Ionicons name="construct-outline" size={14} color={Colors.textLight} />
                  <Text style={styles.invoiceDetailText}>{invoice.project}</Text>
                </View>
                {invoice.issueDate ? (
                  <View style={styles.invoiceDates}>
                    <Text style={styles.invoiceDateText}>Issued: {invoice.issueDate}</Text>
                    <Text style={styles.invoiceDateText}>Due: {invoice.dueDate}</Text>
                  </View>
                ) : (
                  <Text style={styles.invoiceDateText}>Not yet issued</Text>
                )}
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
  summaryRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  summaryCard: {
    flex: 1,
    borderLeftWidth: 3,
  },
  summaryLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
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
  invoiceCard: {
    marginBottom: Spacing.sm,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  invoiceNumber: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  invoiceClient: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  invoiceAmountSection: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  invoiceAmount: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  invoiceDetails: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
  invoiceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  invoiceDetailText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  invoiceDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoiceDateText: {
    fontSize: FontSizes.xs,
    color: Colors.textLight,
  },
  bottomSpacer: {
    height: Spacing.xl,
  },
});
