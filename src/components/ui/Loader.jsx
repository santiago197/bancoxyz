import { CircularProgress, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

export default function Loader({ fullScreen = false, size = 'md' }) {
  const sizes = { sm: 20, md: 36, lg: 56 };
  const px = sizes[size];

  const spinner = <CircularProgress size={px} color="primary" aria-label="Cargando" />;

  if (fullScreen) {
    return (
      <Box sx={{
        position: 'fixed', inset: 0,
        bgcolor: (theme) => alpha(theme.palette.common.white, 0.7),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
      }}>
        {spinner}
      </Box>
    );
  }

  return spinner;
}
