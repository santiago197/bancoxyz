import { useQuery } from '@tanstack/react-query';
import { getTransferList } from '../api/transferList.api';
import { useAuthStore } from '../store/authStore';

export function useTransfersQuery() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['transfers'],
    queryFn: getTransferList,
    enabled: !!token,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}
