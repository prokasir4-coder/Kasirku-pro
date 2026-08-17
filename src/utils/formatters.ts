// Currency Formatter
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Date Formatter
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Time Formatter
export const formatTime = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// Receipt Number Generator
export const generateReceiptNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `RCP-${timestamp}-${random}`;
};

// Transaction ID Generator
export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `TRX-${timestamp}-${random}`;
};

// Stock Level Indicator
export const getStockStatus = (stock: number): 'critical' | 'low' | 'normal' => {
  if (stock <= 5) return 'critical';
  if (stock <= 20) return 'low';
  return 'normal';
};
