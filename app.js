window.App = {
    data: {}, services: {}, lib: {}, ui: {}, screens: {}, router: {},
    state: {
        fontSize: localStorage.getItem('fontSize') || 'normal',
        deferredPrompt: null,
        mode: 'site'
    },
    init: function() {
        console.log("Iniciando Um Clique, Uma Companhia...");
        
        // Determina e aplica o modo (Site vs App)
        this.state.mode = this.lib.getMode();
        document.documentElement.setAttribute('data-mode', this.state.mode);

        this.lib.applyFontSize(this.state.fontSize);
        
        const header = document.getElementById('layout-header');
        if (header) {
            header.innerHTML = this.ui.Header();
            this.ui.attachHeaderEvents();
        }

        // Renderiza Bottom Nav e Banner (visibilidade gerida via CSS data-mode)
        document.getElementById('bottom-nav').innerHTML = this.ui.BottomNav();
        document.getElementById('install-banner').innerHTML = this.ui.InstallBanner();
        this.ui.attachInstallEvents();

        this.registerSW();
        
        // Listener de interceptação de instalação do Android
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            window.App.state.deferredPrompt = e;
            window.App.lib.trackEvent('install_prompt_shown');
        });

        window.addEventListener('appinstalled', () => {
            window.App.state.deferredPrompt = null;
            window.App.lib.trackEvent('app_installed');
            document.documentElement.setAttribute('data-mode', 'app');
            alert('Pronto! O app foi instalado com sucesso. ✓');
        });
    },

    registerSW: function() {
        if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
            navigator.serviceWorker.register('./sw.js').then(reg => {
                console.log('SW registrado', reg);
            }).catch(err => console.error('Erro SW:', err));

            // Ouvir mensagens de atualização do SW
            navigator.serviceWorker.addEventListener('message', event => {
                if (event.data && event.data.type === 'VERSION_UPDATE') {
                    window.App.ui.showUpdateToast();
                }
            });
        }
    }
};
