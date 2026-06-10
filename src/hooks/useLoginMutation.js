import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';

export function useLoginMutation() {
  const loginStore = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    retry: false,
    onSuccess: (data) => {
      loginStore(data.user, data.token);
    },
  });
}
