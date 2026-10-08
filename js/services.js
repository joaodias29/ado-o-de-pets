window.App.services = {
    getPets: () => window.App.data.pets,
    getPetBySlug: (slug) => window.App.data.pets.find(p => p.slug === slug),
    getOng: () => window.App.data.ong,
    
    saveQuizAnswer: (question, answer) => {
        window.App.data.quizState.answers[question] = answer;
        localStorage.setItem('quizAnswers', JSON.stringify(window.App.data.quizState.answers));
    },
    getQuizAnswers: () => window.App.data.quizState.answers,
    clearQuizAnswers: () => {
        window.App.data.quizState.answers = {};
        localStorage.removeItem('quizAnswers');
        localStorage.removeItem('cc_lastMatch');
    },

    saveMatch: (matchData) => {
        localStorage.setItem('cc_lastMatch', JSON.stringify(matchData));
    },
    getLastMatch: () => {
        const m = localStorage.getItem('cc_lastMatch');
        return m ? JSON.parse(m) : null;
    },

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
        let msgs = JSON.parse(localStorage.getItem('cc_messages')) || [];
        msgs = msgs.filter(m => m.id !== id);
        localStorage.setItem('cc_messages', JSON.stringify(msgs));
    },

    saveLeadEvent: (eventObj) => {
        const leads = JSON.parse(localStorage.getItem('cc_leads')) || [];
        leads.push(eventObj);
        localStorage.setItem('cc_leads', JSON.stringify(leads));
    },
    getLeadEvents: () => JSON.parse(localStorage.getItem('cc_leads')) || []
};
