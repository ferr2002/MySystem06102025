

const sales = {
    vendas: `
                    <header class="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
                        <button id="sidebar-open-btn" class="text-slate-300 hover:text-white focus:outline-none">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h1 class="text-xl font-semibold text-white">Vendas</h1>
                        <div></div>
                    </header>
                    <div class="flex-1 p-6 overflow-hidden flex flex-col md:flex-row gap-6">
                        <!-- Coluna da Esquerda: Adicionar Produto -->
                        <div class="w-full md:w-1/3">
                            <div class="bg-white rounded-lg shadow-md p-6">
                                <h2 class="text-lg font-bold text-gray-800 mb-4">Adicionar Produto</h2>
                                <form id="add-to-cart-form">
                                    <div class="space-y-4">
                                        <div>
                                            <label for="sale-barcode" class="block text-sm font-medium text-gray-700 mb-1">Código de Barras</label>
                                            <input type="text" id="sale-barcode" name="sale-barcode" autofocus class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition">
                                        </div>
                                        <button type="submit" style="display: none;"></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- Coluna da Direita: Carrinho de Venda -->
                        <div class="w-full md:w-2/3 h-full">
                            <div class="bg-white rounded-lg shadow-md flex flex-col h-full max-h-[600px]">
                                <div class="flex-1 overflow-y-auto">
                                    <table class="w-full text-sm text-left text-gray-500">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">Produto</th>
                                                <th scope="col" class="px-6 py-3">Preço</th>
                                                <th scope="col" class="px-6 py-3">Quantidade</th>
                                                <th scope="col" class="px-6 py-3 text-center">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody id="cart-table-body">
                                            <!-- Itens da venda serão inseridos aqui -->
                                        </tbody>
                                    </table>
                                </div>
                                <div class="p-6 overflow-x-auto border-t bg-gray-50 rounded-b-lg flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div class="flex items-center gap-6">
                                        <div class="text-right">
                                            <div class="text-sm text-gray-500">Subtotal</div>
                                            <div id="cart-subtotal" class="text-lg font-semibold text-gray-700">R$ 0,00</div>
                                        </div>
                                        <div class="text-right">
                                            <div class="text-sm text-gray-500">Descontos</div>
                                            <div id="cart-discounts" class="text-lg font-semibold text-red-500">- R$ 0,00</div>
                                        </div>
                                        <div class="text-right border-l pl-6 ml-6 border-gray-300">
                                            <div class="text-base font-medium text-gray-600">Total a Pagar</div>
                                            <div id="cart-total" class="text-2xl font-bold text-gray-900">R$ 0,00</div>
                                        </div>
                                    </div>
                                    <button id="finalize-sale-btn" class="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Finalizar Venda
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
}



const renderSales = (productsToRender, eventLister, updateCart) => {
    const tableBody = document.getElementById("cart-table-body");
    const cartTotalElem = document.getElementById("cart-total");
    if (!tableBody || !cartTotalElem) return;
    
    tableBody.innerHTML = "";
    
    if (!productsToRender || productsToRender.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="text-center p-6 text-gray-500">Nenhum produto adicionado.</td></tr>`;
        updateCart()
        return;
    }
    
    //let total = 0;
    
    const fragment = document.createDocumentFragment();
    const formattedPrice = (e) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(e)
    
    // Pega a lista de descontos uma vez para otimizar
    const allDiscounts = JSON.parse(sessionStorage.getItem("saleDiscountItems")) || [];
    
    productsToRender.forEach(item => {
        const row = document.createElement("tr");
        row.dataset.key = item.codigoBarra
        row.className = 'bg-white border-b hover:bg-gray-50';
        
        //total += (item.valorVista * item.quantidade);

        const hasDiscount = allDiscounts.some(d => d.codigoBarra === item.codigoBarra);
        let actionButtonHtml = "";
      
        if (hasDiscount) {
            actionButtonHtml = `<button data-key="${item.codigoBarra}" id="remove-discount-button" class="font-medium text-red-600 hover:underline">Remover Desconto</button>`;
        } else {
            actionButtonHtml = `<button data-key="${item.codigoBarra}" id="discount-button" class="font-medium text-blue-600 hover:underline">Desconto</button>`;
        }

        row.innerHTML = `
        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${item.nomeProduto}</td>
        <td class="px-6 py-4">${formattedPrice(item.valorVista)}</td>
        <td class="px-6 py-4">${item.quantidade}</td>
        <td class="px-6 py-4 text-center">${actionButtonHtml}</td>
        `;
        fragment.appendChild(row);
    });
    
    tableBody.appendChild(fragment);
    //cartTotalElem.textContent = formattedPrice(total)
    eventLister()
    updateCart()
    if(allDiscounts !== null){
        // Recalcula o total de descontos exibido
      updateCart()
    }
    
}

const handleMaskInput = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    let numericValue = Math.min(parseInt(value || '0', 10), 100);

    event.target.value = numericValue
}

let salesPageController;

const handleSalesPage = async (showToast, products) => {
  // 1. Se já existe um controller da execução anterior, cancela todos os seus listeners.
  if (salesPageController) {
      salesPageController.abort();
  }
  // 2. Cria um novo controller para a execução atual.
  salesPageController = new AbortController();
  const signal = salesPageController.signal;


  const updateCartTotals = () => {
    const saleItems = JSON.parse(sessionStorage.getItem("saleItems")) || [];
    const saleDiscountItems = JSON.parse(sessionStorage.getItem("saleDiscountItems")) || [];

    const cartSubtotalElem = document.getElementById("cart-subtotal");
    const cartDiscountsElem = document.getElementById("cart-discounts");
    const cartTotalElem = document.getElementById("cart-total");
    const formattedPrice = (e) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(e);

    let subtotal = 0;
    saleItems.forEach(item => {
        // O subtotal é calculado com base no preço original
        const originalPrice = item.valorOriginal || item.valorVista;
        subtotal += originalPrice * item.quantidade;
    });

    let totalDiscount = 0;
    saleDiscountItems.forEach(item => {
        totalDiscount += item.discount;
    });

    const total = subtotal - totalDiscount;
    cartSubtotalElem.textContent = formattedPrice(subtotal);
    cartDiscountsElem.textContent = `- ${formattedPrice(totalDiscount)}`;
    cartTotalElem.textContent = formattedPrice(total);
};

  // --- Lógica do Modal de Desconto ---
  const discountModal = document.getElementById("discount-modal");
  const discountForm = document.getElementById("discount-form");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  const discountInput = document.getElementById("discount-value");

  const openDiscountModal = (productKey) => {
    const product = JSON.parse(sessionStorage.getItem("saleItems")).find(
      (item) => item.codigoBarra === productKey
    );

    if (!product) return;

    document.getElementById("modal-product-name").textContent =
      product.nomeProduto;
    document.getElementById("modal-product-price").textContent =
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.valorVista);
    document.getElementById("modal-product-key").value = product.codigoBarra;
    discountInput.value = "";

    discountModal.classList.remove("hidden", "modal-exit", "modal-exit-active");
    discountModal.classList.add("modal-enter", "modal-enter-active");
    setTimeout(() => {
      discountModal.classList.remove("modal-enter", "modal-enter-active");
      discountInput.focus();
    }, 300);
  };

  const closeDiscountModal = () => {
    discountModal.classList.add("modal-exit", "modal-exit-active");
    setTimeout(() => {
      discountModal.classList.add("hidden");
      discountModal.classList.remove("modal-exit", "modal-exit-active");
    }, 300);
  };

  discountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    let sessionProducts = JSON.parse(sessionStorage.getItem("saleItems"));
    const productKey = document.getElementById("modal-product-key").value;
    const productIndex = sessionProducts.findIndex(
      (item) => item.codigoBarra === productKey
    );

    if (productIndex === -1) return;

    const discountValueStr = discountInput.value;
    const discountValue = parseInt(discountValueStr);
    
    if (isNaN(discountValue) || discountValue < 0) {
      showToast("Valor de desconto inválido.", "error");
      return;
    }

    const originalPrice = sessionProducts[productIndex].valorVista;
    if (discountValue >= 100) {
      showToast("O desconto não pode ser 100%.", "error");
      return;
    }

    const finalValue = parseFloat((originalPrice - (originalPrice * (discountValue / 100))).toFixed(2));
    const discountRest = parseFloat(((originalPrice - finalValue) * sessionProducts[productIndex].quantidade).toFixed(2));
    

    sessionProducts[productIndex].valorVista = finalValue;

    sessionStorage.setItem("saleItems", JSON.stringify(sessionProducts));


    // Sincroniza os dados com a alteração anterior
    sessionProducts = JSON.parse(sessionStorage.getItem("saleItems"));

    // Cria a session para armazenar os dados do disconto atual

      // 1. Pega os descontos existentes ou cria um array vazio.
      const allDiscounts = JSON.parse(sessionStorage.getItem("saleDiscountItems")) || [];

      // 2. Cria o objeto para o desconto atual.
      const currentDiscountObj = {
          codigoBarra: sessionProducts[productIndex].codigoBarra,
          discount: discountRest
      };

      // 3. Procura se já existe um desconto para este produto.
      const existingDiscountIndex = allDiscounts.findIndex(
          item => item.codigoBarra === currentDiscountObj.codigoBarra
      );

      if (existingDiscountIndex > -1) {
          // 4a. Se já existe, atualiza o valor do desconto.
          // Soma o novo desconto ao que já existia.
          allDiscounts[existingDiscountIndex].discount += currentDiscountObj.discount;
          allDiscounts[existingDiscountIndex].discount = parseFloat((allDiscounts[existingDiscountIndex].discount).toFixed(2))
      } else {
          // 4b. Se não existe, adiciona o novo objeto de desconto ao array.
          allDiscounts.push(currentDiscountObj);
      }

      // 5. Salva o array atualizado de volta no sessionStorage.
      sessionStorage.setItem("saleDiscountItems", JSON.stringify(allDiscounts));

    

    renderSales(sessionProducts, attachCartEventListeners, updateCartTotals);
   
    updateCartTotals()

    closeDiscountModal();
    showToast("Desconto aplicado com sucesso!", "success");
  }, { signal });

  modalCancelBtn.addEventListener("click", closeDiscountModal, { signal });
  discountInput.addEventListener("input", handleMaskInput, { signal });

  const handleRemoveDiscount = (productKey) => {
    // 1. Pega os dados atuais da sessão
    let saleItems = JSON.parse(sessionStorage.getItem("saleItems"));
    let saleDiscountItems = JSON.parse(sessionStorage.getItem("saleDiscountItems"));

    const productIndex = saleItems.findIndex(item => item.codigoBarra === productKey);

    // 2. Se o produto existe, restaura seu preço original
    if (productIndex !== -1 && saleItems[productIndex].valorOriginal) {
        saleItems[productIndex].valorVista = saleItems[productIndex].valorOriginal;
    }

    // 3. Filtra o array de descontos para remover o desconto do produto
    const updatedDiscounts = saleDiscountItems.filter(item => item.codigoBarra !== productKey);

    // 4. Salva os arrays atualizados de volta na sessão
    sessionStorage.setItem("saleItems", JSON.stringify(saleItems));
    sessionStorage.setItem("saleDiscountItems", JSON.stringify(updatedDiscounts));

    // 5. Re-renderiza tudo para refletir as mudanças
    renderSales(saleItems, attachCartEventListeners, updateCartTotals);

    updateCartTotals()

    showToast("Desconto removido com sucesso!", "success");
  };

  const handleDeleteItem = (productKey) => {
    // 1. Pega os dados atuais
    let saleItems = JSON.parse(sessionStorage.getItem("saleItems")) || [];
    let saleDiscountItems = JSON.parse(sessionStorage.getItem("saleDiscountItems")) || [];

    // 2. Filtra os arrays para remover o item e seu desconto associado
    const updatedItems = saleItems.filter(item => item.codigoBarra !== productKey);
    const updatedDiscounts = saleDiscountItems.filter(item => item.codigoBarra !== productKey);

    // 3. Salva o novo estado de volta na sessão
    sessionStorage.setItem("saleItems", JSON.stringify(updatedItems));
    sessionStorage.setItem("saleDiscountItems", JSON.stringify(updatedDiscounts));

    // 4. Re-renderiza a lista de vendas e atualiza os totais
    renderSales(updatedItems, attachCartEventListeners, updateCartTotals);
    updateCartTotals(); // Usa a nossa nova função!

    showToast("Produto removido com sucesso!", "success");
};

  const handleFinalizeSale = async () => {
    /*
      const finalizeBtn = document.getElementById("finalize-sale-btn");
      const originalBtnContent = finalizeBtn.innerHTML; // Salva o conteúdo original do botão

      // 1. Pega os dados da sessão
      const saleItems = JSON.parse(sessionStorage.getItem("saleItems")) || [];
      const saleDiscountItems = JSON.parse(sessionStorage.getItem("saleDiscountItems")) || [];

      // 2. Validação: não finalizar venda com carrinho vazio
      if (saleItems.length === 0) {
          showToast("O carrinho está vazio.", "error");
          return;
      }

      // 3. Feedback visual e prevenção de múltiplos cliques
      finalizeBtn.disabled = true;
      finalizeBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processando...
      `;

      try {
          // 4. Montagem do objeto a ser enviado para o banco de dados
          let saleArray = [];
          saleItems.forEach(item => {
              let obj = {
                produto_codigo_barra: item.codigoBarra,
                nome_produto: item.nomeProduto,
                valor_unitario: item.valorVista,
                quantidade: item.quantidade
              }
              saleArray.push(obj)
          });

          
          

          console.log("Objeto a ser enviado para o backend:", saleObject);

          // 5. --- AQUI VOCÊ COLOCA A LÓGICA DE ENVIO PARA O BACKEND ---
          // Exemplo: const response = await fetch('/api/vendas', { method: 'POST', body: JSON.stringify(saleObject) });
          // Para simular, vamos usar um delay de 2 segundos.
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Se chegou aqui, a "venda" foi um sucesso.
          showToast("Venda finalizada com sucesso!", "success");

          // 6. Limpa o carrinho
          sessionStorage.removeItem("saleItems");
          sessionStorage.removeItem("saleDiscountItems");
        */
          // 7. Atualiza a interface
          sessionStorage.removeItem("saleItems");
          sessionStorage.removeItem("saleDiscountItems");
          renderSales([], attachCartEventListeners, updateCartTotals);
        /*
      } catch (error) {
          console.error("Erro ao finalizar a venda:", error);
          showToast("Falha ao finalizar a venda. Tente novamente.", "error");
      } finally {
          // 8. Restaura o botão ao estado original, independente de sucesso ou falha
          finalizeBtn.disabled = false;
          finalizeBtn.innerHTML = originalBtnContent;
      }
          */
  };

  const finalizeBtn = document.getElementById("finalize-sale-btn");
  finalizeBtn.addEventListener("click", handleFinalizeSale)

  const attachCartEventListeners = () => {
     // Listener para o botão de adicionar desconto
    document.querySelectorAll("#discount-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const key = e.currentTarget.dataset.key;
        openDiscountModal(key);
      }, { signal });
    });

     // Listener para o botão de remover desconto
    document.querySelectorAll("#remove-discount-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const key = e.currentTarget.dataset.key;
            handleRemoveDiscount(key);
        }, { signal });
    });

     // Adiciona o listener de clique duplo a cada linha que tem um data-key
    document.querySelectorAll("tr[data-key]").forEach((row) => {
        // Usamos o { signal } do AbortController para limpar este listener também!
        row.addEventListener("dblclick", (e) => {
            // Pega a chave do produto da linha atual (currentTarget)
            const key = e.currentTarget.dataset.key;
            if (key) {
                handleDeleteItem(key);
            }
        }, { signal }); 
    });
  };

  // Verificar se existe algum dado salvo na session e então renderiza ele
  let salePreRender = JSON.parse(sessionStorage.getItem("saleItems"));

  if (salePreRender || salePreRender !== null) {
    renderSales(salePreRender, attachCartEventListeners, updateCartTotals);
  }

  function addQuantityKey(array, entry, newProduct) {
    const [codigoBarra, qtdStr] = entry.split("*");
    const qntToAdd = parseInt(qtdStr, 10) || 1;

    const index = array.findIndex((p) => p.codigoBarra === codigoBarra);

    if (index !== -1) {
      // Produto já existe → soma a quantidade
      array[index].quantidade += qntToAdd;
    } else {
      // Produto novo → usa os dados base e adiciona a quantidade desejada
      array.push({
        ...newProduct,
        quantidade: qntToAdd,
        valorOriginal: newProduct.valorVista,
      });
    }

    return array;
  }

  try {
    const saleForm = document.getElementById("add-to-cart-form");
    const barcodeInput = document.getElementById("sale-barcode");
    let product = null;

    saleForm.addEventListener("submit", async (event) => {
      try {
        event.preventDefault();

        let formData = new FormData(saleForm);

        product = {
          codigoBarra: formData.get("sale-barcode"),
        };

        if (!/^[\d*]+$/.test(product.codigoBarra)) {
          saleForm.reset();
          barcodeInput.focus();
          throw new Error("O código de barras deve conter apenas números.");
        }

        const [barcode, _] = product.codigoBarra.split("*");
        const searchProduct = await products(barcode, "codigoBarra");

        if (searchProduct.length !== 0) {
          // Pega o estado anterior da memoria
          let saleAllitems = JSON.parse(sessionStorage.getItem("saleItems"));

          if (!saleAllitems || saleAllitems.length === 0) {
            let item = addQuantityKey([],product.codigoBarra,...searchProduct);
            sessionStorage.setItem("saleItems", JSON.stringify(item));

          } else {
            let item = [...saleAllitems];
            item = addQuantityKey(item, product.codigoBarra, ...searchProduct);
            console.log(item);
            sessionStorage.setItem("saleItems", JSON.stringify(item));
          
        }
          // Atualiza os items na memoria
          saleAllitems = JSON.parse(sessionStorage.getItem("saleItems"));
          
          saleForm.reset();
          barcodeInput.focus();

          renderSales(saleAllitems, attachCartEventListeners, updateCartTotals);
        } else {
          throw new Error("Houve um erro ao procurar o codigo de barra");
        }
      } catch (error) {
        showToast(`${error.message}`, error);
      }
    }, { signal });
  } catch (error) {
    showToast(`Error ao carregar os produtos: ${error.message}`, "error");
  }
}

export {
    sales,
    handleSalesPage
}