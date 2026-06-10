import { useQuery } from '@tanstack/react-query';
import { getBalance } from '../api/balance.api';
import { useAuthStore } from '../store/authStore';

export function useBalanceQuery() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['balance'],
    queryFn: getBalance,
    enabled: !!token,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
