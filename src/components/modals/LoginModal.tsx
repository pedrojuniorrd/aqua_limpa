// src/components/modals/LoginModal.tsx
'use client';

import { useState, MouseEvent } from 'react';
import { signIn } from 'next-auth/react';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal = ({ onClose, onSwitchToRegister }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      setError("Email ou senha inválidos!");
      setIsLoading(false);
    } else if (result?.ok) {
      onClose();
      window.location.reload(); // Recarrega para atualizar o estado global da sessão
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
        <h2>Entrar na plataforma</h2>
        <form id="login-form" onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn" disabled={isLoading}>{isLoading ? 'Entrando...' : 'Entrar'}</button>
        </form>
        <p>Não tem uma conta?{' '}<a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>Cadastre-se</a></p>
      </div>
    </div>
  );
};

export default LoginModal;