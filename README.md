# AgroTech SaaS/White-Label

AgroTech é uma solução premium para gestão do agronegócio (fazendas, rebanho, lavouras e finanças), preparada para ser comercializada como:
- Código-fonte completo
- Produto SaaS (Software as a Service)
- Solução White-Label (personalização total de marca)

## Características Principais

* **Arquitetura Agnóstica (BaaS)**: O sistema está arquitetado para suportar **Firebase** ou **Supabase**. O comprador pode escolher qual provedor de backend deseja utilizar apenas alterando uma variável de ambiente, graças aos Adapters injetados via Dependência.
* **White-Label Pronto**: Personalização instantânea via `public/tenant.config.json` para alterar cores, nome, logo e até módulos disponíveis sem tocar no código CSS.
* **Pecuária, Agricultura e Finanças**: Módulos completos com UI premium, gráficos, dark mode e responsividade total.

## Como Executar Localmente

**Pré-requisitos:**
- Node.js (versão 18+)
- Npm ou Yarn
- Projeto no Firebase ou Supabase configurado (Banco de Dados Firestore/Supabase e Autenticação)

### 1. Instalação

```bash
npm install
```

### 2. Configuração do Backend (Firebase ou Supabase)

Crie um arquivo `.env` na raiz do projeto com as chaves do provedor escolhido.

**Para utilizar Firebase:**
```env
VITE_BAAS_PROVIDER=firebase
VITE_FIREBASE_API_KEY=sua_chave
VITE_FIREBASE_AUTH_DOMAIN=seu_dominio
VITE_FIREBASE_PROJECT_ID=seu_projeto
VITE_FIREBASE_STORAGE_BUCKET=seu_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender
VITE_FIREBASE_APP_ID=seu_app_id
```

**Para utilizar Supabase:**
```env
VITE_BAAS_PROVIDER=supabase
VITE_SUPABASE_URL=sua_url
VITE_SUPABASE_ANON_KEY=sua_chave_anon
```

### 3. Configuração de White-Label (Opcional)

Para personalizar a aplicação para o seu cliente, edite o arquivo `public/tenant.config.json`.
Você pode alterar cores primárias, nome do projeto e definir quais módulos (features) estão habilitados (ex: desabilitar 'finances' para um plano mais barato).

### 4. Executando o Projeto

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Banco de Dados (Coleções necessárias)

Caso não tenha dados, o sistema irá criar automaticamente as tabelas baseadas nas chamadas dos Adapters de banco de dados, mas garanta que no seu Supabase ou Firebase as regras de segurança (RLS) permitem leitura/escrita autenticada para as coleções:
- `animals`
- `lots`
- `crops` (futuro)
- `transactions` (futuro)

## Segurança & Dependências

A aplicação passou por auditorias e as dependências críticas foram atualizadas. Em caso de vulnerabilidades detectadas, recomendamos a execução de `npm audit fix`.
