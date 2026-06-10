# Prompts para Stitch — BancoXYZ

Pega cada prompt en https://stitch.google.com → "Generate screen from text"
Selecciona siempre **Mobile** como device type.

---

## Pantalla 1 — Login

```
Design a mobile banking app login screen for "BancoXYZ".

Color palette:
- Background: deep navy blue #0A2463
- Card background: white #FFFFFF
- Primary button: #0A2463
- Input borders: #DDE3ED
- Error text: #C62828
- Muted text: #6B7A8D

Layout (mobile, 375px):
- Full screen with navy blue background
- White rounded card (top-left and top-right radius 12px) taking ~75% of screen height, bottom-anchored
- Inside the card:
  - Title "Bienvenido" in IBM Plex Sans Bold 24px dark text
  - Subtitle "Ingresa a tu cuenta" in muted gray 15px
  - Email input field with label "Email", placeholder "usuario@banco.com"
  - Password input field with label "Contraseña", placeholder "••••••••", with show/hide eye icon
  - Full-width primary button "Ingresar" in navy blue
- Header area (above card) shows "BancoXYZ" logo in white, centered
- Clean, professional, minimal. No decorative elements.
```

---

## Pantalla 2 — Dashboard

```
Design a mobile banking dashboard screen for "BancoXYZ".

Color palette:
- Navigation bar: #0A2463 (navy)
- Background: #F5F7FA (light gray)
- Balance card: gradient from #0A2463 to #1E88E5
- White cards: #FFFFFF
- Text: #0D1B2A

Layout (mobile, 375px):
- Top navigation bar in navy blue with "BancoXYZ" text left-aligned (white, bold), "Hola, Juan" and "Salir" button right-aligned (small, bordered in white)
- Balance card below nav (full width, rounded 12px):
  - Gradient blue background (navy to electric blue)
  - Label "Tu saldo disponible" small text, white, 85% opacity
  - Large amount "$ 4.250.000" in white IBM Plex Mono font, 32px bold
  - "COP" badge (semi-transparent white pill) below amount
- Two action buttons below the card (white background, rounded 8px, shadow):
  - "Realizar transferencia" — primary full-width button in navy
  - "Ver transferencias" — secondary outline button in navy
- Clean banking aesthetic, trustworthy, professional.
```

---

## Pantalla 3 — Nueva Transferencia

```
Design a mobile banking transfer screen for "BancoXYZ".

Color palette:
- Navigation: #0A2463 navy
- Background: #F5F7FA
- Card: #FFFFFF
- Primary button: #0A2463
- Warning banner: #FFF8E1 background, #F57F17 text/border
- Input border: #DDE3ED

Layout (mobile, 375px):
- Top nav bar in navy: back arrow ← on left, "Nueva transferencia" title centered
- White card (rounded 12px, shadow) containing form:
  - Input "Monto" — numeric field
  - Dropdown "Moneda" — options COP/USD/EUR
  - Input "Documento del destinatario" — text field
  - Input "Fecha de transferencia" — date picker
  - Yellow warning banner (if date is future): "⏰ Transferencia programada para el 2026-06-20"
  - Full-width primary button "Transferir" in navy blue
- Professional banking form, clear hierarchy, mobile-optimized spacing.
```

---

## Pantalla 4 — Historial de Transferencias

```
Design a mobile banking transfers history screen for "BancoXYZ".

Color palette:
- Navigation: #0A2463 navy
- Background: #F5F7FA
- Cards: #FFFFFF
- Date headers: #F5F7FA with muted text #6B7A8D
- Amount text (debit): #C62828 red
- Border separators: #DDE3ED

Layout (mobile, 375px):
- Top nav: back arrow ← on left, "Transferencias" centered, white text on navy
- Filters card (white, rounded 12px, shadow):
  - Text input placeholder "Filtrar por nombre"
  - Two small inputs side by side: "Monto mín" | "Monto máx"
  - Two date inputs side by side: "Desde" | "Hasta"
- Transfers list card below (white, rounded 12px, shadow):
  - Header "Movimientos" bold
  - Grouped by date: date label in light gray row ("1 DE JUNIO" uppercase small)
  - Each transfer row:
    - Left: beneficiary name bold + document number small muted
    - Right: amount in red IBM Plex Mono "-$ 500.000" + "COP" small muted
  - Separator lines between rows
- Clean, app-like feel similar to Nequi or Nubank.
```
