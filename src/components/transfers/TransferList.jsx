import { Box, CircularProgress, Typography, Paper, Divider, Chip } from '@mui/material';
import { formatCurrency, formatDate } from '../../utils/formatters';

function groupByDate(transfers) {
  const map = {};
  [...transfers]
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
    .forEach((t) => {
      if (!map[t.fecha]) map[t.fecha] = [];
      map[t.fecha].push(t);
    });
  return Object.entries(map);
}

export default function TransferList({ transfers = [], loading }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress role="status" />
      </Box>
    );
  }

  if (!transfers.length) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: 'center', py: 4 }}
      >
        Sin resultados
      </Typography>
    );
  }

  const groups = groupByDate(transfers);

  return (
    <Paper elevation={1}>
      {groups.map(([fecha, items], groupIdx) => (
        <Box key={fecha}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              px: 2,
              pt: 2,
              pb: 0.5,
              fontWeight: 600,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {formatDate(fecha)}
          </Typography>

          {items.map((transfer, idx) => (
            <Box key={`${fecha}-${idx}`}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  px: 2,
                  py: 1.5,
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    {transfer.beneficiario?.nombre}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption" color="text.secondary">
                      ID: {transfer.beneficiario?.documento}
                    </Typography>
                    {transfer.status === 'programada' && (
                      <Chip
                        label="Transferencia programada"
                        size="small"
                        variant="outlined"
                        color="warning"
                        sx={{ fontSize: 10, height: 22 }}
                      />
                    )}
                  </Box>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" fontWeight={600} color="error.main">
                    -{formatCurrency(transfer.valor, transfer.moneda)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {transfer.moneda}
                  </Typography>
                </Box>
              </Box>

              {(idx < items.length - 1 || groupIdx < groups.length - 1) && (
                <Divider />
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Paper>
  );
}
