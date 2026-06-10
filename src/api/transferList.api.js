import axiosClient from './axiosClient';

const TRANSFER_LIST_URL = 'https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList';

export async function getTransferList() {
  const { data } = await axiosClient.get(TRANSFER_LIST_URL);
  return data; // [{ valor, fecha, moneda, beneficiario: { documento, nombre } }]
}
