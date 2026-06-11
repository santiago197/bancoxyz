import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTransfer } from '../api/transfer.api';
import { saveLocalTransfer } from '../utils/localTransfers';

export function useTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTransfer,
    retry: false,
    onSuccess: (_, variables) => {
      saveLocalTransfer(variables);
      queryClient.invalidateQueries({ queryKey: ['transfers'] });
    },
  });
}
