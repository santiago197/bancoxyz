import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Stack,
  Alert,
  Paper,
  Grid,
  Chip,
  Avatar,
  useMediaQuery,
  useTheme,
  Link,
  Button,
  Divider,
} from '@mui/material';
import {
  FiLogOut,
  FiRepeat,
  FiList,
  FiBell,
  FiUser,
  FiCreditCard,
  FiHeadphones,
  FiArrowUpRight,
  FiShield,
} from 'react-icons/fi';
import UiButton from '../../components/ui/Button';
import BalanceCard from '../../components/balance/BalanceCard';
import BottomTabBar from '../../components/ui/BottomTabBar';
import AppLayout from '../../components/layout/AppLayout';
import { useDashboardPage } from './hooks/useDashboardPage';
import { formatCurrency, formatDate } from '../../utils/formatters';

function ActivityItem({ transfer, index }) {
  const color = '#ef5350';
  const icon = <FiArrowUpRight size={18} />;
  const name = transfer.beneficiario?.nombre ?? transfer.nombre ?? 'Transferencia';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 0,
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ width: 38, height: 38, bgcolor: `${color}22`, color }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: { xs: 160, md: 220 } }}>
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(transfer.fecha)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="body2" fontWeight={700} color="error.main">
          -{formatCurrency(transfer.valor ?? 0, transfer.moneda ?? 'COP')}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {transfer.categoria ?? 'Transferencia'}
        </Typography>
      </Box>
    </Box>
  );
}

function PromoCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A2463 0%, #1565C0 100%)',
        p: 2.5,
        color: '#fff',
        mt: 2,
      }}
    >
      <Chip
        label="OFERTA EXCLUSIVA"
        size="small"
        sx={{ bgcolor: 'warning.main', color: 'white', fontWeight: 700, fontSize: 10, mb: 1 }}
      />
      <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', mb: 0.5, lineHeight: 1.3 }}>
        Tu primer crédito al 0%
      </Typography>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block', mb: 2 }}>
        Sujeto a aprobación crediticia. Términos y condiciones aplican.
      </Typography>
      <Button
        size="small"
        sx={{
          bgcolor: 'white',
          color: 'primary.main',
          fontWeight: 700,
          borderRadius: 1.5,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
        }}
      >
        Solicitar ahora
      </Button>
    </Paper>
  );
}

export default function DashboardPage() {
  const { user, saldo, moneda, isLoading, isError, handleLogout, navigate, recentActivity } =
    useDashboardPage();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: { xs: '80px', md: 4 } }}>

        {/* ── Mobile AppBar ── */}
        <AppBar
          position="sticky"
          color="primary"
          elevation={0}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700} sx={{ color: '#fff' }}>
              BancoXYZ
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {user?.name && (
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                  Hola, {user.name}
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

        {/* ── Desktop top bar ── */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 4,
            py: 1.5,
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" fontWeight={700} color="text.primary">
            BancoXYZ
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton size="small" aria-label="Notificaciones">
              <FiBell size={20} />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={700} lineHeight={1.2}>
                  {user?.name ?? 'Usuario'}
                </Typography>
                <Typography variant="caption" color="primary.main" fontWeight={600}>
                  Miembro Premium
                </Typography>
              </Box>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                <FiUser size={18} />
              </Avatar>
            </Box>
          </Box>
        </Box>

        {/* ── Main content ── */}
        <Container maxWidth={isDesktop ? false : 'sm'} sx={{ pt: { xs: 2, md: 3 }, px: { xs: 2, md: 4 } }}>
          {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              No se pudo cargar el saldo. Intenta de nuevo.
            </Alert>
          )}

          {/* Balance card */}
          <Box sx={{ mb: 3 }}>
            <BalanceCard saldo={saldo} moneda={moneda} loading={isLoading} desktopVariant={isDesktop} />
          </Box>

          {/* Mobile action buttons */}
          {!isDesktop && (
            <Stack spacing={2} sx={{ mb: 3 }}>
              <UiButton variant="primary" onClick={() => navigate('/transfer')}>
                Realizar transferencia
              </UiButton>
              <UiButton variant="secondary" onClick={() => navigate('/transfers')}>
                Ver transferencias
              </UiButton>
            </Stack>
          )}

          {/* Two-column layout on desktop, single column on mobile */}
          <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 3, alignItems: 'flex-start' }}>

            {/* ── Left column: Actividad reciente ── */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Actividad reciente */}
              {recentActivity.length > 0 && (
                <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', mb: { xs: 2, md: 0 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2.5,
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body1" fontWeight={700}>
                      Actividad reciente
                    </Typography>
                    <Link
                      component="button"
                      variant="body2"
                      color="primary"
                      underline="hover"
                      onClick={() => navigate('/transfers')}
                      sx={{ cursor: 'pointer', fontWeight: 600 }}
                    >
                      Ver todo
                    </Link>
                  </Box>
                  <Box sx={{ px: 2.5 }}>
                    {recentActivity.map((transfer, idx) => (
                      <ActivityItem key={transfer.id ?? idx} transfer={transfer} index={idx} />
                    ))}
                  </Box>
                </Paper>
              )}

              {/* Mobile: quick action tiles */}
              {!isDesktop && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
                    >
                      <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 36, height: 36, mb: 1 }}>
                        <FiCreditCard size={18} />
                      </Avatar>
                      <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        Tarjeta activa
                      </Typography>
                      <Typography variant="body2" fontWeight={600} display="block">
                        Visa ●●●● 4582
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
                    >
                      <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1565C0', width: 36, height: 36, mb: 1 }}>
                        <FiHeadphones size={18} />
                      </Avatar>
                      <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        ¿Ayuda?
                      </Typography>
                      <Typography variant="body2" fontWeight={600} display="block">
                        Soporte 24/7
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              )}

              {/* Mobile: promo */}
              {!isDesktop && <PromoCard />}
            </Box>

            {/* ── Right column (desktop only): Acciones rápidas ── */}
            {isDesktop && (
              <Box sx={{ width: 280, flexShrink: 0 }}>
                <Typography variant="body1" fontWeight={700} sx={{ mb: 1.5 }}>
                  Acciones rápidas
                </Typography>

                <Stack spacing={1.5}>
                  <Paper
                    elevation={0}
                    component="button"
                    onClick={() => navigate('/transfer')}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      cursor: 'pointer',
                      bgcolor: 'background.paper',
                      width: '100%',
                      textAlign: 'left',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Avatar sx={{ bgcolor: '#e8eaf6', color: 'primary.main', width: 36, height: 36 }}>
                      <FiRepeat size={18} />
                    </Avatar>
                    <Typography variant="body2" fontWeight={600}>
                      Realizar transferencia
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    component="button"
                    onClick={() => navigate('/transfers')}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      cursor: 'pointer',
                      bgcolor: 'background.paper',
                      width: '100%',
                      textAlign: 'left',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1565C0', width: 36, height: 36 }}>
                      <FiList size={18} />
                    </Avatar>
                    <Typography variant="body2" fontWeight={600}>
                      Ver transferencias
                    </Typography>
                  </Paper>
                </Stack>

                {/* Promo card in right column on desktop */}
                <PromoCard />

                {/* Security note */}
                <Paper
                  elevation={0}
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'flex-start',
                  }}
                >
                  <FiShield size={18} color="#1565C0" style={{ flexShrink: 0, marginTop: 2 }} />
                  <Typography variant="caption" color="text.secondary" lineHeight={1.5}>
                    Tu cuenta está protegida por encriptación de grado bancario.
                  </Typography>
                </Paper>
              </Box>
            )}
          </Box>
        </Container>

        {/* BottomTabBar mobile only */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <BottomTabBar />
        </Box>
      </Box>
    </AppLayout>
  );
}
