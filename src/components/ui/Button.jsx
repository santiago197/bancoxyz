import { Button as MuiButton, CircularProgress } from '@mui/material';

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = true,
  startIcon,
}) {
  const muiVariant = variant === 'secondary' ? 'outlined' : 'contained';
  const color = variant === 'ghost' ? 'secondary' : 'primary';

  return (
    <MuiButton
      type={type}
      variant={muiVariant}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={loading ? null : startIcon}
      sx={{ py: '14px' }}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </MuiButton>
  );
}
