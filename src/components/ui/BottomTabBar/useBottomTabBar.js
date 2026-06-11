import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TABS = [
  { label: 'Inicio', path: '/dashboard' },
  { label: 'Transferir', path: '/transfer' },
  { label: 'Pagos', path: '/transfers' },
  { label: 'Más', path: '/settings' },
];

export function useBottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const idx = TABS.findIndex((t) => t.path === location.pathname);
    if (idx !== -1) setValue(idx);
  }, [location.pathname]);

  function handleChange(_, newValue) {
    const tab = TABS[newValue];
    if (tab.path) {
      setValue(newValue);
      navigate(tab.path);
    }
  }

  return { value, handleChange, tabs: TABS };
}
