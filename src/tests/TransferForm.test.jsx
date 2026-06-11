import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TransferPage from '../pages/TransferPage/TransferPage';

jest.mock('../hooks/useTransferMutation', () => ({
  useTransferMutation: jest.fn(),
}));

import { useTransferMutation } from '../hooks/useTransferMutation';

const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe('TransferPage — validaciones del formulario', () => {
  beforeEach(() => {
    useTransferMutation.mockReturnValue({ mutate: jest.fn(), isPending: false, isError: false });
  });

  it('muestra error si monto es 0', async () => {
    render(<TransferPage />, { wrapper });
    fireEvent.change(screen.getByLabelText(/monto/i), { target: { value: '0' } });
    fireEvent.click(screen.getByTestId('btn-submit-transfer'));
    await waitFor(() => {
      expect(screen.getByText(/mayor a 0/i)).toBeInTheDocument();
    });
  });

  it('muestra error si documento está vacío', async () => {
    render(<TransferPage />, { wrapper });
    fireEvent.click(screen.getByTestId('btn-submit-transfer'));
    await waitFor(() => {
      expect(screen.getByText(/documento es requerido/i)).toBeInTheDocument();
    });
  });

  it('llama mutate con datos correctos al submit válido', async () => {
    const mutateMock = jest.fn();
    useTransferMutation.mockReturnValue({ mutate: mutateMock, isPending: false, isError: false });
    render(<TransferPage />, { wrapper });

    const today = new Date().toISOString().split('T')[0];
    fireEvent.change(screen.getByLabelText(/monto/i), { target: { value: '500000' } });
    fireEvent.change(screen.getByLabelText(/documento/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: today } });
    fireEvent.click(screen.getByTestId('btn-submit-transfer'));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          valor: 500000,
          documento_pagador: '12345678',
          fecha_transferencia: today,
        }),
        expect.any(Object)
      );
    });
  });
});
