# ⚡ Deploy Rápido - Comandos Essenciais

## 🎯 **RESUMO SUPER RÁPIDO**

### **1. Backend → Railway**
- Upload código `/app/backend` para GitHub
- Railway → New Project → Deploy from GitHub
- Adicionar MongoDB
- Configurar variáveis de ambiente
- Copiar URL gerada

### **2. Frontend → Vercel**
- Upload código `/app/frontend` para GitHub  
- Vercel → New Project → Import repo
- Adicionar variável: `REACT_APP_BACKEND_URL=URL_DO_RAILWAY`
- Deploy!

### **3. Testar**
- Abrir URL do Vercel
- Fazer login no admin
- Pronto! ✅

---

## 📦 **ARQUIVOS JÁ CONFIGURADOS**

Todos os arquivos necessários já estão prontos:

✅ `/app/backend/Procfile` - Config Railway  
✅ `/app/backend/railway.json` - Config Railway  
✅ `/app/frontend/vercel.json` - Config Vercel  
✅ `/app/frontend/package.json` - Build script  

**Você só precisa fazer upload para GitHub e conectar!**

---

## 💰 **CUSTOS**

- Railway: ~R$ 30/mês (aceita cartão BR)
- Vercel: GRÁTIS
- **Total: ~R$ 30/mês**

vs.

- Emergent: ~R$ 120/mês (só cartão internacional)

**Economia: R$ 90/mês = R$ 1.080/ano** 💰

---

## 🆘 **PRECISA DE AJUDA?**

Leia o guia completo: `/app/GUIA_DEPLOY_RAILWAY_VERCEL.md`

Ou me chama que eu te ajudo passo a passo!
