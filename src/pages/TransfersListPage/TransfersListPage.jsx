import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Box,
  Alert,
} from '@mui/material';
import { FiArrowLeft } from 'react-icons/fi';
import { useTransfersListPage } from './hooks/useTransfersListPage';
import FiltersBar from '../../components/transfers/FiltersBar';
import TransferList from '../../components/transfers/TransferList';

export default function TransfersListPage() {
  const navigate = useNavigate();
  const { transfers, isLoading, isError, setFilters } = useTransfersListPage();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/dashboard')}
            aria-label="Volver"
          >
            <FiArrowLeft />
          </IconButton>
          <Typography variant="h3" sx={{ flexGrow: 1, textAlign: 'center', color: 'inherit' }}>
            Transferencias
          </Typography>
          <Box sx={{ width: 40 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 2 }}>
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error al cargar las transferencias. Intenta de nuevo.
          </Alert>
        )}

        <FiltersBar onFilter={setFilters} />
        <TransferList transfers={transfers} loading={isLoading} />
      </Container>
    </Box>
  );
}
