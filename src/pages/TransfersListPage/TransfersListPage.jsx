import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Box,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FiArrowLeft } from 'react-icons/fi';
import { useTransfersListPage } from './hooks/useTransfersListPage';
import FiltersBar from '../../components/transfers/FiltersBar';
import TransferList from '../../components/transfers/TransferList';
import BottomTabBar from '../../components/ui/BottomTabBar';
import AppLayout from '../../components/layout/AppLayout';

export default function TransfersListPage() {
  const navigate = useNavigate();
  const { transfers, isLoading, isError, setFilters } = useTransfersListPage();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppLayout>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: { xs: '80px', md: 0 } }}>

        {/* Mobile AppBar */}
        <AppBar
          position="sticky"
          color="primary"
          elevation={0}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate('/dashboard')}
              aria-label="Volver"
            >
              <FiArrowLeft />
            </IconButton>
            <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1, textAlign: 'center' }}>
              Transferencias
            </Typography>
            <Box sx={{ width: 40 }} />
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
            Historial de transferencias
          </Typography>
        </Box>

        <Container maxWidth={isDesktop ? false : 'sm'} sx={{ py: { xs: 2, md: 3 }, px: { xs: 2, md: 4 } }}>
          {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error al cargar las transferencias. Intenta de nuevo.
            </Alert>
          )}

          <FiltersBar onFilter={setFilters} isDesktop={isDesktop} />
          <TransferList transfers={transfers} loading={isLoading} />
        </Container>

        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <BottomTabBar />
        </Box>
      </Box>
    </AppLayout>
  );
}
