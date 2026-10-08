window.App.router.start = function() {
    window.addEventListener('hashchange', this.handleRoute.bind(this));
    this.handleRoute();
};

window.App.router.handleRoute = function() {
    const hash = window.location.hash || '#/';
    const root = document.getElementById('app-root');
    
    window.App.lib.speak(''); 
    root.innerHTML = '';
    
    const parts = hash.replace(/^#\//, '').split('/');
    
    if (hash === '#/') return window.App.screens.HomeScreen();
    if (hash === '#/video') return window.App.screens.VideoScreen();
    if (hash === '#/pets') return window.App.screens.PetsScreen();
    if (hash === '#/encontrar') return window.App.screens.QuizScreen();
    if (hash === '#/transicao') return window.App.screens.TransitionScreen();
    if (hash === '#/match-outros') return window.App.screens.MatchOthersScreen();
    if (hash === '#/ong') return window.App.screens.OngScreen();
    if (hash === '#/contato') return window.App.screens.ContactScreen();
    if (hash === '#/instalar') return window.App.screens.InstallScreen();
    if (hash === '#/admin') return window.App.screens.AdminScreen();
    if (hash === '#/admin/mensagens') return window.App.screens.AdminMessagesScreen();

    if (parts[0] === 'match' && parts.length === 2) {
        return window.App.screens.MatchScreen(parts[1]);
    }

    if (parts[0] === 'pets' && parts.length >= 2) {
        const slug = parts[1];
        if (parts.length === 2) return window.App.screens.PetProfileScreen(slug);
        if (parts[2] === 'interesse') return window.App.screens.InterestScreen(slug);
        if (parts[2] === 'whatsapp') return window.App.screens.WhatsappScreen(slug);
        if (parts[2] === 'chat') return window.App.screens.ChatScreen(slug);
    }
    
    if (!navigator.onLine) {
        return root.innerHTML = `
            <div class="fade-in text-center mt-20 pt-8" aria-live="assertive">
                <div class="text-7xl mb-8">📶</div>
                <h2 class="text-4xl font-extrabold text-brand-dark mb-4">Você está sem internet</h2>
                <p class="mb-10 text-xl text-gray-700 max-w-lg mx-auto">Mas não se preocupe! Os pets que você já conheceu continuam salvos aqui no seu aplicativo.</p>
                ${window.App.ui.Button({ label: 'Tentar de novo', href: 'javascript:window.location.reload()', variant: 'primary', fullWidth: true })}
                <div class="mt-4">
                    ${window.App.ui.Button({ label: 'Ver Pets Salvos', href: '#/pets', variant: 'outline', fullWidth: true })}
                </div>
            </div>
        `;
    }

    // 404
    root.innerHTML = `
        <div class="fade-in text-center mt-20 pt-8" aria-live="assertive">
            <h2 class="text-4xl font-extrabold text-brand-dark mb-4">Página não encontrada</h2>
            <p class="mb-10 text-xl text-gray-700">Desculpe, o endereço que você tentou acessar não existe mais ou foi movido.</p>
            ${window.App.ui.Button({ label: 'Voltar para a Página Inicial', href: '#/', variant: 'primary', fullWidth: true })}
        </div>
    `;
};

document.addEventListener('DOMContentLoaded', () => {
    window.App.init();
    window.App.router.start();
});
