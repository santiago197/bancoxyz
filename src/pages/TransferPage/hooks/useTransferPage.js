import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransferMutation } from '../../../hooks/useTransferMutation';
import { validateAmount, validateDate, validateDocument } from '../../../utils/validators';

const today = () => new Date().toISOString().split('T')[0];

export function useTransferPage() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useTransferMutation();

  const [form, setForm] = useState({
    valor: '',
    moneda: 'COP',
    documento_pagador: '',
    fecha_transferencia: today(),
  });

  const [errors, setErrors] = useState({
    valor: null,
    documento_pagador: null,
    fecha_transferencia: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const amountResult = validateAmount(form.valor);
    const dateResult = validateDate(form.fecha_transferencia);
    const documentResult = validateDocument(form.documento_pagador);

    if (!amountResult.valid || !dateResult.valid || !documentResult.valid) {
      setErrors({
        valor: amountResult.error,
        fecha_transferencia: dateResult.error,
        documento_pagador: documentResult.error,
      });
      return;
    }

    mutate(
      {
        valor: Number(form.valor),
        moneda: form.moneda,
        documento_pagador: form.documento_pagador,
        fecha_transferencia: form.fecha_transferencia,
      },
      { onSuccess: () => navigate('/transfers') }
    );
  }

  const isScheduled = form.fecha_transferencia > today();
  const apiError = error?.response?.data?.message ?? null;

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isPending,
    isError,
    isScheduled,
    apiError,
  };
}
