import { Alert } from '@mui/material';
import { FiAlertCircle } from 'react-icons/fi';

export default function ErrorMessage({ message, visible = true }) {
  if (!visible || !message) return null;
  return (
    <Alert
      severity="error"
      icon={<FiAlertCircle size={18} />}
      sx={{ mb: 2, borderRadius: '8px' }}
    >
      {message}
    </Alert>
  );
}
