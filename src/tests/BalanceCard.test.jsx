import { render, screen } from '@testing-library/react';
import BalanceCard from '../components/balance/BalanceCard';

describe('BalanceCard', () => {
  it('renderiza saldo y moneda', () => {
    render(<BalanceCard saldo={4250000} moneda="COP" loading={false} />);
    expect(screen.getByText(/4.250.000/)).toBeInTheDocument();
    expect(screen.getByText(/COP/)).toBeInTheDocument();
  });

  it('muestra loader cuando loading=true', () => {
    render(<BalanceCard saldo={0} moneda="COP" loading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
