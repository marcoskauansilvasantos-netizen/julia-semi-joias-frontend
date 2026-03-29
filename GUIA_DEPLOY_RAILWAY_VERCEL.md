# 🚀 Guia de Deploy - Railway + Vercel

## Julia Semi Joias - Migração Completa

---

## 📋 **PRÉ-REQUISITOS**

✅ Conta no Railway: https://railway.app  
✅ Conta no Vercel: https://vercel.com  
✅ Ambas conectadas ao GitHub (recomendado)

---

## PARTE 1: DEPLOY DO BACKEND (Railway)

### **Passo 1: Criar Projeto no Railway**

1. Acesse https://railway.app
2. Clique em **"New Project"**
3. Escolha **"Deploy from GitHub repo"**
4. Se não tiver conectado: conecte sua conta GitHub
5. **IMPORTANTE:** Você precisa fazer fork/upload do código para seu GitHub primeiro

### **Passo 2: Upload do Código Backend para GitHub**

**Opção A - Via Terminal (se tiver Git instalado):**

```bash
# Criar repositório no GitHub primeiro (github.com/new)
# Nome: julia-semi-joias-backend

cd /app/backend

git init
git add .
git commit -m "Initial commit - Backend Julia Semi Joias"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/julia-semi-joias-backend.git
git push -u origin main
```

**Opção B - Via Interface do GitHub:**

1. Vá em https://github.com/new
2. Nome do repositório: `julia-semi-joias-backend`
3. Público ou Privado (sua escolha)
4. Clique em **"Create repository"**
5. Faça upload de todos os arquivos da pasta `/app/backend`

### **Passo 3: Conectar Railway ao Repositório**

1. No Railway, escolha o repositório `julia-semi-joias-backend`
2. Railway vai detectar que é Python automaticamente
3. Aguarde o build (2-3 minutos)

### **Passo 4: Adicionar MongoDB no Railway**

1. No mesmo projeto Railway, clique em **"+ New"**
2. Escolha **"Database" → "Add MongoDB"**
3. Railway vai criar um MongoDB automático
4. Anote a string de conexão que aparece

### **Passo 5: Configurar Variáveis de Ambiente**

No Railway, clique no serviço do backend e vá em **"Variables"**:

Adicione estas variáveis:

```
MONGO_URL=mongodb://mongo:SENHA@MONGODB_HOST:PORT/railway
DB_NAME=julia_semi_joias
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
ADMIN_EMAIL=admin@juliasemijoias.com
ADMIN_PASSWORD=julia2024
FRONTEND_URL=https://julia-semi-joias.vercel.app
CORS_ORIGINS=https://julia-semi-joias.vercel.app
PORT=8000
```

**IMPORTANTE:** 
- A `MONGO_URL` será preenchida automaticamente pelo Railway quando você conectar o MongoDB
- Ou copie da aba "Connect" do MongoDB no Railway

### **Passo 6: Obter URL do Backend**

1. Após o deploy, clique em **"Settings"**
2. Em **"Domains"**, clique em **"Generate Domain"**
3. Railway vai gerar algo como: `julia-semi-joias-backend.up.railway.app`
4. **COPIE ESSA URL** - você vai precisar!

---

## PARTE 2: DEPLOY DO FRONTEND (Vercel)

### **Passo 1: Upload do Código Frontend para GitHub**

**Criar novo repositório:**

1. Vá em https://github.com/new
2. Nome: `julia-semi-joias-frontend`
3. Faça upload de todos os arquivos da pasta `/app/frontend`

### **Passo 2: Deploy no Vercel**

1. Acesse https://vercel.com
2. Clique em **"Add New Project"**
3. Escolha **"Import Git Repository"**
4. Selecione `julia-semi-joias-frontend`
5. **Configure o build:**
   - Framework Preset: **Create React App**
   - Build Command: `yarn build`
   - Output Directory: `build`
   - Install Command: `yarn install`

### **Passo 3: Configurar Variável de Ambiente**

Antes de fazer deploy, em **"Environment Variables"**:

```
REACT_APP_BACKEND_URL=https://julia-semi-joias-backend.up.railway.app
```

⚠️ **IMPORTANTE:** Substitua pela URL que você copiou do Railway!

### **Passo 4: Deploy**

1. Clique em **"Deploy"**
2. Aguarde 3-5 minutos
3. Vercel vai gerar uma URL: `julia-semi-joias.vercel.app`

---

## PARTE 3: ATUALIZAR CORS NO BACKEND

1. Volte no Railway
2. Vá em **"Variables"** do backend
3. Atualize `FRONTEND_URL` e `CORS_ORIGINS` com a URL do Vercel:

```
FRONTEND_URL=https://julia-semi-joias.vercel.app
CORS_ORIGINS=https://julia-semi-joias.vercel.app
```

4. Railway vai fazer redeploy automático

---

## ✅ **VERIFICAÇÃO FINAL**

Teste se está tudo funcionando:

1. **Frontend:** Abra `https://julia-semi-joias.vercel.app`
2. **Teste a homepage:** Produtos devem carregar
3. **Teste o admin:** 
   - Vá em `/admin/login`
   - Login: admin@juliasemijoias.com
   - Senha: julia2024
4. **Teste adicionar produto:** Deve funcionar!

---

## 💰 **CUSTOS MENSAIS**

**Railway (Backend + MongoDB):**
- Primeiro mês: $5 grátis
- Depois: ~$5-10/mês (R$ 25-50)
- Pagamento: Cartão de crédito brasileiro

**Vercel (Frontend):**
- 100% GRÁTIS
- Plano Hobby

**Total: R$ 25-50/mês** 🎉

---

## 🔧 **GERENCIAMENTO CONTÍNUO**

### **Para atualizar o site:**

**Frontend (Vercel):**
1. Faça alterações no código
2. Commit no GitHub
3. Vercel faz deploy automático!

**Backend (Railway):**
1. Faça alterações no código
2. Commit no GitHub
3. Railway faz deploy automático!

### **Logs e Monitoramento:**

**Railway:**
- Clique no serviço → "Logs"
- Ver erros em tempo real

**Vercel:**
- Dashboard → "Deployments"
- Ver status de cada deploy

---

## ⚠️ **TROUBLESHOOTING**

**Problema: Backend não conecta ao MongoDB**
- Verifique se adicionou o MongoDB no Railway
- Verifique a variável `MONGO_URL`

**Problema: Frontend não conecta ao backend**
- Verifique `REACT_APP_BACKEND_URL` no Vercel
- Verifique CORS no backend

**Problema: Admin não consegue fazer login**
- Aguarde 1-2 minutos após primeiro deploy
- Admin é criado automaticamente no startup

---

## 📞 **SUPORTE**

**Railway:** https://railway.app/help  
**Vercel:** https://vercel.com/support

**Documentação:**
- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs

---

## 🎯 **PRÓXIMOS PASSOS (OPCIONAL)**

1. **Domínio próprio no Vercel:**
   - Settings → Domains → Add
   - Configure DNS conforme instruções
   - Grátis!

2. **Domínio próprio no Railway:**
   - Settings → Domains → Custom Domain
   - Configure DNS
   - Grátis!

---

## ✨ **VANTAGENS DA NOVA CONFIGURAÇÃO**

✅ Custo 75% menor (R$ 120 → R$ 30-50)  
✅ Pagamento com cartão brasileiro  
✅ Deploy automático (Git push)  
✅ Frontend grátis para sempre  
✅ Escalável  
✅ Logs em tempo real  
✅ SSL/HTTPS automático  
✅ CDN global (Vercel)  

---

**Boa sorte com o deploy! 🚀**

Se tiver alguma dúvida durante o processo, me chama!
