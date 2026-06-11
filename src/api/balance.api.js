import axiosClient from './axiosClient';

const BALANCE_URL = process.env.REACT_APP_BALANCE_URL;

export async function getBalance() {
  const { data } = await axiosClient.get(BALANCE_URL);
  return data; // { currency, accountBalance }
}
