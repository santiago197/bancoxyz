import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useInput } from './useInput';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  name,
}) {
  const { isPassword, inputType, showPassword, togglePassword } = useInput(type);

  return (
    <TextField
      id={name}
      name={name}
      label={label}
      type={inputType}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      error={!!error}
      helperText={error || ''}
      fullWidth
      sx={{ mb: 2 }}
      InputProps={
        isPassword
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    onClick={togglePassword}
                    edge="end"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
}
