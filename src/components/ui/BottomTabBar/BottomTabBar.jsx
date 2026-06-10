import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { FiHome, FiRepeat, FiCreditCard, FiMoreHorizontal } from 'react-icons/fi';
import { useBottomTabBar } from './useBottomTabBar';

const TAB_ICONS = [
  <FiHome size={22} />,
  <FiRepeat size={22} />,
  <FiCreditCard size={22} />,
  <FiMoreHorizontal size={22} />,
];

export default function BottomTabBar() {
  const { value, handleChange, tabs } = useBottomTabBar();

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        {tabs.map((tab, i) => (
          <BottomNavigationAction
            key={tab.label}
            label={tab.label}
            icon={TAB_ICONS[i]}
            disabled={!tab.path}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
