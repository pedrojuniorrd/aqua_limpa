// src/components/modals/RegisterModal.tsx
'use client';

import { useState, MouseEvent } from 'react';
import { signIn } from 'next-auth/react';

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        // Se o registro for bem-sucedido, faz o login automaticamente
        await signIn('credentials', {
          email,
          password,
          redirect: false,
        });
        onClose();
        window.location.reload();
      } else {
        const data = await res.json();
        setError(data.error || 'Falha ao registrar.');
      }
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={handleBackdropClick}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>Criar uma conta</h2>
        <form id="register-form" onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="new-email">E-mail</label>
            <input type="email" id="new-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">Senha</label>
            <input type="password" id="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmar senha</label>
            <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn" disabled={isLoading}>{isLoading ? 'Cadastrando...' : 'Cadastrar'}</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;