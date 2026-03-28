import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { authAPI, formatApiErrorDetail } from '../../services/api';
import { toast } from 'sonner';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await authAPI.login(email, password);
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminUser', JSON.stringify(user));
      toast.success('Login realizado com sucesso!');
      navigate('/admin/dashboard');
    } catch (error) {
      const errorMsg = formatApiErrorDetail(error.response?.data?.detail) || error.message;
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <Card className="login-card">
          <CardHeader className="login-header">
            <CardTitle className="login-title">Julia Semi Joias</CardTitle>
            <CardDescription className="login-description">
              Painel Administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@juliasemijoias.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
            <div className="demo-credentials">
              <p className="demo-title">Credenciais de demonstração:</p>
              <p className="demo-text">Email: admin@juliasemijoias.com</p>
              <p className="demo-text">Senha: julia2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
