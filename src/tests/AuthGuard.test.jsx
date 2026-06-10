import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import { useAuthStore } from '../store/authStore';
import AuthGuard from '../components/auth/AuthGuard';

beforeEach(() => {
  useAuthStore.setState({ user: null, token: null });
});

const wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('AuthGuard', () => {
  it('redirige a /login si no hay token', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <div>Dashboard</div>
              </AuthGuard>
            }
          />
        </Routes>
      </MemoryRouter>,
      { wrapper }
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('muestra el contenido si hay token', () => {
    useAuthStore.setState({ token: 'valid-token' });
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <div>Dashboard</div>
              </AuthGuard>
            }
          />
        </Routes>
      </MemoryRouter>,
      { wrapper }
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
