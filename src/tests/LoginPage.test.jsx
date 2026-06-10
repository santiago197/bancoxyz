import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from '../pages/LoginPage/LoginPage';

jest.mock('../hooks/useLoginMutation', () => ({
  useLoginMutation: jest.fn(),
}));

import { useLoginMutation } from '../hooks/useLoginMutation';

const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe('LoginPage', () => {
  it('renderiza campos de email y contraseña', () => {
    useLoginMutation.mockReturnValue({ mutate: jest.fn(), isPending: false, isError: false });
    render(<LoginPage />, { wrapper });
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  });

  it('muestra error de validación si email es inválido', async () => {
    useLoginMutation.mockReturnValue({ mutate: jest.fn(), isPending: false, isError: false });
    render(<LoginPage />, { wrapper });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'notanemail' } });
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    await waitFor(() => {
      expect(screen.getByText(/email válido/i)).toBeInTheDocument();
    });
  });

  it('muestra error 401 cuando la mutación falla', () => {
    useLoginMutation.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: true,
      error: { response: { status: 401 } },
    });
    render(<LoginPage />, { wrapper });
    expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
  });
});
