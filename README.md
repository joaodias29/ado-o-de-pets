# Um Clique, Uma Companhia - PWA e Match de Pets

Protótipo web/PWA para adoção de animais por pessoas idosas, desenhado com foco em UX seniores. Funciona off-line via Cache Shell e armazena os dados temporários de sessão no próprio dispositivo (`localStorage`).

## 🧠 Algoritmo de Match Único
O *Quiz* foi refatorado na Parte 5 para retornar um vencedor unânime por processamento puro em JavaScript (função `matchPet` em `lib.js`).

**Pesos da Recomendação:**
- **+3 Pontos:** Personalidade alinhada (Afinidade primária e comportamental).
- **+2 Pontos:** Tempo livre bate com a necessidade de energia diária do animal.
- **+2 Pontos:** Tipo de residência confere (ex: casa / apartamento).
- **+1 Ponto:** Bônus de segurança habitacional (ex: porte pequeno ganha bônus extra em apto).

Todos os 5 Pets da base de testes possuem condições reais para atingir notas massivas e serem o **Top 1 Match** dependendo da ramificação das perguntas do quiz de 3 passos (18 permutações), garantindo que nenhum cachorro ficará ocioso. Ao dar o resultado, o script extrai *motivos estáticos* justificando porque o app fez aquela recomendação específica.

## 📱 Contato Rápido & Acessibilidade "Fale Conosco"
O botão **💬 Fale Conosco** se adaptou para todas as telas garantindo que idosos nunca se sintam num beco sem saída:
- **No celular (360px):** O cabeçalho foi redesenhado em duas linhas automáticas via flexbox para acomodar o Logotipo, o botão Fale Conosco, as travas de redimensionamento e o leitor em voz alta, garantindo o padrão *Finger-Friendly* (alvos de toque de no mínimo 56px).
- O módulo Fale Conosco armazena mensagens com formulários grandes, caixa de consentimento e link para `tel:` e Whatsapp. Tudo centralizado no painel em `#/admin/mensagens`.

## ⚙️ Arquitetura
1. Sem NPM. Sem Node.
2. Todo estilo feito via Tailwind CDN e variáveis puras de css no `styles.css`.
3. Telas geradas em JavaScript assíncrono acopladas ao sistema de hash (`window.location.hash`).

### Instalação em Servidor
O app pode rodar no Github Pages perfeitamente sem ajustes, já que os Service Workers suportam URLs relativas. Caso teste via *Live Server*, o `manifest` validará a instalação em localhost.
