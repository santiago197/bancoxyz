import axiosClient from './axiosClient';

const TRANSFER_URL = process.env.REACT_APP_TRANSFER_URL;

export async function postTransfer({ valor, moneda, documento_pagador, fecha_transferencia }) {
  const { data } = await axiosClient.post(TRANSFER_URL, {
    value: valor,
    currency: moneda,
    payeerDocument: documento_pagador,
    transferDate: fecha_transferencia,
  });
  return data; // { status: 'success' | 'error' }
}
