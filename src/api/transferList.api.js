import axiosClient from './axiosClient';

const TRANSFER_LIST_URL = process.env.REACT_APP_TRANSFER_LIST_URL;

export async function getTransferList() {
  const { data } = await axiosClient.get(TRANSFER_LIST_URL);
  return data; // [{ valor, fecha, moneda, beneficiario: { documento, nombre } }]
}
