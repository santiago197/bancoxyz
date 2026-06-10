import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../hooks/useLoginMutation';
import { validateEmail, validatePassword } from '../../../utils/validators';

export function useLoginPage() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useLoginMutation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: null, password: null });
  const [rememberDevice, setRememberDevice] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const emailResult = validateEmail(form.email);
    const passwordResult = validatePassword(form.password);

    if (!emailResult.valid || !passwordResult.valid) {
      setErrors({ email: emailResult.error, password: passwordResult.error });
      return;
    }

    mutate(
      { email: form.email, password: form.password },
      { onSuccess: () => navigate('/dashboard') }
    );
  }

  const is401 = isError && error?.response?.status === 401;

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isPending,
    is401,
    rememberDevice,
    handleRememberChange: (e) => setRememberDevice(e.target.checked),
  };
}
