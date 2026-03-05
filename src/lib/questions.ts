export const perfilQuestions = [
  "Eu prefiro tentar convencer um cliente do que simplesmente aceitar um \"não\".",
  "Eu me sinto confortável insistindo com um cliente que parou de responder.",
  "Eu gosto de metas agressivas.",
  "Eu prefiro trabalhar com alto volume de clientes em vez de poucos clientes complexos.",
  "Quando um cliente diz que está caro, minha primeira reação é tentar entender o motivo.",
  "Eu gosto de ambientes competitivos.",
  "Eu costumo responder mensagens muito rápido.",
  "Eu não me incomodo em receber muitos \"nãos\".",
  "Eu gosto de otimizar minha forma de trabalhar para ganhar tempo.",
  "Eu fico incomodado quando leads demoram a responder.",
];

export const likertLabels = [
  "Discordo totalmente",
  "Discordo",
  "Neutro",
  "Concordo",
  "Concordo totalmente",
];

export const simulationCriteria = [
  { key: "controleConversa", label: "Controle da conversa" },
  { key: "perguntasFeitas", label: "Perguntas feitas" },
  { key: "argumentacao", label: "Argumentação" },
  { key: "confianca", label: "Confiança" },
  { key: "tentativaFechamento", label: "Tentativa de fechamento" },
] as const;

export const strongSigns = [
  "Responde rápido",
  "Fala com energia",
  "Faz perguntas",
  "Conduz a conversa",
  "Tenta fechar",
];

export const redFlags = [
  "Fala muito mas não conduz",
  "Respostas longas e evasivas",
  "Evita objeção",
  "Foco excessivo em processo",
];

export const simulationScenario = {
  intro:
    "Você faz o papel do cliente. Produto fictício: qualquer coisa simples (software, serviço, etc). O cliente deixou lead mas não está muito interessado.",
  opening: "Oi, eu só pedi informação mesmo.",
  objections: [
    "Estou só pesquisando.",
    "Achei caro.",
    "Preciso pensar.",
  ],
  observe: [
    "Faz perguntas?",
    "Tenta entender necessidade?",
    "Conduz a conversa?",
  ],
};

export const writingPrompt =
  "Você é vendedor de brindes corporativos. Escreva uma mensagem de abordagem para o diretor de marketing de uma empresa que você acabou de captar via LinkedIn. A mensagem deve ser curta, objetiva e despertar interesse. No final da resposta escreva a palavra azul.";

export const bonusPrompt =
  "Se você recebesse 120 leads por dia, como organizaria seu trabalho?";

export const bonusCriteria = [
  "Priorização",
  "Automação",
  "Follow-up",
  "Organização no CRM",
];

export const whatsappMessages = [
  {
    id: "A",
    sender: "Cliente: Marcos",
    text: "Bom dia! Sou o Marcos da 'Padaria Real'. Tenho 4 unidades e queria saber se o Nexus Cloud consegue gerenciar todas as lojas integradas ou se preciso de 4 contas separadas.",
  },
  {
    id: "B",
    sender: "Cliente: Sr. Arnaldo - BRAVO",
    text: "PALHAÇADA! A internet caiu aqui e não consigo vender nada! O caminhão tá parado na porta e o sistema de vocês não abre. Vou cancelar agora e quero meu dinheiro de volta!",
  },
  {
    id: "C",
    sender: "Lead: Joana",
    text: "Olá, vi o anúncio de vocês. Qual o preço?",
  },
  {
    id: "D",
    sender: "Cliente: Ricardo",
    text: "Oi! Decidi fechar o plano anual que falamos ontem com os 15% de desconto. Pode me mandar o link de pagamento agora? Tenho que sair para uma reunião em 10 minutos.",
  },
  {
    id: "E",
    sender: "Parceria: Agência Grow",
    text: "Olá, somos uma agência de marketing e gostaríamos de marcar uma reunião para apresentar uma proposta de tráfego pago para a Nexus Cloud.",
  },
  {
    id: "F",
    sender: "Cliente: Beatriz",
    text: "Bom dia! Como eu faço para trocar a logo da minha empresa que sai na nota fiscal? Não achei no menu.",
  },
  {
    id: "G",
    sender: "Engano: Desconhecido",
    text: "Vocês vendem cimento e areia? Vi o número no Google.",
  },
  {
    id: "H",
    sender: "Lead: Felipe",
    text: "Opa, tudo bem? O sistema de vocês aceita PIX dinâmico com baixa automática no estoque? Isso seria crucial para mim.",
  },
  {
    id: "I",
    sender: "Cliente: Suporte",
    text: "Ontem à noite uma nota fiscal deu erro de 'Rejeição de XML'. O que eu faço?",
  },
];
