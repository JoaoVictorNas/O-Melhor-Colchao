const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Usar um pool de conexões
const pool = mysql.createPool({
  host: 'db_melhor_colc.vpshost2821.mysql.dbaas.com.br',
  user: 'db_melhor_colc',
  password: 'a426pRcVE@n@BL',
  database: 'db_melhor_colc',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ======================== ROTAS PARA APARECER NA HOME ======================== 
// Rota para obter dados da tabela ORGAOS
app.get('/api/orgaos', (req, res) => {
  pool.query('SELECT * FROM orgaos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota para obter dados da tabela BLOG
app.get('/api/blog', (req, res) =>{
  pool.query('SELECT * FROM blog', (err, results) =>{
    if(err){
      return res.status(500).json({error: err.message});
    }
    res.json(results);
  });
});

// Rota para obter dados da tabela CRITCOLCH
app.get('/api/critColch', (req, res) =>{
  pool.query('SELECT * FROM critColch', (err, results) =>{
    if(err){
      return res.status(500).json({error: err.message});
    }
    res.json(results);
  });
});

// Rota para obter dados da tabela CRITMARCA
app.get('/api/critMarca', (req, res) =>{
  pool.query('SELECT * FROM critMarca', (err, results) =>{
    if(err){
      return res.status(500).json({error: err.message});
    }
    res.json(results);
  });
});

// Rota para obter dados da tabela DESCONTO
app.get('/api/desconto', (req, res) =>{
  pool.query('SELECT * FROM desconto', (err, results) =>{
    if(err){
      return res.status(500).json({error: err.message});
    }
    res.json(results);
  });
});

// Rota para obter dados da tabela FAQ
app.get('/api/faq', (req, res) =>{
  pool.query('SELECT * FROM faq', (err, results) =>{
    if(err){
      return res.status(500).json({error: err.message});
    }
    res.json(results);
  });
});

// Rota para obter dados da tabela RANKING
app.get('/api/compare', (req, res) => {
  const query = `
    SELECT r.id, r.marca, r.produto, r.url_Imagem AS image, r.link_Produto AS site,
           r.estrelas AS rating, r.qtd_Avaliacoes AS reviewCount, r.slug, rf.feature, rf.nota
    FROM ranking r
    LEFT JOIN ranking_features rf ON r.id = rf.ranking_id
  `;
  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const rankingMap = {};
    results.forEach(row => {
      if (!rankingMap[row.id]) {
        rankingMap[row.id] = {
          id: row.id,
          brand: row.marca,
          product: row.produto,
          image: row.image,
          site: row.site,
          rating: row.rating,
          reviewCount: row.reviewCount,
          slug: row.slug,
          features: []
        };
      }

      if (row.feature) {
        rankingMap[row.id].features.push({
          feature: row.feature,
          rating: row.nota
        });
      }
    });

    const rankingList = Object.values(rankingMap);
    res.json(rankingList);
  });
});

// ====================== ROTAS PARA APARECER NAS PÁGINAS ====================== 
// Rota da página Reviews
app.get('/api/review/:slug', (req, res) => {
  const slug = req.params.slug;
  const query = 'SELECT * FROM ranking WHERE slug = ?';
  pool.query(query, [slug], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Review não encontrado" });
    }
    res.json(results[0]);
  });
});

// Rota da página do blog
app.get('/api/blogs/:slug', (req, res) => {
  const slug = req.params.slug;
  const query = 'SELECT * FROM blog WHERE slug = ?';
  pool.query(query, [slug], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Matéria não encontrada" });
    }
    res.json(results[0]);
  });
});

// ========================= TUDO RELACIONADO AO ADMIN ========================= 
// Rota para criar um novo blog
app.post('/api/blogs', (req, res) => {
  const { slug, title, description, content, image, imageBanner, image2, link } = req.body;

  const query = 'INSERT INTO blog (slug, title, description, content, image, imageBanner, image2, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [slug, title, description, content, image, imageBanner, image2, link];

  pool.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Blog criado com sucesso!', id: results.insertId });
  });
});

// Rota para atualizar um blog existente
app.put('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const { slug, title, description, content, image, imageBanner, image2, link } = req.body;

  const query = 'UPDATE blog SET slug = ?, title = ?, description = ?, content = ?, image = ?, imageBanner = ?, image2 = ?, link = ? WHERE id = ?';
  const values = [slug, title, description, content, image, imageBanner, image2, link, id];

  pool.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Blog atualizado com sucesso!' });
  });
});

// Rota para atualizar os critérios existentes
app.put('/api/criterios/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const query = 'UPDATE criterios SET title = ?, description = ? WHERE id = ?';
  const values = [title, description, id];

  pool.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Critério atualizado com sucesso!' });
  });
});

// Atualiza o desconto 
app.put('/api/desconto/:id', (req, res) => {
  const descontoId = req.params.id;
  const { descricao, botao_Texto } = req.body;

  const query = 'UPDATE desconto SET descricao = ?, botao_Texto = ? WHERE id = ?';
  pool.query(query, [descricao, botao_Texto, descontoId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Desconto atualizado com sucesso!' });
  });
});

// Atualiza o criterios do colchão 
app.put('/api/critColch/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  const query = 'UPDATE critColch SET titulo = ?, descricao = ? WHERE id = ?';
  pool.query(query, [titulo, descricao, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Critério do colchão atualizado com sucesso!' });
  });
});

// Atualiza o criterios de marca
app.put('/api/critMarca/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  const query = 'UPDATE critMarca SET titulo = ?, descricao = ? WHERE id = ?';
  pool.query(query, [titulo, descricao, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Critério de marca atualizado com sucesso!' });
  });
});

// Atualiza os órgãos
app.put('/api/orgaos/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  const query = 'UPDATE orgaos SET titulo = ?, descricao = ? WHERE id = ?';
  pool.query(query, [titulo, descricao, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Órgão regulamentador atualizado com sucesso!' });
  });
});

// Rota para atualizar os itens de comparação
app.put('/api/compare/:id', (req, res) => {
  const { id } = req.params;
  const { brand, product, reviewCount, features } = req.body;

  // Atualiza o item principal de comparação
  const queryCompare = 'UPDATE ranking SET marca = ?, produto = ?, qtd_Avaliacoes = ? WHERE id = ?';
  pool.query(queryCompare, [brand, product, reviewCount, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Atualiza as features associadas ao item de comparação
    const updateFeatures = features.map((feature) => {
      const queryFeature = 'UPDATE ranking_features SET feature = ?, nota = ? WHERE ranking_id = ? AND feature = ?';
      return new Promise((resolve, reject) => {
        pool.query(queryFeature, [feature.feature, feature.rating, id, feature.feature], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });

    // Espera que todas as features sejam atualizadas antes de enviar a resposta
    Promise.all(updateFeatures)
      .then(() => {
        res.json({ message: 'Item de comparação atualizado com sucesso!' });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
});

// Rota para atualizar os FAQs
app.put('/api/faq/:id', (req, res) => {
  const { id } = req.params;
  const { pergunta, resposta } = req.body;

  const query = 'UPDATE faq SET pergunta = ?, resposta = ? WHERE id = ?';
  pool.query(query, [pergunta, resposta, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'FAQ atualizado com sucesso!' });
  });
});

// Rota da página Reviews (Ranking)
app.get('/api/ranking', (req, res) => {
  const query = 'SELECT id, produto, conclusao, sobre_marca, sobre_colchao FROM ranking';
  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota para atualizar os reviews no ranking
app.put('/api/ranking/:id', (req, res) => {
  const { id } = req.params;
  const { produto, conclusao, sobre_marca, sobre_colchao } = req.body;

  const query = 'UPDATE ranking SET produto = ?, conclusao = ?, sobre_marca = ?, sobre_colchao = ? WHERE id = ?';
  const values = [produto, conclusao, sobre_marca, sobre_colchao, id];

  pool.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Review atualizado com sucesso!' });
  });
});

// Rota para atualizar um blog existente
app.put('/api/blog/:id', (req, res) => {
  const { id } = req.params;
  const { slug, titulo, descricao, conteudo } = req.body;

  const query = 'UPDATE blog SET slug = ?, titulo = ?, descricao = ?, conteudo = ? WHERE id = ?';
  const values = [slug, titulo, descricao, conteudo, id];

  pool.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Blog atualizado com sucesso!' });
  });
});

// Rota para criar um novo blog
app.post('/api/blog', (req, res) => {
  const { slug, titulo, descricao, conteudo, url_Imagem, url_Banner, url_Imagem2, caminho } = req.body;

  const query = 'INSERT INTO blog (slug, titulo, descricao, conteudo, url_Imagem, url_Banner, url_Imagem2, caminho) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [slug, titulo, descricao, conteudo, url_Imagem, url_Banner, url_Imagem2, caminho];

  pool.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Blog criado com sucesso!', id: results.insertId });
  });
});


// ========================= TUDO RELACIONADO AO ADMIN =========================
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});