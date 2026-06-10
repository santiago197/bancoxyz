import { useAuthStore } from '../store/authStore';

beforeEach(() => {
  useAuthStore.setState({ user: null, token: null });
});

describe('authStore', () => {
  it('inicia con user y token null', () => {
    const { user, token } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
  });

  it('login() guarda user y token', () => {
    const mockUser = { id: 1, name: 'Ana', email: 'ana@test.com' };
    useAuthStore.getState().login(mockUser, 'jwt-token-123');
    const { user, token } = useAuthStore.getState();
    expect(user).toEqual(mockUser);
    expect(token).toBe('jwt-token-123');
  });

  it('logout() limpia user y token', () => {
    useAuthStore.setState({ user: { id: 1 }, token: 'abc' });
    useAuthStore.getState().logout();
    const { user, token } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
  });
});
