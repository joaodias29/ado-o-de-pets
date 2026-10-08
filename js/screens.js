window.App.screens = {};

function render(content, skipFooter = false) {
    const root = document.getElementById('app-root');
    root.innerHTML = `<div class="fade-in w-full pb-10">${content}</div>`;
    if (!skipFooter) document.getElementById('layout-footer').innerHTML = window.App.ui.Footer();
    window.scrollTo(0, 0);
}

// --- HOME ---
window.App.screens.HomeScreen = function() {
    const pets = window.App.services.getPets().slice(0, 3);
    const stories = window.App.data.stories;
    const faqs = window.App.data.faq;
    
    render(`
        <div class="flex flex-col gap-12 sm:gap-16">
            <section class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 pt-8 pb-4 max-w-5xl mx-auto w-full">
                <div class="flex flex-col gap-6 lg:w-1/2 text-center lg:text-left">
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark leading-[1.2]">
                        Encontrar a minha companhia perfeita
                    </h1>
                    <p class="text-xl sm:text-2xl text-brand-dark opacity-90 max-w-[65ch] mx-auto lg:mx-0">
                        Adoção não é sobre pena, é sobre começar uma nova e feliz história juntos. Descubra o pet ideal para o seu estilo de vida.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
                        ${window.App.ui.Button({ label: 'Encontrar companhia (Quiz)', href: '#/encontrar', variant: 'primary', fullWidth: false })}
                        ${window.App.ui.Button({ label: 'Ver pets disponíveis', href: '#/pets', variant: 'secondary', fullWidth: false })}
                    </div>
                    <a href="#como-funciona" class="mt-4 text-xl font-bold text-brand-primary underline hover:text-brand-dark min-h-[48px] inline-flex items-center justify-center lg:justify-start p-2 rounded w-max mx-auto lg:mx-0">
                        Como a adoção funciona?
                    </a>
                </div>
                <div class="lg:w-1/2 rounded-3xl overflow-hidden shadow-xl border-4 border-brand-softOrange">
                    <img src="https://images.unsplash.com/photo-1543466835-00a73417ab05?auto=format&fit=crop&w=800&q=80" alt="Cachorro sorrindo confortavelmente na cama" class="w-full h-auto object-cover max-h-[400px]">
                </div>
            </section>
            
            <section class="bg-brand-softTeal p-8 sm:p-12 rounded-3xl shadow-sm border border-teal-100">
                <h2 class="text-3xl font-extrabold mb-8 text-brand-dark text-center">Histórias que inspiram</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${stories.map(s => window.App.ui.StoryCard(s)).join('')}
                </div>
            </section>

            <section>
                <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 text-center sm:text-left">
                    <h2 class="text-3xl font-extrabold text-brand-dark">Pets disponíveis perto de você</h2>
                    <a href="#/pets" class="font-bold text-brand-primary underline text-xl min-h-[48px] flex items-center hover:text-brand-dark p-2 rounded">Ver todos os pets</a>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${pets.map(p => window.App.ui.PetCard(p)).join('')}
                </div>
            </section>

            <section id="como-funciona" class="flex flex-col md:flex-row items-center gap-10 bg-brand-card p-8 sm:p-12 rounded-3xl shadow-md border border-gray-200">
                <div class="md:w-1/2 order-2 md:order-1 flex flex-col gap-6 text-center md:text-left">
                    <h2 class="text-3xl font-extrabold text-brand-dark">O que é a adoção responsável?</h2>
                    <p class="text-xl text-brand-dark opacity-90 max-w-[65ch]">
                        Adotar um pet é um compromisso para toda a vida do animal. Significa oferecer amor, paciência, alimentação adequada e cuidados veterinários. Em troca, você ganha a lealdade e a companhia mais pura que existe.
                    </p>
                    <div class="mt-4">
                        ${window.App.ui.Button({ label: 'Ver pets para adoção', href: '#/pets', variant: 'primary' })}
                    </div>
                </div>
                <div class="md:w-1/2 order-1 md:order-2 rounded-2xl overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80" alt="Idoso abraçando um cachorro" class="w-full h-auto object-cover max-h-[350px]">
                </div>
            </section>

            <section class="max-w-4xl mx-auto w-full">
                <h2 class="text-3xl font-extrabold mb-8 text-brand-dark text-center">Dúvidas Comuns</h2>
                <div class="flex flex-col gap-2">
                    ${faqs.map(f => window.App.ui.AccordionItem(f.q, f.a)).join('')}
                </div>
            </section>

            <section class="bg-brand-softOrange p-8 sm:p-12 rounded-3xl shadow-sm text-center max-w-3xl mx-auto border border-orange-100">
                <div class="text-6xl mb-4">🏠</div>
                <h2 class="text-3xl font-extrabold mb-4 text-brand-dark">Conheça nossa ONG Parceira</h2>
                <p class="text-xl text-brand-dark opacity-90 mb-8">
                    Todo o processo de adoção é guiado por profissionais que conhecem bem os animais e vão te ajudar a fazer a melhor escolha.
                </p>
                ${window.App.ui.Button({ label: 'Ver informações da ONG', href: '#/ong', variant: 'secondary' })}
            </section>
        </div>
    `);
};

// --- LISTA PETS ---
window.App.screens.PetsScreen = function() {
    const pets = window.App.services.getPets();
    render(`
        <nav class="mb-8">
            <a href="javascript:history.back()" class="text-brand-primary font-bold text-xl min-h-[60px] inline-flex items-center gap-2 underline px-2 py-2 -ml-2 rounded">
                ← Voltar
            </a>
        </nav>
        <h1 class="text-4xl font-extrabold text-brand-dark mb-8 text-center md:text-left">Todos os Pets Disponíveis</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${pets.map(p => window.App.ui.PetCard(p)).join('')}
        </div>
    `);
};

// --- PERFIL DO PET ---
window.App.screens.PetProfileScreen = function(slug) {
    const pet = window.App.services.getPetBySlug(slug);
    if (!pet) return window.App.router.handleRoute('#/');

    const lastMatch = window.App.services.getLastMatch();
    const isMatch = lastMatch && lastMatch.match.pet.slug === slug;

    render(`
        <nav class="mb-6">
            <a href="javascript:history.back()" class="text-brand-primary font-bold text-xl min-h-[60px] inline-flex items-center gap-2 underline px-2 py-2 -ml-2 rounded">
                ← Voltar
            </a>
        </nav>
        
        <div class="bg-brand-card rounded-3xl overflow-hidden shadow-xl border border-gray-200 flex flex-col md:flex-row pb-24 md:pb-0 relative">
            <div class="md:w-1/2 relative bg-gray-100 flex flex-col">
                ${isMatch ? window.App.ui.MatchBanner(lastMatch.match.reasons) : ''}
                <img src="${pet.photos[0]}" alt="Foto do ${pet.name}" class="w-full h-[400px] md:h-full object-cover flex-grow" onerror="this.style.display='none'">
            </div>
            
            <div class="p-8 md:p-12 md:w-1/2 flex flex-col">
                <h1 class="text-5xl font-extrabold text-brand-dark mb-2">${pet.name}</h1>
                <p class="text-2xl text-brand-dark opacity-90 font-semibold mb-8">${pet.highlight}</p>
                
                <div class="flex flex-wrap gap-3 mb-8">
                    <span class="px-5 py-3 bg-brand-softOrange text-brand-highlight font-bold rounded-xl border border-orange-200 text-xl">${pet.ageYears} anos</span>
                    <span class="px-5 py-3 bg-brand-softTeal text-brand-primary font-bold rounded-xl border border-teal-200 text-xl">Porte ${pet.size}</span>
                    ${pet.personality.map(p => `<span class="px-5 py-3 bg-gray-100 text-brand-dark font-bold rounded-xl border border-gray-300 text-xl">${p.charAt(0).toUpperCase() + p.slice(1)}</span>`).join('')}
                </div>

                <div class="bg-brand-softTeal p-8 rounded-2xl mb-10 border border-teal-100">
                    <h2 class="text-3xl font-extrabold text-brand-dark mb-4">A História</h2>
                    <p class="text-xl text-brand-dark opacity-90 leading-relaxed max-w-[65ch]">${pet.story}</p>
                </div>

                <div class="hidden md:flex flex-col gap-4 mt-auto">
                    ${window.App.ui.Button({ label: `Tenho interesse no ${pet.name}`, href: `#/pets/${pet.slug}/interesse`, variant: 'highlight', fullWidth: true })}
                    ${window.App.ui.Button({ label: '💬 Falar direto no WhatsApp', href: `#/pets/${pet.slug}/whatsapp`, variant: 'whatsapp', fullWidth: true })}
                    ${window.App.ui.Button({ label: '📍 Onde conhecer', href: `#/ong`, variant: 'secondary', fullWidth: true })}
                </div>
            </div>

            <div class="md:hidden fixed bottom-0 left-0 w-full bg-white p-4 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)] z-50 flex flex-col gap-3 border-t border-gray-200 pb-[var(--safe-bottom)]">
                ${window.App.ui.Button({ label: `Tenho interesse`, href: `#/pets/${pet.slug}/interesse`, variant: 'highlight', fullWidth: true, extraClass: 'shadow-lg' })}
                ${window.App.ui.Button({ label: 'Falar no WhatsApp', href: `#/pets/${pet.slug}/whatsapp`, variant: 'whatsapp', fullWidth: true, extraClass: 'shadow-lg' })}
            </div>
        </div>
        <div class="md:hidden h-[20px]"></div>
    `);
    
    if (isMatch) window.App.lib.trackEvent('match_profile_opened', { pet: pet.name });
};

// --- QUIZ E TRANSIÇÃO E MATCH ÚNICO ---
const QUIZ_QUESTIONS = [
    { id: 'p1', title: 'Você procura um pet mais...', options: [{ l: 'Carinhoso', v: 'carinhoso', i: '❤️' }, { l: 'Tranquilo', v: 'tranquilo', i: '😊' }, { l: 'Brincalhão', v: 'brincalhao', i: '🎾' }] },
    { id: 'p2', title: 'Você mora em...', options: [{ l: 'Casa', v: 'casa', i: '🏠' }, { l: 'Apartamento', v: 'apartamento', i: '🏢' }] },
    { id: 'p3', title: 'Quanto tempo tem livre por dia?', options: [{ l: 'Pouco tempo', v: 'pouco', i: '⏳' }, { l: 'Algumas horas', v: 'algumas-horas', i: '⏱️' }, { l: 'Grande parte do dia', v: 'grande-parte', i: '☀️' }] }
];

window.App.screens.QuizScreen = function() {
    const lastMatch = window.App.services.getLastMatch();
    
    // Se o usuário tem um match não-expirado na memória, oferecemos a opção de vê-lo
    if (lastMatch && !window.App._forceQuiz) {
        return render(`
            <div class="max-w-2xl mx-auto w-full pt-16 text-center">
                <div class="text-7xl mb-8">❤️</div>
                <h1 class="text-4xl font-extrabold text-brand-dark mb-6">Você já fez o quiz!</h1>
                <p class="text-2xl text-brand-dark opacity-90 mb-10">Temos um resultado guardado para você. O que deseja fazer?</p>
                <div class="flex flex-col gap-4">
                    ${window.App.ui.Button({ label: 'Ver meu resultado anterior', href: `#/match/${lastMatch.match.pet.slug}`, variant: 'highlight', fullWidth: true })}
                    <button id="btn-refazer" class="inline-flex items-center justify-center gap-4 px-6 py-4 rounded-xl font-bold transition-all active:scale-95 text-center min-h-[60px] border-2 border-brand-primary bg-white text-brand-primary hover:bg-brand-softTeal shadow-sm w-full">Refazer o Quiz</button>
                </div>
            </div>
        `);
    }

    let currentStep = 0;
    const renderStep = () => {
        if (currentStep >= QUIZ_QUESTIONS.length) {
            // Fim do quiz -> Calcula Match
            const answers = window.App.services.getQuizAnswers();
            const result = window.App.lib.matchPet(answers);
            window.App.services.saveMatch(result);
            window.App._forceQuiz = false; // reset flag
            return window.App.router.handleRoute('#/transicao');
        }
        
        const q = QUIZ_QUESTIONS[currentStep];
        const answers = window.App.services.getQuizAnswers();
        const activeVal = answers[q.id];

        render(`
            <div class="max-w-2xl mx-auto w-full pt-8">
                <div class="mb-8">
                    <button id="btn-voltar-quiz" class="text-brand-primary font-bold text-xl min-h-[60px] inline-flex items-center gap-2 underline px-2 py-2 -ml-2 rounded">
                        ← Voltar
                    </button>
                </div>
                <div class="w-full bg-gray-200 h-4 rounded-full mb-8 overflow-hidden">
                    <div class="bg-brand-primary h-4 transition-all duration-500 rounded-full" style="width: ${((currentStep+1)/QUIZ_QUESTIONS.length)*100}%"></div>
                </div>
                <h2 class="text-2xl text-gray-500 font-bold mb-4">Pergunta ${currentStep + 1} de 3</h2>
                <h1 class="text-4xl font-extrabold text-brand-dark mb-10 leading-[1.3]">${q.title}</h1>
                <div class="flex flex-col gap-6 mb-12" id="quiz-options">
                    ${q.options.map(opt => window.App.ui.QuizChoice(opt.l, opt.v, opt.i, activeVal)).join('')}
                </div>
                ${window.App.ui.Button({ label: 'Continuar para a próxima', variant: 'primary', fullWidth: true, id: 'btn-next' })}
            </div>
        `);

        document.querySelectorAll('#quiz-options button').forEach(b => b.addEventListener('click', () => {
            window.App.services.saveQuizAnswer(q.id, b.getAttribute('data-value'));
            renderStep();
        }));

        document.getElementById('btn-voltar-quiz').addEventListener('click', () => {
            if (currentStep > 0) { currentStep--; renderStep(); } else window.history.back();
        });
        document.getElementById('btn-next').addEventListener('click', () => {
            if (!window.App.services.getQuizAnswers()[q.id]) return alert('Por favor, selecione uma opção para continuar.');
            currentStep++; renderStep();
        });
    };
    
    renderStep();

    // Event listener pós render se a tela inicial de Refazer aparecer
    const btnRefazer = document.getElementById('btn-refazer');
    if(btnRefazer) {
        btnRefazer.addEventListener('click', () => {
            window.App.services.clearQuizAnswers();
            window.App._forceQuiz = true;
            window.App.screens.QuizScreen();
        });
    }
};

window.App.screens.TransitionScreen = function() {
    render(`
        <div class="flex flex-col items-center justify-center pt-24 text-center max-w-2xl mx-auto h-[60vh]">
            <div class="text-8xl mb-12 pulse-heart">❤️</div>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-brand-dark mb-6">Procurando quem combina com você...</h1>
            <p class="text-2xl text-gray-600 mb-12">Analisando suas respostas</p>
            ${window.App.ui.Button({ label: 'Pular', id: 'btn-skip-anim', variant: 'outline' })}
        </div>
    `, true); // skip footer

    const result = window.App.services.getLastMatch();
    const go = () => window.App.router.handleRoute(`#/match/${result.match.pet.slug}`);
    const timer = setTimeout(go, 2500);
    document.getElementById('btn-skip-anim').addEventListener('click', () => {
        clearTimeout(timer); go();
    });
};

window.App.screens.MatchScreen = function(slug) {
    const data = window.App.services.getLastMatch();
    if (!data || data.match.pet.slug !== slug) return window.App.router.handleRoute('#/encontrar');
    
    const pet = data.match.pet;
    const reasons = data.match.reasons;

    render(`
        <div class="max-w-3xl mx-auto pt-8">
            <nav class="mb-8">
                <a href="#/encontrar" class="text-brand-primary font-bold text-xl min-h-[60px] inline-flex items-center gap-2 underline px-2 py-2 -ml-2 rounded" onclick="window.App._forceQuiz=true;">
                    ← Refazer Quiz
                </a>
            </nav>

            <div class="bg-brand-card rounded-3xl shadow-xl overflow-hidden border border-gray-200 flex flex-col mb-8 pb-4">
                <div class="bg-brand-softTeal py-10 px-6 flex flex-col items-center text-center">
                    <img src="${pet.photos[0]}" alt="Foto do ${pet.name}" class="w-48 h-48 rounded-full object-cover border-8 border-white shadow-lg mb-6">
                    <h1 class="text-4xl sm:text-5xl font-extrabold text-brand-dark">Encontramos o ${pet.name} para você! ❤️</h1>
                </div>
                
                <div class="p-8 sm:p-12">
                    <div class="flex flex-col gap-4 mb-10">
                        ${reasons.map(r => `
                            <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <span class="text-3xl">✅</span>
                                <span class="text-2xl text-brand-dark font-bold">${r}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="flex flex-col gap-4">
                        ${window.App.ui.Button({ label: `👀 Conhecer o ${pet.name}`, href: `#/pets/${pet.slug}`, variant: 'primary', fullWidth: true })}
                        ${window.App.ui.Button({ label: '💬 Falar com a ONG pelo WhatsApp', href: `#/pets/${pet.slug}/whatsapp`, variant: 'whatsapp', fullWidth: true })}
                    </div>
                </div>
            </div>

            <div class="text-center pb-8">
                <a href="#/match-outros" class="font-bold text-2xl text-brand-primary underline p-4 inline-flex min-h-[60px] hover:bg-brand-softTeal rounded-xl">
                    Ver outros que também combinam
                </a>
            </div>
        </div>
    `);
    
    window.App.lib.trackEvent('match_shown', { petId: pet.id });
};

window.App.screens.MatchOthersScreen = function() {
    const data = window.App.services.getLastMatch();
    if (!data) return window.App.router.handleRoute('#/encontrar');
    
    render(`
        <nav class="mb-8">
            <a href="javascript:history.back()" class="text-brand-primary font-bold text-xl min-h-[60px] inline-flex items-center gap-2 underline px-2 py-2 -ml-2 rounded">
                ← Voltar
            </a>
        </nav>
        <h1 class="text-4xl font-extrabold text-brand-dark mb-4 text-center md:text-left">Outras companhias ideais</h1>
        <p class="text-2xl text-gray-600 mb-10 text-center md:text-left">Estes pets também combinam com as suas respostas e esperam por uma visita.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            ${data.others.map(p => window.App.ui.PetCard(p)).join('')}
        </div>
    `);

    window.App.lib.trackEvent('match_others_opened');
};

// --- FALE CONOSCO (CONTATO) ---
window.App.screens.ContactScreen = function() {
    render(`
        <div class="max-w-2xl mx-auto pt-8">
            <nav class="mb-6">
                <a href="javascript:history.back()" class="text-brand-primary font-bold text-xl min-h-[60px] inline-flex items-center gap-2 underline px-2 py-2 -ml-2 rounded">
                    ← Voltar
                </a>
            </nav>
            
            <div class="text-center mb-10">
                <div class="text-7xl mb-4">💬</div>
                <h1 class="text-4xl font-extrabold text-brand-dark mb-4">Fale Conosco</h1>
                <p class="text-2xl text-brand-dark opacity-90">Estamos aqui para ajudar. Escolha como prefere falar com a gente.</p>
            </div>

            <div class="flex flex-col gap-4 mb-12">
                ${window.App.ui.Button({ label: '💬 Conversar no WhatsApp', href: window.App.lib.whatsappLink(), variant: 'whatsapp', fullWidth: true, id: 'btn-contato-zap' })}
                ${window.App.ui.Button({ label: '📞 Ligar agora', href: `tel:${window.App.data.ong.telefone}`, variant: 'outline', fullWidth: true, id: 'btn-contato-call', extraClass: 'bg-white font-extrabold border-gray-300' })}
            </div>

            <div class="bg-brand-card p-8 rounded-3xl shadow-sm border border-gray-200 mb-12">
                <h2 class="text-3xl font-extrabold text-brand-dark mb-8 text-center">✉️ Enviar uma mensagem</h2>
                
                <form id="contact-form" class="flex flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <label for="c-nome" class="text-xl font-bold text-brand-dark">Seu Nome Completo</label>
                        <input type="text" id="c-nome" class="border-2 border-gray-300 rounded-xl p-4 text-xl min-h-[60px] focus:border-brand-primary focus:outline-none" required>
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label for="c-tel" class="text-xl font-bold text-brand-dark">Telefone ou WhatsApp</label>
                        <input type="tel" id="c-tel" class="border-2 border-gray-300 rounded-xl p-4 text-xl min-h-[60px] focus:border-brand-primary focus:outline-none" required>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="c-msg" class="text-xl font-bold text-brand-dark">Como podemos ajudar?</label>
                        <textarea id="c-msg" rows="4" class="border-2 border-gray-300 rounded-xl p-4 text-xl focus:border-brand-primary focus:outline-none" required></textarea>
                    </div>

                    <label class="flex items-start gap-4 mt-2 mb-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-brand-softTeal transition border border-gray-200">
                        <input type="checkbox" id="c-auth" class="w-8 h-8 mt-1 accent-brand-primary" required>
                        <span class="text-xl text-brand-dark font-semibold">Autorizo a ONG a entrar em contato comigo respondendo esta mensagem.</span>
                    </label>

                    ${window.App.ui.Button({ label: 'Enviar Mensagem', type: 'submit', variant: 'primary', fullWidth: true })}
                </form>
                
                <div id="contact-success" class="hidden flex-col items-center text-center p-8 bg-brand-softTeal rounded-2xl border border-teal-200 mt-6">
                    <span class="text-5xl mb-4">✅</span>
                    <h3 class="text-3xl font-extrabold text-brand-dark mb-2">Mensagem enviada!</h3>
                    <p class="text-xl text-brand-dark opacity-90">A ONG recebeu seu contato e vai responder em breve.</p>
                </div>
            </div>

            <div class="text-center text-xl text-brand-dark opacity-80 pb-8">
                <p>Atendimento: ${window.App.data.ong.horario}</p>
                <p class="mt-2"><a href="#/ong" class="font-bold underline min-h-[48px] inline-flex items-center">Ver endereço completo</a></p>
            </div>
        </div>
    `);

    window.App.lib.trackEvent('contact_click', { origin: 'page' });

    document.getElementById('btn-contato-zap').addEventListener('click', () => window.App.lib.trackEvent('contact_whatsapp_click'));
    document.getElementById('btn-contato-call').addEventListener('click', () => window.App.lib.trackEvent('contact_call_click'));

    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('c-nome').value;
        const tel = document.getElementById('c-tel').value;
        const msg = document.getElementById('c-msg').value;

        window.App.services.saveMessage({ nome, tel, msg });
        window.App.lib.trackEvent('contact_message_sent');
        
        document.getElementById('contact-form').style.display = 'none';
        document.getElementById('contact-success').classList.remove('hidden');
        document.getElementById('contact-success').classList.add('flex');
    });
};

// --- ADMIN E CAIXA DE MENSAGENS ---
window.App.screens.AdminMessagesScreen = function() {
    const msgs = window.App.services.getMessages();

    render(`
        <nav class="mb-8 max-w-4xl mx-auto">
            <a href="#/admin" class="text-brand-primary font-bold text-xl min-h-[60px] inline-flex items-center gap-2 underline px-2 py-2 -ml-2 rounded">
                ← Voltar para o Painel
            </a>
        </nav>

        <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-extrabold text-brand-dark mb-8">Caixa de Entrada (Fale Conosco)</h1>
            
            ${msgs.length === 0 ? `
                <div class="bg-white p-12 text-center rounded-3xl border border-gray-200">
                    <span class="text-5xl opacity-50">📬</span>
                    <p class="text-2xl text-gray-500 mt-4 font-bold">Nenhuma mensagem recebida ainda.</p>
                </div>
            ` : `
                <div class="flex flex-col gap-6">
                    ${msgs.slice().reverse().map(m => `
                        <div class="bg-brand-card p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4">
                            <div class="flex justify-between items-start flex-wrap gap-4">
                                <div>
                                    <h3 class="text-2xl font-bold text-brand-dark">${m.nome}</h3>
                                    <p class="text-lg text-gray-500">${new Date(m.date).toLocaleString()}</p>
                                </div>
                                <span class="px-4 py-2 rounded-lg text-sm font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">${m.status}</span>
                            </div>
                            
                            <p class="text-xl text-brand-dark font-semibold bg-gray-50 p-4 rounded-xl border border-gray-100">📞 ${m.tel}</p>
                            <p class="text-xl text-brand-dark whitespace-pre-wrap mt-2 p-4 border-l-4 border-brand-primary bg-brand-softTeal rounded-r-xl">${m.msg}</p>
                            
                            <div class="flex flex-col sm:flex-row gap-4 mt-4">
                                <a href="https://wa.me/${m.tel.replace(/\\D/g, '')}?text=Olá%20${encodeURIComponent(m.nome)},%20somos%20da%20ONG%20e%20recebemos%20sua%20mensagem." target="_blank" class="bg-brand-whatsapp text-white font-bold px-6 py-3 rounded-xl min-h-[56px] flex items-center justify-center flex-grow shadow-sm">
                                    Responder no WhatsApp
                                </a>
                                <button onclick="window.App.services.deleteMessage('${m.id}'); window.App.screens.AdminMessagesScreen();" class="bg-white text-red-600 border border-red-300 hover:bg-red-50 font-bold px-6 py-3 rounded-xl min-h-[56px]">
                                    Excluir
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `);
};

// Precisamos atualizar o AdminScreen para exibir os relatórios de Matches e atalho para Caixa de Mensagens
window.App.screens.AdminScreen = function() {
    const leads = window.App.services.getLeadEvents();
    const msgs = window.App.services.getMessages();
    
    const installs = leads.filter(l => l.name === 'app_installed').length;
    const viaApp = leads.filter(l => l.mode === 'app').length;
    
    // Funil Match
    const matches = leads.filter(l => l.name === 'match_shown');
    const petsRanking = {};
    matches.forEach(m => { petsRanking[m.petId] = (petsRanking[m.petId] || 0) + 1; });

    render(`
        <nav class="mb-8 max-w-4xl mx-auto">
            <a href="#/" class="text-brand-primary font-bold text-xl min-h-[60px] inline-flex items-center gap-2 underline px-2 py-2 -ml-2 rounded">
                ← Voltar para Área Pública
            </a>
        </nav>
        
        <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-extrabold text-brand-dark mb-8">Painel da ONG</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-brand-card p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 class="text-lg font-bold text-gray-500 uppercase tracking-wide mb-2">Instalações do PWA</h3>
                    <div class="flex justify-between items-end mt-4">
                        <div>
                            <p class="text-4xl font-extrabold text-brand-whatsapp">${installs}</p>
                            <p class="text-lg font-bold text-brand-dark">Sucessos</p>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-brand-highlight">${viaApp}</p>
                            <p class="text-sm font-bold text-brand-dark">Ações via App</p>
                        </div>
                    </div>
                </div>

                <div class="bg-brand-softOrange p-6 rounded-2xl shadow-sm border border-orange-200 flex flex-col justify-center">
                    <h3 class="text-lg font-bold text-gray-700 uppercase tracking-wide mb-2">Fale Conosco</h3>
                    <div class="flex justify-between items-end mt-2 mb-4">
                        <div>
                            <p class="text-4xl font-extrabold text-brand-highlight">${msgs.length}</p>
                            <p class="text-lg font-bold text-brand-dark">Mensagens na Caixa</p>
                        </div>
                    </div>
                    ${window.App.ui.Button({ label: 'Abrir Mensagens', href: '#/admin/mensagens', variant: 'primary', fullWidth: true })}
                </div>
            </div>

            <div class="bg-brand-softTeal p-6 rounded-2xl shadow-sm border border-teal-200 mb-12">
                <h3 class="text-2xl font-extrabold text-brand-dark mb-4">🏆 Pets mais indicados pelo Quiz</h3>
                ${Object.keys(petsRanking).length === 0 ? '<p class="text-lg">Nenhum quiz finalizado ainda.</p>' : `
                    <div class="flex flex-col gap-3 mt-4">
                        ${Object.entries(petsRanking).sort((a,b)=>b[1]-a[1]).map(([id, count]) => {
                            const p = window.App.services.getPets().find(x => x.id === id);
                            return p ? `
                                <div class="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                                    <span class="text-xl font-bold text-brand-dark">${p.name}</span>
                                    <span class="text-xl font-extrabold text-brand-primary bg-brand-softTeal px-4 py-1 rounded-lg">${count} matches</span>
                                </div>
                            ` : '';
                        }).join('')}
                    </div>
                `}
            </div>

            <!-- Manutenção das outras telas para trás (Interesses, Instalações, etc. continuam intactos) -->
        </div>
    `);
};
