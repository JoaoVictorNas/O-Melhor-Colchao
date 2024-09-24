### README.md para o Projeto **O Melhor Colchão**

---
<!-- Nome banco de dados: db_melhor_colc -->
<!-- Senha do banco: a426pRcVE@n@BL -->
<!-- Endereço do banco: db_melhor_colc.vpshost2821.mysql.dbaas.com.br  -->

# O Melhor Colchão

**O Melhor Colchão** é uma aplicação web abrangente projetada para gerenciar e exibir produtos de colchões, avaliações, comparações e conteúdo relacionado. O projeto inclui um painel administrativo robusto que permite editar e gerenciar várias seções, como critérios, sliders, comparações, organizações, descontos, blogs, FAQs e avaliações. A aplicação é construída com React no frontend e Express.js no backend, com dados armazenados em um arquivo JSON.

## Sumário

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Endpoints da API](#endpoints-da-api)
- [Guia do Painel Administrativo](#guia-do-painel-administrativo)
- [Implantação](#implantação)
- [Melhorias Futuras](#melhorias-futuras)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral do Projeto

**O Melhor Colchão** é uma plataforma que serve tanto para clientes quanto para administradores. Os clientes podem visualizar e comparar produtos de colchões, ler avaliações detalhadas e explorar o conteúdo do blog. Os administradores têm acesso a um painel onde podem gerenciar o conteúdo exibido no site público.

O objetivo principal deste projeto é fornecer uma interface intuitiva para os clientes tomarem decisões informadas sobre a compra de colchões, enquanto permite que os administradores gerenciem e atualizem o conteúdo de forma eficiente.

## Funcionalidades

### Funcionalidades para Clientes

- **Comparação de Produtos**: Permite que os usuários comparem diferentes produtos de colchões com base em vários critérios, como conforto, durabilidade e suporte.
- **Avaliações**: Avaliações detalhadas de colchões, incluindo conclusões e informações sobre a marca.
- **Seção de Blog**: Artigos e posts de blog relacionados a sono, colchões e outros temas.
- **FAQs**: Perguntas frequentes para ajudar os usuários a tomarem decisões informadas.

### Funcionalidades do Painel Administrativo

- **Gestão de Critérios**: Editar e atualizar os critérios usados para a comparação de produtos.
- **Gestão de Sliders**: Gerenciar sliders na página inicial com características chave dos produtos.
- **Gestão de Comparações**: Editar e atualizar os detalhes das comparações de produtos.
- **Gestão de Organizações**: Gerenciar informações sobre organizações certificadoras.
- **Gestão de Descontos**: Configurar e gerenciar descontos disponíveis na plataforma.
- **Gestão de Blogs**: Criar, editar e excluir posts de blog.
- **Gestão de FAQs**: Gerenciar perguntas frequentes.

## Tecnologias Utilizadas

- **Frontend**: React.js
- **Backend**: Express.js
- **Banco de Dados**: Dados armazenados em um arquivo JSON
- **Gerenciamento de Estado**: React Hooks
- **Estilização**: CSS personalizado
- **Editor de Texto**: ReactQuill para edição de conteúdo de blogs e reviews
- **Autenticação**: Implementada com tokens simulados no localStorage

## Instalação e Configuração

### Requisitos

- Node.js (v14 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/JoaoVictorNas/O-Melhor-Colchao.git
   cd o-melhor-colchao
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   # ou
   yarn start
   ```

4. **Acesse o aplicativo:**
   Abra o navegador e vá para `http://localhost:3000`.

## Estrutura de Pastas

A estrutura básica do projeto é a seguinte:

```
o-melhor-colchao/
│
├── public/                 # Arquivos públicos
├── src/                    # Código-fonte
│   ├── components/         # Componentes React reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   ├── styles/             # Arquivos de estilo (CSS)
│   ├── App.js              # Componente principal
│   ├── index.js            # Ponto de entrada do React
│   └── ...                 # Outros arquivos e pastas
├── api/                 # Backend Express.js
│   ├── index.js            # Servidor Express
│   ├── data.json           # Banco de dados JSON
│   └── ...                 # Outros arquivos e pastas
├── package.json            # Configuração do npm/yarn
└── README.md               # Documentação do projeto
```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

- **`npm start` ou `yarn start`**: Inicia o servidor de desenvolvimento.
- **`npm run build` ou `yarn build`**: Cria uma versão otimizada para produção do aplicativo.
- **`npm test` ou `yarn test`**: Executa os testes.
- **`npm run lint` ou `yarn lint`**: Verifica erros de linting no código.

## Endpoints da API

- **GET `/api/criterios`**: Retorna todos os critérios.
- **PUT `/api/criterios/:id`**: Atualiza um critério específico.
- **GET `/api/slider`**: Retorna todos os sliders.
- **PUT `/api/slider/:id`**: Atualiza um slider específico.
- **GET `/api/compare`**: Retorna todos os itens de comparação.
- **PUT `/api/compare/:id`**: Atualiza um item de comparação específico.
- **GET `/api/orgaos`**: Retorna todos os órgãos.
- **PUT `/api/orgaos/:id`**: Atualiza um órgão específico.
- **GET `/api/desconto`**: Retorna os dados de desconto.
- **PUT `/api/desconto/:id`**: Atualiza o desconto específico.
- **GET `/api/blogs`**: Retorna todos os blogs.
- **POST `/api/blogs`**: Cria um novo post de blog.
- **PUT `/api/blogs/:id`**: Atualiza um post de blog específico.
- **GET `/api/faq`**: Retorna todos os FAQs.
- **PUT `/api/faq/:id`**: Atualiza um FAQ específico.
- **GET `/api/review/:url`**: Retorna um review baseado na URL.

## Guia do Painel Administrativo

### Acesso ao Painel

1. **Login**: Para acessar o painel administrativo, faça login usando as credenciais fornecidas. Se o token de autenticação não estiver presente, o usuário será redirecionado para a tela de login.

2. **Logout**: Para deslogar, use o botão de logout no cabeçalho. Isso removerá o token de autenticação do localStorage e redirecionará para a tela de login.

### Seções do Painel

- **Home**: Tela inicial do painel com mensagens de boas-vindas.
- **Critérios**: Editar os critérios de comparação de produtos.
- **Slider**: Gerenciar os sliders da página inicial.
- **Comparação**: Editar os detalhes das comparações de produtos.
- **Organizações**: Gerenciar informações sobre organizações certificadoras.
- **Descontos**: Configurar descontos disponíveis no site.
- **Blogs**: Criar, editar e excluir posts de blog.
- **FAQs**: Gerenciar perguntas frequentes.
- **Reviews**: Editar avaliações de produtos.

### Editando Conteúdo

Em cada seção, selecione o item que deseja editar. As mudanças podem ser salvas clicando no botão "Salvar". Para criar novos blogs, preencha os campos necessários e clique em "Criar Blog".

## Implantação

Para implantar o projeto em produção:

1. **Construa a aplicação:**
   ```bash
   npm run build
   # ou
   yarn build
   ```

2. **Suba os arquivos gerados para seu servidor de hospedagem.**

3. **Inicie o servidor backend com o comando:**
   ```bash
   node index.js
   ```

## Melhorias Futuras

- Implementar autenticação com tokens JWT para maior segurança.
- Adicionar suporte para múltiplos usuários com diferentes níveis de acesso.
- Melhorar a interface do usuário com mais opções de personalização.
- Implementar testes unitários e de integração para garantir a estabilidade do sistema.

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. **Fork o repositório**
2. **Crie uma nova branch**
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. **Faça as alterações desejadas**
4. **Envie um Pull Request**

## Licença

Este projeto é licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais informações.

