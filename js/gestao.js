window.App.gestao = {
    screens: {}
};
function renderGestao(content) {
    document.getElementById('gestao-root').innerHTML = `<div class="fade-in max-w-7xl mx-auto">${content}</div>`;
}
window.App.gestao.renderLayout = function() {
    document.getElementById('gestao-sidebar').innerHTML = `
        <div class="h-16 flex items-center px-6 border-b border-gray-700">
            <span class="text-xl font-extrabold tracking-wide">Painel ONG</span>
        </div>
        <nav id="gestao-sidebar-nav" class="flex-1 py-6 flex flex-col gap-2 px-4">
            <a href="#/gestao" class="p-3 rounded-lg hover:bg-gray-700 font-bold">📊 Painel</a>
            <a href="#/gestao/leads" class="p-3 rounded-lg hover:bg-gray-700 font-bold">👥 Leads</a>
            <a href="#/gestao/animais" class="p-3 rounded-lg hover:bg-gray-700 font-bold">🐶 Animais</a>
            <a href="#/gestao/adocoes" class="p-3 rounded-lg hover:bg-gray-700 font-bold">📝 Adoções</a>
            <a href="#/gestao/mensagens" class="p-3 rounded-lg hover:bg-gray-700 font-bold">✉️ Mensagens</a>
            <a href="#/gestao/campanhas" class="p-3 rounded-lg hover:bg-gray-700 font-bold">📢 Campanhas</a>
        </nav>
        <div class="p-4 border-t border-gray-700 text-sm">
            <a href="#/" class="block text-center bg-gray-700 hover:bg-gray-600 p-3 rounded-lg font-bold mb-2">📱 Ver o App</a>
            <button onclick="sessionStorage.removeItem('cc_gestao_auth'); window.location.hash='#/gestao/login'" class="w-full text-center p-2 text-gray-400 hover:text-white">Sair</button>
        </div>
    `;
    document.getElementById('gestao-header').innerHTML = `
        <div class="flex items-center gap-4">
            <h1 class="text-2xl font-bold text-gray-800">Um Clique, Uma Companhia</h1>
        </div>
        <div class="flex gap-4">
            <button onclick="window.App.data.loadDemoData()" class="text-sm font-bold bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg border border-yellow-300">Carregar Dados Demo</button>
        </div>
    `;
};
// --- AUTH ---
window.App.gestao.screens.Login = function() {
    renderGestao(`
        <div class="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
            <h1 class="text-3xl font-extrabold text-brand-dark mb-4">Acesso à Gestão</h1>
            <p class="text-gray-500 mb-6 bg-yellow-50 p-4 rounded-lg text-sm border border-yellow-200">
                Modo demonstração: os dados ficam apenas neste navegador. A senha padrão é <b>${window.App.data.ong.pin}</b>.
            </p>
            <input type="password" id="g-pin" placeholder="PIN de Acesso" class="w-full border-2 border-gray-300 rounded-lg p-4 text-center text-2xl tracking-widest mb-6 focus:border-brand-primary outline-none">
            <button id="btn-login" class="w-full bg-brand-primary text-white font-bold py-4 rounded-lg shadow-md hover:bg-teal-700 transition">Acessar Painel</button>
            <a href="#/" class="block mt-6 text-gray-500 underline">Voltar para o App Público</a>
        </div>
    `);
    document.getElementById('btn-login').addEventListener('click', () => {
        if (document.getElementById('g-pin').value === window.App.data.ong.pin) {
            sessionStorage.setItem('cc_gestao_auth', 'true');
            window.location.hash = '#/gestao';
        } else {
