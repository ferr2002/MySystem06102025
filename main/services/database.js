/*
RESPONSABILIDADE:
- Gerenciar a conexão única com o banco de dados.
- Fornecer métodos "promisificados" para interagir com o banco.
- Centralizar a lógica de inicialização e caminho do DB.
================================================================================
*/
const { app } = require("electron");
const path = require("node:path");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

// Variável para manter a instância única do banco de dados.
let db = null;

/**
 * Inicializa o banco de dados: gerencia os arquivos e abre a conexão.
 * Deve ser chamada uma única vez quando o app inicia.
 */
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    // A lógica de gerenciamento de arquivos foi movida para cá.
    const userDataPath = app.getPath('userData');
    const databaseDir = path.join(userDataPath, "database");

    try {
      fs.mkdirSync(databaseDir, { recursive: true });
    } catch (error) {
      console.error("Erro ao criar a pasta de dados: ", error);
      return reject(error);
    }

    const dbPath = path.join(databaseDir, 'database.db');
    const sourcePath = app.isPackaged
      ? path.join(process.resourcesPath, "assets/loja.db")
      : path.join(__dirname, "..", "..", "assets/loja.db"); // Ajuste o caminho se necessário

    if (!fs.existsSync(dbPath)) {
      try {
        fs.copyFileSync(sourcePath, dbPath);
        fs.chmodSync(dbPath, 0o600);
        console.log('Banco de dados copiado com sucesso para:', dbPath);
      } catch (error) {
        console.error('Erro ao copiar o banco de dados:', error);
        return reject(error);
      }
    }

    // Abre a conexão única que será reutilizada.
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
        return reject(err);
      }
      console.log("Conexão com o banco de dados estabelecida com sucesso.");
      resolve();
    });
  });
}

/**
 * Executa uma query que retorna múltiplas linhas.
 * @param {string} sql - A query SQL.
 * @param {Array} params - Os parâmetros para a query.
 * @returns {Promise<Array>}
 */
function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error("Banco de dados não inicializado."));
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

/**
 * Executa uma query de inserção, atualização ou deleção.
 * @param {string} sql - A query SQL.
 * @param {Array} params - Os parâmetros para a query.
 * @returns {Promise<{lastID: number, changes: number}>}
 */
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error("Banco de dados não inicializado."));
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
}

/**
 * Fecha a conexão com o banco de dados.
 * Deve ser chamada quando o aplicativo está encerrando.
 */
function closeDatabase() {
  return new Promise((resolve, reject) => {
    if (!db) return resolve();
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Conexão com o banco de dados fechada.");
        resolve();
      }
    });
  });
}

module.exports = {
  initializeDatabase,
  closeDatabase,
  all,
  run,
};