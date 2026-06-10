import { useState } from 'react';

export function useInput(type) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  function togglePassword() {
    setShowPassword((v) => !v);
  }

  return { isPassword, inputType, showPassword, togglePassword };
}
