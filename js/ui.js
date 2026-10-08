const imgFb = `onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%23E6F4F1\\'/><text x=\\'50\\' y=\\'55\\' font-family=\\'sans-serif\\' font-size=\\'20\\' font-weight=\\'bold\\' text-anchor=\\'middle\\' fill=\\'%231F2937\\'>Foto</text></svg>';"`;

window.App.ui.Header = function() {
    const current = window.App.state.fontSize;
    const hasTTS = ('speechSynthesis' in window);
    
    // Header flexível: Mobile quebra em duas linhas, garantindo botões enormes. Desktop em 1 linha.
    return `
        <header class="w-full bg-brand-card shadow-sm py-3 px-4 sticky top-0 z-50 border-b border-gray-200">
            <div class="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div class="flex justify-between items-center w-full sm:w-auto flex-grow gap-2">
                    <a href="#/" class="font-extrabold text-xl sm:text-2xl text-brand-primary flex items-center min-h-[60px]" aria-label="Início - Uma Companhia">
                        🐶 Uma Companhia
                    </a>
                    <a href="#/contato" class="font-bold text-brand-primary bg-brand-softTeal hover:bg-teal-100 px-4 rounded-xl flex items-center justify-center min-h-[60px] text-base sm:hidden shadow-sm" aria-label="Fale conosco">
                        💬 Fale Conosco
                    </a>
                </div>
                <div class="flex justify-between items-center w-full sm:w-auto gap-4">
                    <div class="flex bg-gray-100 rounded-xl p-1 border border-gray-300 shadow-inner h-fit" role="group" aria-label="Controle de tamanho do texto">
                        <button id="font-normal" class="w-14 h-14 sm:w-12 rounded-lg font-bold transition-colors min-h-[56px] min-w-[48px] ${current === 'normal' ? 'bg-white shadow border border-gray-200 text-brand-primary' : 'text-gray-600'}" aria-pressed="${current === 'normal'}">A</button>
                        <button id="font-large" class="w-14 h-14 sm:w-12 rounded-lg font-bold text-lg transition-colors min-h-[56px] min-w-[48px] ${current === 'large' ? 'bg-white shadow border border-gray-200 text-brand-primary' : 'text-gray-600'}" aria-pressed="${current === 'large'}">A+</button>
                        <button id="font-xl" class="w-14 h-14 sm:w-12 rounded-lg font-bold text-xl transition-colors min-h-[56px] min-w-[48px] ${current === 'xl' ? 'bg-white shadow border border-gray-200 text-brand-primary' : 'text-gray-600'}" aria-pressed="${current === 'xl'}">A++</button>
                    </div>
                    <div class="flex gap-3">
                        ${hasTTS ? `
                        <button id="btn-read-aloud" class="w-14 h-14 rounded-xl bg-brand-light text-brand-dark flex items-center justify-center hover:bg-brand-softOrange border border-gray-300 transition shadow-sm min-h-[56px] min-w-[56px]" aria-label="Ouvir conteúdo desta página">
                            🔊
                        </button>
                        ` : ''}
                        <a href="#/contato" class="hidden sm:flex font-bold text-brand-primary bg-brand-softTeal hover:bg-teal-100 px-5 rounded-xl items-center justify-center min-h-[60px] shadow-sm">
                            💬 Fale Conosco
                        </a>
                    </div>
                </div>
            </div>
        </header>
    `;
};

window.App.ui.Footer = function() {
    return `
        <footer class="w-full bg-brand-dark text-white py-12 px-4 mt-auto">
            <div class="max-w-5xl mx-auto text-center flex flex-col gap-6">
                <h2 class="text-2xl font-extrabold">🐶 Um Clique, Uma Companhia</h2>
                <p class="text-lg opacity-90">Adoção responsável para pessoas incríveis.<br>Não compre, adote!</p>
                <div class="flex flex-col sm:flex-row justify-center gap-6 mt-4">
                    <a href="#/ong" class="font-bold underline min-h-[60px] flex items-center justify-center p-2 rounded hover:text-brand-softOrange focus-visible">Quem Somos / ONGs</a>
                    <a href="#/contato" class="font-bold underline min-h-[60px] flex items-center justify-center p-2 rounded hover:text-brand-softOrange focus-visible">💬 Fale Conosco</a>
                </div>
            </div>
        </footer>
    `;
};

window.App.ui.attachHeaderEvents = function() {
    ['normal', 'large', 'xl'].forEach(size => {
        const btn = document.getElementById(`font-${size}`);
        if (btn) {
            btn.addEventListener('click', () => {
                window.App.lib.applyFontSize(size);
                document.getElementById('layout-header').innerHTML = window.App.ui.Header();
                window.App.ui.attachHeaderEvents();
            });
        }
    });

    const ttsBtn = document.getElementById('btn-read-aloud');
    if (ttsBtn) {
        ttsBtn.addEventListener('click', () => {
            const root = document.getElementById('app-root');
            const isPlaying = ttsBtn.classList.contains('bg-brand-softOrange');
            if (isPlaying) {
                window.App.lib.speak('');
                ttsBtn.classList.remove('bg-brand-softOrange');
            } else {
                window.App.lib.speak(root.innerText);
                ttsBtn.classList.add('bg-brand-softOrange');
            }
        });
    }
};

window.App.ui.Button = function({ label, href = '', variant = 'primary', fullWidth = false, id = '', type = 'button', extraClass = '' }) {
    const baseClass = "inline-flex items-center justify-center gap-4 px-6 py-4 rounded-xl font-bold transition-all active:scale-95 text-center min-h-[60px] border-2 border-transparent";
    const variants = {
        primary: "bg-brand-primary text-white hover:bg-[#0A5B5A] shadow-md",
        secondary: "bg-white text-brand-primary border-brand-primary hover:bg-brand-softTeal shadow-sm",
        whatsapp: "bg-brand-whatsapp text-white hover:bg-[#085a2e] shadow-md",
        highlight: "bg-brand-highlight text-white hover:bg-[#99330a] shadow-md",
        outline: "bg-transparent text-brand-dark border-gray-400 hover:bg-gray-100"
    };
    const classes = `${baseClass} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${extraClass}`;
    const idAttr = id ? `id="${id}"` : '';
    
    if (href) return `<a href="${href}" ${idAttr} class="${classes}">${label}</a>`;
    return `<button type="${type}" ${idAttr} class="${classes}">${label}</button>`;
};

window.App.ui.PetCard = function(pet) {
    return `
        <a href="#/pets/${pet.slug}" class="block bg-brand-card rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-200 focus-visible min-h-[60px] flex flex-col h-full group" aria-label="Ver perfil de ${pet.name}">
            <div class="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
                <img src="${pet.photos[0]}" alt="Foto do ${pet.name}" class="w-full h-full object-cover" ${imgFb} loading="lazy">
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-2xl font-extrabold text-brand-dark">${pet.name}</h3>
                <p class="text-brand-dark opacity-80 mt-2 mb-4 leading-relaxed">${pet.highlight}</p>
                <div class="flex gap-2 mt-auto flex-wrap">
                    <span class="px-3 py-1 bg-brand-softOrange text-brand-highlight rounded-lg text-sm font-bold border border-orange-200">${pet.ageYears} anos</span>
                    <span class="px-3 py-1 bg-brand-softTeal text-brand-primary rounded-lg text-sm font-bold border border-teal-200">${pet.size}</span>
                </div>
                <div class="mt-6">
                    <span class="inline-flex w-full min-h-[48px] items-center justify-center font-bold text-brand-primary border border-brand-primary rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        Conhecer ${pet.name}
                    </span>
                </div>
            </div>
        </a>
    `;
};

window.App.ui.StoryCard = function(story) {
    return `
        <div class="bg-brand-card p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center text-center gap-4 min-h-[60px]">
            <img src="${story.photo}" alt="Foto de ${story.name}" class="w-24 h-24 rounded-full object-cover shadow-sm border-4 border-brand-softTeal" ${imgFb} loading="lazy">
            <h3 class="text-xl font-bold text-brand-dark">${story.name}</h3>
            <p class="text-brand-dark opacity-90 italic">"${story.quote}"</p>
        </div>
    `;
};

window.App.ui.AccordionItem = function(q, a) {
    return `
        <details class="bg-brand-card rounded-2xl shadow-sm border border-gray-200 mb-4 group focus-visible">
            <summary class="font-extrabold text-xl p-6 flex justify-between items-center text-brand-dark min-h-[60px] select-none hover:bg-gray-50 rounded-2xl">
                ${q}
                <span class="text-brand-primary text-3xl group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
            </summary>
            <div class="px-6 pb-6 pt-2 text-brand-dark opacity-90 leading-relaxed text-lg border-t border-gray-100">
                ${a}
            </div>
        </details>
    `;
};

window.App.ui.QuizChoice = function(label, value, icon, activeValue) {
    const isSelected = activeValue === value;
    const baseClass = "w-full p-6 rounded-2xl border-2 text-left flex items-center gap-4 transition-all min-h-[80px]";
    const stateClass = isSelected 
        ? "border-brand-primary bg-brand-softTeal shadow-inner" 
        : "border-gray-200 bg-white hover:border-gray-300 shadow-sm";
    
    return `
        <button class="${baseClass} ${stateClass}" data-value="${value}" aria-pressed="${isSelected}">
            <span class="text-4xl" aria-hidden="true">${icon}</span>
            <span class="text-2xl font-bold text-brand-dark">${label}</span>
            ${isSelected ? '<span class="ml-auto text-brand-primary text-3xl">✓</span>' : ''}
        </button>
    `;
};

window.App.ui.MatchBanner = function(reasons) {
    return `
        <div class="bg-brand-softTeal border-b-4 border-brand-primary p-6 text-center shadow-inner">
            <h2 class="text-2xl font-extrabold text-brand-primary flex items-center justify-center gap-2">
                <span>🏆</span> Combina com você
            </h2>
            <p class="text-lg text-brand-dark font-bold mt-2 opacity-90">${reasons[0]}</p>
        </div>
    `;
};

// O resto do ui.js (BottomNav, InstallBanner, showUpdateToast, etc.) continua abaixo sem mexer.
window.App.ui.BottomNav = function() {
    return `
        <nav class="fixed bottom-0 w-full bg-brand-card shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-[60] border-t border-gray-200 no-select pb-[var(--safe-bottom)]">
            <div class="flex justify-around items-center h-[85px] max-w-lg mx-auto">
                <a href="#/" class="flex flex-col items-center justify-center w-full h-full text-brand-dark opacity-80 hover:opacity-100 hover:bg-gray-50 font-bold active:scale-95 transition-transform">
                    <span class="text-3xl mb-1">🏠</span>
                    <span class="text-sm">Início</span>
                </a>
                <a href="#/pets" class="flex flex-col items-center justify-center w-full h-full text-brand-dark opacity-80 hover:opacity-100 hover:bg-gray-50 font-bold active:scale-95 transition-transform">
                    <span class="text-3xl mb-1">🐶</span>
                    <span class="text-sm">Pets</span>
                </a>
                <a href="#/encontrar" class="flex flex-col items-center justify-center w-full h-full text-brand-dark opacity-80 hover:opacity-100 hover:bg-gray-50 font-bold active:scale-95 transition-transform">
                    <span class="text-3xl mb-1">💛</span>
                    <span class="text-sm">Encontrar</span>
                </a>
                <a href="#/ong" class="flex flex-col items-center justify-center w-full h-full text-brand-dark opacity-80 hover:opacity-100 hover:bg-gray-50 font-bold active:scale-95 transition-transform">
                    <span class="text-3xl mb-1">📍</span>
                    <span class="text-sm">ONG</span>
                </a>
            </div>
        </nav>
    `;
};

window.App.ui.InstallBanner = function() {
    return `
        <div id="install-banner-ui" class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] bg-brand-highlight text-white p-6 rounded-3xl shadow-2xl z-[70] hidden flex-col sm:flex-row items-center justify-between gap-4 border border-[#99330a]">
            <div class="flex flex-col text-center sm:text-left">
                <span class="font-extrabold text-xl">📲 Instale o app</span>
                <span class="text-base opacity-90">Gratuito e sem ocupar espaço.</span>
            </div>
            <div class="flex items-center gap-3 w-full sm:w-auto">
                <a href="#/instalar" class="bg-white text-brand-highlight font-extrabold px-6 py-3 rounded-xl shadow min-h-[56px] flex items-center justify-center flex-grow">Instalar</a>
                <button id="close-banner" class="w-14 h-14 flex items-center justify-center font-bold text-3xl rounded-xl bg-[#99330a] hover:bg-[#7a2908] min-w-[56px] min-h-[56px]" aria-label="Fechar aviso">&times;</button>
            </div>
        </div>
    `;
};

window.App.ui.showUpdateToast = function() {
    const toast = document.getElementById('update-toast');
    toast.innerHTML = `
        <div class="fixed top-24 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-brand-dark text-white p-6 rounded-2xl shadow-xl z-[100] flex flex-col gap-4 fade-in border border-gray-600">
            <span class="font-bold text-xl">✨ Há uma nova versão do app!</span>
            <button onclick="window.location.reload()" class="bg-brand-primary text-white font-bold py-3 px-4 rounded-xl min-h-[56px] hover:bg-teal-700">Atualizar Agora</button>
        </div>
    `;
};

window.App.ui.attachInstallEvents = function() {
    const banner = document.getElementById('install-banner-ui');
    const closeBtn = document.getElementById('close-banner');
    if (!banner || !closeBtn) return;

    const isAppMode = window.App.state.mode === 'app';
    const lastDismissed = localStorage.getItem('banner_dismissed');
    const now = new Date().getTime();
    const daysSince = lastDismissed ? (now - parseInt(lastDismissed)) / (1000 * 3600 * 24) : 999;
    let pageViews = parseInt(localStorage.getItem('page_views') || '0') + 1;
    localStorage.setItem('page_views', pageViews.toString());

    if (!isAppMode && daysSince > 14 && pageViews >= 2) {
        banner.classList.remove('hidden');
        banner.classList.add('flex');
    }

    closeBtn.addEventListener('click', () => {
        banner.classList.add('hidden');
        banner.classList.remove('flex');
        localStorage.setItem('banner_dismissed', new Date().getTime().toString());
    });
};
