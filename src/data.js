export const cases = [
  {
    id: 1,
    title: "E-mail do Detran (Phishing)",
    description: "Um e-mail falso se passando pelo Detran-RJ informando que sua CNH foi suspensa e exigindo o pagamento de uma multa urgente através de um link.",
    realCase: "Em 2023, milhares de pessoas no Rio de Janeiro receberam e-mails falsos do Detran e perderam dinheiro ao pagar multas que não existiam.",
    whatToDo: "Nunca clique em links de e-mails desconhecidos. Acesse o site oficial do Detran-RJ ou o app Carteira Digital de Trânsito para verificar multas reais.",
    image: "./imgs/Email_falso.jpeg",
    placeholderImageText: "Imagem de um e-mail falso do Detran-RJ",
    question: "O que você deve fazer ao receber um e-mail cobrando uma multa urgente?",
    options: [
      "Clicar no link e pagar imediatamente para evitar problemas.",
      "Ignorar o e-mail e acessar o site oficial do Detran para checar.",
      "Encaminhar o e-mail para todos os seus amigos."
    ],
    correctAnswerIndex: 1
  },
  {
    id: 2,
    title: "Falsa Central 0800 (Vishing)",
    description: "Você recebe um SMS dizendo que uma compra de alto valor foi aprovada e pede para ligar para um número 0800 caso não reconheça. Ao ligar, o golpista se passa pelo banco e pede sua senha.",
    realCase: "Muitos clientes de grandes bancos relataram ligações de falsas centrais com músicas de espera idênticas às originais.",
    whatToDo: "Desligue ou não ligue para o número do SMS. Se tiver dúvidas, ligue para o número que está no verso do seu cartão do banco.",
    image: "./imgs/sms_falso.jpg",
    placeholderImageText: "Imagem de um SMS falso sobre compra aprovada",
    question: "Como você deve verificar se a compra é real?",
    options: [
      "Ligar para o número 0800 que enviou o SMS.",
      "Responder ao SMS com seus dados bancários.",
      "Ligar apenas para o número no verso do seu cartão bancário."
    ],
    correctAnswerIndex: 2
  },
  {
    id: 3,
    title: "Falso Perfil no WhatsApp",
    description: "Alguém manda mensagem no WhatsApp com a foto de um familiar ou amigo dizendo que trocou de número e pedindo dinheiro emprestado (Pix) para uma emergência.",
    realCase: "O golpe do falso parente no WhatsApp é o crime digital mais comum no Brasil atualmente.",
    whatToDo: "Nunca faça Pix sem antes confirmar com a pessoa. Ligue para o número antigo do seu familiar ou faça uma chamada de vídeo.",
    image: "./imgs/whatssap.avif",
    placeholderImageText: "Imagem de uma conversa de WhatsApp de um golpista pedindo Pix",
    question: "Qual é a atitude mais segura a se tomar?",
    options: [
      "Fazer o Pix rapidamente para ajudar o familiar.",
      "Ligar para o número antigo da pessoa para confirmar a história.",
      "Pedir mais fotos para ver se é a pessoa mesma."
    ],
    correctAnswerIndex: 1
  },
  {
    id: 4,
    title: "Boleto Falso",
    description: "Você recebe o boleto do seu condomínio ou escola por e-mail, mas o código de barras ou o nome do recebedor foi alterado para a conta do golpista.",
    realCase: "Moradores de condomínios têm recebido boletos quase idênticos aos originais, com a mesma formatação visual.",
    whatToDo: "Sempre confira o nome do recebedor que aparece no aplicativo do banco ANTES de confirmar o pagamento com sua senha.",
    image: "./imgs/boleto_falso.png",
    placeholderImageText: "Imagem de um boleto falso recebido por e-mail",
    question: "O que deve ser checado antes de confirmar o pagamento de um boleto?",
    options: [
      "O nome de quem vai receber o dinheiro na tela do banco.",
      "Apenas o valor do boleto.",
      "Se o código de barras é legível."
    ],
    correctAnswerIndex: 0
  },
  {
    id: 5,
    title: "Golpe da Maquininha",
    description: "O entregador de aplicativo chega com sua comida, mas diz que a maquininha está com o visor quebrado ou pede para você pagar uma 'taxa de entrega' surpresa.",
    realCase: "Entregadores falsos cobram milhares de reais passando cartões em maquininhas com o visor danificado, sem que a vítima perceba o valor real.",
    whatToDo: "Nunca passe o cartão em maquininhas com o visor quebrado. Exija ver o valor exato no visor antes de digitar sua senha.",
    image: "./imgs/golpe_maquininha.webp",
    placeholderImageText: "Imagem de uma maquininha de cartão com visor quebrado",
    question: "O que fazer se o entregador disser que o visor da maquininha está quebrado?",
    options: [
      "Passar o cartão mesmo assim, pois o visor quebrado é comum.",
      "Dar a senha para o entregador digitar na maquininha.",
      "Recusar o pagamento e cancelar a entrega."
    ],
    correctAnswerIndex: 2
  }
];

export const mockResponses = [
  { id: 1, name: "Maria das Graças", email: "maria@example.com", location: "Niterói, RJ", date: "2024-05-10", score: 80 },
  { id: 2, name: "João Pereira", email: "joao.pereira@example.com", location: "Rio de Janeiro, RJ", date: "2024-05-11", score: 60 },
  { id: 3, name: "Ana Beatriz", cpf: "123.456.789-00", location: "São Gonçalo, RJ", date: "2024-05-12", score: 100 },
];
