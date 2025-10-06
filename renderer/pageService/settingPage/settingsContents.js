const settingsContents = {
                cadastrarFuncionario: `
                    <div class="bg-white rounded-lg shadow-md p-8 h-full">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6">Cadastrar Novo Funcionário</h2>
                        <form id="employee-form" novalidate>
                            <div class="space-y-6">
                                <div>
                                    <label for="employee-user" class="block text-sm font-medium text-gray-700 mb-1">Usuário de Acesso</label>
                                    <input type="text" id="employee-user" name="employee-user" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition" required>
                                </div>
                                 
                            </div>
                            <div class="mt-8 pt-5 border-t border-gray-200 flex justify-end items-center gap-4">
                                <button type="button" id="view-employees-btn" class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Visualizar Funcionários</button>
                                <button type="submit" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Salvar Funcionário</button>
                            </div>
                        </form>
                    </div>
                `,
                visualizarFuncionarios: `
                    <div class="bg-white rounded-lg shadow-md overflow-hidden h-full">
                        <div class="p-6 border-b flex justify-between items-center">
                            <h2 class="text-2xl font-bold text-gray-800">Funcionários Cadastrados</h2>
                            <button id="add-employee-btn" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Cadastrar Novo</button>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">ID</th>
                                        <th scope="col" class="px-6 py-3">Usuário</th>
                                        <th scope="col" class="px-6 py-3 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="employee-table-body">
                                    <!-- Funcionários serão inseridos aqui -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                `
            };
export {
    settingsContents
}