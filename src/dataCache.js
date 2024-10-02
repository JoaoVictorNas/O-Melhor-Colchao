// Função para carregar dados de uma URL e retornar o texto processado
const fetchDataFromUrl = async (url) => {
  try {
      const response = await fetch(url); // Faz a requisição HTTP para a URL
      const textData = await response.text(); // Obtém o texto como resposta
      const parsedData = parseTextToObjects(textData); // Converte o texto em múltiplos objetos
      return parsedData; // Retorna o array de objetos
  } catch (error) {
      console.error(`Erro ao carregar dados da URL ${url}:`, error);
      return null; // Retorna null em caso de erro
  }
};

// Função para converter o texto em múltiplos objetos JavaScript (array de objetos)
const parseTextToObjects = (text) => {
  const items = text.trim().split("\n\n");

  // Itera sobre cada bloco e transforma em um objeto
  const data = items.map(itemText => {
      const object = {};
      const lines = itemText.split("\n"); // Divide o bloco em linhas

      lines.forEach((line) => {
        // Divide cada linha pelo "=>", já que no seu caso isso separa chave e valor
        const keyValuePair = line.split("=>");

        if (keyValuePair.length === 2) {
          const key = keyValuePair[0].replace(/[\[\]]/g, '').trim(); // Remove os colchetes [ ]
          const value = keyValuePair[1].trim(); // Valor já limpo

          // Verifica se o valor é uma string, e remove aspas se necessário
          const formattedValue = value.startsWith("'") || value.startsWith('"') 
            ? value.slice(1, -1) // Remove aspas no início e no final
            : value;

          // Adiciona chave e valor ao objeto
          object[key] = formattedValue;
        }
      });

      return object; // Retorna o objeto criado para este bloco
  });

  return data; // Retorna o array de objetos
};

// URLs das tabelas (ajustadas conforme o PHP)
const urls = {
  blog: 'https://omelhorcolchao.com.br/api.php?path=blog',
  orgaos: 'https://omelhorcolchao.com.br/api.php?path=orgaos',
  critColch: 'https://omelhorcolchao.com.br/api.php?path=critColch',
  critMarca: 'https://omelhorcolchao.com.br/api.php?path=critMarca',
  desconto: 'https://omelhorcolchao.com.br/api.php?path=desconto',
  faq: 'https://omelhorcolchao.com.br/api.php?path=faq',
  ranking: 'https://omelhorcolchao.com.br/api.php?path=ranking',
  compare: 'https://omelhorcolchao.com.br/api.php?path=compare'
};

// Objeto onde armazenaremos os dados pré-carregados de todas as tabelas
const dataCache = {
  blog: null,
  orgaos: null,
  critColch: null,
  critMarca: null,
  desconto: null,
  faq: null,
  ranking: null,
  compare: null
};

// Função para pré-carregar todos os dados
const preloadData = async () => {
  dataCache.blog = await fetchDataFromUrl(urls.blog);
  dataCache.orgaos = await fetchDataFromUrl(urls.orgaos);
  dataCache.critColch = await fetchDataFromUrl(urls.critColch);
  dataCache.critMarca = await fetchDataFromUrl(urls.critMarca);
  dataCache.desconto = await fetchDataFromUrl(urls.desconto);
  dataCache.faq = await fetchDataFromUrl(urls.faq);
  dataCache.ranking = await fetchDataFromUrl(urls.ranking);
  dataCache.compare = await fetchDataFromUrl(urls.compare);
  
};

// Chama a função para carregar os dados quando o arquivo é importado
preloadData();

export default dataCache;