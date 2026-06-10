import { Box, Typography, Chip } from '@mui/material';
import Loader from '../ui/Loader';
import { formatCurrency } from '../../utils/formatters';

export default function BalanceCard({ saldo, moneda, loading }) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0A2463 0%, #1E88E5 100%)',
        borderRadius: '16px',
        p: { xs: 3, md: 4 },
        color: '#fff',
        minHeight: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <Box role="status" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Loader size="md" />
        </Box>
      ) : (
        <>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.8)', mb: 1, fontWeight: 500 }}
          >
            Tu saldo disponible
          </Typography>
          <Typography
            variant="h2"
            sx={{ color: '#fff', fontWeight: 700, mb: 1.5, fontSize: { xs: '28px', md: '34px' } }}
          >
            {formatCurrency(saldo, moneda)}
          </Typography>
          <Box>
            <Chip
              label={moneda}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '12px',
                height: 24,
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
