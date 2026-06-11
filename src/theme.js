import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2463',
      light: '#1565C0',
      dark: '#071A4A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1E88E5',
      contrastText: '#FFFFFF',
    },
    error: { main: '#C62828', light: '#EF5350' },
    warning: { main: '#F57F17', dark: '#E65100' },
    success: { main: '#2E7D32' },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0D1B2A',
      secondary: '#6B7A8D',
    },
    divider: '#DDE3ED',
  },
  typography: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    h1: { fontWeight: 700, fontSize: '28px' },
    h2: { fontWeight: 700, fontSize: '24px' },
    h3: { fontWeight: 600, fontSize: '20px' },
    h4: { fontWeight: 600, fontSize: '18px' },
    body1: { fontSize: '16px', fontWeight: 400 },
    body2: { fontSize: '14px', fontWeight: 400 },
    button: { fontWeight: 600, textTransform: 'none', fontSize: '16px' },
    caption: { fontSize: '13px', color: '#6B7A8D' },
  },
  shape: { borderRadius: 8 },
  shadows: [
    'none',
    '0 2px 8px rgba(10,36,99,0.08)',
    '0 4px 16px rgba(10,36,99,0.12)',
    ...Array(22).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '14px 24px',
          fontSize: '16px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          '&:hover': { backgroundColor: '#071A4A' },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', fullWidth: true },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            '& fieldset': { borderColor: '#DDE3ED' },
            '&:hover fieldset': { borderColor: '#0A2463' },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(10,36,99,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: '12px' },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderTop: '1px solid #DDE3ED',
          backgroundColor: '#FFFFFF',
          height: '64px',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#6B7A8D',
          '&.Mui-selected': { color: '#0A2463' },
          minWidth: '60px',
        },
        label: { fontSize: '12px', fontWeight: 500 },
      },
    },
  },
});

export default theme;
