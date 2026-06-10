import {
  validateEmail, validatePassword, validateAmount, validateDate, validateDocument,
} from '../utils/validators';

describe('validateEmail', () => {
  it('acepta email válido', () => expect(validateEmail('user@test.com').valid).toBe(true));
  it('rechaza email sin @', () => {
    const r = validateEmail('usertest.com');
    expect(r.valid).toBe(false);
    expect(r.error).toBeTruthy();
  });
  it('rechaza email vacío', () => expect(validateEmail('').valid).toBe(false));
});

describe('validatePassword', () => {
  it('acepta password no vacío', () => expect(validatePassword('abc123').valid).toBe(true));
  it('rechaza password vacío', () => expect(validatePassword('').valid).toBe(false));
});

describe('validateAmount', () => {
  it('acepta monto positivo', () => expect(validateAmount(500).valid).toBe(true));
  it('rechaza monto 0', () => expect(validateAmount(0).valid).toBe(false));
  it('rechaza monto negativo', () => expect(validateAmount(-100).valid).toBe(false));
});

describe('validateDate', () => {
  it('acepta fecha de hoy', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(validateDate(today).valid).toBe(true);
  });
  it('acepta fecha futura', () => expect(validateDate('2099-12-31').valid).toBe(true));
  it('rechaza fecha pasada', () => expect(validateDate('2020-01-01').valid).toBe(false));
  it('rechaza fecha vacía', () => expect(validateDate('').valid).toBe(false));
});

describe('validateDocument', () => {
  it('acepta documento no vacío', () => expect(validateDocument('12345678').valid).toBe(true));
  it('rechaza documento vacío', () => expect(validateDocument('').valid).toBe(false));
});
