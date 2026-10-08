                    <span class="px-3 py-1 bg-brand-softOrange text-brand-highlight rounded-lg text-sm font-bold border border-orange-200">${pet.ageYears} anos</span>
                    <span class="px-3 py-1 bg-brand-softTeal text-brand-primary rounded-lg text-sm font-bold border border-teal-200">${pet.size}</span>
                </div>
            </div>
        </a>
    `;
};
window.App.ui.StoryCard = function(story) {
    return `
        <div class="bg-brand-card p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center text-center gap-4 min-h-[60px]">
            <img src="${story.photo}" alt="Foto" class="w-24 h-24 rounded-full object-cover shadow-sm border-4 border-brand-softTeal" ${imgFb} loading="lazy">
            <h3 class="text-xl font-bold text-brand-dark">${story.name}</h3>
            <p class="text-brand-dark opacity-90 italic">"${story.quote}"</p>
            ${story.isAdopted ? '<span class="text-brand-primary font-bold mt-2">Adotado ❤️</span>' : ''}
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
    const stateClass = isSelected ? "border-brand-primary bg-brand-softTeal shadow-inner" : "border-gray-200 bg-white hover:border-gray-300 shadow-sm";
    
    return `
        <button class="${baseClass} ${stateClass}" data-value="${value}">
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
