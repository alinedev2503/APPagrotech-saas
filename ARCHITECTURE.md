# Documentação de Arquitetura

O AgroTech foi construído com foco em **escalabilidade**, **manutenibilidade** e **comercialização B2B (SaaS / White-Label / Venda de Código)**.

## 1. Arquitetura Agnóstica de Backend (BaaS)

Para permitir que o produto seja comercializado para clientes que preferem o ecossistema Google (Firebase) ou open-source/PostgreSQL (Supabase), o código implementa o padrão **Adapter**.

### Estrutura:
- `src/domain/interfaces/`: Contém os contratos que qualquer provedor deve cumprir.
  - `IAuthService.ts`: login, logout, getSession.
  - `IDatabaseService.ts`: CRUD genérico (create, update, delete, get, list).
- `src/infrastructure/adapters/`: Contém a implementação concreta para cada serviço.
  - `firebase/`
  - `supabase/`
- `src/infrastructure/config/baas.ts`: Fábrica (Factory) que injeta o adaptador correto em tempo de execução através da variável de ambiente `VITE_BAAS_PROVIDER`.

### Como utilizar na UI (React):
**Nenhum componente React deve importar SDKs do Firebase ou Supabase diretamente.** 
As chamadas são feitas assim:

```typescript
import { databaseService } from '../infrastructure/config/baas';

// Na função de listagem
const data = await databaseService.list<Animal>('animals');
```

## 2. White-Label & Multi-Tenancy Simulado

Para ser vendido como produto White-Label, a personalização de aparência e funcionalidades não deve ser hard-coded.

- A configuração está externalizada no arquivo `/public/tenant.config.json`.
- O `TenantProvider` (`src/contexts/TenantContext.tsx`) faz a leitura desse arquivo durante o bootstrap da aplicação (antes do React Router montar as rotas).
- O Branding (cores hexadecimais) é convertido para HSL e injetado via **CSS Variables** (`--primary`, `--primary-foreground`, etc) diretamente na tag `<html>`. Isso faz com que as classes utilitárias, componentes customizados ou tailwind herdem a cor primária do cliente.
- Funcionalidades (`features`) como "agriculture" e "finances" podem ser alternadas para true/false, e o layout esconderá as rotas automaticamente.

## 3. Segurança e Rotas

A aplicação usa o React Router v6.
- Um `AuthProvider` central (`src/contexts/AuthContext.tsx`) monitora ativamente se existe uma sessão válida (comunicando com o `authService` do BaaS selecionado).
- Rotas privadas estão encapsuladas pelo componente `<ProtectedRoute />`, que redireciona para a `/login` caso não haja usuário.

## 4. Próximos Passos (Evolução Técnica)

1. Conectar outras telas (`Dashboard`, `Agriculture`, `Finances`) utilizando a mesma abordagem implementada na tela de `Animals`.
2. Otimizar as requisições (Caching/SWR ou React Query) no futuro para grandes volumes de dados (milhares de animais).
3. Testes unitários focados nas interfaces e adaptadores.
