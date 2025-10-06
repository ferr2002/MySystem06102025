import { settingsContents } from "./settingsContents.js"


const settings = {
    configuracoes: `
                    <header class="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
                        <button id="sidebar-open-btn" class="text-slate-300 hover:text-white focus:outline-none">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h1 class="text-xl font-semibold text-white">Configurações</h1>
                        <div></div>
                    </header>
                    <div class="flex-1 p-6 overflow-y-auto flex">
                        <!-- Menu Lateral de Configurações -->
                        <aside class="w-1/4 pr-8">
                            <nav id="settings-nav" class="space-y-2">
                                <a href="#" data-setting="cadastrarFuncionario" class="settings-link text-gray-700 hover:bg-gray-200 flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200">
                                    Cadastrar Funcionário
                                </a>
                                <a href="#" data-setting="" class="settings-link text-gray-700 hover:bg-gray-200 flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200">
                                    ...
                                </a>
                            </nav>
                        </aside>
                        <!-- Área de Conteúdo de Configurações -->
                        <div id="settings-content" class="w-3/4">
                            <!-- O conteúdo da configuração será injetado aqui -->
                            
                        </div>
                    </div>`
}

const handleSettingsPage = async (showToast, addUser, searchUsers) => {
     const settingsContent = document.getElementById('settings-content');
     const settingsNav = document.getElementById('settings-nav');
     const settingsLinks = settingsNav.querySelectorAll('.settings-link');
     
     const loadSetting = async (settingName) => {
         settingsContent.innerHTML = settingsContents[settingName];
         console.log("bom dia")
         // Atualiza o estilo do link ativo
         settingsLinks.forEach(link => {
             link.classList.remove('bg-blue-100', 'text-blue-700');
             link.classList.add('text-gray-700', 'hover:bg-gray-200');
             if (link.dataset.setting === settingName) {
                 link.classList.add('bg-blue-100', 'text-blue-700');
                 link.classList.remove('text-gray-700', 'hover:bg-gray-200');
             }
         });
 
         if (settingName === 'cadastrarFuncionario') {
             const employeeForm = document.getElementById('employee-form');
             employeeForm.addEventListener('submit', async (e) => {
                 e.preventDefault();
                 if(!employeeForm.checkValidity()) {
                     showToast('Por favor, preencha todos os campos.', 'error');
                     return;
                 }

                 let formData = new FormData(employeeForm)
                 const newUser = {
                 nome: formData.get("employee-user")
                 }

                 try {
                    await addUser(newUser)
                    showToast(`Funcionário "${newUser.nome}" salvo com sucesso!`, 'success');
                    
                }catch (error) {
                    showToast(`Houve um problema ao salvar funcionário ${error}`, 'error');
                    
                }
                employeeForm.reset();
                 
             });

             const userVisualize = document.getElementById("view-employees-btn")
             userVisualize.addEventListener("click", () => {
                loadSetting("visualizarFuncionarios")
                return;
             })
         } else if (settingName === 'visualizarFuncionarios') {
            const userRegister = document.getElementById("add-employee-btn")
            userRegister.addEventListener("click", () => {
                loadSetting("cadastrarFuncionario")
                return;
            });
            const employees = await searchUsers()
            
            const tableBody = document.getElementById('employee-table-body');
            if (!tableBody) return;
            tableBody.innerHTML = '';
            if (!employees || employees.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4" class="text-center p-6 text-gray-500">Nenhum funcionário encontrado.</td></tr>`;
                return;
            }

            const fragment = document.createDocumentFragment();
            employees.forEach(employee => {
                const row = document.createElement('tr');
                row.className = 'bg-white border-b hover:bg-gray-50';
                row.innerHTML = `
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${employee.usuario_id}</td>
                    <td class="px-6 py-4">${employee.nome}</td>
                    <td class="px-6 py-4 text-center">
                        <a href="#" class="font-medium text-blue-600 hover:underline mr-4">Editar</a>
                        <a href="#" class="font-medium text-red-600 hover:underline">Excluir</a>
                    </td>
                `;
                fragment.appendChild(row);
            });
            tableBody.appendChild(fragment);
            
            // Atualiza o estilo do link ativo
            settingsLinks.forEach(link => {
             link.classList.remove('bg-blue-100', 'text-blue-700');
             link.classList.add('text-gray-700', 'hover:bg-gray-200');
             if (link.dataset.setting === "cadastrarFuncionario") {
                 link.classList.add('bg-blue-100', 'text-blue-700');
                 link.classList.remove('text-gray-700', 'hover:bg-gray-200');
             }
             });
            
        }
     };
     
     settingsLinks.forEach(link => {
         link.addEventListener('click', (e) => {
             e.preventDefault();
             loadSetting(e.currentTarget.dataset.setting);
         });
     });
     
     loadSetting('cadastrarFuncionario');
    }

export {
    settings,
    handleSettingsPage
}
