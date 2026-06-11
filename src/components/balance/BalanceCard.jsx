import { Box, Typography, Chip, Button } from '@mui/material';
// import { FiTrendingUp } from 'react-icons/fi';
import Loader from '../ui/Loader';
import { formatCurrency } from '../../utils/formatters';

export default function BalanceCard({ saldo, moneda, loading, desktopVariant = false }) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0A2463 0%, #1565C0 100%)',
        borderRadius: '16px',
        p: { xs: 3, md: 4 },
        color: '#fff',
        minHeight: { xs: 140, md: 160 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {loading ? (
        <Box role="status" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Loader size="md" />
        </Box>
      ) : (
        <>
          {/* Top row */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="overline"
                sx={{ color: 'rgba(255,255,255,0.65)', letterSpacing: 1.5, fontSize: 11 }}
              >
                {desktopVariant ? 'SALDO TOTAL DISPONIBLE' : 'Tu saldo disponible'}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  mt: 0.5,
                  fontSize: { xs: '28px', md: '36px' },
                  fontFamily: 'var(--font-mono, monospace)',
                  letterSpacing: -1,
                }}
              >
                {formatCurrency(saldo, moneda)}
                {desktopVariant && (
                  <Typography component="span" sx={{ fontSize: '24px', fontWeight: 700, ml: 1 }}>
                    {moneda}
                  </Typography>
                )}
              </Typography>
            </Box>

            {/* Desktop action buttons inside card */}
            {desktopVariant && (
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mt: 1.5 }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.6)',
                    fontWeight: 600,
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Añadir dinero
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontWeight: 700,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                  }}
                >
                  Gestionar
                </Button>
              </Box>
            )}
          </Box>

          {/* Bottom row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            {!desktopVariant && (
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
            )}
            {/* {desktopVariant && (
              <Chip
                icon={<FiTrendingUp size={13} color="#2e7d32" />}
                label="+12.5% este mes"
                size="small"
                sx={{
                  bgcolor: 'rgba(46,125,50,0.2)',
                  color: '#a5d6a7',
                  fontWeight: 600,
                  fontSize: '12px',
                  height: 24,
                  '& .MuiChip-icon': { color: '#a5d6a7' },
                }}
              />
            )} */}
          </Box>
        </>
      )}
    </Box>
  );
}
