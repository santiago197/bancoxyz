import { CircularProgress, Box } from '@mui/material';

export default function Loader({ fullScreen = false, size = 'md' }) {
  const sizes = { sm: 20, md: 36, lg: 56 };
  const px = sizes[size];

  const spinner = <CircularProgress size={px} color="primary" aria-label="Cargando" />;

  if (fullScreen) {
    return (
      <Box sx={{
        position: 'fixed', inset: 0,
        bgcolor: 'rgba(255,255,255,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
      }}>
        {spinner}
      </Box>
    );
  }

  return spinner;
}
