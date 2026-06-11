import { useQuery } from '@tanstack/react-query';
import { getTransferList } from '../api/transferList.api';
import { useAuthStore } from '../store/authStore';
import { getLocalTransfers } from '../utils/localTransfers';

export function useTransfersQuery() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['transfers'],
    queryFn: getTransferList,
    enabled: !!token,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    select: (apiData) => {
      const local = getLocalTransfers();
      const seen = new Set();
      return [...local, ...apiData]
        .filter((t) => {
          const key = `${t.fecha}-${t.beneficiario.documento}-${t.valor}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
    },
  });
}
