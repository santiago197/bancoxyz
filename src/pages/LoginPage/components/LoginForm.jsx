import { Box, FormControlLabel, Checkbox, Typography, Link } from '@mui/material';
import { FiLogIn, FiLock, FiShield } from 'react-icons/fi';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import ErrorMessage from '../../../components/ui/ErrorMessage';

export default function LoginForm({
  form,
  errors,
  onChange,
  onSubmit,
  loading,
  is401,
  rememberDevice,
  handleRememberChange,
}) {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <ErrorMessage
        message="Credenciales incorrectas. Verifica tu email y contraseña."
        visible={is401}
      />

      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        error={errors.email}
        placeholder="ejemplo@bancoxyz.com"
        required
      />

      {/* Contraseña con link de recuperación */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 0.5 }}>
          <Link href="#" underline="hover" variant="caption" color="primary">
            ¿Olvidaste tu contraseña?
          </Link>
        </Box>
        <Input
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          error={errors.password}
          placeholder="••••••••"
          required
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={rememberDevice}
            onChange={handleRememberChange}
            color="primary"
          />
        }
        label={<Typography variant="body2">Recordar este dispositivo</Typography>}
        sx={{ mb: 2, ml: 0 }}
      />

      <Button type="submit" loading={loading} startIcon={<FiLogIn size={18} />}>
        Ingresar
      </Button>

      <Box sx={{ textAlign: 'center', mt: 2.5 }}>
        <Typography variant="body2" color="text.secondary">
          ¿No tienes una cuenta?{' '}
          <Link href="#" underline="hover" color="primary" fontWeight={600}>
            Solicita una aquí
          </Link>
        </Typography>
      </Box>

      {/* Indicadores de seguridad */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2.5,
          mt: 3,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box component="span" sx={{ color: 'text.secondary', display: 'inline-flex' }}>
            <FiLock size={13} color="inherit" />
          </Box>
          <Typography variant="caption" color="text.secondary" letterSpacing={0.5}>
            CONEXIÓN SEGURA
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box component="span" sx={{ color: 'text.secondary', display: 'inline-flex' }}>
            <FiShield size={13} color="inherit" />
          </Box>
          <Typography variant="caption" color="text.secondary" letterSpacing={0.5}>
            AES-256 BIT
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
