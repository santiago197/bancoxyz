# 1. Flujo del usuario
## Flujo principal:

- Usuario entra a /login
- Ingresa email y password
- Llamas a API /login
- Guardas token en store global con Zustand
- Rediriges a /dashboard

* Dentro del sistema:

/dashboard
Consulta saldo
Muestra componente de saldo
/transfer
Formulario de transferencia
Puede programar fecha futura
/transfers
Lista de transferencias
Filtros activos
Logout
Limpia store
Redirige a login

# 2. Arquitectura base

Stack obligatorio:

React con Create React App
Routing con React Router
Estado global con Zustand
Data fetching con TanStack Query
Tests con Jest y React Testing Library
Axios

### Estructura 
src/
 ├── api/
 ├── components/
 ├── pages/
 ├── pages/hooks/usePage.ts
 ├── pages/Page.tsx
 ├── pages/componentes/page.tsx
 ├── routes/
 ├── store/
 ├── hooks/
 ├── utils/
 ├── tests/

# 3. Páginas
LoginPage
Formulario email y password
Manejo de error 401
Redirección
DashboardPage
Saldo
Nombre usuario
TransferPage
Formulario:
monto
moneda
documento destinatario
fecha
TransfersListPage
Tabla
Filtros:
nombre
monto
fecha

# 4. Componentes

Reutilizar componentes

AuthGuard
Input
Button
Loader
ErrorMessage
BalanceCard
TransferForm
TransferList
FiltersBar

# 5. Rutas protegidas

Usa React Router:

/login pública
/dashboard, /transfer, /transfers protegidas

AuthGuard:

Si no hay token en Zustand → redirect a login

# 6. Manejo de estado

Con Zustand:

Store mínimo:

authStore:
- user
- token
- login()
- logout()

uiStore:
- loading global opcional

# 7. Manejo de API

Centraliza todo en /api

Endpoints

Auth:

POST /login

Balance:

GET /balance

Transfer:

POST /transfer

Transfer list:

GET /transferList

- Aplica el patron de diseño Singleton. 
- Aplica el SRP
- Aplica DYR
# 8. TanStack Query


Queries:

useBalanceQuery
useTransfersQuery

Mutations:

useLoginMutation
useTransferMutation

Config clave:

cacheTime
staleTime
retry false para login

# 9. Base de datos SQLite local

Usa SQLite para:

Cache local de transferencias
Historial offline

Tabla:

users:
- id
- email
- password_hash

transfers:
- id
- amount
- date
- beneficiary_name
- beneficiary_document

# 10. Seguridad con bcrypt

Usa bcrypt

Casos:

Si haces mock backend local
Guardas usuarios en SQLite

Flujo:

password → hash
login → comparar hash

Nunca guardes password plano.

# 11. Validaciones

Necesarias para evitar errores:

Login:

email válido
password requerido

Transfer:

monto > 0
fecha válida
documento requerido

# 12. Tests unitarios

Cubre lo importante. 

Casos clave:

Login:

render form
submit correcto
error 401

Balance:

render data

Transfer:

validación form
envío mutation

Lista:

render lista
filtros

# 13. Checklist de desarrollo incremental

Sigue este orden. No lo cambies.

Setup
proyecto creado
dependencias instaladas
estructura base
Routing
rutas configuradas
AuthGuard funcional
Estado
Zustand listo
login/logout funcional
Login
UI lista
integración API
manejo de errores
Dashboard
query de saldo
render correcto
Transferencias
formulario
mutation funcionando
validaciones
Listado
query lista
tabla render
filtros funcionando
SQLite
DB creada
persistencia básica
Seguridad
bcrypt implementado en mock/local
Tests
setup Jest
tests login
tests transfer
tests lista

# 1. Base de endpoints
## Autenticación

Endpoint:
POST https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login
Request:
{
  "email": "string",
  "password": "string"
}
Response:
{
  "token": "string",
  "user": {
    "id": number,
    "name": "string",
    "email": "string"
  }
}

Uso en app:

Guardar token en Zustand
Guardas user
## Obtener saldo

Endpoint:
GET https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance
Headers:
Authorization: Bearer fake-jwt-token
Response:
{
  "moneda": "string",
  "saldo": number
}
Uso:
Dashboard
Query con TanStack Query
## Transferencia

Endpoint:
POST https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer

Headers:

Authorization: Bearer fake-jwt-token

Body:

{
  "valor": number,
  "moneda": "string",
  "documento_pagador": "string",
  "fecha_transferencia": "YYYY-MM-DD"
}

Response:

{
  "estado": "éxito" | "error"
}

Uso:

Formulario de transferencia
Mutation

## Listado de transferencias

Endpoint:

GET https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList

Headers:

Authorization: Bearer fake-jwt-token

Response:

[
  {
    "valor": number,
    "fecha": "YYYY-MM-DD",
    "moneda": "string",
    "beneficiario": {
      "documento": "string",
      "nombre": "string"
    }
  }
]

Uso:

## Tabla de transferencias
Filtros en frontend
2. Capa de API en código

No llames fetch directo desde componentes. Centraliza.

Estructura:

src/api/
  auth.api.js
  balance.api.js
  transfer.api.js

> Define un solo archivo de configuración base de consulta al api. 