// Email Validation
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password Validation
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Phone Number Validation (Indonesia)
export const isValidPhone = (phone: string): boolean => {
  const regex = /^(\+62|62|0)[0-9]{9,12}$/;
  return regex.test(phone.replace(/\D/g, ''));
};

// Amount Validation
export const isValidAmount = (amount: string): boolean => {
  const num = parseInt(amount, 10);
  return !isNaN(num) && num > 0;
};

// Login Validation
export const validateLogin = (email: string, password: string): { valid: boolean; error?: string } => {
  if (!email.trim()) {
    return { valid: false, error: 'Email tidak boleh kosong' };
  }
  if (!isValidEmail(email)) {
    return { valid: false, error: 'Format email tidak valid' };
  }
  if (!password) {
    return { valid: false, error: 'Password tidak boleh kosong' };
  }
  if (!isValidPassword(password)) {
    return { valid: false, error: 'Password minimal 6 karakter' };
  }
  return { valid: true };
};
