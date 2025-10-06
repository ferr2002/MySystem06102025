/*
================================================================================
RESPONSABILIDADE:
- Conter toda a lógica de banco de dados para a tabela 'usuarios'.
- Adicionar novos funcionários.
- Buscar funcionários existentes.
================================================================================
*/

const { run, all } = require('./database.js');

/**
 * Valida os dados de um funcionário antes de salvar.
 * @param {object} user - O objeto do funcionário. Ex: { nome: 'Nome do Funcionário' }
 */
function validateUser(user) {
  if (!user || typeof user !== 'object') {
    throw new Error('Dados do funcionário inválidos.');
  }
  const { nome } = user;
  if (!nome || String(nome).trim() === '') {
    throw new Error('O nome do funcionário é um campo obrigatório.');
  }
}

/**
 * Adiciona um novo funcionário (usuário) ao banco de dados.
 * @param {object} addUser - O objeto do funcionário a ser adicionado.
 */
async function handleDbAddUser(addUser) {
  validateUser(addUser);

  const { nome } = addUser;

  const sql = `INSERT INTO usuarios (nome) VALUES (?)`;
  const params = [nome];

  try {
    const result = await run(sql, params);
    return {
      success: true,
      message: `Funcionário "${nome}" cadastrado com sucesso!`,
      lastID: result.lastID,
    };
  } catch (err) {
    // Este erro ocorreria se o nome fosse UNIQUE e houvesse uma duplicata.
    if (err.code === 'SQLITE_CONSTRAINT') {
      throw new Error(`Erro: O funcionário com o nome "${nome}" já existe.`);
    }
    throw err;
  }
}

/**
 * Busca por funcionários pelo nome.
 * @param {string} searchTerm - O nome ou parte do nome para buscar.
 * @returns {Promise<Array>} - Uma lista de funcionários encontrados.
 */
async function handleDbSearchUsers(searchTerm = "") {
  // A query base para selecionar os funcionários.
  let sql = `SELECT usuario_id, nome FROM usuarios`;
  const params = [];

  // Se um termo de busca for fornecido, adiciona o filtro.
  if (searchTerm) {
    sql += ` WHERE nome LIKE ?`;
    params.push(`%${searchTerm}%`);
  }
  
  // Ordena os resultados em ordem alfabética para uma lista consistente.
  sql += ` ORDER BY nome ASC`;

  return all(sql, params);
}

module.exports = {
  handleDbAddUser,
  handleDbSearchUsers,
};