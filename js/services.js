window.App.services = {
    // --- PETS (CRUD Persistido) ---
    getPets: () => {
        let saved = localStorage.getItem('cc_pets');
        if (!saved) {
            localStorage.setItem('cc_pets', JSON.stringify(window.App.data.pets));
            return window.App.data.pets;
        }
        return JSON.parse(saved);
    },
    getPetBySlug: (slug) => window.App.services.getPets().find(p => p.slug === slug),
    getPetById: (id) => window.App.services.getPets().find(p => p.id === id),
    savePet: (petObj) => {
        let pets = window.App.services.getPets();
        const idx = pets.findIndex(p => p.id === petObj.id);
        if (idx >= 0) pets[idx] = petObj;
        else pets.push(petObj);
        localStorage.setItem('cc_pets', JSON.stringify(pets));
    },
    updatePetStatus: (id, status) => {
        let pet = window.App.services.getPetById(id);
        if (pet) {
            pet.status = status;
            window.App.services.savePet(pet);
        }
    },
    getOng: () => window.App.data.ong,
    
    // --- QUIZ ---
    saveQuizAnswer: (question, answer) => {
        let answers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
        answers[question] = answer;
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
    },
    getQuizAnswers: () => JSON.parse(localStorage.getItem('quizAnswers')) || {},
    clearQuizAnswers: () => {
        localStorage.removeItem('quizAnswers');
        localStorage.removeItem('cc_lastMatch');
    },
    saveMatch: (matchData) => localStorage.setItem('cc_lastMatch', JSON.stringify(matchData)),
    getLastMatch: () => JSON.parse(localStorage.getItem('cc_lastMatch') || 'null'),
    // --- MENSAGENS (Fale Conosco) ---
    saveMessage: (msgObj) => {
        const msgs = JSON.parse(localStorage.getItem('cc_messages')) || [];
        msgObj.id = Date.now().toString();
        msgObj.date = new Date().toISOString();
        msgObj.status = 'Nova';
        msgs.push(msgObj);
        localStorage.setItem('cc_messages', JSON.stringify(msgs));
    },
    getMessages: () => JSON.parse(localStorage.getItem('cc_messages')) || [],
    deleteMessage: (id) => {
        let msgs = window.App.services.getMessages().filter(m => m.id !== id);
        localStorage.setItem('cc_messages', JSON.stringify(msgs));
    },
    // --- LEADS ---
    saveLeadEvent: (eventObj) => {
        const leads = JSON.parse(localStorage.getItem('cc_leads')) || [];
        eventObj.id = Date.now().toString();
        leads.push(eventObj);
