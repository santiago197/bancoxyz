import {
  Box,
  TextField,
  MenuItem,
  Alert,
  Stack,
} from '@mui/material';
import { FiClock, FiSend } from 'react-icons/fi';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CURRENCIES = ['COP', 'USD', 'EUR'];

export default function TransferForm({
  form,
  errors,
  onChange,
  onSubmit,
  loading,
  isError,
  apiError,
  isScheduled,
}) {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
        <Box sx={{ flex: 1 }}>
          <Input
            label="Monto"
            name="valor"
            type="number"
            value={form.valor}
            onChange={onChange}
            error={errors.valor}
            placeholder="0.00"
            required
          />
        </Box>
        <Box sx={{ width: 120 }}>
          <TextField
            select
            label="Moneda"
            name="moneda"
            value={form.moneda}
            onChange={onChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            {CURRENCIES.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Stack>

      <Input
        label="Documento del destinatario"
        name="documento_pagador"
        type="text"
        value={form.documento_pagador}
        onChange={onChange}
        error={errors.documento_pagador}
        placeholder="Ej: 1023456789"
        required
      />

      <Input
        label="Fecha de transferencia"
        name="fecha_transferencia"
        type="date"
        value={form.fecha_transferencia}
        onChange={onChange}
        error={errors.fecha_transferencia}
        required
      />

      {isScheduled && (
        <Alert
          severity="warning"
          icon={<FiClock size={18} />}
          sx={{ mb: 2, borderRadius: '8px' }}
        >
          Transferencia programada para el {form.fecha_transferencia}
        </Alert>
      )}

      {isError && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
          {apiError ?? 'Ocurrió un error al procesar la transferencia. Intenta de nuevo.'}
        </Alert>
      )}

      <Button
        type="submit"
        loading={loading}
        startIcon={<FiSend size={18} />}
        fullWidth
      >
        Transferir
      </Button>
    </Box>
  );
}
