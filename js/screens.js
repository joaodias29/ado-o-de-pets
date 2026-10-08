window.App.screens = {};
function renderApp(content) {
    const root = document.getElementById('app-root');
    root.innerHTML = `<div class="fade-in w-full pb-10 px-4">${content}</div>`;
    window.scrollTo(0, 0);
}
// --- HOME ---
window.App.screens.HomeScreen = function() {
    const allPets = window.App.services.getPets();
    // Apenas pets disponíveis ou em processo
    const pets = allPets.filter(p => p.status === 'disponivel' || p.status === 'em-processo').slice(0, 3);
    
    // Pets adotados viram Histórias em Destaque Dinâmicas
    const adoptedPets = allPets.filter(p => p.status === 'adotado').map(p => ({
        name: `${p.name} & Sua Nova Família`, 
        quote: `O ${p.name} encontrou um lar cheio de amor. Agradecemos a todos pela torcida!`,
        photo: p.photos[0],
        isAdopted: true
    }));
    const stories = [...window.App.data.stories, ...adoptedPets].slice(0, 4);
    if (pets.length === 0) {
        return renderApp(`
            <div class="text-center mt-20 pt-8 max-w-lg mx-auto">
                <div class="text-7xl mb-8">❤️</div>
                <h2 class="text-4xl font-extrabold text-brand-dark mb-4">Que alegria!</h2>
                <p class="mb-10 text-xl text-gray-700">No momento todos os nossos pets estão em conversa ou já ganharam um lar. Fale conosco para saber das novidades ou ser avisado de novos resgates.</p>
                ${window.App.ui.Button({ label: 'Falar com a ONG', href: '#/contato', variant: 'whatsapp', fullWidth: true })}
            </div>
        `);
    }
    renderApp(`
        <div class="flex flex-col gap-12 sm:gap-16 pt-8">
            <section class="flex flex-col gap-6 text-center">
                <h1 class="text-4xl font-extrabold text-brand-dark leading-[1.2]">
                    Encontrar a minha companhia perfeita
                </h1>
                <p class="text-xl text-brand-dark opacity-90 mx-auto">
                    Adoção é sobre começar uma nova e feliz história juntos. Descubra o pet ideal para você.
                </p>
                <div class="flex flex-col gap-4 mt-4 justify-center">
                    ${window.App.ui.Button({ label: 'Encontrar companhia (Quiz)', href: '#/encontrar', variant: 'primary' })}
                    ${window.App.ui.Button({ label: 'Ver pets disponíveis', href: '#/pets', variant: 'secondary' })}
                </div>
            </section>
            
            <section class="bg-brand-softTeal p-8 rounded-3xl shadow-sm border border-teal-100 mx-[-1rem] px-[1rem]">
                <h2 class="text-3xl font-extrabold mb-8 text-brand-dark text-center">Histórias que inspiram</h2>
                <div class="flex flex-col gap-6">
                    ${stories.map(s => window.App.ui.StoryCard(s)).join('')}
                </div>
            </section>
            <section>
                <h2 class="text-3xl font-extrabold text-brand-dark mb-6 text-center">Pets perto de você</h2>
                <div class="flex flex-col gap-6">
                    ${pets.map(p => window.App.ui.PetCard(p)).join('')}
