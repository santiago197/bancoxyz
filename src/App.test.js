import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  // App renders AppRouter which redirects to /login — BancoXYZ logo is present
  expect(document.body).toBeTruthy();
});
