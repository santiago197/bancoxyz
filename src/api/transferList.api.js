import axiosClient from './axiosClient';

const TRANSFER_LIST_URL = process.env.REACT_APP_TRANSFER_LIST_URL;

export async function getTransferList() {
  const { data } = await axiosClient.get(TRANSFER_LIST_URL);
  // API responde: { message, transfers: [{ value, date, currency, payeer: { document, name } }] }
  return data.transfers.map((t) => ({
    valor: t.value,
    fecha: t.date,
    moneda: t.currency,
    beneficiario: {
      documento: t.payeer.document,
      nombre: t.payeer.name,
    },
  }));
}
