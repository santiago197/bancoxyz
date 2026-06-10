import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useBalanceQuery } from '../../../hooks/useBalanceQuery';

export function useDashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const { data, isLoading, isError } = useBalanceQuery();
  const saldo = data?.saldo ?? 0;
  const moneda = data?.moneda ?? 'COP';

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return { user, saldo, moneda, isLoading, isError, handleLogout, navigate };
}
