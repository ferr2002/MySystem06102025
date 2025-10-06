import { settings, handleSettingsPage } from "./pageService/settingPage/settingPage.js";
import { sales, handleSalesPage } from "./pageService/salesPage/salesPage.js";

const { configuracoes } = settings;
const { vendas } = sales;

document.addEventListener("DOMContentLoaded", async () => {
  // --- VARIÁVEIS COM O CONTEÚDO HTML DE CADA PÁGINA ---

  const pageContents = {
    // Conteúdo da página de Cadastro de Produtos
    cadastro: `
                    <header class="h-16 bg-slate-800 border-b border-gray-200 flex items-center justify-between px-6">
                        <button id="sidebar-open-btn" class="text-slate-300 hover:text-white focus:outline-none">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h1 class="text-xl font-semibold text-white">Cadastro de Produtos</h1>
                        <div></div>
                    </header>
                    <div class="flex-1 p-6 overflow-y-auto">
                        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6">Novo Produto</h2>
                            <form id="product-form">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="col-span-1"><label for="barcode" class="block text-sm font-medium text-gray-700 mb-1">Código de Barras</label><div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m-4-16v16m8-16v16M3 8h18M3 12h18M3 16h18" /></svg></div><input type="text" id="barcode" name="barcode" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 7891020304050"></div></div>
                                    <div class="col-span-1 md:col-span-2"><label for="product-name" class="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label><input type="text" id="product-name" name="product-name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: Paracetamol 750mg com 20 comprimidos" required></div>
                                    <div class="col-span-1"><label for="price-cost" class="block text-sm font-medium text-gray-700 mb-1">Preço Custo (R$)</label><div class="relative"><span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">R$</span><input type="text" id="price-cost" name="price-cost" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="0.00" required></div></div>
                                    <div class="col-span-1"><label for="price" class="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label><div class="relative"><span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">R$</span><input type="text" id="price" name="price" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="0.00" required></div></div>
                                    <div class="col-span-1"><label for="installment-price" class="block text-sm font-medium text-gray-700 mb-1">Preço a Prazo (R$)</label><div class="relative"><span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">R$</span><input type="text" id="installment-price" name="installment-price" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="0.00"></div></div>
                                </div>
                                <div class="mt-8 pt-5 border-t border-gray-200 flex justify-end"><button type="submit" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"><svg class="w-5 h-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" /></svg>Salvar Produto</button></div>
                            </form>
                        </div>
                    </div>`,
    
    cadastroEdicao: `
                    <header class="h-16 bg-slate-800 border-b border-gray-200 flex items-center justify-between px-6">
                        <button id="sidebar-open-btn" class="text-slate-300 hover:text-white focus:outline-none">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h1 class="text-xl font-semibold text-white">Cadastro de Produtos</h1>
                        <div></div>
                    </header>
                    <div class="flex-1 p-6 overflow-y-auto">
                        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6">Editar Produto</h2>
                            <form id="product-form">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="col-span-1"><label for="barcode" class="block text-sm font-medium text-gray-700 mb-1">Código de Barras</label><div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m-4-16v16m8-16v16M3 8h18M3 12h18M3 16h18" /></svg></div><input type="text" id="barcode" name="barcode" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 7891020304050"></div></div>
                                    <div class="col-span-1 md:col-span-2"><label for="product-name" class="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label><input type="text" id="product-name" name="product-name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: Paracetamol 750mg com 20 comprimidos" required></div>
                                    <div class="col-span-1"><label for="price-cost" class="block text-sm font-medium text-gray-700 mb-1">Preço Custo (R$)</label><div class="relative"><span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">R$</span><input type="text" id="price-cost" name="price-cost" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="0.00" required></div></div>
                                    <div class="col-span-1"><label for="price" class="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label><div class="relative"><span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">R$</span><input type="text" id="price" name="price" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="0.00" required></div></div>
                                    <div class="col-span-1"><label for="installment-price" class="block text-sm font-medium text-gray-700 mb-1">Preço a Prazo (R$)</label><div class="relative"><span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">R$</span><input type="text" id="installment-price" name="installment-price" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="0.00"></div></div>
                                </div>
                                <div class="mt-8 pt-5 border-t border-gray-200 flex justify-end"><button type="submit" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"><svg class="w-5 h-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" /></svg>Editar Produto</button></div>
                            </form>
                        </div>
                    </div>`,

    // Conteúdo da página de listagem de Produtos
    produtos: `
                    <header class="h-16 bg-slate-800 border-b border-gray-200 flex items-center justify-between px-6">
                        <button id="sidebar-open-btn" class="text-slate-300 hover:text-white focus:outline-none">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h1 class="text-xl font-semibold text-white">Produtos Cadastrados</h1>
                        <div></div>
                    </header>
                    <div class="flex-1 p-6 overflow-y-auto">
                        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 class="text-xl font-bold text-gray-800 mb-4">Buscar Produto</h2>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div><label for="search-barcode" class="block text-sm font-medium text-gray-700 mb-1">Código de Barras</label><input type="text" id="search-barcode" name="search-barcode" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Digite o código..."></div>
                                <div class="md:col-span-2"><label for="search-product-name" class="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label><input type="text" id="search-product-name" name="search-product-name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Digite o nome..."></div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <div class="overflow-x-auto">
                                <table class="w-full text-sm text-left text-gray-500">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" class="px-6 py-3">Código de Barras</th><th scope="col" class="px-6 py-3">Produto</th><th scope="col" class="px-6 py-3">Preço Custo</th><th scope="col" class="px-6 py-3">Preço</th><th scope="col" class="px-6 py-3">Preço a Prazo</th><th scope="col" class="px-6 py-3 text-center">Ações</th></tr></thead>
                                    <tbody id="product-table-body">
                                       <!-- As linhas dos produtos serão inseridas aqui pelo JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>`,
    configuracoes,
    vendas,

  };

  // --- Lógica de Navegação e Carregamento de Página ---
  const mainContent = document.getElementById("main-content");
  const mainNav = document.getElementById("main-nav");
  const navLinks = mainNav.querySelectorAll(".nav-link");

  

  // --- FUNÇÕES GLOBAIS DA APLICAÇÃO ---


  const showToast = (message, type = "success") => {
    /**
   * Exibe uma notificação toast.
   * @param {string} message - A mensagem a ser exibida.
   * @param {string} type - 'success' ou 'error'.
   */

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    const toastIcon = document.getElementById("toast-icon");

    toastMessage.textContent = message;
    if (type === "success") {
      toastIcon.innerHTML = `<svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    } else {
      toastIcon.innerHTML = `<svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    }

    toast.classList.remove("opacity-0", "hidden", "toast-exit", "toast-exit-active");
    toast.classList.add("toast-enter", "toast-enter-active");
    setTimeout(
      () => toast.classList.remove("toast-enter", "toast-enter-active"),
      3000
    );

    setTimeout(() => {
      toast.classList.add("toast-exit", "toast-exit-active");
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, 4000);
  };

  // Formata o valor para o padrão monetário brasileiro.
  const formattedPrice = (item) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      }).format(item);
    };
  
  // Formata o valor recebido pelos input text para valor numerico aceitavel
  const formatToFloat = (item) => item.replace(/\./g, '').replace(',', '.');

  const renderProductTable = (products, loading = false) => {
    const tableBody = document.getElementById("product-table-body");
    if (!tableBody) return; // Sai se a tabela não estiver na página atual

    tableBody.innerHTML = ""; // Limpa a tabela antes de popular

    if (loading) {
      tableBody.innerHTML = `<tr><td colspan="4" class="text-center p-6 text-gray-500 animate-pulse">Procurando produtos...</td></tr>`;
      return;
    }

    if (!products || products.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" class="text-center p-6 text-gray-500">Nenhum produto encontrado.</td></tr>`;
      return;
    }

    const fragment = document.createDocumentFragment()

    products.forEach((product) => {
      const row = document.createElement("tr");
      row.className = "bg-white border-b hover:bg-gray-50";
      row.dataset.key = product.codigoBarra


      row.innerHTML = `
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" id="td-codigoBarra">${
                          product.codigoBarra
                        }</td>
                        <td class="px-6 py-4">${product.nomeProduto}</td>
                        <td class="px-6 py-4">${formattedPrice(
                          product.valorCusto
                        )}</td>
                        <td class="px-6 py-4">${formattedPrice(
                          product.valorVista
                        )}</td>
                        <td class="px-6 py-4">${formattedPrice(
                          product.valorPrazo
                        )}</td>
                        <td class="px-6 py-4 text-center">
                            <a href="#" class="font-medium text-blue-600 hover:underline mr-4" id="edit-button">Editar</a>
                            <a href="#" class="font-medium text-red-600 hover:underline">Excluir</a>
                        </td>
                    `;
      fragment.appendChild(row);
    });
    tableBody.innerHTML = ""; // Limpa a tabela antes de popular
    tableBody.appendChild(fragment)
  };

  // --- --------------------------- --- \\

  const loadPage = async (pageName, uniqueElement = null) => {
    // Carrega o HTML da página na <main>
    mainContent.innerHTML = pageContents[pageName];

    // Adiciona os event listeners para os botões da página carregada
    // Isso é importante porque os botões são recriados a cada troca de página
    const openBtn = document.getElementById("sidebar-open-btn");
    if (openBtn)
      openBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openMenu();
      });

      // Atualiza o estado ativo no menu
    navLinks.forEach((link) => {
      link.classList.remove("bg-gray-900", "text-white");
      link.classList.add("text-gray-300", "hover:bg-gray-700");
      if (link.dataset.page === pageName) {
        link.classList.add("bg-gray-900", "text-white");
        link.classList.remove("text-gray-300", "hover:bg-gray-700");
      }
    });

    
    // Logica da pagina de produtos
    if (pageName === "produtos") {
      renderProductTable([], true)
      let products = null;

      if (window.mainEvents && typeof window.mainEvents.dbSearch === "function") {
        try {
          products = await window.mainEvents.dbSearch("")
          renderProductTable(products.slice(0, 100))
          
        } catch (error) {
          console.error("Não foi possivel carregar os dados. ", error)
          renderProductTable([])
        }
          
      } else {
        console.error(
          "API do Electron não encontrada. Verifique seu preload script."
        );
      }

      const inputSearchProductName = document.getElementById("search-product-name");
      const inputSearchBarCode = document.getElementById("search-barcode");
      
      let timerId = null;
      let timerIdBarCode = null;

      inputSearchProductName.addEventListener("input", () => {
        const valorAtual = inputSearchProductName.value;
        clearTimeout(timerId);

        timerId = setTimeout(() => {
          if (
            window.mainEvents &&
            typeof window.mainEvents.dbSearch === "function"
          ) {
            window.mainEvents
              .dbSearch(valorAtual, "nomeProduto")
              .then((productsFromDB) => {
                renderProductTable(productsFromDB.slice(0, 100));
              })
              .catch((err) => {
                console.error("Erro ao buscar produtos do banco de dados:",err);
                renderProductTable([]); // Renderiza a tabela vazia em caso de erro
              });
          } else {
            console.error(
              "API do Electron não encontrada. Verifique seu preload script."
            );
          }
        }, 1000);
      });

      inputSearchBarCode.addEventListener("input", () => {
        const valorAtual = inputSearchBarCode.value;
        clearTimeout(timerIdBarCode);

        timerIdBarCode = setTimeout(() => {
          if (
            window.mainEvents &&
            typeof window.mainEvents.dbSearch === "function"
          ) {
            window.mainEvents
              .dbSearch(valorAtual, "codigoBarra")
              .then((productsFromDB) => {
                renderProductTable(productsFromDB.slice(0, 100));
              })
              .catch((err) => {
                console.error(
                  "Erro ao buscar produtos do banco de dados:",
                  err
                );

                renderProductTable([]); // Renderiza a tabela vazia em caso de erro
              });
          } else {
            console.error(
              "API do Electron não encontrada. Verifique seu preload script."
            );
          }
        }, 1000);
      });

      // Logica do botão edição
      const tableBody = document.getElementById("product-table-body");

      tableBody.addEventListener("click", (event) => {
        if (event.target.id === "edit-button") {
          event.preventDefault()
          event.stopPropagation()

          const productLine = event.target.closest("tr");
          const productBarCode = productLine.dataset.key;
          
          const newProduct = products.filter((item) => item.codigoBarra === productBarCode);

          loadPage("cadastroEdicao", ...newProduct);
          
        }
      })
    }

    // Logica da pagina de Cadastro
    if (pageName === "cadastro") {

       // Adiciona os dados do produto a ser editado para os inputs corretos
      const formInputs = ["price-cost", "price", "installment-price"]
      formInputs.forEach((item) => {

        document.getElementById(item).addEventListener("input", (event) => {
          const input = event.target;

          let value = input.value.replace(/\D/g, ""); // Remove tudo caracter que não é digito

          if (value === "") {
            input.value = "";
            return;
          }
          // Converte para número e divide por 100 para chegar a casa do centavos
          const numericValue = parseInt(value, 10) / 100;

          input.value = new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(numericValue);
        });
      })

      const productForm = document.getElementById("product-form");
      productForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Validação simples para garantir que os campos não estão vazios
        if (!productForm.checkValidity()) {
          showToast("Por favor, preencha todos os campos obrigatórios.", "error");
          return;
        }

        // Coleta os dados do formulário
        const formData = new FormData(productForm);
        const newProduct = {
          codigoBarra: formData.get("barcode"),
          nomeProduto: formData.get("product-name"),
          valorCusto: parseFloat(formatToFloat(formData.get("price-cost"))),
          valorVista: parseFloat(formatToFloat(formData.get("price"))),
          valorPrazo: parseFloat(formatToFloat(formData.get("installment-price"))),
        };

        console.log("Novo produto a ser salvo:", newProduct);

        if (window.mainEvents && typeof window.mainEvents.dbAddProduct === "function") {
          window.mainEvents
            .dbAddProduct(newProduct)
            .then((result) => {
              console.log("Produto salvo com sucesso:", result);
              showToast(
                `Produto "${newProduct.nomeProduto}" salvo com sucesso!`,
                "success"
              );
              productForm.reset();
              document.getElementById("barcode").focus();
            })
            .catch((err) => {
              console.error("Erro ao salvar produto:", err);
              showToast(`Erro ao salvar produto: ${err.message}`, "error");
            });
        } else {
          console.error(
            "API do Electron não encontrada. Verifique seu preload script."
          );
          productForm.reset();
          document.getElementById("barcode").focus();
        }

        productForm.reset();
        document.getElementById("barcode").focus();
      });
    }

    // Logica da pagina de Edição de cadastro
    if (pageName === "cadastroEdicao") {

      // Adiciona os dados do produto a ser editado para os inputs corretos
      const formInputs = ["barcode", "product-name", "price-cost", "price", "installment-price"]
      formInputs.forEach((item,index) => {
        const inputTarget = document.getElementById(item)
        
        if (!(item === "barcode" || item === "product-name")) {
          // Coloca os dados de preço nos inputs corretos
          inputTarget.value = new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(Object.values(uniqueElement)[index]);
          
          // Logica para fazer a mascara nos inputs
          document.getElementById(item).addEventListener("input", (event) => {
            const input = event.target;
          
            let value = input.value.replace(/\D/g, ""); // Remove tudo caracter que não é digito

            if (value === ""){
              input.value = ""
              return;
            }
            // Converte para número e divide por 100 para chegar a casa do centavos
            const numericValue = parseInt(value, 10) / 100;

            input.value = new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(numericValue);
          })

        }else {
          inputTarget.value = Object.values(uniqueElement)[index]
        }
        
      })

      // Esta linha deixa o input do codigo de barras apenas com readOnly para não haver alterações nele
      document.getElementById("barcode").readOnly = true

      const productForm = document.getElementById("product-form");
      productForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Validação simples para garantir que os campos não estão vazios
        if (!productForm.checkValidity()) {
          showToast("Por favor, preencha todos os campos obrigatórios.", "error");
          return;
        }

        // Coleta os dados do formulário
        const formData = new FormData(productForm);
        const newProduct = {
          codigoBarra: formData.get("barcode"),
          nomeProduto: formData.get("product-name"),
          valorCusto: parseFloat(formatToFloat(formData.get("price-cost"))),
          valorVista: parseFloat(formatToFloat(formData.get("price"))),
          valorPrazo: parseFloat(formatToFloat(formData.get("installment-price"))),
        };

        console.log("Novo produto a ser salvo:", newProduct);

        if (window.mainEvents && typeof window.mainEvents.dbEditProduct === "function") {
          window.mainEvents
            .dbEditProduct(newProduct)
            .then((result) => {
              console.log("Produto atualizado com sucesso:", result);
              showToast(
                `Produto "${newProduct.nomeProduto}" atualizado com sucesso!`,
                "success"
              );
              productForm.reset();
              document.getElementById("barcode").focus();

              setTimeout(() => {
                loadPage("produtos")
                return;
              }, 1000)
            })
            .catch((err) => {
              console.error("Erro ao atualizar produto:", err);
              showToast(`Erro ao atualizar produto: ${err.message}`, "error");
            });
        } else {
          console.error(
            "API do Electron não encontrada. Verifique seu preload script."
          );
          productForm.reset();
          document.getElementById("barcode").focus();
        }

        productForm.reset();
        document.getElementById("barcode").focus();
      });
      
    }

    if (pageName === "configuracoes") {
      if (window.mainEvents && typeof window.mainEvents.dbAddUser === "function") {
        await handleSettingsPage(showToast, window.mainEvents.dbAddUser, window.mainEvents.dbSearchUsers)
        
      }
    }

    if (pageName === "vendas") {
      
      await handleSalesPage(showToast, window.mainEvents.dbSearch);
        
      
    }

  };
  

  // Adiciona evento de clique para cada link da navegação
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.currentTarget.dataset.page;
      loadPage(page);
      closeMenu()
      if (window.innerWidth < 768) {
        // Fecha o menu no mobile após clicar
        closeMenu();
      }
    });
  });

  // --- Lógica do Menu Lateral ---
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarCloseBtn = document.getElementById("sidebar-close-btn");

  const openMenu = () => {
    sidebar.classList.remove("-translate-x-full");
    if (window.innerWidth >= 768) mainContent.classList.add("md:ml-64");
    sidebarOverlay.classList.remove("hidden");
  };

  const closeMenu = () => {
    sidebar.classList.add("-translate-x-full");
    if (window.innerWidth >= 768) mainContent.classList.remove("md:ml-64");
    sidebarOverlay.classList.add("hidden");
  };

  // Eventos dos botões do menu
  sidebarCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMenu();
  });
  sidebarOverlay.addEventListener("click", () => closeMenu());

  // --- Estado Inicial ---
  // Carrega a página 'produtos' como padrão
  loadPage("vendas");
  // Abre o menu em telas grandes por padrão
  if (window.innerWidth >= 768) {
    closeMenu();
  } else {
    closeMenu();
  }
});
