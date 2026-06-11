import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Button, Divider } from '@mui/material';
import { FiHome, FiRepeat, FiSettings, FiPlusCircle } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const SIDEBAR_WIDTH = 220;

const NAV_ITEMS = [
  { label: 'Inicio', path: '/dashboard', icon: <FiHome size={20} /> },
  { label: 'Transferencias', path: '/transfers', icon: <FiRepeat size={20} /> },
  { label: 'Configuración', path: '/settings', icon: <FiSettings size={20} /> },
];

function DesktopSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          bgcolor: 'primary.main',
          color: 'white',
          borderRight: 'none',
        },
      }}
    >
      {/* Brand */}
      <Box sx={{ px: 3, pt: 3, pb: 2 }}>
        <Typography variant="h6" fontWeight={700} sx={{ color: 'white', lineHeight: 1 }}>
          BancoXYZ
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          Banca Segura
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

      {/* Nav links */}
      <List sx={{ px: 1, pt: 1, flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active = item.path && pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => item.path && navigate(item.path)}
                disabled={!item.path}
                sx={{
                  borderRadius: 2,
                  bgcolor: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  '&.Mui-disabled': { opacity: 0.5 },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 400, color: 'white' }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Nueva transferencia CTA */}
      <Box sx={{ p: 1 }}>
        <Button
          fullWidth
          size='small'
          variant="contained"
          onClick={() => navigate('/transfer')}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            fontWeight: 700,
            borderRadius: 2,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
          }}
        >
          Nueva transferencia
        </Button>
      </Box>
    </Drawer>
  );
}

export default function AppLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <DesktopSidebar />
      <Box component="main" sx={{ flex: 1, minWidth: 0, bgcolor: 'background.default' }}>
        {children}
      </Box>
    </Box>
  );
}
