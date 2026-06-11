# BancoXYZ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una app bancaria React con login, visualización de saldo, transferencias y listado de transferencias conectadas a APIs AWS Lambda reales.

**Architecture:** CRA con estructura por feature (page + hook + components). Cada página tiene su propio hook de negocio, los componentes son presentacionales puros. La capa API es un Singleton de Axios con interceptores de auth.

**Tech Stack:** React 19, React Router v6, Zustand, TanStack Query v5, Axios, Jest + RTL, better-sqlite3, bcryptjs

**Lenguaje:** JavaScript (JS/JSX). TypeScript no es requerido por el enunciado del test — la migración se descartó para evitar riesgo innecesario sobre código ya funcional con 35 tests en verde.

**UI Framework:** Material UI (MUI) v5 — **OBLIGATORIO usar componentes MUI en toda la UI:**
- Inputs → `TextField` de `@mui/material` (el componente `Input` wrappea TextField)
- Buttons → `Button` de `@mui/material` (el componente `Button` wrappea MuiButton)
- Loaders → `CircularProgress` (o el componente `Loader` existente que usa `role="status"`)
- Alertas/errores → `Alert` de `@mui/material`
- Layout → `Box`, `Stack`, `Paper`, `AppBar`, `Toolbar`, `Typography`, `Container`
- Estilos → prop `sx`, NO `style` con CSS vars inline
- Iconos → `react-icons/fi` (Feather Icons), **NUNCA emojis**
- Responsive → usar `Container maxWidth="sm"` para mobile-first; breakpoints MUI (`xs`, `sm`, `md`) para grids y layouts que deben verse bien en mobile Y escritorio

---

## Mapa de archivos

```
src/
├── api/
│   ├── axiosClient.js
│   ├── auth.api.js
│   ├── balance.api.js        # retorna { currency, accountBalance }
│   ├── transfer.api.js
│   └── transferList.api.js
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input/
│   │   ├── Loader.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── BottomTabBar/
│   ├── auth/
│   │   └── AuthGuard.jsx
│   ├── balance/
│   │   └── BalanceCard.jsx
│   ├── transfer/
│   │   └── TransferForm.jsx
│   ├── transfers/
│   │   ├── TransferList.jsx
│   │   └── FiltersBar.jsx
│   └── layout/
│       └── AppLayout.jsx
├── hooks/
│   ├── useLoginMutation.js
│   ├── useBalanceQuery.js
│   ├── useTransferMutation.js
│   └── useTransfersQuery.js
├── pages/
│   ├── LoginPage/
│   │   ├── LoginPage.jsx
│   │   ├── hooks/useLoginPage.js
│   │   └── components/LoginForm.jsx
│   ├── DashboardPage/
│   │   ├── DashboardPage.jsx
│   │   └── hooks/useDashboardPage.js
│   ├── TransferPage/
│   │   ├── TransferPage.jsx
│   │   └── hooks/useTransferPage.js
│   └── TransfersListPage/
│       ├── TransfersListPage.jsx
│       └── hooks/useTransfersListPage.js
├── routes/
│   └── AppRouter.jsx
├── store/
│   ├── authStore.js
│   └── uiStore.js
├── utils/
│   ├── validators.js
│   ├── formatters.js
│   └── localTransfers.js     # persistencia localStorage de transferencias
└── styles/
    └── tokens.css
```

---

## ~~Task 1: Instalar dependencias y estructura base~~ ✅ COMPLETADO

**Files:**
- Modify: `package.json`
- Create: `tsconfig.json`
- Create: `src/styles/tokens.css`
- Modify: `src/index.css`

- [ ] **Step 1: Instalar dependencias**

```bash
cd C:/Users/santi/Desktop/DESARROLLOS/bancoxyz
npm install react-router-dom zustand axios bcryptjs
npm install better-sqlite3
npm install --save-dev typescript @types/react @types/react-dom @types/node @types/bcryptjs
```

Verifica con:
```bash
npm list react-router-dom zustand axios bcryptjs better-sqlite3 typescript --depth=0
```
Esperado: las 6 dependencias listadas sin errores.

- [ ] **Step 1b: Crear `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

- [ ] **Step 1c: Crear `src/types/index.ts`** con las interfaces compartidas

```ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface BalanceResponse {
  currency: string;
  accountBalance: number;
}

export interface TransferBeneficiary {
  nombre: string;
  documento: string;
}

export interface Transfer {
  valor: number;
  fecha: string;
  moneda: string;
  beneficiario: TransferBeneficiary;
}

export interface TransferPayload {
  valor: number;
  moneda: string;
  documento_pagador: string;
  fecha_transferencia: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ValidationResult {
  valid: boolean;
  error: string | null;
}
```

- [ ] **Step 2: Crear estructura de directorios**

```bash
mkdir -p src/api src/components/ui src/components/auth src/components/balance src/components/transfer src/components/transfers src/hooks src/store src/utils src/styles
mkdir -p src/pages/LoginPage/hooks src/pages/LoginPage/components
mkdir -p src/pages/DashboardPage/hooks
mkdir -p src/pages/TransferPage/hooks
mkdir -p src/pages/TransfersListPage/hooks
mkdir -p src/tests
```

- [ ] **Step 3: Crear tokens CSS en `src/styles/tokens.css`**

```css
:root {
  /* Colores */
  --color-primary: #0A2463;
  --color-primary-dark: #071A4A;
  --color-accent: #1E88E5;
  --color-success: #2E7D32;
  --color-error: #C62828;
  --color-warning: #F57F17;
  --color-surface: #F5F7FA;
  --color-surface-card: #FFFFFF;
  --color-border: #DDE3ED;
  --color-text-primary: #0D1B2A;
  --color-text-muted: #6B7A8D;
  --color-text-inverse: #FFFFFF;

  /* Tipografía */
  --font-headline: 'IBM Plex Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* Espaciado */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Bordes */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Sombras */
  --shadow-card: 0 2px 8px rgba(10, 36, 99, 0.08);
}
```

- [ ] **Step 4: Importar tokens y fuentes en `src/index.css`**

Reemplaza el contenido de `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@600&family=IBM+Plex+Sans:wght@400;600;700&family=Inter:wght@400;500&display=swap');
@import './styles/tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: setup dependencias, estructura de directorios y design tokens"
```

---

## ~~Task 2: Axios Singleton (`axiosClient.js`)~~ ✅ COMPLETADO

**Files:**
- Create: `src/api/axiosClient.js`
- Test: inline (verificación manual)

- [ ] **Step 1: Crear `src/api/axiosClient.js`**

```js
import axios from 'axios';

// Singleton: una sola instancia compartida por toda la app
const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: agrega el token a cada request
axiosClient.interceptors.request.use((config) => {
  // Importación dinámica para evitar dependencia circular con el store
  const { useAuthStore } = require('../store/authStore');
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: limpia sesión en 401
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { useAuthStore } = require('../store/authStore');
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
```

- [ ] **Step 2: Commit**

```bash
git add src/api/axiosClient.js
git commit -m "feat: implementar axiosClient Singleton con interceptores de auth"
```

---

## ~~Task 3: Zustand stores~~ ✅ COMPLETADO

**Files:**
- Create: `src/store/authStore.js`
- Create: `src/store/uiStore.js`
- Test: `src/tests/authStore.test.js`

- [ ] **Step 1: Escribir test fallido para authStore**

Crea `src/tests/authStore.test.js`:

```js
import { useAuthStore } from '../store/authStore';

beforeEach(() => {
  useAuthStore.setState({ user: null, token: null });
});

describe('authStore', () => {
  it('inicia con user y token null', () => {
    const { user, token } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
  });

  it('login() guarda user y token', () => {
    const mockUser = { id: 1, name: 'Ana', email: 'ana@test.com' };
    useAuthStore.getState().login(mockUser, 'jwt-token-123');
    const { user, token } = useAuthStore.getState();
    expect(user).toEqual(mockUser);
    expect(token).toBe('jwt-token-123');
  });

  it('logout() limpia user y token', () => {
    useAuthStore.setState({ user: { id: 1 }, token: 'abc' });
    useAuthStore.getState().logout();
    const { user, token } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
  });
});
```

- [ ] **Step 2: Ejecutar test — verificar que falla**

```bash
npm test -- --testPathPattern=authStore --watchAll=false
```
Esperado: `FAIL` con "Cannot find module '../store/authStore'"

- [ ] **Step 3: Crear `src/store/authStore.js`**

```js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: (user, token) => set({ user, token }),

  logout: () => set({ user: null, token: null }),
}));
```

- [ ] **Step 4: Crear `src/store/uiStore.js`**

```js
import { create } from 'zustand';

export const useUiStore = create((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));
```

- [ ] **Step 5: Ejecutar test — verificar que pasa**

```bash
npm test -- --testPathPattern=authStore --watchAll=false
```
Esperado: `PASS` con 3 tests ✓

- [ ] **Step 6: Commit**

```bash
git add src/store/ src/tests/authStore.test.js
git commit -m "feat: implementar authStore y uiStore con Zustand"
```

---

## ~~Task 4: Componentes UI base~~ ✅ COMPLETADO (con MUI)

**Files:**
- Create: `src/components/ui/Button.jsx`
- Create: `src/components/ui/Input.jsx`
- Create: `src/components/ui/Loader.jsx`
- Create: `src/components/ui/ErrorMessage.jsx`
- Test: `src/tests/Button.test.jsx`

- [ ] **Step 1: Escribir test fallido para Button**

Crea `src/tests/Button.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/ui/Button';

describe('Button', () => {
  it('renderiza el texto del botón', () => {
    render(<Button>Ingresar</Button>);
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
  });

  it('llama onClick al hacer click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('está deshabilitado cuando loading=true', () => {
    render(<Button loading>Cargando</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('no llama onClick cuando disabled=true', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>No click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Ejecutar test — verificar que falla**

```bash
npm test -- --testPathPattern=Button --watchAll=false
```
Esperado: `FAIL`

- [ ] **Step 3: Crear `src/components/ui/Button.jsx`**

```jsx
const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '14px 24px',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: '16px',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s, opacity 0.2s',
  },
  primary: {
    background: 'var(--color-primary)',
    color: 'var(--color-text-inverse)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-primary)',
    border: '1.5px solid var(--color-primary)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-accent)',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  block = true,
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      style={{
        ...styles.base,
        ...styles[variant],
        ...(isDisabled ? styles.disabled : {}),
        width: block ? '100%' : 'auto',
      }}
    >
      {loading ? '...' : children}
    </button>
  );
}
```

- [ ] **Step 4: Crear `src/components/ui/Input.jsx`**

```jsx
import { useState } from 'react';

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  fontSize: '16px',
  fontFamily: 'var(--font-body)',
  color: 'var(--color-text-primary)',
  background: 'var(--color-surface-card)',
  outline: 'none',
  transition: 'border-color 0.2s',
};

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div style={{ marginBottom: 'var(--space-4)', position: 'relative' }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: 'block',
            marginBottom: 'var(--space-2)',
            fontSize: '14px',
            fontWeight: 500,
            color: error ? 'var(--color-error)' : 'var(--color-text-muted)',
          }}
        >
          {label}
          {required && ' *'}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={{
            ...inputStyle,
            borderColor: error ? 'var(--color-error)' : 'var(--color-border)',
            paddingRight: isPassword ? '48px' : '16px',
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              fontSize: '14px',
            }}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? '🙈' : '👁'}
          </button>
        )}
      </div>
      {error && (
        <span
          style={{
            display: 'block',
            marginTop: 'var(--space-1)',
            fontSize: '13px',
            color: 'var(--color-error)',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Crear `src/components/ui/Loader.jsx`**

```jsx
export default function Loader({ fullScreen = false, size = 'md' }) {
  const sizes = { sm: 20, md: 36, lg: 56 };
  const px = sizes[size];

  const spinner = (
    <div
      role="status"
      aria-label="Cargando"
      style={{
        width: px,
        height: px,
        border: `${px / 8}px solid var(--color-border)`,
        borderTop: `${px / 8}px solid var(--color-primary)`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(255,255,255,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        {spinner}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      {spinner}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
```

- [ ] **Step 6: Crear `src/components/ui/ErrorMessage.jsx`**

```jsx
export default function ErrorMessage({ message, visible = true }) {
  if (!visible || !message) return null;

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-3) var(--space-4)',
        background: '#FFEBEE',
        border: '1px solid var(--color-error)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-error)',
        fontSize: '14px',
        marginBottom: 'var(--space-4)',
      }}
    >
      <span aria-hidden="true">⚠</span>
      {message}
    </div>
  );
}
```

- [ ] **Step 7: Ejecutar tests de Button**

```bash
npm test -- --testPathPattern=Button --watchAll=false
```
Esperado: `PASS` con 4 tests ✓

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/ src/tests/Button.test.jsx
git commit -m "feat: implementar componentes UI base: Button, Input, Loader, ErrorMessage"
```

---

## ~~Task 5: Utilidades — validators y formatters~~ ✅ COMPLETADO

**Files:**
- Create: `src/utils/validators.js`
- Create: `src/utils/formatters.js`
- Test: `src/tests/validators.test.js`

- [ ] **Step 1: Escribir tests para validators**

Crea `src/tests/validators.test.js`:

```js
import {
  validateEmail,
  validatePassword,
  validateAmount,
  validateDate,
  validateDocument,
} from '../utils/validators';

describe('validateEmail', () => {
  it('acepta email válido', () => {
    expect(validateEmail('user@test.com').valid).toBe(true);
  });
  it('rechaza email sin @', () => {
    const r = validateEmail('usertest.com');
    expect(r.valid).toBe(false);
    expect(r.error).toBeTruthy();
  });
  it('rechaza email vacío', () => {
    expect(validateEmail('').valid).toBe(false);
  });
});

describe('validatePassword', () => {
  it('acepta password no vacío', () => {
    expect(validatePassword('abc123').valid).toBe(true);
  });
  it('rechaza password vacío', () => {
    expect(validatePassword('').valid).toBe(false);
  });
});

describe('validateAmount', () => {
  it('acepta monto positivo', () => {
    expect(validateAmount(500).valid).toBe(true);
  });
  it('rechaza monto 0', () => {
    expect(validateAmount(0).valid).toBe(false);
  });
  it('rechaza monto negativo', () => {
    expect(validateAmount(-100).valid).toBe(false);
  });
});

describe('validateDate', () => {
  it('acepta fecha de hoy', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(validateDate(today).valid).toBe(true);
  });
  it('acepta fecha futura', () => {
    expect(validateDate('2099-12-31').valid).toBe(true);
  });
  it('rechaza fecha pasada', () => {
    expect(validateDate('2020-01-01').valid).toBe(false);
  });
  it('rechaza fecha vacía', () => {
    expect(validateDate('').valid).toBe(false);
  });
});

describe('validateDocument', () => {
  it('acepta documento no vacío', () => {
    expect(validateDocument('12345678').valid).toBe(true);
  });
  it('rechaza documento vacío', () => {
    expect(validateDocument('').valid).toBe(false);
  });
});
```

- [ ] **Step 2: Ejecutar test — verificar que falla**

```bash
npm test -- --testPathPattern=validators --watchAll=false
```
Esperado: `FAIL`

- [ ] **Step 3: Crear `src/utils/validators.js`**

```js
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
  const num = Number(amount);
  if (!amount && amount !== 0) return { valid: false, error: 'El monto es requerido' };
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
```

- [ ] **Step 4: Crear `src/utils/formatters.js`**

```js
export function formatCurrency(amount, currency = 'COP') {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
```

- [ ] **Step 5: Ejecutar tests de validators**

```bash
npm test -- --testPathPattern=validators --watchAll=false
```
Esperado: `PASS` con 10 tests ✓

- [ ] **Step 6: Commit**

```bash
git add src/utils/ src/tests/validators.test.js
git commit -m "feat: implementar validators y formatters con tests"
```

---

## ~~Task 6: Capa de API~~ ✅ COMPLETADO

**Files:**
- Create: `src/api/auth.api.js`
- Create: `src/api/balance.api.js`
- Create: `src/api/transfer.api.js`
- Create: `src/api/transferList.api.js`

- [ ] **Step 1: Crear `src/api/auth.api.js`**

```js
import axiosClient from './axiosClient';

const LOGIN_URL = 'https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login';

export async function login(email, password) {
  const { data } = await axiosClient.post(LOGIN_URL, { email, password });
  return data; // { token, user: { id, name, email } }
}
```

- [ ] **Step 2: Crear `src/api/balance.api.ts`**

```ts
import axiosClient from './axiosClient';
import type { BalanceResponse } from '../types';

const BALANCE_URL = process.env.REACT_APP_BALANCE_URL!;

export async function getBalance(): Promise<BalanceResponse> {
  const { data } = await axiosClient.get<BalanceResponse>(BALANCE_URL);
  return data; // { currency: string, accountBalance: number }
}
```

- [ ] **Step 3: Crear `src/api/transfer.api.js`**

```js
import axiosClient from './axiosClient';

const TRANSFER_URL = 'https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer';

export async function postTransfer({ valor, moneda, documento_pagador, fecha_transferencia }) {
  const { data } = await axiosClient.post(TRANSFER_URL, {
    valor,
    moneda,
    documento_pagador,
    fecha_transferencia,
  });
  return data; // { estado: 'éxito' | 'error' }
}
```

- [ ] **Step 4: Crear `src/api/transferList.api.js`**

```js
import axiosClient from './axiosClient';

const TRANSFER_LIST_URL = 'https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList';

export async function getTransferList() {
  const { data } = await axiosClient.get(TRANSFER_LIST_URL);
  return data; // [{ valor, fecha, moneda, beneficiario: { documento, nombre } }]
}
```

- [ ] **Step 5: Commit**

```bash
git add src/api/
git commit -m "feat: implementar capa de API con 4 endpoints (auth, balance, transfer, transferList)"
```

---

## ~~Task 7: TanStack Query hooks~~ ✅ COMPLETADO

**Files:**
- Create: `src/hooks/useLoginMutation.js`
- Create: `src/hooks/useBalanceQuery.js`
- Create: `src/hooks/useTransferMutation.js`
- Create: `src/hooks/useTransfersQuery.js`
- Modify: `src/App.js` (agregar QueryClientProvider)

- [ ] **Step 1: Configurar QueryClient en `src/App.js`**

Reemplaza el contenido de `src/App.js`:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './routes/AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}
```

- [ ] **Step 2: Crear `src/hooks/useLoginMutation.js`**

```js
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';

export function useLoginMutation() {
  const loginStore = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    retry: false,
    onSuccess: (data) => {
      loginStore(data.user, data.token);
    },
  });
}
```

- [ ] **Step 3: Crear `src/hooks/useBalanceQuery.js`**

```js
import { useQuery } from '@tanstack/react-query';
import { getBalance } from '../api/balance.api';
import { useAuthStore } from '../store/authStore';

export function useBalanceQuery() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['balance'],
    queryFn: getBalance,
    enabled: !!token,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
```

- [ ] **Step 4: Crear `src/hooks/useTransferMutation.js`**

```js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTransfer } from '../api/transfer.api';

export function useTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTransfer,
    retry: false,
    onSuccess: () => {
      // Invalida el cache de transferencias para forzar re-fetch
      queryClient.invalidateQueries({ queryKey: ['transfers'] });
    },
  });
}
```

- [ ] **Step 5: Crear `src/hooks/useTransfersQuery.js`**

```js
import { useQuery } from '@tanstack/react-query';
import { getTransferList } from '../api/transferList.api';
import { useAuthStore } from '../store/authStore';

export function useTransfersQuery() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['transfers'],
    queryFn: getTransferList,
    enabled: !!token,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}
```

- [ ] **Step 6: Commit**

```bash
git add src/hooks/ src/App.js
git commit -m "feat: implementar hooks de TanStack Query (login, balance, transfer, transferList)"
```

---

## ~~Task 8: AuthGuard y AppRouter~~ ✅ COMPLETADO

**Files:**
- Create: `src/components/auth/AuthGuard.jsx`
- Create: `src/routes/AppRouter.jsx`
- Test: `src/tests/AuthGuard.test.jsx`

- [ ] **Step 1: Escribir test fallido para AuthGuard**

Crea `src/tests/AuthGuard.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AuthGuard from '../components/auth/AuthGuard';

beforeEach(() => {
  useAuthStore.setState({ user: null, token: null });
});

describe('AuthGuard', () => {
  it('redirige a /login si no hay token', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <div>Dashboard</div>
              </AuthGuard>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('muestra el contenido si hay token', () => {
    useAuthStore.setState({ token: 'valid-token' });
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <div>Dashboard</div>
              </AuthGuard>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Ejecutar test — verificar que falla**

```bash
npm test -- --testPathPattern=AuthGuard --watchAll=false
```
Esperado: `FAIL`

- [ ] **Step 3: Crear `src/components/auth/AuthGuard.jsx`**

```jsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function AuthGuard({ children }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
```

- [ ] **Step 4: Crear `src/routes/AppRouter.jsx`**

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from '../components/auth/AuthGuard';
import LoginPage from '../pages/LoginPage/LoginPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import TransferPage from '../pages/TransferPage/TransferPage';
import TransfersListPage from '../pages/TransfersListPage/TransfersListPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={<AuthGuard><DashboardPage /></AuthGuard>}
        />
        <Route
          path="/transfer"
          element={<AuthGuard><TransferPage /></AuthGuard>}
        />
        <Route
          path="/transfers"
          element={<AuthGuard><TransfersListPage /></AuthGuard>}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

> **Nota:** AppRouter importa páginas que aún no existen. Créalas como stubs para que compile:

```bash
mkdir -p src/pages/LoginPage src/pages/DashboardPage src/pages/TransferPage src/pages/TransfersListPage
```

Crea un archivo stub en cada una:

`src/pages/LoginPage/LoginPage.jsx` — `src/pages/DashboardPage/DashboardPage.jsx` — `src/pages/TransferPage/TransferPage.jsx` — `src/pages/TransfersListPage/TransfersListPage.jsx`:

```jsx
// Stub temporal — se reemplaza en tareas siguientes
export default function LoginPage() { return <div>Login</div>; }
// (reemplaza "LoginPage" con el nombre correcto en cada archivo)
```

- [ ] **Step 5: Ejecutar test de AuthGuard**

```bash
npm test -- --testPathPattern=AuthGuard --watchAll=false
```
Esperado: `PASS` con 2 tests ✓

- [ ] **Step 6: Commit**

```bash
git add src/components/auth/ src/routes/ src/pages/ src/tests/AuthGuard.test.jsx
git commit -m "feat: implementar AuthGuard y AppRouter con rutas protegidas"
```

---

## ~~Task 9: LoginPage~~ ✅ COMPLETADO (con MUI)

**Files:**
- Create: `src/pages/LoginPage/hooks/useLoginPage.js`
- Create: `src/pages/LoginPage/components/LoginForm.jsx`
- Create: `src/pages/LoginPage/LoginPage.jsx`
- Test: `src/tests/LoginPage.test.jsx`

- [ ] **Step 1: Escribir tests para LoginPage**

Crea `src/tests/LoginPage.test.jsx`:

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from '../pages/LoginPage/LoginPage';

// Mock del hook de login
jest.mock('../hooks/useLoginMutation', () => ({
  useLoginMutation: jest.fn(),
}));

import { useLoginMutation } from '../hooks/useLoginMutation';

const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe('LoginPage', () => {
  it('renderiza campos de email y contraseña', () => {
    useLoginMutation.mockReturnValue({ mutate: jest.fn(), isPending: false, isError: false });
    render(<LoginPage />, { wrapper });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  });

  it('muestra error de validación si email es inválido', async () => {
    useLoginMutation.mockReturnValue({ mutate: jest.fn(), isPending: false, isError: false });
    render(<LoginPage />, { wrapper });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'notanemail' } });
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    await waitFor(() => {
      expect(screen.getByText(/email válido/i)).toBeInTheDocument();
    });
  });

  it('muestra error 401 cuando la mutación falla', () => {
    useLoginMutation.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: true,
      error: { response: { status: 401 } },
    });
    render(<LoginPage />, { wrapper });
    expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Ejecutar test — verificar que falla**

```bash
npm test -- --testPathPattern=LoginPage --watchAll=false
```
Esperado: `FAIL`

- [ ] **Step 3: Crear `src/pages/LoginPage/hooks/useLoginPage.js`**

```js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../hooks/useLoginMutation';
import { validateEmail, validatePassword } from '../../../utils/validators';

export function useLoginPage() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useLoginMutation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: null, password: null });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const emailResult = validateEmail(form.email);
    const passwordResult = validatePassword(form.password);

    if (!emailResult.valid || !passwordResult.valid) {
      setErrors({ email: emailResult.error, password: passwordResult.error });
      return;
    }

    mutate(
      { email: form.email, password: form.password },
      { onSuccess: () => navigate('/dashboard') }
    );
  }

  const is401 = isError && error?.response?.status === 401;

  return { form, errors, handleChange, handleSubmit, isPending, is401 };
}
```

- [ ] **Step 4: Crear `src/pages/LoginPage/components/LoginForm.jsx`**

```jsx
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import ErrorMessage from '../../../components/ui/ErrorMessage';

export default function LoginForm({ form, errors, onChange, onSubmit, loading, is401 }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <ErrorMessage
        message="Credenciales incorrectas. Verifica tu email y contraseña."
        visible={is401}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        error={errors.email}
        placeholder="usuario@banco.com"
        required
      />
      <Input
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        error={errors.password}
        placeholder="••••••••"
        required
      />
      <Button type="submit" loading={loading}>
        Ingresar
      </Button>
    </form>
  );
}
```

- [ ] **Step 5: Crear `src/pages/LoginPage/LoginPage.jsx`** (reemplaza el stub)

```jsx
import { useLoginPage } from './hooks/useLoginPage';
import LoginForm from './components/LoginForm';

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--color-primary)',
};

const headerStyle = {
  padding: 'var(--space-8) var(--space-6)',
  textAlign: 'center',
};

const logoStyle = {
  fontSize: '28px',
  fontFamily: 'var(--font-headline)',
  fontWeight: 700,
  color: 'var(--color-text-inverse)',
  letterSpacing: '-0.5px',
};

const cardStyle = {
  flex: 1,
  background: 'var(--color-surface-card)',
  borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
  padding: 'var(--space-8) var(--space-6)',
  maxWidth: '480px',
  width: '100%',
  margin: '0 auto',
  boxShadow: 'var(--shadow-card)',
};

const titleStyle = {
  fontSize: '24px',
  fontFamily: 'var(--font-headline)',
  fontWeight: 600,
  color: 'var(--color-text-primary)',
  marginBottom: 'var(--space-2)',
};

const subtitleStyle = {
  fontSize: '15px',
  color: 'var(--color-text-muted)',
  marginBottom: 'var(--space-8)',
};

export default function LoginPage() {
  const { form, errors, handleChange, handleSubmit, isPending, is401 } = useLoginPage();

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={logoStyle}>BancoXYZ</div>
      </header>
      <main style={cardStyle}>
        <h1 style={titleStyle}>Bienvenido</h1>
        <p style={subtitleStyle}>Ingresa a tu cuenta</p>
        <LoginForm
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={isPending}
          is401={is401}
        />
      </main>
    </div>
  );
}
```

- [ ] **Step 6: Ejecutar tests de LoginPage**

```bash
npm test -- --testPathPattern=LoginPage --watchAll=false
```
Esperado: `PASS` con 3 tests ✓

- [ ] **Step 7: Commit**

```bash
git add src/pages/LoginPage/ src/tests/LoginPage.test.jsx
git commit -m "feat: implementar LoginPage con validaciones y manejo de error 401"
```

---

## ~~Task 10: DashboardPage + BalanceCard~~ ✅ COMPLETADO

**Files:**
- Create: `src/components/balance/BalanceCard.jsx`
- Create: `src/pages/DashboardPage/hooks/useDashboardPage.js`
- Create: `src/pages/DashboardPage/DashboardPage.jsx`
- Test: `src/tests/BalanceCard.test.jsx`

- [ ] **Step 1: Escribir test para BalanceCard**

Crea `src/tests/BalanceCard.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import BalanceCard from '../components/balance/BalanceCard';

describe('BalanceCard', () => {
  it('renderiza saldo y moneda', () => {
    render(<BalanceCard saldo={4250000} moneda="COP" loading={false} />);
    expect(screen.getByText(/4.250.000/)).toBeInTheDocument();
    expect(screen.getByText(/COP/)).toBeInTheDocument();
  });

  it('muestra loader cuando loading=true', () => {
    render(<BalanceCard saldo={0} moneda="COP" loading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Ejecutar test — verificar que falla**

```bash
npm test -- --testPathPattern=BalanceCard --watchAll=false
```
Esperado: `FAIL`

- [ ] **Step 3: Crear `src/components/balance/BalanceCard.jsx`**

```jsx
import { Box, Typography, Chip } from '@mui/material';
import Loader from '../ui/Loader';
import { formatCurrency } from '../../utils/formatters';

export default function BalanceCard({ saldo, moneda, loading }) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0A2463 0%, #1E88E5 100%)',
        borderRadius: 3,
        p: 4,
        color: 'white',
        boxShadow: 2,
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="body2" sx={{ opacity: 0.85 }}>
        Tu saldo disponible
      </Typography>
      {loading ? (
        <Loader size="md" />
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{ fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '-1px' }}
          >
            {formatCurrency(saldo, moneda)}
          </Typography>
          <Chip
            label={moneda}
            size="small"
            sx={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              alignSelf: 'flex-start',
            }}
          />
        </>
      )}
    </Box>
  );
}
```

- [ ] **Step 4: Crear `src/pages/DashboardPage/hooks/useDashboardPage.js`**

```js
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useBalanceQuery } from '../../../hooks/useBalanceQuery';

export function useDashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore((s) => ({ user: s.user, logout: s.logout }));
  const { data, isLoading, isError } = useBalanceQuery();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return {
    user,
    saldo: data?.accountBalance ?? 0,   // API devuelve { currency, accountBalance }
    moneda: data?.currency ?? 'USD',
    isLoading,
    isError,
    handleLogout,
  };
}
```

- [ ] **Step 5: Crear `src/pages/DashboardPage/DashboardPage.jsx`** (reemplaza stub)

```jsx
import { Box, AppBar, Toolbar, Typography, Button as MuiButton, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDashboardPage } from './hooks/useDashboardPage';
import BalanceCard from '../../components/balance/BalanceCard';
import Button from '../../components/ui/Button';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, saldo, moneda, isLoading, isError, handleLogout } = useDashboardPage();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={700}>BancoXYZ</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user && (
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Hola, {user.name}
              </Typography>
            )}
            <MuiButton
              variant="outlined"
              size="small"
              onClick={handleLogout}
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
            >
              Salir
            </MuiButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, maxWidth: 480, mx: 'auto' }}>
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            No se pudo cargar el saldo. Intenta de nuevo.
          </Alert>
        )}
        <BalanceCard saldo={saldo} moneda={moneda} loading={isLoading} />
        <Stack spacing={1.5}>
          <Button onClick={() => navigate('/transfer')}>Realizar transferencia</Button>
          <Button variant="secondary" onClick={() => navigate('/transfers')}>
            Ver transferencias
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 6: Ejecutar tests de BalanceCard**

```bash
npm test -- --testPathPattern=BalanceCard --watchAll=false
```
Esperado: `PASS` con 2 tests ✓

- [ ] **Step 7: Commit**

```bash
git add src/components/balance/ src/pages/DashboardPage/ src/tests/BalanceCard.test.jsx
git commit -m "feat: implementar DashboardPage con BalanceCard y saldo en tiempo real"
```

---

## ~~Task 11: TransferPage + TransferForm~~ ✅ COMPLETADO

**Files:**
- Create: `src/components/transfer/TransferForm.jsx`
- Create: `src/pages/TransferPage/hooks/useTransferPage.js`
- Create: `src/pages/TransferPage/TransferPage.jsx`
- Test: `src/tests/TransferForm.test.jsx`

- [ ] **Step 1: Escribir tests para TransferForm**

Crea `src/tests/TransferForm.test.jsx`:

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TransferPage from '../pages/TransferPage/TransferPage';

jest.mock('../hooks/useTransferMutation', () => ({
  useTransferMutation: jest.fn(),
}));
import { useTransferMutation } from '../hooks/useTransferMutation';

const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe('TransferPage — validaciones del formulario', () => {
  beforeEach(() => {
    useTransferMutation.mockReturnValue({ mutate: jest.fn(), isPending: false, isError: false });
  });

  it('muestra error si monto es 0', async () => {
    render(<TransferPage />, { wrapper });
    fireEvent.change(screen.getByLabelText(/monto/i), { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: /transferir/i }));
    await waitFor(() => {
      expect(screen.getByText(/mayor a 0/i)).toBeInTheDocument();
    });
  });

  it('muestra error si documento está vacío', async () => {
    render(<TransferPage />, { wrapper });
    fireEvent.click(screen.getByRole('button', { name: /transferir/i }));
    await waitFor(() => {
      expect(screen.getByText(/documento es requerido/i)).toBeInTheDocument();
    });
  });

  it('llama mutate con datos correctos al submit válido', async () => {
    const mutateMock = jest.fn();
    useTransferMutation.mockReturnValue({ mutate: mutateMock, isPending: false, isError: false });
    render(<TransferPage />, { wrapper });

    const today = new Date().toISOString().split('T')[0];
    fireEvent.change(screen.getByLabelText(/monto/i), { target: { value: '500000' } });
    fireEvent.change(screen.getByLabelText(/documento/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: today } });
    fireEvent.click(screen.getByRole('button', { name: /transferir/i }));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          valor: 500000,
          documento_pagador: '12345678',
          fecha_transferencia: today,
        }),
        expect.any(Object)
      );
    });
  });
});
```

- [ ] **Step 2: Ejecutar test — verificar que falla**

```bash
npm test -- --testPathPattern=TransferForm --watchAll=false
```
Esperado: `FAIL`

- [ ] **Step 3: Crear `src/pages/TransferPage/hooks/useTransferPage.js`**

```js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransferMutation } from '../../../hooks/useTransferMutation';
import {
  validateAmount,
  validateDate,
  validateDocument,
} from '../../../utils/validators';

const today = () => new Date().toISOString().split('T')[0];

export function useTransferPage() {
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useTransferMutation();

  const [form, setForm] = useState({
    valor: '',
    moneda: 'COP',
    documento_pagador: '',
    fecha_transferencia: today(),
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const amountResult = validateAmount(Number(form.valor));
    const dateResult = validateDate(form.fecha_transferencia);
    const docResult = validateDocument(form.documento_pagador);

    if (!amountResult.valid || !dateResult.valid || !docResult.valid) {
      setErrors({
        valor: amountResult.error,
        fecha_transferencia: dateResult.error,
        documento_pagador: docResult.error,
      });
      return;
    }

    mutate(
      {
        valor: Number(form.valor),
        moneda: form.moneda,
        documento_pagador: form.documento_pagador,
        fecha_transferencia: form.fecha_transferencia,
      },
      { onSuccess: () => navigate('/transfers') }
    );
  }

  const isScheduled = form.fecha_transferencia > today();

  return { form, errors, handleChange, handleSubmit, isPending, isError, isScheduled };
}
```

- [ ] **Step 4: Crear `src/components/transfer/TransferForm.jsx`**

```jsx
import { Box, Alert, TextField, MenuItem } from '@mui/material';
import { FiClock } from 'react-icons/fi';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CURRENCIES = ['COP', 'USD', 'EUR'];

export default function TransferForm({ form, errors, onChange, onSubmit, loading, isError, isScheduled }) {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error al realizar la transferencia. Intenta de nuevo.
        </Alert>
      )}
      <Input
        label="Monto"
        name="valor"
        type="number"
        value={form.valor}
        onChange={onChange}
        error={errors.valor}
        placeholder="0"
        required
      />
      <TextField
        select
        fullWidth
        label="Moneda"
        name="moneda"
        value={form.moneda}
        onChange={onChange}
        sx={{ mb: 2 }}
      >
        {CURRENCIES.map((c) => (
          <MenuItem key={c} value={c}>{c}</MenuItem>
        ))}
      </TextField>
      <Input
        label="Documento del destinatario"
        name="documento_pagador"
        type="text"
        value={form.documento_pagador}
        onChange={onChange}
        error={errors.documento_pagador}
        placeholder="Número de documento"
        required
      />
      <Input
        label="Fecha de transferencia"
        name="fecha_transferencia"
        type="date"
        value={form.fecha_transferencia}
        onChange={onChange}
        error={errors.fecha_transferencia}
        required
      />
      {isScheduled && (
        <Alert severity="warning" icon={<FiClock />} sx={{ mb: 2 }}>
          Transferencia programada para el {form.fecha_transferencia}
        </Alert>
      )}
      <Button type="submit" loading={loading}>
        Transferir
      </Button>
    </Box>
  );
}
```

- [ ] **Step 5: Crear `src/pages/TransferPage/TransferPage.jsx`** (reemplaza stub)

```jsx
import { Box, AppBar, Toolbar, IconButton, Typography, Paper } from '@mui/material';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTransferPage } from './hooks/useTransferPage';
import TransferForm from '../../components/transfer/TransferForm';

export default function TransferPage() {
  const navigate = useNavigate();
  const { form, errors, handleChange, handleSubmit, isPending, isError, isScheduled } =
    useTransferPage();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/dashboard')} edge="start">
            <FiArrowLeft />
          </IconButton>
          <Typography variant="h6" fontWeight={600} sx={{ ml: 1 }}>
            Nueva transferencia
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, maxWidth: 480, mx: 'auto' }}>
        <Paper sx={{ p: 3 }}>
          <TransferForm
            form={form}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={isPending}
            isError={isError}
            isScheduled={isScheduled}
          />
        </Paper>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 6: Ejecutar tests de TransferPage**

```bash
npm test -- --testPathPattern=TransferForm --watchAll=false
```
Esperado: `PASS` con 3 tests ✓

- [ ] **Step 7: Commit**

```bash
git add src/components/transfer/ src/pages/TransferPage/ src/tests/TransferForm.test.jsx
git commit -m "feat: implementar TransferPage con validaciones y transferencias programadas"
```

---

## ~~Task 12: TransfersListPage + TransferList + FiltersBar~~ ✅ COMPLETADO

**Files:**
- Create: `src/components/transfers/TransferList.jsx`
- Create: `src/components/transfers/FiltersBar.jsx`
- Create: `src/pages/TransfersListPage/hooks/useTransfersListPage.js`
- Create: `src/pages/TransfersListPage/TransfersListPage.jsx`
- Test: `src/tests/TransfersList.test.jsx`

- [ ] **Step 1: Escribir tests para TransfersListPage**

Crea `src/tests/TransfersList.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TransfersListPage from '../pages/TransfersListPage/TransfersListPage';

jest.mock('../hooks/useTransfersQuery', () => ({
  useTransfersQuery: jest.fn(),
}));
import { useTransfersQuery } from '../hooks/useTransfersQuery';

const mockTransfers = [
  { valor: 500000, fecha: '2026-06-01', moneda: 'COP', beneficiario: { nombre: 'Luis Pérez', documento: '11111111' } },
  { valor: 120000, fecha: '2026-05-31', moneda: 'COP', beneficiario: { nombre: 'Maria García', documento: '22222222' } },
];

const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe('TransfersListPage', () => {
  beforeEach(() => {
    useTransfersQuery.mockReturnValue({ data: mockTransfers, isLoading: false, isError: false });
  });

  it('renderiza la lista de transferencias', () => {
    render(<TransfersListPage />, { wrapper });
    expect(screen.getByText('Luis Pérez')).toBeInTheDocument();
    expect(screen.getByText('Maria García')).toBeInTheDocument();
  });

  it('filtra por nombre del beneficiario', () => {
    render(<TransfersListPage />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: 'Luis' } });
    expect(screen.getByText('Luis Pérez')).toBeInTheDocument();
    expect(screen.queryByText('Maria García')).not.toBeInTheDocument();
  });

  it('muestra mensaje cuando no hay resultados', () => {
    render(<TransfersListPage />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: 'XYZ123' } });
    expect(screen.getByText(/sin resultados/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Ejecutar test — verificar que falla**

```bash
npm test -- --testPathPattern=TransfersList --watchAll=false
```
Esperado: `FAIL`

- [ ] **Step 3: Crear `src/components/transfers/FiltersBar.jsx`**

```jsx
import { useState } from 'react';
import { Paper, Stack, TextField, Grid } from '@mui/material';

export default function FiltersBar({ onFilter }) {
  const [filters, setFilters] = useState({ nombre: '', montoMin: '', montoMax: '', desde: '', hasta: '' });

  function handleChange(e) {
    const next = { ...filters, [e.target.name]: e.target.value };
    setFilters(next);
    onFilter(next);
  }

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack spacing={1.5}>
        <TextField
          name="nombre"
          placeholder="Filtrar por nombre"
          value={filters.nombre}
          onChange={handleChange}
          size="small"
          fullWidth
        />
        <Grid container spacing={1.5}>
          <Grid item xs={6}>
            <TextField name="montoMin" type="number" placeholder="Monto mín" value={filters.montoMin} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField name="montoMax" type="number" placeholder="Monto máx" value={filters.montoMax} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField name="desde" type="date" value={filters.desde} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} label="Desde" />
          </Grid>
          <Grid item xs={6}>
            <TextField name="hasta" type="date" value={filters.hasta} onChange={handleChange} size="small" fullWidth InputLabelProps={{ shrink: true }} label="Hasta" />
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}
```

- [ ] **Step 4: Crear `src/components/transfers/TransferList.jsx`**

```jsx
import { Box, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { formatCurrency, formatDate } from '../../utils/formatters';

function groupByDate(transfers) {
  return transfers.reduce((groups, t) => {
    const date = t.fecha;
    if (!groups[date]) groups[date] = [];
    groups[date].push(t);
    return groups;
  }, {});
}

export default function TransferList({ transfers, loading }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!transfers || transfers.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
        Sin resultados
      </Typography>
    );
  }

  const grouped = groupByDate(transfers);
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Typography variant="h6" fontWeight={600} sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
        Movimientos
      </Typography>
      {sortedDates.map((date) => (
        <Box key={date}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              px: 3,
              py: 1,
              fontWeight: 600,
              bgcolor: 'grey.50',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              color: 'text.secondary',
            }}
          >
            {formatDate(date)}
          </Typography>
          {grouped[date].map((t, i) => (
            <Box key={i}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
                <Box>
                  <Typography fontWeight={500}>{t.beneficiario.nombre}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Doc: {t.beneficiario.documento}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography fontWeight={600} color="error" sx={{ fontFamily: 'var(--font-mono)' }}>
                    -{formatCurrency(t.valor, t.moneda)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">{t.moneda}</Typography>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>
      ))}
    </Paper>
  );
}
```

- [ ] **Step 5: Crear `src/pages/TransfersListPage/hooks/useTransfersListPage.js`**

```js
import { useState } from 'react';
import { useTransfersQuery } from '../../../hooks/useTransfersQuery';

function applyFilters(transfers, filters) {
  return transfers.filter((t) => {
    if (filters.nombre && !t.beneficiario.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) return false;
    if (filters.montoMin && t.valor < Number(filters.montoMin)) return false;
    if (filters.montoMax && t.valor > Number(filters.montoMax)) return false;
    if (filters.desde && t.fecha < filters.desde) return false;
    if (filters.hasta && t.fecha > filters.hasta) return false;
    return true;
  });
}

export function useTransfersListPage() {
  const { data = [], isLoading, isError } = useTransfersQuery();
  const [filters, setFilters] = useState({});

  const filtered = applyFilters(data, filters);

  return { transfers: filtered, isLoading, isError, setFilters };
}
```

- [ ] **Step 6: Crear `src/pages/TransfersListPage/TransfersListPage.jsx`** (reemplaza stub)

```jsx
import { Box, AppBar, Toolbar, IconButton, Typography, Alert, Container } from '@mui/material';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTransfersListPage } from './hooks/useTransfersListPage';
import TransferList from '../../components/transfers/TransferList';
import FiltersBar from '../../components/transfers/FiltersBar';

export default function TransfersListPage() {
  const navigate = useNavigate();
  const { transfers, isLoading, isError, setFilters } = useTransfersListPage();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/dashboard')} edge="start">
            <FiArrowLeft />
          </IconButton>
          <Typography variant="h6" fontWeight={600} sx={{ ml: 1 }}>
            Transferencias
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ py: 3 }}>
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            No se pudo cargar el historial. Intenta de nuevo.
          </Alert>
        )}
        <FiltersBar onFilter={setFilters} />
        <TransferList transfers={transfers} loading={isLoading} />
      </Container>
    </Box>
  );
}
```

- [ ] **Step 7: Ejecutar tests de TransfersList**

```bash
npm test -- --testPathPattern=TransfersList --watchAll=false
```
Esperado: `PASS` con 3 tests ✓

- [ ] **Step 8: Commit**

```bash
git add src/components/transfers/ src/pages/TransfersListPage/ src/tests/TransfersList.test.jsx
git commit -m "feat: implementar TransfersListPage con agrupación por fecha y filtros en frontend"
```

---

## Task 13: SQLite — cache local de transferencias

**Files:**
- Create: `src/db/database.js`
- Create: `src/db/transfersRepository.js`

> **Nota:** `better-sqlite3` funciona en Node (backend/scripts). En CRA el bundle no incluye módulos nativos de Node. Usa SQLite **únicamente** en un script Node separado o en un service worker/Electron. Para este proyecto, se implementa como capa de persistencia en un servidor Express local de mock.

- [ ] **Step 1: Crear `src/db/database.js`**

```js
// Este módulo se usa en entorno Node (mock server o scripts), no en el browser
const Database = require('better-sqlite3');
const path = require('path');

let db;

function getDb() {
  if (!db) {
    db = new Database(path.join(__dirname, '../../bancoxyz.db'));
    db.pragma('journal_mode = WAL');
    initSchema(db);
  }
  return db;
}

function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS transfers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      currency TEXT NOT NULL,
      date TEXT NOT NULL,
      beneficiary_name TEXT,
      beneficiary_document TEXT NOT NULL
    );
  `);
}

module.exports = { getDb };
```

- [ ] **Step 2: Crear `src/db/transfersRepository.js`**

```js
const { getDb } = require('./database');

function saveTransfer({ amount, currency, date, beneficiary_name, beneficiary_document }) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO transfers (amount, currency, date, beneficiary_name, beneficiary_document)
    VALUES (@amount, @currency, @date, @beneficiary_name, @beneficiary_document)
  `);
  return stmt.run({ amount, currency, date, beneficiary_name, beneficiary_document });
}

function getAllTransfers() {
  const db = getDb();
  return db.prepare('SELECT * FROM transfers ORDER BY date DESC').all();
}

module.exports = { saveTransfer, getAllTransfers };
```

- [ ] **Step 3: Commit**

```bash
git add src/db/
git commit -m "feat: implementar capa SQLite para cache local de transferencias"
```

---

## Task 14: bcrypt — seguridad en mock backend

**Files:**
- Create: `src/db/usersRepository.js`

- [ ] **Step 1: Crear `src/db/usersRepository.js`**

```js
const bcrypt = require('bcryptjs');
const { getDb } = require('./database');

const SALT_ROUNDS = 10;

async function createUser(email, plainPassword) {
  const db = getDb();
  const password_hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  const stmt = db.prepare('INSERT INTO users (email, password_hash) VALUES (@email, @password_hash)');
  return stmt.run({ email, password_hash });
}

async function verifyUser(email, plainPassword) {
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return null;
  const match = await bcrypt.compare(plainPassword, user.password_hash);
  return match ? { id: user.id, email: user.email } : null;
}

module.exports = { createUser, verifyUser };
```

- [ ] **Step 2: Commit**

```bash
git add src/db/usersRepository.js
git commit -m "feat: implementar usersRepository con bcrypt para hash y verificación de contraseñas"
```

---

## Task 15: Ejecutar todos los tests y verificar

- [ ] **Step 1: Ejecutar suite completa**

```bash
npm test -- --watchAll=false
```
Esperado: todos los tests en `PASS`. Si alguno falla, revisar el error y corregir antes de continuar.

- [ ] **Step 2: Verificar que la app compila**

```bash
npm run build
```
Esperado: `Compiled successfully` sin warnings críticos.

- [ ] **Step 3: Ejecutar app en desarrollo**

```bash
npm start
```
Verifica manualmente:
- `/login` → muestra formulario
- Submit con email inválido → muestra error inline
- Login exitoso → redirige a `/dashboard`
- `/dashboard` → muestra BalanceCard con saldo real
- `/transfer` → formulario de transferencia funcional
- `/transfers` → lista con filtros

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "feat: BancoXYZ - app bancaria completa con login, saldo, transferencias y listado"
```

---

## Self-review de cobertura

| Requisito del spec | Tarea que lo implementa |
|----|-----|
| Login con email/password | Task 9 — LoginPage |
| Manejo error 401 | Task 9 — useLoginPage, ErrorMessage |
| Guardar token en Zustand | Task 3 — authStore |
| Redirect a /dashboard | Task 9 — useLoginPage onSuccess |
| BalanceCard con saldo | Task 10 — BalanceCard + useBalanceQuery |
| Formulario de transferencia | Task 11 — TransferForm |
| Transferencia programada | Task 11 — isScheduled badge |
| Listado de transferencias | Task 12 — TransferList agrupado por fecha |
| Filtros: nombre, monto, fecha | Task 12 — FiltersBar + applyFilters |
| AuthGuard rutas protegidas | Task 8 — AuthGuard |
| Singleton Axios + interceptores | Task 2 — axiosClient |
| Zustand stores | Task 3 — authStore, uiStore |
| TanStack Query config | Task 7 — hooks con staleTime/gcTime |
| SQLite cache | Task 13 — database.js + transfersRepository |
| bcrypt seguridad | Task 14 — usersRepository |
| Tests: login, balance, transfer, lista | Tasks 9, 10, 11, 12 |
| Validaciones: email, monto, fecha, doc | Task 5 — validators.js |
| Design tokens CSS | Task 1 — tokens.css |
| Mobile-first responsive | Todos los styles con maxWidth 480px |
