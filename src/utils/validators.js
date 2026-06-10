export function validateEmail(email) {
  if (!email) return { valid: false, error: 'El email es requerido' };
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return { valid: false, error: 'Ingresa un email válido' };
  return { valid: true, error: null };
}

export function validatePassword(password) {
  if (!password) return { valid: false, error: 'La contraseña es requerida' };
  return { valid: true, error: null };
}

export function validateAmount(amount) {
  if (amount === '' || amount === null || amount === undefined)
    return { valid: false, error: 'El monto es requerido' };
  const num = Number(amount);
  if (isNaN(num) || num <= 0) return { valid: false, error: 'El monto debe ser mayor a 0' };
  return { valid: true, error: null };
}

export function validateDate(date) {
  if (!date) return { valid: false, error: 'La fecha es requerida' };
  const today = new Date().toISOString().split('T')[0];
  if (date < today) return { valid: false, error: 'La fecha no puede ser pasada' };
  return { valid: true, error: null };
}

export function validateDocument(doc) {
  if (!doc || !doc.trim()) return { valid: false, error: 'El documento es requerido' };
  return { valid: true, error: null };
}
