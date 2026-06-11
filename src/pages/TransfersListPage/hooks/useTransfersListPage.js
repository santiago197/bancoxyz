import { useState, useMemo } from 'react';
import { useTransfersQuery } from '../../../hooks/useTransfersQuery';

function applyFilters(transfers, filters) {
  if (!Array.isArray(transfers)) return [];
  return transfers.filter((t) => {
    const nombre = filters.nombre?.trim().toLowerCase();
    if (nombre && !t.beneficiario?.nombre?.toLowerCase().includes(nombre)) return false;

    if (filters.montoMin !== '' && filters.montoMin !== undefined) {
      if (t.valor < Number(filters.montoMin)) return false;
    }
    if (filters.montoMax !== '' && filters.montoMax !== undefined) {
      if (t.valor > Number(filters.montoMax)) return false;
    }

    if (filters.desde) {
      if (t.fecha < filters.desde) return false;
    }
    if (filters.hasta) {
      if (t.fecha > filters.hasta) return false;
    }

    return true;
  });
}

export function useTransfersListPage() {
  const { data, isLoading, isError } = useTransfersQuery();

  const [filters, setFilters] = useState({
    nombre: '',
    montoMin: '',
    montoMax: '',
    desde: '',
    hasta: '',
  });

  const transfers = useMemo(() => applyFilters(data, filters), [data, filters]);

  return { transfers, isLoading, isError, setFilters };
}
