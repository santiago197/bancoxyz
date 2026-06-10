import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Paper,
  Box,
} from '@mui/material';
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
      <AppBar position="static" elevation={0}>
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

      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 5 } }}>
        <Paper elevation={1} sx={{ p: { xs: 3, md: 4 } }}>
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
      </Container>
    </Box>
  );
}
