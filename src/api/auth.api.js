import axiosClient from './axiosClient';

const LOGIN_URL = 'https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login';

export async function login(email, password) {
  const { data } = await axiosClient.post(LOGIN_URL, { email, password });
  return data; // { token, user: { id, name, email } }
}
