const { contextBridge, ipcMain, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mainEvents', {
  dbSearch: (termoBusca, parametro) => ipcRenderer.invoke("dbSearch:Products", termoBusca, parametro),
  dbAddProduct: (addProduct) => ipcRenderer.invoke("addProduct:Product", addProduct),
  dbEditProduct: (editProduct) => ipcRenderer.invoke("editProduct:Product", editProduct),
  dbAddUser: (addUser) => ipcRenderer.invoke("addUser:User", addUser),
  dbSearchUsers: (termoBusca) => ipcRenderer.invoke("dbSearchUsers:Users", termoBusca)
  // we can also expose variables, not just functions
})
