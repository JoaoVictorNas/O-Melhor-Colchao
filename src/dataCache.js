const fetchDataFromUrl = async (url) => {
  try {
      const response = await fetch(url);
      const textData = await response.text();
      const parsedData = parseTextToObjects(textData, url);
      return parsedData;
  } catch (error) {
      console.error(`Erro ao carregar dados da URL ${url}:`, error);
      return null;
  }
};

// Converte o texto em objetos JavaScript (array de objetos)
const parseTextToObjects = (text, url) => {
  const items = text.trim().split("\n\n");

  if (url.includes('compare')) {
    return processCompareData(items);
  }

  const data = items.map(itemText => {
      const object = {};
      const lines = itemText.split("\n");

      lines.forEach((line) => {
        const keyValuePair = line.split("=>");

        if (keyValuePair.length === 2) {
          const key = keyValuePair[0].replace(/[\[\]]/g, '').trim();
          const value = keyValuePair[1].trim();

          const formattedValue = value.startsWith("'") || value.startsWith('"') 
            ? value.slice(1, -1)
            : value;

          object[key] = formattedValue;
        }
      });

      return object;
  });

  return data;
};

// Processa os dados da URL 'compare' e estrutura corretamente as features
const processCompareData = (items) => {
  const compareData = [];
  let currentProduct = null;

  items.forEach(itemText => {
    const object = {};
    const lines = itemText.split("\n");

    lines.forEach((line) => {
      const keyValuePair = line.split("=>");

      if (keyValuePair.length === 2) {
        const key = keyValuePair[0].replace(/[\[\]]/g, '').trim();
        const value = keyValuePair[1].trim();

        const formattedValue = value.startsWith("'") || value.startsWith('"')
          ? value.slice(1, -1)
          : value;

        object[key] = formattedValue;
      }
    });

    // Se o objeto contém uma 'brand', 'id', 'product', é um novo produto
    if (object.id && object.brand) {
      if (currentProduct) {
        compareData.push(currentProduct);
      }
      currentProduct = {
        id: object.id,
        brand: object.brand,
        product: object.product,
        image: object.image,
        site: object.site,
        rating: object.rating,
        reviewCount: object.reviewCount,
        slug: object.slug,
        features: []
      };
    } 
    // Se o objeto contém uma 'feature', é uma feature do produto atual
    else if (currentProduct && object.feature) {
      currentProduct.features.push({
        feature: object.feature,
        rating: object.nota
      });
    }
  });

  if (currentProduct) {
    compareData.push(currentProduct);
  }

  return compareData;
};

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

// Armazena os dados pré-carregados
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

// Pré-carrega todos os dados
const preloadData = async () => {
  dataCache.blog = await fetchDataFromUrl(urls.blog);
  dataCache.orgaos = await fetchDataFromUrl(urls.orgaos);
  dataCache.critColch = await fetchDataFromUrl(urls.critColch);
  dataCache.critMarca = await fetchDataFromUrl(urls.critMarca);
  dataCache.desconto = await fetchDataFromUrl(urls.desconto);
  dataCache.faq = await fetchDataFromUrl(urls.faq);
  dataCache.ranking = await fetchDataFromUrl(urls.ranking);
  dataCache.compare = await fetchDataFromUrl(urls.compare);
  console.log(dataCache.compare);
};

preloadData();

export default dataCache;