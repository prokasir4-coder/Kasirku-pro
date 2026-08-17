import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '@utils/constants';
import { formatCurrency, formatDate } from '@utils/formatters';

interface DailyReport {
  date: string;
  totalTransactions: number;
  totalRevenue: number;
  totalItems: number;
  paymentBreakdown: {
    cash: number;
    card: number;
    ewallet: number;
  };
}

const ReportsScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [report, setReport] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    loadReport();
  }, [selectedDate, timeRange]);

  const loadReport = async () => {
    setLoading(true);
    try {
      // TODO: Replace with API call
      const mockReport: DailyReport = {
        date: selectedDate.toISOString(),
        totalTransactions: 24,
        totalRevenue: 1250000,
        totalItems: 156,
        paymentBreakdown: {
          cash: 750000,
          card: 350000,
          ewallet: 150000,
        },
      };
      setReport(mockReport);
    } catch (error) {
      console.error('Failed to load report:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentPercentage = (amount: number, total: number): string => {
    return ((amount / total) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!report) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Laporan tidak tersedia</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Laporan Penjualan</Text>
        <Text style={styles.date}>{formatDate(report.date)}</Text>
      </View>

      <View style={styles.filterContainer}>
        {(['today', 'week', 'month'] as const).map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              styles.filterButton,
              timeRange === range && styles.filterButtonActive,
            ]}
            onPress={() => setTimeRange(range)}
          >
            <Text
              style={[
                styles.filterButtonText,
                timeRange === range && styles.filterButtonTextActive,
              ]}
            >
              {range === 'today' ? 'Hari Ini' : range === 'week' ? 'Minggu Ini' : 'Bulan Ini'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={[styles.metricCard, styles.revenueCard]}>
          <Text style={styles.metricLabel}>Total Penjualan</Text>
          <Text style={styles.metricValue}>{formatCurrency(report.totalRevenue)}</Text>
        </View>

        <View style={[styles.metricCard, styles.transactionCard]}>
          <Text style={styles.metricLabel}>Jumlah Transaksi</Text>
          <Text style={styles.metricValue}>{report.totalTransactions}</Text>
        </View>

        <View style={[styles.metricCard, styles.itemsCard]}>
          <Text style={styles.metricLabel}>Total Item Terjual</Text>
          <Text style={styles.metricValue}>{report.totalItems}</Text>
        </View>
      </View>

      {/* Payment Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rincian Pembayaran</Text>

        <View style={styles.paymentItem}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentMethod}>💵 Tunai</Text>
            <Text style={styles.paymentAmount}>{formatCurrency(report.paymentBreakdown.cash)}</Text>
          </View>
          <Text style={styles.paymentPercentage}>
            {getPaymentPercentage(report.paymentBreakdown.cash, report.totalRevenue)}%
          </Text>
        </View>

        <View style={styles.paymentItem}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentMethod}>💳 Kartu Kredit</Text>
            <Text style={styles.paymentAmount}>{formatCurrency(report.paymentBreakdown.card)}</Text>
          </View>
          <Text style={styles.paymentPercentage}>
            {getPaymentPercentage(report.paymentBreakdown.card, report.totalRevenue)}%
          </Text>
        </View>

        <View style={styles.paymentItem}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentMethod}>📱 E-Wallet</Text>
            <Text style={styles.paymentAmount}>{formatCurrency(report.paymentBreakdown.ewallet)}</Text>
          </View>
          <Text style={styles.paymentPercentage}>
            {getPaymentPercentage(report.paymentBreakdown.ewallet, report.totalRevenue)}%
          </Text>
        </View>
      </View>

      {/* Average Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rata-rata</Text>

        <View style={styles.averageItem}>
          <Text style={styles.averageLabel}>Nilai Transaksi Rata-rata</Text>
          <Text style={styles.averageValue}>
            {formatCurrency(report.totalRevenue / (report.totalTransactions || 1))}
          </Text>
        </View>

        <View style={styles.averageItem}>
          <Text style={styles.averageLabel}>Item per Transaksi</Text>
          <Text style={styles.averageValue}>
            {(report.totalItems / (report.totalTransactions || 1)).toFixed(1)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: COLORS.dark,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.dark,
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  metricsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
  },
  metricCard: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  revenueCard: {
    backgroundColor: COLORS.success,
  },
  transactionCard: {
    backgroundColor: COLORS.primary,
  },
  itemsCard: {
    backgroundColor: COLORS.warning,
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 8,
  },
  metricValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 12,
  },
  paymentItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentMethod: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.dark,
  },
  paymentAmount: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 3,
  },
  paymentPercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  averageItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  averageLabel: {
    fontSize: 12,
    color: COLORS.dark,
    fontWeight: '500',
  },
  averageValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    textAlign: 'center',
    color: COLORS.danger,
    fontSize: 14,
    marginTop: 20,
  },
});

export default ReportsScreen;
