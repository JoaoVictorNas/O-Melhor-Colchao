# Projeto do site O Melhor Colchão

## Visão Geral

Este projeto é uma aplicação web voltada para o gerenciamento de conteúdo de uma plataforma. Ela permite que os administradores gerenciem diversas seções do site, como critérios, sliders, comparações, órgãos, descontos, FAQs e blogs, por meio de uma interface administrativa amigável.

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte maneira:


### Descrição das Pastas e Arquivos

- **/Pages/AdminPage**: Contém a página administrativa principal e os componentes que compõem a interface de administração, como cabeçalhos, barras laterais e seções específicas.
- **/Pages/Blog**: Contém a página de blog onde os artigos são exibidos.
- **/Pages/Materia**: Contém a página específica para exibir uma matéria ou artigo.
- **/Pages/Review**: Contém a página de review dos produtos.
- **/data/data.json**: Arquivo que armazena os dados persistentes do projeto, como critérios, sliders, comparações, FAQs, entre outros.
- **/src/index.js**: Arquivo principal do backend, onde as rotas da API são definidas e o servidor é configurado.
- **/components**: Contém componentes reutilizáveis como cabeçalhos, rodapés e carrosséis de blogs.

## Funcionalidades Principais

- **AdminPage**: Interface principal para administração, onde diferentes seções podem ser gerenciadas.
- **Blog**: Exibição de artigos e matérias.
- **Review**: Página para exibir avaliações e detalhes dos produtos.
- **FAQ**: Gestão e exibição de perguntas frequentes, tanto na página pública quanto na interface administrativa.
- **Carrosséis**: Exibição de conteúdo em carrossel, como blogs e sliders.

## Como Usar

### Pré-requisitos

- Node.js e npm instalados
- Um editor de texto como Visual Studio Code

### Passos para Rodar o Projeto

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. Navegue até a pasta do projeto:
    ```bash
    cd seu-repositorio
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Inicie o servidor:
    ```bash
    npm start
    ```

5. Abra o navegador e acesse:
    ```
    http://localhost:3000
    ```

### Estrutura do Backend

O backend do projeto é implementado em Node.js usando o framework Express. Ele fornece rotas para gerenciar os dados das seções de critério, sliders, comparações, órgãos, descontos, FAQs e blogs.

Exemplo de uma rota GET para buscar critérios:
```javascript
app.get('/api/criterios', (req, res) => res.json(criterios));
```
Exemplo de uma rota PUT para buscar critérios:
```javascript
app.put('/api/criterios/:id', (req, res) => {
  const result = updateItem(criterios, req.params.id, req.body);
  res.status(result.success ? 200 : 404).json({ message: result.message });
});
```

Usando a Página Admin
Login: Acesse o painel administrativo via /login e insira suas credenciais.
Navegação: Use a sidebar para navegar entre as seções (Criterios, Slider, Compare, Orgaos, Desconto, FAQ, Blogs).
Edição de Conteúdo: Em cada seção, edite os campos desejados e clique em "Salvar" para persistir as mudanças.
Exemplo Prático
Se você quiser adicionar um novo blog:

Navegue até a seção Blogs.
Preencha os campos necessários para criar um novo blog (slug, título, descrição, conteúdo).
Clique em "Salvar" para adicionar o novo blog.