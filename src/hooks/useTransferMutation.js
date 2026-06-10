import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTransfer } from '../api/transfer.api';

export function useTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTransfer,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transfers'] });
    },
  });
}
