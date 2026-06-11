import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from '../components/auth/AuthGuard';
import LoginPage from '../pages/LoginPage/LoginPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import TransferPage from '../pages/TransferPage/TransferPage';
import TransfersListPage from '../pages/TransfersListPage/TransfersListPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>} />
        <Route path="/transfer" element={<AuthGuard><TransferPage /></AuthGuard>} />
        <Route path="/transfers" element={<AuthGuard><TransfersListPage /></AuthGuard>} />
        <Route path="/settings" element={<AuthGuard><SettingsPage /></AuthGuard>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
