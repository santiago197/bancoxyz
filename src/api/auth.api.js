import axiosClient from './axiosClient';

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

export async function login(email, password) {
  const { data } = await axiosClient.post(LOGIN_URL, { email, password });
  return data; // { token, user: { id, name, email } }
}
