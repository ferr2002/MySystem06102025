const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("node:path");

// Importa o novo módulo de banco de dados e os serviços
const db = require("./services/database.js");
const productService = require("./services/productService.js");
const salesServices = require("./services/salesService.js")
const salesTableCreation = require("./sqlService/salesScript.js")

// Apenas para ser usado em ambiente de desenvolvimento
if (!app.isPackaged) {
  try {
    require('electron-reloader')(module, {
      ignore: [path.join(__dirname, '..', 'main')]
    });
  } catch (_) {}
}

const createWindow = () => {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    x: 0,
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, ".././preload/preload.js"),
    },
    icon: path.join(__dirname, ".././assets/icon.png")
  });
  win.loadFile(path.join(__dirname, "..", "renderer", "index.html"));
};

// Logica para inicialização do app electron
app.whenReady().then(async () => {
  try {
    // Inicializa a conexão com o banco de dados ANTES de registrar os handlers
    await db.initializeDatabase();
    await salesTableCreation.setupDatabaseTables();
    // Registra os handlers do IPC, que agora usam o productService
    ipcMain.handle("dbSearch:Products", (_, termoDeBusca, parametro) =>
      productService.handleDbSearch(termoDeBusca, parametro)
    );

    ipcMain.handle("addProduct:Product", (_, addProduct) =>
      productService.handleDbAddProduct(addProduct)
    );

    ipcMain.handle("editProduct:Product", (_, editProduct) =>
      productService.handleDbEditProduct(editProduct)
    );

    ipcMain.handle("addUser:User", (_, addUser) => 
      salesServices.handleDbAddUser(addUser)
    );

    ipcMain.handle("dbSearchUsers:Users", (_, termoDeBusca) => 
      salesServices.handleDbSearchUsers(termoDeBusca)
    );

    createWindow();

  } catch (error) {
    console.error("Falha fatal na inicialização do aplicativo:", error);
    app.quit();
  }
});

// Garante que a conexão com o banco de dados seja fechada corretamente
app.on('will-quit', async () => {
  await db.closeDatabase();
});