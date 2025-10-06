/*
================================================================================
RESPONSABILIDADE:
- Garantir que todas as tabelas necessárias para o sistema de vendas existam.
- Executar os scripts de criação de tabelas de forma segura (só cria se não existir).
- Popular tabelas de domínio com dados iniciais (ex: formas de pagamento).
================================================================================
*/

// Importamos apenas o método 'run' do nosso módulo de banco de dados.
const { run } = require('../services/database.js');

/**
 * Define e executa os scripts SQL para criar a estrutura de tabelas do sistema.
 * É um processo idempotente, ou seja, pode ser executado várias vezes sem causar erros.
 */
async function setupDatabaseTables() {
  try {
    // --- Tabela: formas_pagamento ---
    // Armazena as formas de pagamento disponíveis (ex: 'avista', 'aprazo', 'pix').
    const createFormasPagamentoTable = `
      CREATE TABLE IF NOT EXISTS formas_pagamento (
        forma_pagamento_id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL UNIQUE
      );
    `;
    await run(createFormasPagamentoTable);

    // --- Tabela: usuarios ---
    // Armazena os usuários que podem realizar vendas.
    const createUsuariosTable = `
      CREATE TABLE IF NOT EXISTS usuarios (
        usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
      );
    `;
    await run(createUsuariosTable);

    // --- Tabela: vendas ---
    // Registra cada transação de venda.
    const createVendasTable = `
      CREATE TABLE IF NOT EXISTS vendas (
        venda_id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        forma_pagamento_id INTEGER NOT NULL,
        data_venda TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        valor_total DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE SET NULL,
        FOREIGN KEY (forma_pagamento_id) REFERENCES formas_pagamento(forma_pagamento_id)
      );
    `;
    await run(createVendasTable);

    // --- Tabela: venda_itens ---
    // Registra cada produto dentro de uma venda.
    const createVendaItensTable = `
      CREATE TABLE IF NOT EXISTS venda_itens (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        venda_id INTEGER NOT NULL,
        produto_codigo_barra TEXT,
        nome_produto TEXT NOT NULL,
        valor_unitario DECIMAL(10, 2) NOT NULL,
        quantidade INTEGER NOT NULL,
        FOREIGN KEY (venda_id) REFERENCES vendas(venda_id) ON DELETE CASCADE,
        FOREIGN KEY (produto_codigo_barra) REFERENCES produtos(codigoBarra) ON DELETE SET NULL
      );
    `;
    await run(createVendaItensTable);

    // --- Popular Dados Iniciais ---
    // Insere os valores padrão na tabela de formas de pagamento.
    // 'INSERT OR IGNORE' garante que não haverá erro se os valores já existirem.
    const populateFormasPagamento = `
      INSERT OR IGNORE INTO formas_pagamento (descricao) VALUES ('avista'), ('aprazo'), ('cartao'), ('pix');
    `;
    await run(populateFormasPagamento);

    console.log("Tabelas do sistema de vendas verificadas com sucesso.");

  } catch (error) {
    console.error("Erro fatal ao configurar as tabelas do banco de dados:", error);
    // Re-lança o erro para que o processo principal possa capturá-lo e, se necessário, encerrar o app.
    throw error;
  }
}

module.exports = { setupDatabaseTables };
