import { Box, Paper, Typography, Link } from '@mui/material';
import { useLoginPage } from './hooks/useLoginPage';
import LoginForm from './components/LoginForm';

export default function LoginPage() {
  const loginPage = useLoginPage();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

      {/* ── Panel izquierdo: solo desktop ── */}
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
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.3, mb: 2 }}>
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

      {/* ── Panel derecho ── */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: { xs: 'primary.main', md: 'background.paper' },
        }}
      >
        {/* Logo mobile */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'center',
            pt: 6,
            pb: 5,
          }}
        >
          <Typography variant="h1" sx={{ color: 'white', fontSize: '28px', letterSpacing: '-0.5px' }}>
            BancoXYZ
          </Typography>
        </Box>

        {/* Contenedor del formulario:
            Mobile  → Paper blanca con bordes redondeados arriba, llena el resto de pantalla
            Desktop → panel plano blanco que llena el panel derecho, form en zona superior */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            borderRadius: { xs: '12px 12px 0 0', md: 0 },
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { md: 'center' },
            alignItems: { md: 'center' },
            p: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: { md: 380 } }}>
            <Typography variant="h2" sx={{ mb: 0.5 }}>
              Bienvenido
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Ingresa a tu cuenta
            </Typography>

            <LoginForm
              form={loginPage.form}
              errors={loginPage.errors}
              onChange={loginPage.handleChange}
              onSubmit={loginPage.handleSubmit}
              loading={loginPage.isPending}
              is401={loginPage.is401}
              rememberDevice={loginPage.rememberDevice}
              handleRememberChange={loginPage.handleRememberChange}
            />
          </Box>
        </Paper>
      </Box>

    </Box>
  );
}
