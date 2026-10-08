window.App.lib.matchPet = function(answers) {
    const pets = window.App.services.getPets();
    let scored = pets.map(pet => {
        let score = 0;
        let reasons = [];
        
        // p1 = personality (+3)
        if (answers.p1 && pet.personality.includes(answers.p1)) {
            score += 3;
            if(answers.p1 === 'carinhoso') reasons.push('É um pet super carinhoso, como você procura.');
            if(answers.p1 === 'tranquilo') reasons.push('Tem uma personalidade tranquila e calma.');
            if(answers.p1 === 'brincalhao') reasons.push('Adora brincar e vai trazer muita alegria.');
        }
        
        // p3 = time (+2)
        if (answers.p3 === pet.timeNeeded) {
            score += 2;
            if (answers.p3 === 'pouco') reasons.push('Fica bem sozinho e não exige muito tempo.');
            else reasons.push('Tem a energia ideal para o tempo que você tem livre.');
        }
        
        // p2 = home (+2)
        if (answers.p2 && pet.idealHome.includes(answers.p2)) {
            score += 2;
            reasons.push(`Adapta-se perfeitamente à sua moradia em ${answers.p2}.`);
        }
        
        // Porte vs Moradia (+1)
        if (answers.p2 === 'apartamento' && (pet.size === 'pequeno' || pet.size === 'médio')) {
            score += 1;
        }

        return { pet, score, reasons };
    });

    // Ordenação determinística
    scored.sort((a, b) => b.score - a.score || parseInt(a.pet.id) - parseInt(b.pet.id));
    
    // Garante no mínimo uma razão
    if(scored[0].reasons.length === 0) {
        scored[0].reasons.push('Esse pet tem tudo para te fazer muito feliz!');
    }

    return {
        match: scored[0],
        others: [scored[1].pet, scored[2].pet]
    };
};

window.App.lib.applyFontSize = function(size) {
    const html = document.documentElement;
    html.classList.remove('font-normal', 'font-large', 'font-xl');
    html.classList.add(`font-${size}`);
    localStorage.setItem('fontSize', size);
    window.App.state.fontSize = size;
};

window.App.lib.getMode = function() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    return isStandalone ? 'app' : 'site';
};

window.App.lib.isIOS = function() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

window.App.lib.whatsappLink = function(pet) {
    const num = window.App.data.ong.telefone;
    const msg = pet 
        ? `Olá! Vi o ${pet.name} na plataforma Um Clique, Uma Companhia e gostaria de saber mais.`
        : `Olá! Vim pela plataforma Um Clique, Uma Companhia e gostaria de conversar com vocês.`;
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
};

window.App.lib.mapsLink = function(ong) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ong.endereco)}`;
};

let currentUtterance = null;
window.App.lib.speak = function(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); 
    if (!text) return;
    
    const plainText = text.replace(/<[^>]*>?/gm, '');
    currentUtterance = new SpeechSynthesisUtterance(plainText);
    currentUtterance.lang = 'pt-BR';
    currentUtterance.rate = 0.9;
    window.speechSynthesis.speak(currentUtterance);
};

window.App.lib.trackEvent = function(eventName, extraData = {}) {
    const event = {
        name: eventName,
        mode: window.App.lib.getMode(),
        timestamp: new Date().toISOString(),
        ...extraData
    };
    window.App.services.saveLeadEvent(event);
    console.log('Track:', event);
};
