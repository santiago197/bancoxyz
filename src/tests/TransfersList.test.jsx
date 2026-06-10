import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TransfersListPage from '../pages/TransfersListPage/TransfersListPage';

jest.mock('../hooks/useTransfersQuery', () => ({
  useTransfersQuery: jest.fn(),
}));
import { useTransfersQuery } from '../hooks/useTransfersQuery';

const mockTransfers = [
  { valor: 500000, fecha: '2026-06-01', moneda: 'COP', beneficiario: { nombre: 'Luis Pérez', documento: '11111111' } },
  { valor: 120000, fecha: '2026-05-31', moneda: 'COP', beneficiario: { nombre: 'Maria García', documento: '22222222' } },
];

const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe('TransfersListPage', () => {
  beforeEach(() => {
    useTransfersQuery.mockReturnValue({ data: mockTransfers, isLoading: false, isError: false });
  });

  it('renderiza la lista de transferencias', () => {
    render(<TransfersListPage />, { wrapper });
    expect(screen.getByText('Luis Pérez')).toBeInTheDocument();
    expect(screen.getByText('Maria García')).toBeInTheDocument();
  });

  it('filtra por nombre del beneficiario', () => {
    render(<TransfersListPage />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: 'Luis' } });
    expect(screen.getByText('Luis Pérez')).toBeInTheDocument();
    expect(screen.queryByText('Maria García')).not.toBeInTheDocument();
  });

  it('muestra mensaje cuando no hay resultados', () => {
    render(<TransfersListPage />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: 'XYZ123' } });
    expect(screen.getByText(/sin resultados/i)).toBeInTheDocument();
  });
});
