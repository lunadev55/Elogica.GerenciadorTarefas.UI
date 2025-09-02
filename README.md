# Task Manager - Frontend Angular

[![Angular](https://img.shields.io/badge/Angular-17+-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Frontend em Angular para o sistema de gerenciamento de tarefas e projetos, consumindo a API .NET do projeto TaskManager.DeveloperEvaluation. Interface moderna e responsiva para gerenciar projetos, tarefas e usuários.

## 🚀 Funcionalidades

- **Autenticação JWT** com tela de login
- **Dashboard** com visão geral dos módulos
- **Gerenciamento de Projetos** - CRUD completo
- **Gerenciamento de Usuários** - CRUD completo
- **Gerenciamento de Tarefas** - CRUD completo
- **Interface Responsiva** com design moderno
- **Navegação Intuitiva** com sidebar
- **Paginação** para listagens
- **Validação de Formulários** em tempo real
- **Modais** para operações de criação e edição

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades-detalhadas)
- [Integração com API](#integração-com-api)
- [Build e Deploy](#build-e-deploy)
- [Contribuindo](#contribuindo)

## 🛠 Pré-requisitos

Certifique-se de ter o seguinte instalado:

- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- API Backend rodando (projeto Ambev .NET)

## 🚀 Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
```

## ⚙️ Configuração

### Configuração da API

Atualize o arquivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7181/api',
  appName: 'Task Manager'
};
```

Para produção, atualize `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://sua-api-producao.com/api',
  appName: 'Task Manager'
};
```

## 🏃‍♂️ Executando a Aplicação

### Desenvolvimento

```bash
ng serve
# ou
npm start
```

A aplicação estará disponível em: `http://localhost:4200`

### Build para Produção

```bash
ng build --configuration production
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/           # Componentes reutilizáveis
│   ├── pages/               # Páginas principais
│   │   ├── login/           # Página de login
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── projects/        # Gerenciamento de projetos
│   │   ├── tasks/           # Gerenciamento de tarefas
│   │   └── users/           # Gerenciamento de usuários
│   ├── services/            # Serviços HTTP e business logic
│   ├── models/              # Interfaces e modelos TypeScript
│   ├── guards/              # Guards de autenticação
│   ├── interceptors/        # HTTP interceptors
│   └── shared/              # Módulos e componentes compartilhados
├── assets/                  # Recursos estáticos
├── environments/            # Configurações de ambiente
└── styles/                  # Estilos globais
```

## 🎯 Funcionalidades Detalhadas

### 🔐 Sistema de Autenticação

- **Tela de Login**: Interface limpa com validação
- **Autenticação JWT**: Token armazenado localmente
- **Guards de Rota**: Proteção de rotas autenticadas
- **Auto-logout**: Em caso de token expirado

### 📊 Dashboard

- **Visão Geral**: Cards com acesso rápido aos módulos
- **Navegação**: Acesso direto para Projetos, Tarefas e Usuários
- **Interface Responsiva**: Adapta-se a diferentes tamanhos de tela

### 📋 Gerenciamento de Projetos

- **Listagem**: Tabela com paginação e filtros
- **Status Visuais**: Badges coloridos (Em Andamento, Concluído, Cancelado, Em Espera)
- **Modal de Detalhes**: Visualização completa do projeto
- **Criação/Edição**: Formulários com validação
- **Ações Rápidas**: Visualizar, editar e excluir

### 👥 Gerenciamento de Usuários

- **CRUD Completo**: Criar, visualizar, editar e excluir usuários
- **Campos**: Nome, E-mail, Telefone, Função, Status
- **Validação**: Formulários com validação em tempo real
- **Funções**: Admin, Manager, Customer
- **Status**: Ativo/Inativo

### ✅ Gerenciamento de Tarefas

- **Organização**: Vinculação com projetos
- **Status de Tarefas**: Diferentes estados visuais
- **Filtros**: Por projeto, status, data
- **Interface Intuitiva**: Fácil criação e edição

## 🔌 Integração com API

### Endpoints Consumidos

| Módulo | Endpoints | Descrição |
|--------|-----------|-----------|
| **Auth** | `POST /api/auth/login` | Autenticação de usuários |
| **Users** | `GET/POST/PUT/DELETE /api/users` | CRUD de usuários |
| **Projects** | `GET/POST/PUT/DELETE /api/projects` | CRUD de projetos |
| **Tasks** | `GET/POST/PUT/DELETE /api/tasks` | CRUD de tarefas |

### Interceptors

- **Auth Interceptor**: Adiciona token JWT automaticamente
- **Error Interceptor**: Tratamento global de erros
- **Loading Interceptor**: Indicadores de carregamento

### Serviços HTTP

```typescript
// Exemplo de serviço
@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(page: number = 1, size: number = 10) {
    return this.http.get<PagedResult<Project>>(`/projects?_page=${page}&_size=${size}`);
  }

  createProject(project: CreateProjectDto) {
    return this.http.post<Project>('/projects', project);
  }
}
```

## 🛠 Stack Tecnológico

### Core
- **Angular 17+** - Framework principal
- **TypeScript 5.0+** - Linguagem de desenvolvimento
- **RxJS** - Programação reativa
- **Angular Material** - Componentes de UI

### Bibliotecas Adicionais
- **Angular Router** - Roteamento
- **Angular Forms** - Formulários reativos
- **Angular HTTP Client** - Consumo de APIs
- **Date-fns** - Manipulação de datas
- **Bootstrap** - Sistema de grid e utilidades CSS

## 🏗️ Build e Deploy

### Build Local

```bash
# Desenvolvimento
ng build

# Produção
ng build --configuration production
```

### Deploy

```bash
# Serve arquivos estáticos
ng serve --host 0.0.0.0 --port 4200

# Deploy para servidor web
# Copie os arquivos da pasta dist/ para seu servidor
```

### Configuração do Servidor Web

Para SPA com roteamento Angular, configure o servidor para redirecionar todas as rotas para `index.html`:

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache:**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 🧪 Testes

### Testes Unitários

```bash
ng test
```

### Testes End-to-End

```bash
ng e2e
```

## 🤝 Contribuindo

### Padrões de Desenvolvimento

- ✅ Seguir Angular Style Guide
- ✅ Usar TypeScript strict mode
- ✅ Implementar testes unitários
- ✅ Seguir padrões de commit semântico
- ✅ Usar OnPush change detection quando possível

### Estrutura de Componentes

```typescript
@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentNameComponent implements OnInit, OnDestroy {
  // Implementação
}
```

### Convenções de Código

- **Nomenclatura**: PascalCase para classes, camelCase para variáveis
- **Organização**: Um componente por arquivo
- **Imports**: Ordenados alfabeticamente
- **Observables**: Usar `takeUntil` para unsubscribe

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:

- **Desktop**: Sidebar expandida com todas as funcionalidades
- **Tablet**: Sidebar colapsável
- **Mobile**: Menu hambúrguer com navegação otimizada

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm start

# Build
npm run build

# Testes
npm test

# Lint
npm run lint

# Análise de bundle
npm run analyze
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Para problemas ou dúvidas:

1. Verifique se a API backend está rodando
2. Confirme as configurações de ambiente
3. Verifique o console do navegador para erros
4. Crie uma issue com detalhes do problema

## 📞 Contato

- **Desenvolvedor**: Seu Nome
- **Email**: seu.email@exemplo.com
- **LinkedIn**: [Seu Perfil](https://linkedin.com/in/seu-perfil)

---

**Desenvolvido com ❤️ e Angular! 🚀**
