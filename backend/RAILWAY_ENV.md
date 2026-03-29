# Configuração Railway - Julia Semi Joias Backend

## Variáveis de Ambiente Necessárias

Copie e cole estas variáveis na aba "Variables" do Railway:

```
MONGO_URL=${{MongoDB.MONGO_URL}}
DB_NAME=julia_semi_joias
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
ADMIN_EMAIL=admin@juliasemijoias.com
ADMIN_PASSWORD=julia2024
FRONTEND_URL=https://julia-semi-joias.vercel.app
CORS_ORIGINS=https://julia-semi-joias.vercel.app
PORT=${{PORT}}
```

## Notas:

- `MONGO_URL` será automaticamente preenchida quando você adicionar o MongoDB
- `PORT` é automático no Railway
- Atualize `FRONTEND_URL` e `CORS_ORIGINS` com sua URL do Vercel após deploy
