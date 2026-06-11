import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Box,
  Paper,
  Avatar,
  Chip,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FiArrowLeft, FiUser, FiMail, FiHash, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSettingsPage } from './hooks/useSettingsPage';
import BottomTabBar from '../../components/ui/BottomTabBar';
import AppLayout from '../../components/layout/AppLayout';

function ProfileRow({ icon, label, value }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-of-type': { borderBottom: 'none' },
      }}
    >
      <Box sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600} noWrap>
          {value ?? '—'}
        </Typography>
      </Box>
    </Box>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, initials, handleLogout } = useSettingsPage();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppLayout>
      <Box sx={{ minHeight: { xs: '100vh', md: 0 }, bgcolor: 'background.default', pb: { xs: '80px', md: 0 } }}>

        {/* Mobile AppBar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="volver"
              onClick={() => navigate('/dashboard')}
              sx={{ mr: 1 }}
            >
              <FiArrowLeft size={22} />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Configuración
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Desktop top bar */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            px: 4,
            py: 1.5,
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" fontWeight={700} color="text.primary">
            BancoXYZ
          </Typography>
        </Box>

        <Container maxWidth="sm" sx={{ py: { xs: 3, md: 3 } }}>
          {isDesktop && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={700}>
                Configuración
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Información de tu cuenta y sesión.
              </Typography>
            </Box>
          )}

          <Paper elevation={isDesktop ? 2 : 1} sx={{ borderRadius: 2, overflow: 'hidden' }}>

            {/* Profile header */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4,
                px: 3,
                background: 'linear-gradient(135deg, #0A2463 0%, #1565C0 100%)',
              }}
            >
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: 28,
                  fontWeight: 700,
                  mb: 1.5,
                  border: '3px solid rgba(255,255,255,0.4)',
                }}
              >
                {initials}
              </Avatar>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#fff' }}>
                {user?.name ?? 'Usuario'}
              </Typography>
              <Chip
                label="Miembro Premium"
                size="small"
                sx={{
                  mt: 1,
                  bgcolor: 'warning.main',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 10,
                }}
              />
            </Box>

            <Divider />

            {/* Profile data */}
            <Box sx={{ px: 3, py: 1 }}>
              <ProfileRow
                icon={<FiUser size={18} />}
                label="Nombre completo"
                value={user?.name}
              />
              <ProfileRow
                icon={<FiMail size={18} />}
                label="Correo electrónico"
                value={user?.email}
              />
              <ProfileRow
                icon={<FiHash size={18} />}
                label="ID de usuario"
                value={user?.id}
              />
            </Box>

            <Divider />

            {/* Logout */}
            <Box sx={{ px: 3, py: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleLogout}
                startIcon={<FiLogOut size={16} />}
                sx={{
                  borderColor: 'error.main',
                  color: 'error.main',
                  fontWeight: 600,
                  '&:hover': { bgcolor: 'error.50', borderColor: 'error.dark' },
                }}
              >
                Cerrar sesión
              </Button>
            </Box>
          </Paper>
        </Container>

        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <BottomTabBar />
        </Box>
      </Box>
    </AppLayout>
  );
}
