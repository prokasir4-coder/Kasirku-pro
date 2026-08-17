// App Info
export const APP_NAME = 'KasirKu Pro';
export const APP_VERSION = '1.0.0';
export const API_TIMEOUT = 10000;

// Colors
export const COLORS = {
  primary: '#3498db',
  success: '#27ae60',
  danger: '#e74c3c',
  warning: '#f39c12',
  info: '#3498db',
  dark: '#2c3e50',
  light: '#ecf0f1',
  gray: '#95a5a6',
  border: '#bdc3c7',
};

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'cash', label: 'Tunai', icon: '💵' },
  { id: 'card', label: 'Kartu Kredit', icon: '💳' },
  { id: 'ewallet', label: 'E-Wallet', icon: '📱' },
] as const;

// Tax Rate (10%)
export const TAX_RATE = 0.1;

// Stock Levels
export const STOCK_LEVELS = {
  critical: 5,
  low: 20,
};

// Transaction Status
export const TRANSACTION_STATUS = {
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
  pending: 'Pending',
} as const;

// User Roles
export const USER_ROLES = {
  admin: 'Admin',
  manager: 'Manajer',
  cashier: 'Kasir',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  products: {
    list: '/products',
    detail: '/products/:id',
    search: '/products/search',
  },
  transactions: {
    create: '/transactions',
    list: '/transactions',
    detail: '/transactions/:id',
    receipt: '/transactions/:id/receipt',
  },
  reports: {
    daily: '/reports/daily',
    branch: '/reports/branch',
  },
} as const;
