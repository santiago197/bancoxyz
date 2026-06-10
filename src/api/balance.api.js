import axiosClient from './axiosClient';

const BALANCE_URL = 'https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance';

export async function getBalance() {
  const { data } = await axiosClient.get(BALANCE_URL);
  return data; // { moneda, saldo }
}
