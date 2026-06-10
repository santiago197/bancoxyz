import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Stack,
  Alert,
} from '@mui/material';
import { FiLogOut, FiRepeat, FiList } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import BalanceCard from '../../components/balance/BalanceCard';
import BottomTabBar from '../../components/ui/BottomTabBar';
import { useDashboardPage } from './hooks/useDashboardPage';

export default function DashboardPage() {
  const { user, saldo, moneda, isLoading, isError, handleLogout, navigate } =
    useDashboardPage();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: { xs: '80px', md: 4 } }}>
      {/* AppBar */}
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700 }}>
            BancoXYZ
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user?.nombre && (
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                Hola, {user.nombre}
              </Typography>
            )}
            <IconButton
              onClick={handleLogout}
              aria-label="Salir"
              sx={{
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: '8px',
                px: 1.5,
                py: 0.5,
                gap: 0.5,
              }}
            >
              <FiLogOut size={18} />
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                Salir
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ pt: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            No se pudo cargar el saldo. Intenta de nuevo.
          </Alert>
        )}

        <BalanceCard saldo={saldo} moneda={moneda} loading={isLoading} />

        <Stack spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="primary"
            startIcon={<FiRepeat size={20} />}
            onClick={() => navigate('/transfer')}
          >
            Realizar transferencia
          </Button>
          <Button
            variant="secondary"
            startIcon={<FiList size={20} />}
            onClick={() => navigate('/transfers')}
          >
            Ver transferencias
          </Button>
        </Stack>
      </Container>

      {/* BottomTabBar — visible only on mobile */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <BottomTabBar />
      </Box>
    </Box>
  );
}
