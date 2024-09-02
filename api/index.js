const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Carrega dados do arquivo JSON
const loadData = () => {
  try {
    const dataBuffer = fs.readFileSync(dataFilePath);
    return JSON.parse(dataBuffer);
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return { criterios: [], slider: [], compare: [], orgaos: [], users: [], desconto: [], blogs: [], faq: [] };
  }
};

// Salva dados no arquivo JSON
const saveData = (data) => {
  try {
    const dataJSON = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath, dataJSON);
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

let { criterios, slider, compare, orgaos, users, desconto, blogs, faq } = loadData();

// Função genérica para atualização de itens
const updateItem = (collection, id, updates) => {
  const index = collection.findIndex(item => item.id === parseInt(id));
  
  if (index !== -1) {
    collection[index] = { ...collection[index], ...updates };
    saveData({ criterios, slider, compare, orgaos, users, desconto, blogs, faq });
    return { success: true, message: 'Item atualizado com sucesso!' };
  } else {
    return { success: false, message: 'Item não encontrado!' };
  }
};

// Rotas para listar e atualizar critérios
app.get('/api/criterios', (req, res) => res.json(criterios));

app.put('/api/criterios/:id', (req, res) => {
  const result = updateItem(criterios, req.params.id, req.body);
  res.status(result.success ? 200 : 404).json({ message: result.message });
});

// Rotas para listar e atualizar órgãos
app.get('/api/orgaos', (req, res) => res.json(orgaos));

app.put('/api/orgaos/:id', (req, res) => {
  const result = updateItem(orgaos, req.params.id, req.body);
  res.status(result.success ? 200 : 404).json({ message: result.message });
});

// Rotas para listar e atualizar descontos
app.get('/api/desconto', (req, res) => res.json(desconto));

app.put('/api/desconto/:id', (req, res) => {
  const result = updateItem(desconto, req.params.id, req.body);
  res.status(result.success ? 200 : 404).json({ message: result.message });
});

// Rotas para listar e atualizar sliders
app.get('/api/slider', (req, res) => res.json(slider));

app.put('/api/slider/:id', (req, res) => {
  const result = updateItem(slider, req.params.id, req.body);
  res.status(result.success ? 200 : 404).json({ message: result.message });
});

// Rotas para listar e atualizar itens do Compare
app.get('/api/compare', (req, res) => res.json(compare));

app.put('/api/compare/:id', (req, res) => {
  const result = updateItem(compare, req.params.id, req.body);
  res.status(result.success ? 200 : 404).json({ message: result.message });
});

// Rota para listar todos os usuários
app.get('/api/users', (req, res) => res.json(users));

// Rota para realizar login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = 'someauthtoken'; // Simulação de token de autenticação
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: 'Credenciais inválidas' });
  }
});

// Rotas para listar, criar e atualizar blogs
app.get('/api/blogs', (req, res) => res.json(blogs));

app.post('/api/blogs', (req, res) => {
  const newId = blogs.length > 0 ? Math.max(...blogs.map(blog => blog.id)) + 1 : 1;

  const newBlog = {
    id: newId,
    ...req.body,
    image: `https://bfbaby.com.br/up/blog-${Date.now()}.png`,
    imageBanner: `https://bfbaby.com.br/up/materia-${Date.now()}.png`,
    image2: `https://bfbaby.com.br/up/pageblog-${Date.now()}.png`,
    link: `/materia/${req.body.slug}`
  };

  blogs.push(newBlog);
  
  try {
    saveData({ criterios, slider, compare, orgaos, users, desconto, blogs, faq });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    res.status(500).json({ message: 'Erro ao salvar o blog.' });
  }
});

app.put('/api/blogs/:id', (req, res) => {
  const blogIndex = blogs.findIndex(b => b.id === parseInt(req.params.id));

  if (blogIndex !== -1) {
    blogs[blogIndex] = { ...blogs[blogIndex], ...req.body };
    saveData({ criterios, slider, compare, orgaos, users, desconto, blogs, faq });
    res.status(200).json({ message: 'Blog atualizado com sucesso!' });
  } else {
    res.status(404).json({ message: 'Blog não encontrado!' });
  }
});

// Rotas para listar e atualizar FAQs
app.get('/api/faq', (req, res) => {
  res.json(faq);
});

app.put('/api/faq/:id', (req, res) => {
  const result = updateItem(faq, req.params.id, req.body);
  res.status(result.success ? 200 : 404).json({ message: result.message });
});

// Rota para obter um review por URL
app.get('/api/review/:url', (req, res) => {
  const reviewItem = compare.find(item => item.url === req.params.url);

  if (reviewItem) {
    res.json({
      id: reviewItem.id,
      product: reviewItem.product,
      conclusao: reviewItem.conclusao,
      sobre_marca: reviewItem.sobre_marca,
      sobre_colchao: reviewItem.sobre_colchao
    });
  } else {
    res.status(404).json({ message: 'Review não encontrado' });
  }
});

// Rota para obter uma matéria por slug
app.get('/api/blogs/:slug', (req, res) => {
  const blog = blogs.find(b => b.slug === req.params.slug);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Matéria não encontrada' });
  }
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});