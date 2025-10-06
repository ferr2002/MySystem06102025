// Importa apenas os métodos 'all' e 'run' do nosso novo módulo de DB
const { all, run } = require("./database.js");

/**
 * Valida os dados de um produto.
 * @param {object} product - O objeto do produto.
 */
function validateProduct(product) {
  if (!product || typeof product !== "object") {
    throw new Error("Dados do produto inválidos.");
  }
  const { codigoBarra, nomeProduto } = product;
  if (!codigoBarra || !nomeProduto) {
    throw new Error('Os campos "codigoBarra" e "nomeProduto" são obrigatórios.');
  }
  // Uma validação mais simples e talvez mais útil: garantir que o código de barras não seja apenas espaços em branco.
  if (String(codigoBarra).trim() === "") {
    throw new Error("O código de barras não pode estar em branco.");
  }
  if (!/^\d+$/.test(codigoBarra)) {
    throw new Error("O código de barras deve conter apenas números.");
  }
}

/**
 * Busca produtos no banco de dados.
 * @param {string} termoBusca - O termo a ser procurado.
 * @param {string} parametro - A coluna onde a busca será feita.
 * @returns {Promise<Array>}
 */
const handleDbSearch = async (termoBusca = "", parametro) => {
  
  let sql = `SELECT codigoBarra, nomeProduto, valorCusto, valorVista, valorPrazo FROM produtos`;
  const params = [];


  if (termoBusca && parametro) {
    // Whitelist de colunas permitidas para busca para evitar SQL Injection.
    const colunasPermitidas = ['codigoBarra', 'nomeProduto'];
    if (!colunasPermitidas.includes(parametro)) {
        throw new Error("Parâmetro de busca inválido.");
    }

    sql += ` WHERE ${parametro} LIKE ?`;
    params.push(`%${termoBusca}%`);
  }
  

  return all(sql, params);
};


/**
 * Adiciona um novo produto ao banco de dados.
 * @param {object} addProduct - O objeto do produto a ser adicionado.
 */
async function handleDbAddProduct(addProduct) {
  // Reutiliza a função de validação
  validateProduct(addProduct);

  const { codigoBarra, nomeProduto, valorCusto, valorVista, valorPrazo } = addProduct;
  
  const sql = `
    INSERT INTO produtos (codigoBarra, nomeProduto, valorCusto, valorVista, valorPrazo)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [codigoBarra, nomeProduto, valorCusto, valorVista, valorPrazo];

  try {
    const result = await run(sql, params);
    return {
      success: true,
      message: `Produto "${nomeProduto}" adicionado com sucesso!`,
      lastID: result.lastID,
    };
  } catch (err) {
    // Tratamento de erro específico para chave duplicada
    if (err.code === "SQLITE_CONSTRAINT") {
      throw new Error(`Erro: O código de barras "${codigoBarra}" já existe no banco de dados.`);
    }
    // Re-lança outros erros
    throw err;
  }
}

/**
 * Edita um produto existente no banco de dados.
 * @param {object} editProduct - O objeto do produto com os dados a serem atualizados.
 */
async function handleDbEditProduct(editProduct) {
  // Reutiliza a função de validação
  validateProduct(editProduct);

  const { codigoBarra } = editProduct;

  const camposValidos = ['nomeProduto', 'valorCusto', 'valorVista', 'valorPrazo'];
  const camposParaAtualizar = Object.keys(editProduct)
    .filter(key => camposValidos.includes(key));

  if (camposParaAtualizar.length === 0) {
    throw new Error('Nenhum dado válido para atualizar foi fornecido.');
  }

  const setClause = camposParaAtualizar.map(key => `${key} = ?`).join(", ");
  const params = camposParaAtualizar.map(key => editProduct[key]);
  params.push(codigoBarra); // Adiciona o codigoBarra ao final para a cláusula WHERE

  const sql = `UPDATE produtos SET ${setClause} WHERE codigoBarra = ?`;

  const result = await run(sql, params);

  if (result.changes === 0) {
    throw new Error(`Nenhum produto encontrado com o código de barras "${codigoBarra}".`);
  }

  return {
    success: true,
    message: "Produto atualizado com sucesso.",
    changes: result.changes,
  };
}

module.exports = {
  handleDbSearch,
  handleDbAddProduct,
  handleDbEditProduct,
};