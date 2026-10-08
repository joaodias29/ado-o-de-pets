window.App = window.App || {};
window.App.data = {
    ong: {
        nome: "Abrigo Esperança",
        telefone: "5511999999999",
        telefoneDisplay: "(11) 99999-9999",
        endereco: "Rua do Cuidado, 123, Bairro Acolhimento, São Paulo - SP",
        horario: "Segunda a Sábado, das 09h às 17h"
    },
    pets: [
        { 
            id: "1", slug: "bob", name: "Bob", species: "dog", ageYears: 5, size: "médio", 
            personality: ["carinhoso", "tranquilo"], 
            highlight: "O companheiro perfeito para tardes calmas.", 
            story: "Bob foi resgatado após ser deixado em uma praça. Ele é dócil e adora ficar deitado ao lado das pessoas. Seu olhar transmite paz e gratidão. Ele espera por uma família para começar uma nova história.", 
            traits: ["Vacinado", "Castrado", "Microchipado"], 
            idealHome: ["apartamento"], timeNeeded: "pouco", // Bob ajustado focado em apt
            photos: ["https://images.unsplash.com/photo-1543466835-00a73417ab05?auto=format&fit=crop&w=800&q=80"], 
            ongId: "1" 
        },
        { 
            id: "2", slug: "luna", name: "Luna", species: "cat", ageYears: 2, size: "pequeno", 
            personality: ["brincalhao", "carinhoso"], 
            highlight: "Uma gatinha cheia de energia e amor.", 
            story: "Luna é curiosa e adora explorar a casa. Ela foi encontrada com os irmãos e é a mais brincalhona. Onde tem um novelo, lá está ela.", 
            traits: ["Vacinada", "Castrada"], 
            idealHome: ["apartamento"], timeNeeded: "algumas-horas", 
            photos: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"], 
            ongId: "1" 
        },
        { 
            id: "3", slug: "thor", name: "Thor", species: "dog", ageYears: 3, size: "grande", 
            personality: ["tranquilo", "protetor"], 
            highlight: "Um gigante muito gentil.", 
            story: "Thor assusta pelo tamanho, mas tem coração de filhote. Ele é muito protetor e adora caminhadas calmas pelo bairro.", 
            traits: ["Vacinado", "Castrado"], 
            idealHome: ["casa"], timeNeeded: "pouco", 
            photos: ["https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80"], 
            ongId: "1" 
        },
        { 
            id: "4", slug: "mel", name: "Mel", species: "dog", ageYears: 1, size: "pequeno", 
            personality: ["brincalhao"], 
            highlight: "Alegria em forma de cachorrinha.", 
            story: "Mel é pura energia. Adora correr atrás de bolinhas e precisa de alguém com disposição para brincar com ela.", 
            traits: ["Vacinada"], 
            idealHome: ["casa", "apartamento"], timeNeeded: "grande-parte", 
            photos: ["https://images.unsplash.com/photo-1537151608804-ea6f1155940c?auto=format&fit=crop&w=800&q=80"], 
            ongId: "1" 
        },
        { 
            // Max ajustado para garantir que ele seja escolhido (Casa + Algumas Horas + Carinhoso)
            id: "5", slug: "max", name: "Max", species: "dog", ageYears: 7, size: "grande", 
            personality: ["carinhoso"], 
            highlight: "Um senhor muito educado.", 
            story: "Max é maduro e já não tem energia para correr a casa toda, mas tem amor de sobra para dar. Ótimo para companhia constante.", 
            traits: ["Vacinado", "Castrado", "Calmo"], 
            idealHome: ["casa"], timeNeeded: "algumas-horas", 
            photos: ["https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80"], 
            ongId: "1" 
        }
    ],
    stories: [
        { name: "Dona Maria & Tico", quote: "A casa estava muito silenciosa. O Tico trouxe alegria e um motivo para sorrir todos os dias.", photo: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80" },
        { name: "Sr. João & Bela", quote: "Achei que estava velho para ter um cachorro, mas a Bela é tão calma que somos parceiros perfeitos.", photo: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80" }
    ],
    faq: [
        { q: "Como faço para adotar?", a: "É muito simples! Encontre um pet que combine com você na nossa plataforma e clique no botão do WhatsApp. Você conversará diretamente com a ONG parceira." },
        { q: "A adoção tem algum custo?", a: "A adoção em si é gratuita. No entanto, algumas ONGs podem pedir uma pequena ajuda opcional e solidária para cobrir custos de vacinas e castração já realizadas." },
        { q: "O que a ONG vai me perguntar?", a: "Eles farão perguntas normais sobre sua rotina, se você mora em casa ou apartamento, e quem mora com você. Tudo isso apenas para garantir que o pet será bem cuidado." },
        { q: "Posso visitar o pet antes de adotar?", a: "Sim, claro! Durante a conversa no WhatsApp, vocês podem agendar o melhor dia e horário para conhecer o pet pessoalmente antes de tomar a decisão final." },
        { q: "E se eu não puder ficar com o pet depois?", a: "As ONGs garantem a devolução do animal em caso de problemas graves. Nunca abandone o pet na rua. Basta conversar com a ONG para a devolução segura." }
    ],
    quizState: {
        answers: JSON.parse(localStorage.getItem('quizAnswers')) || {}
    }
};

// Se não houver mensagens de demonstração ainda no Storage, gerar algumas pro Admin Panel não ficar vazio
(function loadDemoMessages() {
    let msgs = JSON.parse(localStorage.getItem('cc_messages'));
    if (!msgs || msgs.length === 0) {
        msgs = [
            { id: "1001", nome: "Helena Soares", tel: "(11) 98888-1111", msg: "Boa tarde! Vi a Luna no site e me apaixonei. Gostaria de saber se ela convive bem com outros gatos.", status: "Nova", date: new Date(Date.now() - 86400000).toISOString() },
            { id: "1002", nome: "Carlos Eduardo", tel: "(11) 97777-2222", msg: "Vocês estão abertos neste fim de semana? Queria passar para conhecer o Thor.", status: "Respondida", date: new Date(Date.now() - 172800000).toISOString() },
            { id: "1003", nome: "Sônia Aparecida", tel: "(11) 96666-3333", msg: "Fiz o teste e deu que o Bob combina comigo. Eu moro em apartamento. Como funciona a adoção?", status: "Nova", date: new Date(Date.now() - 3600000).toISOString() }
        ];
        localStorage.setItem('cc_messages', JSON.stringify(msgs));
    }
})();
