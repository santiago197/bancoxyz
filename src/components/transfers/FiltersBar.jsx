import { useState } from 'react';
import { Paper, Box, TextField } from '@mui/material';

export default function FiltersBar({ onFilter }) {
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
    onFilter(updated);
  }

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
