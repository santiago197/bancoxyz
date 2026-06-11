import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Paper,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FiArrowLeft, FiShield, FiLock, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTransferPage } from './hooks/useTransferPage';
import TransferForm from '../../components/transfer/TransferForm';
import BottomTabBar from '../../components/ui/BottomTabBar';
import AppLayout from '../../components/layout/AppLayout';

export default function TransferPage() {
  const navigate = useNavigate();
  const { form, errors, handleChange, handleSubmit, isPending, isError, isScheduled, apiError } =
    useTransferPage();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppLayout>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: { xs: '80px', md: 4 } }}>

        {/* Mobile AppBar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="volver"
              onClick={() => navigate('/dashboard')}
              sx={{ mr: 1 }}
            >
              <FiArrowLeft size={22} />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Nueva transferencia
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Desktop top bar */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
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
        </Box>

        <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
          {isDesktop && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={700}>
                Realizar Transferencia
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Completa los datos para enviar dinero de forma segura.
              </Typography>
            </Box>
          )}

          <Paper elevation={isDesktop ? 2 : 1} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
            <TransferForm
              form={form}
              errors={errors}
              onChange={handleChange}
              onSubmit={handleSubmit}
              loading={isPending}
              isError={isError}
              apiError={apiError}
              isScheduled={isScheduled}
            />
          </Paper>

          {/* Security footer */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 3, flexWrap: 'wrap', gap: 1 }}
          >
            {isDesktop ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FiShield size={14} color="#2e7d32" />
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Encriptación 256-bit
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FiLock size={14} color="#1565C0" />
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Protección de Datos
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FiEye size={14} color="#e65100" />
                  <Typography variant="caption" color="warning.dark" fontWeight={700}>
                    CONEXIÓN SEGURA
                  </Typography>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, textAlign: 'center' }}>
                <FiShield size={16} color="#1565C0" />
                <Typography variant="caption" color="text.secondary">
                  Transacción protegida por protocolos de cifrado AES-256 de BancoXYZ.
                </Typography>
              </Box>
            )}
          </Stack>
        </Container>

        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <BottomTabBar />
        </Box>
      </Box>
    </AppLayout>
  );
}
