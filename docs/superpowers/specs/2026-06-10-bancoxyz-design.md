# BancoXYZ — Design Spec
**Fecha:** 2026-06-10  
**Estado:** Aprobado para implementación

---

## 1. Identidad Visual

### Paleta de colores (Banco — Mobile First)

| Token                  | Hex       | Uso                                              |
|------------------------|-----------|--------------------------------------------------|
| `--color-primary`      | `#0A2463` | Azul marino — color principal, navbars, botones  |
| `--color-primary-dark` | `#071A4A` | Hover/active de elementos primarios              |
| `--color-accent`       | `#1E88E5` | Azul eléctrico — CTAs secundarios, links         |
| `--color-success`      | `#2E7D32` | Confirmaciones, transferencias exitosas          |
| `--color-error`        | `#C62828` | Errores, validaciones, 401                       |
| `--color-warning`      | `#F57F17` | Alertas, fechas futuras programadas              |
| `--color-surface`      | `#F5F7FA` | Fondo principal de la app                        |
| `--color-surface-card` | `#FFFFFF` | Cards, formularios, modales                      |
| `--color-border`       | `#DDE3ED` | Bordes de inputs y separadores                   |
| `--color-text-primary` | `#0D1B2A` | Texto principal                                  |
| `--color-text-muted`   | `#6B7A8D` | Labels, placeholders, texto secundario           |
| `--color-text-inverse` | `#FFFFFF` | Texto sobre fondos oscuros                       |

### Tipografía

| Uso        | Fuente           | Peso       | Tamaño base |
|------------|------------------|------------|-------------|
| Headlines  | IBM Plex Sans    | 600–700    | 24px        |
| Body       | Inter            | 400–500    | 16px        |
| Labels     | Inter            | 500        | 14px        |
| Monoespaciado (saldos) | IBM Plex Mono | 600 | 20px  |

### Bordes y espaciado

- **Radius:** `8px` (inputs, cards), `12px` (modales), `4px` (badges)
- **Spacing scale:** `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px`
- **Sombra card:** `0 2px 8px rgba(10,36,99,0.08)`

---

## 2. Arquitectura de la aplicación

### Stack

| Capa           | Tecnología                        |
|----------------|-----------------------------------|
| UI             | React 19 (Create React App)       |
| Routing        | React Router v6                   |
| Estado global  | Zustand                           |
| Data fetching  | TanStack Query v5                 |
| HTTP           | Axios (cliente Singleton)         |
| Validaciones   | Validación manual + helpers       |
| Tests          | Jest + React Testing Library      |
| Persistencia   | SQLite (cache offline)            |
| Seguridad      | bcrypt (mock backend)             |

### Estructura de directorios

```
src/
├── api/
│   ├── axiosClient.js          # Singleton Axios con interceptores
│   ├── auth.api.js             # POST /login
│   ├── balance.api.js          # GET /balance
│   ├── transfer.api.js         # POST /transfer
│   └── transferList.api.js     # GET /transferList
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.test.jsx
│   │   ├── Input/
│   │   │   ├── Input.jsx
│   │   │   └── Input.test.jsx
│   │   ├── Loader/
│   │   │   └── Loader.jsx
│   │   └── ErrorMessage/
│   │       └── ErrorMessage.jsx
│   ├── auth/
│   │   └── AuthGuard.jsx       # HOC de protección de rutas
│   ├── balance/
│   │   └── BalanceCard.jsx     # Muestra saldo + moneda
│   ├── transfer/
│   │   └── TransferForm.jsx    # Formulario de transferencia
│   └── transfers/
│       ├── TransferList.jsx    # Tabla de transferencias
│       └── FiltersBar.jsx      # Filtros: nombre, monto, fecha
├── hooks/
│   ├── useBalanceQuery.js
│   ├── useTransfersQuery.js
│   ├── useLoginMutation.js
│   └── useTransferMutation.js
├── pages/
│   ├── LoginPage/
│   │   ├── LoginPage.jsx
│   │   ├── hooks/
│   │   │   └── useLoginPage.js
│   │   └── components/
│   │       └── LoginForm.jsx
│   ├── DashboardPage/
│   │   ├── DashboardPage.jsx
│   │   └── hooks/
│   │       └── useDashboardPage.js
│   ├── TransferPage/
│   │   ├── TransferPage.jsx
│   │   └── hooks/
│   │       └── useTransferPage.js
│   └── TransfersListPage/
│       ├── TransfersListPage.jsx
│       └── hooks/
│           └── useTransfersListPage.js
├── routes/
│   └── AppRouter.jsx           # Definición de rutas + AuthGuard
├── store/
│   ├── authStore.js            # Zustand: user, token, login(), logout()
│   └── uiStore.js              # Zustand: loading global opcional
├── utils/
│   ├── validators.js           # Validaciones puras (email, monto, fecha)
│   └── formatters.js           # Formato de moneda, fecha
└── tests/
    └── setup.js
```

---

## 3. Diseño de pantallas (Mobile First — 375px base)

### 3.1 LoginPage `/login`

**Layout:** Centrado vertical, card flotante sobre fondo `--color-primary`

```
┌────────────────────────────────┐
│  [Logo BancoXYZ — blanco]      │  Header azul marino full-width
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │  Bienvenido              │  │  Card blanca, shadow
│  │  Ingresa a tu cuenta     │  │
│  │                          │  │
│  │  [Input: Email]          │  │
│  │  [Input: Contraseña 👁]  │  │
│  │                          │  │
│  │  [ErrorMessage — 401]    │  │  Aparece solo si hay error
│  │                          │  │
│  │  [Button: Ingresar]      │  │  Primario full-width
│  │                          │  │
│  │  [Loader]                │  │  Aparece en submit
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘
```

**Validaciones:** email formato válido, password no vacío  
**Error 401:** ErrorMessage "Credenciales incorrectas"  
**Éxito:** guarda `token` + `user` en Zustand → redirect `/dashboard`

---

### 3.2 DashboardPage `/dashboard`

**Layout:** Header fijo con nombre usuario + logout, luego BalanceCard

```
┌────────────────────────────────┐
│  BancoXYZ    [Hola, {nombre}]  │  NavBar primary
│                    [Salir →]   │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │  Tu saldo disponible     │  │  BalanceCard — gradiente azul
│  │  ──────────────────────  │  │
│  │  $ 4.250.000  COP        │  │  Monoespaciado, blanco
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  [→ Realizar transferencia]│ │  Botón acción rápida
│  │  [≡ Ver transferencias]  │  │
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘
```

**Data:** `useBalanceQuery` — `staleTime: 30s`, `cacheTime: 5min`  
**Estado:** Loader mientras carga, ErrorMessage si falla

---

### 3.3 TransferPage `/transfer`

**Layout:** Formulario en card, campos apilados (mobile-first)

```
┌────────────────────────────────┐
│  ← Dashboard    Transferencia  │  NavBar secundaria
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │  Nueva transferencia     │  │
│  │                          │  │
│  │  [Input: Monto]          │  │  Numérico, > 0
│  │  [Select: Moneda]        │  │  COP / USD / EUR
│  │  [Input: Doc. destinatario]│ │  Requerido
│  │  [Input: Fecha]          │  │  Date picker, hoy o futuro
│  │                          │  │
│  │  [ErrorMessage]          │  │  Validaciones inline
│  │                          │  │
│  │  [Button: Transferir]    │  │  Primario full-width
│  │  [Loader]                │  │
│  └──────────────────────────┘  │
│                                │
│  ── Transferencia programada ─ │  Sección visible si fecha > hoy
│  Fecha: 2026-06-20             │  Badge --color-warning
│                                │
└────────────────────────────────┘
```

**Validaciones:** monto > 0, fecha >= hoy, documento no vacío  
**Mutation:** `useTransferMutation` — onSuccess muestra confirmación → redirect `/transfers`

---

### 3.4 TransfersListPage `/transfers`

**Layout:** FiltersBar colapsable + tabla scrollable horizontal en mobile

```
┌────────────────────────────────┐
│  ← Dashboard   Transferencias  │  NavBar
├────────────────────────────────┤
│                                │
│  ┌── Filtros ───────────────┐  │  FiltersBar
│  │  [Input: Nombre]         │  │
│  │  [Input: Monto mín/máx]  │  │
│  │  [Date: Desde] [Hasta]   │  │
│  │  [Button: Aplicar]       │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ Nombre | Monto | Fecha   │  │  TransferList — tabla
│  │ ───────────────────────  │  │
│  │ Ana G. | $500K | 2026-06 │  │
│  │ Luis P.| $120K | 2026-05 │  │
│  │ ...                      │  │
│  └──────────────────────────┘  │
│                                │
│  [Loader] / [Sin resultados]   │
└────────────────────────────────┘
```

**Data:** `useTransfersQuery` — `staleTime: 60s`  
**Filtros:** aplicados en frontend sobre el array response  
**Campos mostrados:** beneficiario.nombre, valor, moneda, fecha

---

## 4. Componentes reutilizables (SRP + DRY)

### 4.1 `Button`
- Props: `variant` (primary | secondary | ghost), `size` (sm | md | lg), `loading`, `disabled`, `onClick`, `type`
- Estados: default, hover, active, loading (spinner inline), disabled
- Full-width con `block` prop

### 4.2 `Input`
- Props: `label`, `type`, `value`, `onChange`, `error`, `placeholder`, `required`
- Muestra `ErrorMessage` inline si `error` presente
- Soporte `type="password"` con toggle de visibilidad

### 4.3 `Loader`
- Props: `size` (sm | md | lg), `fullScreen`
- Spinner circular con `--color-primary`
- `fullScreen` superpone overlay sobre toda la vista

### 4.4 `ErrorMessage`
- Props: `message`, `visible`
- Barra roja con ícono de error, animación fade-in

### 4.5 `AuthGuard`
- Lee `token` de `authStore`
- Si no hay token → `<Navigate to="/login" />`
- Envuelve rutas protegidas en `AppRouter`

### 4.6 `BalanceCard`
- Props: `saldo`, `moneda`, `loading`
- Gradiente azul `--color-primary` → `--color-accent`
- Saldo en `IBM Plex Mono`, formato local

### 4.7 `TransferForm`
- Props: `onSubmit`, `loading`
- Gestión de estado local del formulario
- Valida con `utils/validators.js` antes de submit

### 4.8 `TransferList`
- Props: `transfers`, `loading`
- Tabla responsiva (en mobile: card por fila)
- Columnas: Nombre, Documento, Monto, Moneda, Fecha

### 4.9 `FiltersBar`
- Props: `onFilter`
- Estado local de filtros
- Aplica filtros en memoria sobre el array

---

## 5. Capa de API (Singleton + SRP)

### `axiosClient.js` — Singleton
```
baseURL no requerida (cada api usa URL absoluta)
Interceptor request: agrega Authorization: Bearer {token}
Interceptor response: captura 401 → llama authStore.logout()
```

### Archivos API (un archivo por recurso):
- `auth.api.js` → `login(email, password)`
- `balance.api.js` → `getBalance()`
- `transfer.api.js` → `postTransfer(payload)`
- `transferList.api.js` → `getTransferList()`

---

## 6. Estado global — Zustand

### `authStore`
```js
{
  user: null | { id, name, email },
  token: null | string,
  login(user, token),    // setea user y token
  logout()               // limpia user, token → redirect login
}
```

### `uiStore`
```js
{
  isLoading: false,
  setLoading(bool)
}
```

---

## 7. TanStack Query — Configuración

| Hook                  | Tipo     | staleTime | cacheTime | retry |
|-----------------------|----------|-----------|-----------|-------|
| `useBalanceQuery`     | Query    | 30s       | 5min      | 2     |
| `useTransfersQuery`   | Query    | 60s       | 5min      | 2     |
| `useLoginMutation`    | Mutation | —         | —         | false |
| `useTransferMutation` | Mutation | —         | —         | false |

---

## 8. Validaciones (`utils/validators.js`)

```
validateEmail(email)     → { valid: bool, error: string }
validatePassword(pass)   → { valid: bool, error: string }
validateAmount(amount)   → { valid: bool, error: string }  // > 0
validateDate(date)       → { valid: bool, error: string }  // >= hoy
validateDocument(doc)    → { valid: bool, error: string }  // no vacío
```

---

## 9. SQLite — Cache local

**Tablas:**

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE transfers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL,
  currency TEXT NOT NULL,
  date TEXT NOT NULL,
  beneficiary_name TEXT,
  beneficiary_document TEXT NOT NULL
);
```

**Uso:** cache de transferencias para historial offline. La app escribe en SQLite tras cada `POST /transfer` exitoso y lee de ella cuando el query falla por red.

---

## 10. Seguridad

- Contraseñas hasheadas con `bcrypt` (saltRounds: 10) en mock backend local
- Nunca se almacena password en texto plano
- Token JWT guardado solo en memoria Zustand (no localStorage)
- Interceptor Axios limpia sesión ante 401

---

## 11. Tests unitarios

| Módulo          | Caso                                            |
|-----------------|-------------------------------------------------|
| LoginPage       | render form, submit correcto, error 401         |
| BalanceCard     | render con data, render en loading              |
| TransferForm    | validación monto 0, validación fecha pasada, submit |
| TransfersListPage | render lista, filtro por nombre, filtro por fecha |
| AuthGuard       | redirige si no hay token                        |
| validators.js   | todos los casos límite                          |

---

## 12. Rutas

```
/login              → LoginPage (pública)
/dashboard          → DashboardPage (protegida por AuthGuard)
/transfer           → TransferPage (protegida)
/transfers          → TransfersListPage (protegida)
*                   → redirect /login
```

---

## 13. Checklist de implementación (orden estricto)

1. [ ] Instalar dependencias: `react-router-dom`, `zustand`, `axios`, `better-sqlite3`, `bcryptjs`
2. [ ] Crear estructura de directorios
3. [ ] Implementar `axiosClient.js` (Singleton)
4. [ ] Implementar `authStore` y `uiStore`
5. [ ] Implementar `AppRouter` con `AuthGuard`
6. [ ] Implementar componentes UI base: `Button`, `Input`, `Loader`, `ErrorMessage`
7. [ ] Implementar `LoginPage` + `useLoginMutation`
8. [ ] Implementar `DashboardPage` + `BalanceCard` + `useBalanceQuery`
9. [ ] Implementar `TransferPage` + `TransferForm` + `useTransferMutation`
10. [ ] Implementar `TransfersListPage` + `TransferList` + `FiltersBar` + `useTransfersQuery`
11. [ ] Implementar SQLite (cache de transferencias)
12. [ ] Implementar bcrypt (mock backend)
13. [ ] Escribir tests unitarios
14. [ ] Validar responsividad en 375px, 768px, 1024px
