import axiosClient from './axiosClient';

const TRANSFER_URL = 'https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer';

export async function postTransfer({ valor, moneda, documento_pagador, fecha_transferencia }) {
  const { data } = await axiosClient.post(TRANSFER_URL, {
    valor,
    moneda,
    documento_pagador,
    fecha_transferencia,
  });
  return data; // { estado: 'éxito' | 'error' }
}
