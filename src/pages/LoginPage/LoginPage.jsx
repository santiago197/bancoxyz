import { Box, Typography, Link } from '@mui/material';
import { useLoginPage } from './hooks/useLoginPage';
import LoginForm from './components/LoginForm';

export default function LoginPage() {
  const loginPage = useLoginPage();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

      {/* Panel izquierdo — solo visible en desktop */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          width: '44%',
          flexShrink: 0,
          p: 6,
        }}
      >
        <Typography variant="h1" sx={{ color: 'white', fontSize: '32px', letterSpacing: '-0.5px' }}>
          BancoXYZ
        </Typography>

        <Box>
          <Typography
            variant="h2"
            sx={{ color: 'white', fontWeight: 700, lineHeight: 1.3, mb: 2 }}
          >
            La seguridad de su patrimonio es nuestra prioridad.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
            Accede a sus cuentas con la tranquilidad de contar con los estándares más altos de
            cifrado bancario internacional.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            © 2026 BancoXYZ S.A.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
              Privacidad
            </Link>
            <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
              Seguridad
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Panel derecho — formulario */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.paper',
          p: { xs: 3, sm: 5, md: 6 },
          minHeight: { xs: '100vh', md: 'auto' },
        }}
      >
        {/* Logo visible solo en mobile */}
        <Typography
          variant="h1"
          color="primary"
          sx={{ display: { md: 'none' }, mb: 4, fontSize: '28px', letterSpacing: '-0.5px' }}
        >
          BancoXYZ
        </Typography>

        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h2" sx={{ mb: 0.5 }}>
            Bienvenido
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Ingresa a tu cuenta
          </Typography>

          <LoginForm {...loginPage} />
        </Box>
      </Box>

    </Box>
  );
}
