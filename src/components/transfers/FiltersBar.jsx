import { useState } from 'react';
import { Paper, Box, TextField, InputAdornment, Button, Stack } from '@mui/material';
import { FiSearch } from 'react-icons/fi';

export default function FiltersBar({ onFilter, isDesktop = false }) {
  const [fields, setFields] = useState({
    nombre: '',
    montoMin: '',
    montoMax: '',
    desde: '',
    hasta: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...fields, [name]: value };
    setFields(updated);
    if (!isDesktop) onFilter(updated);
  }

  function handleApply() {
    onFilter(fields);
  }

  function handleReset() {
    const cleared = { nombre: '', montoMin: '', montoMax: '', desde: '', hasta: '' };
    setFields(cleared);
    onFilter(cleared);
  }

  if (isDesktop) {
    return (
      <Paper elevation={0} sx={{ p: 2, mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            name="nombre"
            value={fields.nombre}
            onChange={handleChange}
            placeholder="Buscar por nombre..."
            size="small"
            sx={{ minWidth: 200, flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch size={16} />
                </InputAdornment>
              ),
            }}
            label="Nombre del beneficiario"
          />
          <TextField
            name="montoMin"
            value={fields.montoMin}
            onChange={handleChange}
            label="Monto mín"
            type="number"
            size="small"
            sx={{ width: 130 }}
          />
          <TextField
            name="montoMax"
            value={fields.montoMax}
            onChange={handleChange}
            label="Monto máx"
            type="number"
            size="small"
            sx={{ width: 130 }}
          />
          <TextField
            name="desde"
            value={fields.desde}
            onChange={handleChange}
            label="Desde"
            type="date"
            size="small"
            sx={{ width: 150 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="hasta"
            value={fields.hasta}
            onChange={handleChange}
            label="Hasta"
            type="date"
            size="small"
            sx={{ width: 150 }}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleApply}
            sx={{ fontWeight: 700, px: 3, height: 40 }}
          >
            Filtrar
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleReset}
            sx={{ height: 40 }}
          >
            Limpiar
          </Button>
        </Stack>
      </Paper>
    );
  }

  // Mobile layout
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ mb: 1.5 }}>
        <TextField
          name="nombre"
          value={fields.nombre}
          onChange={handleChange}
          placeholder="Filtrar por nombre"
          inputProps={{ 'aria-label': 'Filtrar por nombre' }}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch size={16} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 1.5 }}>
        <TextField
          name="montoMin"
          value={fields.montoMin}
          onChange={handleChange}
          label="Monto mín"
          placeholder="$ 0"
          type="number"
          size="small"
        />
        <TextField
          name="montoMax"
          value={fields.montoMax}
          onChange={handleChange}
          label="Monto máx"
          placeholder="$ Max"
          type="number"
          size="small"
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <TextField
          name="desde"
          value={fields.desde}
          onChange={handleChange}
          label="Desde"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="hasta"
          value={fields.hasta}
          onChange={handleChange}
          label="Hasta"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    </Paper>
  );
}
