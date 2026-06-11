const STORAGE_KEY = 'bancoxyz_local_transfers';

const today = () => new Date().toISOString().split('T')[0];

export function getLocalTransfers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalTransfer({ valor, moneda, documento_pagador, fecha_transferencia }) {
  const transfers = getLocalTransfers();
  const entry = {
    valor,
    fecha: fecha_transferencia,
    moneda,
    beneficiario: {
      documento: documento_pagador,
      nombre: documento_pagador, // el API de transferencia no retorna el nombre
    },
    _local: true,
    status: fecha_transferencia > today() ? 'programada' : undefined,
  };
  transfers.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transfers));
}
