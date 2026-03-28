# Julia Semi Joias - Product Requirements Document

## Visão Geral do Projeto
Landing page moderna e persuasiva para Julia Semi Joias, marca de semi joias em ouro 10K e prata 925, com sistema de gerenciamento administrativo completo.

## Data de Criação
28 de Março de 2024

## Problema Original
Criar uma landing page moderna, responsiva e altamente persuasiva para Julia Semi Joias, que atualmente não possui site. O objetivo é converter visitantes em clientes através do WhatsApp.

## Personas de Usuário
1. **Cliente Final (Mulher)**
   - Busca elegância e sofisticação
   - Valoriza qualidade e preços acessíveis
   - Prefere compra rápida via WhatsApp
   - Interessada em elevar autoestima e estilo

2. **Administrador (Julia)**
   - Precisa gerenciar produtos facilmente
   - Controlar estoque e promoções
   - Atualizar catálogo regularmente

## Requisitos Core (Estáticos)

### Design
- Cores: branco, bege (#D4C4B0), dourado (#D4AF37), rosé (#E8B4B8), chocolate (#6B4E37)
- Tipografia elegante: Playfair Display (títulos) + Inter (corpo)
- Layout minimalista e premium
- Totalmente responsivo (mobile-first)
- Micro-animações suaves

### Funcionalidades Essenciais
1. Landing page com todas as seções persuasivas
2. Catálogo completo de produtos com filtros
3. Sistema de admin com autenticação
4. CRUD completo de produtos
5. Integração WhatsApp em todos os CTAs
6. Botão flutuante WhatsApp

### Categorias de Produtos
- **Ouro 10K**: ~10 produtos
- **Prata 925**: ~8 produtos  
- **Nova Coleção**: 5 produtos (15% desconto)

## O Que Foi Implementado

### Fase 1 - Frontend com Mock Data ✅ (28/03/2024)

### Fase 2 - Backend Completo + Integração ✅ (28/03/2024)

#### Páginas Criadas
1. **Home (Landing Page)**
   - Hero section com headline emocional
   - Seção de benefícios (5 cards)
   - Produtos em destaque por categoria
   - Depoimentos de clientes
   - Seção de confiança
   - Seção de urgência
   - CTA final WhatsApp
   - Header fixo com contatos
   - Footer
   - Botão flutuante WhatsApp com animação pulse

2. **Catálogo Completo**
   - Sistema de tabs (Todos, Nova Coleção, Ouro 10K, Prata 925)
   - Grid responsivo de produtos
   - Contador de produtos
   - Filtros funcionais

3. **Admin Login**
   - Autenticação com email/senha
   - Credenciais demo visíveis
   - Design elegante centralizado

4. **Admin Dashboard**
   - CRUD completo de produtos
   - Upload de imagem via URL
   - Gerenciamento de promoções (% desconto)
   - Controle de estoque (disponível/esgotado)
   - Marcar produtos como destaque
   - Filtros por categoria
   - Cards com preview de produtos
   - Ações: Editar e Excluir

#### Componentes Reutilizáveis
- Header
- Footer
- WhatsAppFloat
- ProductCard

#### Mock Data
- 23 produtos distribuídos nas categorias
- Depoimentos de clientes
- Benefícios da marca
- Itens de confiança

#### Tecnologias Utilizadas
- React 19
- React Router DOM 7
- Shadcn/UI components
- Tailwind CSS
- Lucide React (ícones)
- Sonner (toasts)
- Font Awesome (WhatsApp icon)

### Fase 2 - Backend Completo + Integração ✅ (28/03/2024)

#### Backend API (FastAPI + MongoDB)
- **Autenticação JWT**
  - Login com email e senha
  - Tokens em httpOnly cookies (access_token + refresh_token)
  - Hash de senha com bcrypt
  - Middleware de autenticação
  - Admin seeding automático

- **Endpoints de Produtos**
  - GET /api/products - Listar todos os produtos (com filtro opcional por categoria)
  - GET /api/products/{id} - Buscar produto específico
  - POST /api/products - Criar produto (autenticado)
  - PUT /api/products/{id} - Atualizar produto (autenticado)
  - DELETE /api/products/{id} - Deletar produto (autenticado)

- **Endpoints de Autenticação**
  - POST /api/auth/login - Login
  - GET /api/auth/me - Verificar usuário logado
  - POST /api/auth/logout - Logout

#### Frontend Integrado
- Removido mock data completamente
- Service API com axios (withCredentials)
- Admin Dashboard totalmente funcional:
  - Adicionar produtos com upload de imagem (URL)
  - Editar produtos existentes
  - Excluir produtos
  - Filtrar por categoria
  - Marcar como destaque
  - Controlar estoque
  - Gerenciar promoções
- Homepage e Catálogo carregando produtos do backend
- Autenticação real com cookies

#### Banco de Dados
- MongoDB com 14 produtos iniciais
- Indexes criados automaticamente
- Collections: users, products
- Admin user seeded automaticamente

#### Segurança
- Senhas hashadas com bcrypt
- JWT tokens em httpOnly cookies
- CORS configurado corretamente
- Proteção de rotas autenticadas

## Backlog Priorizado

### ✅ P0 Completo - Backend e Integração
- [x] Implementar API FastAPI com MongoDB
- [x] Modelo de dados para Products
- [x] Modelo de dados para Admin Users
- [x] Endpoints CRUD de produtos
- [x] Autenticação JWT para admin
- [x] Integração frontend-backend
- [x] Seed de produtos iniciais

### P1 (Melhorias Futuras)
- [ ] Upload de imagens direto (não apenas URL)
- [ ] Sistema de upload para S3 ou Cloudinary
- [ ] Analytics de conversão
- [ ] Sistema de newsletter
- [ ] Galeria de imagens por produto (múltiplas fotos)
- [ ] Wishlist de produtos
- [ ] Compartilhamento social
- [ ] SEO optimization
- [ ] Deploy permanente

### P2 (Nice to Have)
- [ ] Blog de conteúdo
- [ ] Programa de fidelidade
- [ ] Chat online
- [ ] Integração Instagram feed
- [ ] Notificações push
- [ ] Aplicativo mobile

## Próximas Tarefas
1. ✅ Backend completo implementado
2. ✅ Autenticação funcionando
3. ✅ CRUD de produtos operacional
4. **Próximo:** Deploy permanente para começar a vender
5. Adicionar upload direto de imagens
6. Implementar sistema de newsletter

## Credenciais de Demonstração
**Admin:**
- Email: admin@juliasemijoias.com
- Senha: julia2024

## Links Importantes
- WhatsApp: (11) 99448-1308
- Instagram: @juliahfeitosa
- Preview: https://julia-semi-joias.preview.emergentagent.com
