import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useBalanceQuery } from '../../../hooks/useBalanceQuery';
import { useTransfersQuery } from '../../../hooks/useTransfersQuery';

export function useDashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const { data, isLoading, isError } = useBalanceQuery();
  const saldo = data?.accountBalance ?? 0;
  const moneda = data?.currency ?? 'USD';

  const { data: transfersData } = useTransfersQuery();
  const recentActivity = Array.isArray(transfersData) ? transfersData.slice(0, 4) : [];

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return { user, saldo, moneda, isLoading, isError, handleLogout, navigate, recentActivity };
}
