const STORAGE_KEY = 'bancoxyz_local_transfers';

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
  };
  transfers.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transfers));
}
