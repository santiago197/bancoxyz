import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import AppRouter from './routes/AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 30_000 },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
