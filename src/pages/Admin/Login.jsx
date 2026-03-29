import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const lidarComLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://web-production-d0d6.up.railway.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        alert("Login feito!");
        navigate("/admin/painel-de-controle");
      } else {
        alert("Email ou senha inválidos");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Login</h1>

      <form onSubmit={lidarComLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
