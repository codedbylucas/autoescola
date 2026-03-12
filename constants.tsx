
import { ModuleId, Question } from './types';
import { TrafficCone, Gavel, ShieldAlert, HeartPulse, Leaf, ClipboardCheck } from 'lucide-react';
import React from 'react';

export const MODULES_INFO = [
  { id: ModuleId.SINALIZACAO, name: 'Sinalização de Trânsito', icon: <TrafficCone />, description: 'Placas, marcas viárias, sinais luminosos e gestos.' },
  { id: ModuleId.LEGISLACAO, name: 'Legislação (CTB)', icon: <Gavel />, description: 'Normas de circulação, conduta, infrações e penalidades.' },
  { id: ModuleId.DIRECAO_DEFENSIVA, name: 'Direção Defensiva', icon: <ShieldAlert />, description: 'Como evitar acidentes e reagir a situações adversas.' },
  { id: ModuleId.PRIMEIROS_SOCORROS, name: 'Primeiros Socorros', icon: <HeartPulse />, description: 'Procedimentos emergenciais básicos em acidentes.' },
  { id: ModuleId.MEIO_AMBIENTE, name: 'Meio Ambiente e Cidadania', icon: <Leaf />, description: 'O papel do condutor na sociedade e preservação.' },
  { id: ModuleId.SIMULADO_FINAL, name: 'Simulado Oficial', icon: <ClipboardCheck />, description: 'Simulação real da prova do DETRAN com 30 questões.' },
];

export const MOCK_QUESTIONS: Question[] = [
  // --- MÓDULO 1: SINALIZAÇÃO (15 questões) ---
  {
    id: 'm1-1',
    text: 'A placa de regulamentação R-1 indica:',
    options: ['Parada obrigatória', 'Dê a preferência', 'Sentido proibido', 'Passagem obrigatória'],
    correctAnswer: 0,
    explanation: 'A placa R-1 é a única octogonal e exige a parada total do veículo.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'easy'
  },
  {
    id: 'm1-2',
    text: 'As placas que têm por finalidade alertar os usuários sobre condições potencialmente perigosas são:',
    options: ['De regulamentação', 'De advertência', 'De indicação', 'Educativas'],
    correctAnswer: 1,
    explanation: 'Placas de advertência são amarelas e alertam sobre perigos à frente.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'easy'
  },
  {
    id: 'm1-3',
    text: 'A sinalização horizontal de cor amarela indica:',
    options: ['Fluxos de mesmo sentido', 'Fluxos de sentidos opostos', 'Proibição de estacionar', 'Espaço para ciclistas'],
    correctAnswer: 1,
    explanation: 'A cor amarela divide fluxos opostos. Branca divide fluxos de mesmo sentido.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'easy'
  },
  {
    id: 'm1-4',
    text: 'Qual a função da placa de regulamentação R-2?',
    options: ['Parada obrigatória', 'Dê a preferência', 'Proibido retornar', 'Alfândega'],
    correctAnswer: 1,
    explanation: 'A placa R-2 (triangular) obriga o condutor a dar preferência de passagem.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'easy'
  },
  {
    id: 'm1-5',
    text: 'A sinalização semafórica de advertência é composta por:',
    options: ['Luzes verde e vermelha', 'Luz amarela intermitente', 'Luz branca', 'Luzes azul e amarela'],
    correctAnswer: 1,
    explanation: 'O semáforo de advertência usa luz amarela piscante para alertar perigo.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'easy'
  },
  {
    id: 'm1-6',
    text: 'Uma linha simples branca contínua no centro da via indica:',
    options: ['Permissão de ultrapassagem', 'Proibição de ultrapassagem em fluxo de mesmo sentido', 'Divisão de fluxos opostos', 'Sentido duplo de circulação'],
    correctAnswer: 1,
    explanation: 'Linha contínua proíbe a transposição de faixa. Sendo branca, é mesmo sentido.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'medium'
  },
  {
    id: 'm1-7',
    text: 'Os sinais gestuais realizados por agentes de trânsito prevalecem sobre:',
    options: ['Apenas as placas', 'Apenas o semáforo', 'Todas as outras sinalizações e normas', 'Nenhuma outra sinalização'],
    correctAnswer: 2,
    explanation: 'As ordens do agente são soberanas sobre qualquer outro sinal ou norma.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'medium'
  },
  {
    id: 'm1-8',
    text: 'A placa A-1b indica uma curva acentuada para a:',
    options: ['Esquerda', 'Direita', 'Frente', 'Retorno'],
    correctAnswer: 1,
    explanation: 'Placas "A" são de advertência. O sufixo "b" geralmente indica o lado direito.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'medium'
  },
  {
    id: 'm1-9',
    text: 'As marcas transversais que delimitam a área de parada de veículos antes de cruzamentos são chamadas de:',
    options: ['Linhas de retenção', 'Linhas de estímulo', 'Faixas de pedestre', 'Linhas de bordo'],
    correctAnswer: 0,
    explanation: 'A linha de retenção indica onde o veículo deve parar antes de um sinal ou cruzamento.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'medium'
  },
  {
    id: 'm1-10',
    text: 'A sinalização sonora realizada pelo agente de trânsito através de "um silvo breve" significa:',
    options: ['Pare', 'Siga', 'Diminua a marcha', 'Acenda os faróis'],
    correctAnswer: 1,
    explanation: '1 silvo breve = SIGA. 2 silvos breves = PARE. 1 silvo longo = DIMINUA.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'medium'
  },
  {
    id: 'm1-11',
    text: 'As placas de serviços auxiliares (azuis) têm caráter:',
    options: ['Punitivo', 'Indicativo e informativo', 'De urgência', 'Obrigatório'],
    correctAnswer: 1,
    explanation: 'Servem apenas para informar a existência de serviços como postos e hospitais.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'medium'
  },
  {
    id: 'm1-12',
    text: 'Qual cor de sinalização horizontal é usada para demarcar ciclovias?',
    options: ['Azul', 'Verde', 'Vermelha', 'Amarela'],
    correctAnswer: 2,
    explanation: 'O vermelho é a cor padrão para ciclovias e áreas de emergência hospitalar.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'medium'
  },
  {
    id: 'm1-13',
    text: 'A placa R-19 refere-se a:',
    options: ['Peso máximo por eixo', 'Velocidade máxima permitida', 'Altura máxima permitida', 'Carga máxima permitida'],
    correctAnswer: 1,
    explanation: 'R-19 é a clássica placa circular que impõe o limite de velocidade da via.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'hard'
  },
  {
    id: 'm1-14',
    text: 'As placas de atrativos turísticos seguem qual padrão cromático?',
    options: ['Fundo marrom com legendas brancas', 'Fundo verde com legendas amarelas', 'Fundo azul com legendas pretas', 'Fundo amarelo com legendas vermelhas'],
    correctAnswer: 0,
    explanation: 'Placas de turismo são sempre marrons para fácil identificação visual diferenciada.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'hard'
  },
  {
    id: 'm1-15',
    text: 'O dispositivo auxiliar de sinalização denominado "tachão" serve para:',
    options: ['Iluminar a via', 'Melhorar a aderência', 'Canalização e limitação de tráfego', 'Medir a velocidade'],
    correctAnswer: 2,
    explanation: 'Tachões e tachas são dispositivos de canalização para evitar invasão de faixas proibidas.',
    module: ModuleId.SINALIZACAO,
    difficulty: 'hard'
  },

  // --- MÓDULO 2: LEGISLAÇÃO (15 questões) ---
  {
    id: 'm2-1',
    text: 'Qual a validade da CNH para condutores com idade inferior a 50 anos?',
    options: ['5 anos', '10 anos', '3 anos', '15 anos'],
    correctAnswer: 1,
    explanation: 'Após a nova lei, o prazo é de 10 anos para quem tem menos de 50 anos.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'easy'
  },
  {
    id: 'm2-2',
    text: 'Transitar em velocidade superior à máxima permitida em mais de 50% é infração:',
    options: ['Média', 'Grave', 'Gravíssima', 'Leve'],
    correctAnswer: 2,
    explanation: 'Excesso de velocidade acima de 50% é gravíssima com suspensão imediata da CNH.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'easy'
  },
  {
    id: 'm2-3',
    text: 'A categoria de habilitação "A" permite conduzir:',
    options: ['Veículos de passeio', 'Motos e triciclos', 'Caminhões', 'Ônibus'],
    correctAnswer: 1,
    explanation: 'Categoria A é exclusiva para veículos motorizados de 2 ou 3 rodas.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'easy'
  },
  {
    id: 'm2-4',
    text: 'O órgão máximo executivo de trânsito da União é o:',
    options: ['CONTRAN', 'SENATRAN (antigo DENATRAN)', 'DETRAN', 'PRF'],
    correctAnswer: 1,
    explanation: 'O SENATRAN executa, enquanto o CONTRAN é o órgão normativo/consultivo máximo.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'easy'
  },
  {
    id: 'm2-5',
    text: 'O uso do cinto de segurança é obrigatório para:',
    options: ['Apenas o condutor', 'Apenas ocupantes do banco da frente', 'Condutor e todos os passageiros', 'Opcional em vias urbanas'],
    correctAnswer: 2,
    explanation: 'O cinto é obrigatório para todos os ocupantes do veículo em qualquer via.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'easy'
  },
  {
    id: 'm2-6',
    text: 'Em um cruzamento não sinalizado, a preferência de passagem é do veículo que:',
    options: ['Vem pela esquerda', 'Vem pela direita', 'Estiver em maior velocidade', 'For maior'],
    correctAnswer: 1,
    explanation: 'Na ausência de sinalização, a preferência é de quem vem pela direita do condutor.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'medium'
  },
  {
    id: 'm2-7',
    text: 'Dirigir sob influência de álcool acarreta multa e suspensão do direito de dirigir por:',
    options: ['6 meses', '12 meses', '24 meses', 'Indeterminadamente'],
    correctAnswer: 1,
    explanation: 'A Lei Seca prevê suspensão fixa de 12 meses e multa multiplicada por 10.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'medium'
  },
  {
    id: 'm2-8',
    text: 'A idade mínima para transportar crianças em motocicletas é de:',
    options: ['7 anos', '10 anos', '12 anos', '8 anos'],
    correctAnswer: 1,
    explanation: 'Alteração recente no CTB subiu a idade mínima para 10 anos.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'medium'
  },
  {
    id: 'm2-9',
    text: 'Qual o limite de pontos na CNH em 12 meses para quem cometeu duas infrações gravíssimas?',
    options: ['40 pontos', '30 pontos', '20 pontos', '15 pontos'],
    correctAnswer: 2,
    explanation: 'Com 2 gravíssimas, o limite cai para 20 pontos. Com 1, 30 pontos. Nenhuma, 40 pontos.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'medium'
  },
  {
    id: 'm2-10',
    text: 'O condutor que estacional sobre a calçada comete infração:',
    options: ['Grave', 'Média', 'Leve', 'Gravíssima'],
    correctAnswer: 0,
    explanation: 'Estacionar no passeio (calçada) é infração grave com remoção do veículo.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'medium'
  },
  {
    id: 'm2-11',
    text: 'Veículos destinados a socorro de incêndio e salvamento têm:',
    options: ['Livre circulação apenas em rodovias', 'Prioridade de passagem e livre parada/estacionamento', 'Preferência apenas se estiverem vazios', 'Nenhuma regalia no trânsito'],
    correctAnswer: 1,
    explanation: 'Desde que em serviço de urgência e com sirenes/luzes ligadas, têm prioridade total.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'medium'
  },
  {
    id: 'm2-12',
    text: 'A velocidade máxima em uma Via Arterial não sinalizada é de:',
    options: ['80 km/h', '60 km/h', '40 km/h', '30 km/h'],
    correctAnswer: 1,
    explanation: 'Trânsito Rápido=80, Arterial=60, Coletora=40, Local=30.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'medium'
  },
  {
    id: 'm2-13',
    text: 'O sinal de "braço estendido horizontalmente" pelo condutor indica:',
    options: ['Dobrar à direita', 'Dobrar à esquerda', 'Parar o veículo', 'Diminuir a marcha'],
    correctAnswer: 1,
    explanation: 'Braço reto = Esquerda. Braço em ângulo = Direita. Braço balançando = Diminuir/Parar.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'hard'
  },
  {
    id: 'm2-14',
    text: 'Qual documento é de porte obrigatório para o condutor?',
    options: ['CRLV e CNH (físicos ou digitais)', 'Apenas o IPVA pago', 'RG e Título de Eleitor', 'Seguro DPVAT'],
    correctAnswer: 0,
    explanation: 'CRLV (veículo) e CNH (condutor) são obrigatórios para fiscalização.',
    module: ModuleId.LEGISLACAO,
    difficulty: 'hard'
  },
  {
    id: 'm2-15',
    text: 'O que caracteriza um crime de trânsito, além de infração administrativa?',
    options: ['Dirigir sem óculos', 'Dirigir com CNH vencida há 40 dias', 'Dirigir sem possuir habilitação gerando perigo de dano', 'Estacionar em fila dupla'],
    correctAnswer: 2,
    explanation: 'Muitas condutas são infrações, mas algumas são Crimes (como falta de CNH com perigo real).',
    module: ModuleId.LEGISLACAO,
    difficulty: 'hard'
  },

  // --- MÓDULO 3: DIREÇÃO DEFENSIVA (15 questões) ---
  {
    id: 'm3-1',
    text: 'O condutor defensivo é aquele que:',
    options: ['Dirige em alta velocidade para liberar a via', 'Prevê situações de perigo e evita acidentes', 'Usa a buzina para apressar os outros', 'Sempre mantém a preferência'],
    correctAnswer: 1,
    explanation: 'Direção defensiva é o ato de dirigir prevenindo acidentes, apesar das ações incorretas de outros.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'easy'
  },
  {
    id: 'm3-2',
    text: 'A condição adversa que mais causa acidentes por falta de visibilidade é:',
    options: ['Calor', 'Neblina/Neblina densa', 'Vento lateral', 'Pneu murcho'],
    correctAnswer: 1,
    explanation: 'Neblina reduz drasticamente a visibilidade e requer redução imediata de velocidade.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'easy'
  },
  {
    id: 'm3-3',
    text: 'O que fazer ao sentir sono enquanto dirige?',
    options: ['Tomar café forte e seguir', 'Abrir a janela e cantar', 'Parar em local seguro e descansar', 'Aumentar a velocidade para chegar logo'],
    correctAnswer: 2,
    explanation: 'O sono é irresistível. A única solução segura é interromper a viagem para descansar.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'easy'
  },
  {
    id: 'm3-4',
    text: 'Para evitar a "aquaplanagem", o condutor deve:',
    options: ['Acelerar forte sobre a água', 'Frear bruscamente ao ver a poça', 'Manter pneus em bom estado e reduzir a velocidade', 'Fazer manobras rápidas com o volante'],
    correctAnswer: 2,
    explanation: 'Pneus com sulcos profundos e velocidade reduzida evitam a perda de contato com o solo.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'easy'
  },
  {
    id: 'm3-5',
    text: 'A distância de seguimento é definida como:',
    options: ['Espaço entre o carro e o meio-fio', 'Espaço seguro entre o seu carro e o que vai à frente', 'Distância total da viagem', 'Espaço para ultrapassar'],
    correctAnswer: 1,
    explanation: 'É a distância que permite reagir a uma freada brusca do veículo da frente.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'easy'
  },
  {
    id: 'm3-6',
    text: 'Qual a técnica correta para fazer uma curva com segurança?',
    options: ['Acelerar no meio da curva', 'Reduzir a velocidade antes de entrar na curva', 'Frear fortemente dentro da curva', 'Manter o veículo em ponto morto'],
    correctAnswer: 1,
    explanation: 'Toda redução de marcha e frenagem deve ser feita antes de iniciar a trajetória da curva.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'medium'
  },
  {
    id: 'm3-7',
    text: 'Sob chuva forte, qual o procedimento defensivo em relação aos faróis?',
    options: ['Apagar tudo para não ofuscar', 'Ligar o farol alto', 'Manter luz baixa acesa', 'Ligar apenas o pisca-alerta'],
    correctAnswer: 2,
    explanation: 'A luz baixa ajuda na visibilidade sem criar o "efeito espelho" da luz alta nas gotas de água.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'medium'
  },
  {
    id: 'm3-8',
    text: 'A "distância de reação" é o espaço percorrido pelo veículo desde:',
    options: ['O momento em que vê o perigo até pisar no freio', 'O momento em que pisa no freio até parar', 'O início da viagem até o fim', 'O momento em que vê o perigo até a parada total'],
    correctAnswer: 0,
    explanation: 'Reação = Vê -> Age. Frenagem = Age -> Para. Parada Total = Reação + Frenagem.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'medium'
  },
  {
    id: 'm3-9',
    text: 'Em caso de vento lateral forte, o condutor deve:',
    options: ['Aumentar a velocidade', 'Abrir os vidros para o vento passar', 'Reduzir a velocidade e segurar o volante com firmeza', 'Frear bruscamente'],
    correctAnswer: 2,
    explanation: 'Ventos laterais podem desestabilizar o veículo, especialmente os mais altos.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'medium'
  },
  {
    id: 'm3-10',
    text: 'O uso do celular ao dirigir é perigoso porque causa distração:',
    options: ['Apenas visual', 'Apenas cognitiva', 'Visual, cognitiva e motora', 'Apenas auditiva'],
    correctAnswer: 2,
    explanation: 'O celular desvia o olhar, a atenção mental e ocupa as mãos do condutor.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'medium'
  },
  {
    id: 'm3-11',
    text: 'Para garantir a segurança, o condutor deve verificar os "pontos cegos". O que são?',
    options: ['Áreas da via sem iluminação', 'Áreas ao redor do veículo não cobertas pelos retrovisores', 'As luzes de freio queimadas', 'A parte debaixo do motor'],
    correctAnswer: 1,
    explanation: 'Pontos cegos exigem que o condutor mova a cabeça para checar antes de mudar de faixa.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'medium'
  },
  {
    id: 'm3-12',
    text: 'A manutenção preventiva do sistema de freios evita:',
    options: ['Gasto de combustível', 'Aumento da distância de frenagem', 'Multas de rodízio', 'Aquecimento do motor'],
    correctAnswer: 1,
    explanation: 'Freios desgastados demoram mais para parar o veículo, aumentando o risco de colisão.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'medium'
  },
  {
    id: 'm3-13',
    text: 'A "força centrífuga" tende a:',
    options: ['Jogar o veículo para dentro da curva', 'Jogar o veículo para fora da curva', 'Aumentar a velocidade', 'Prender o veículo ao solo'],
    correctAnswer: 1,
    explanation: 'Centrífuga = Fora. Centrípeta = Centro. É uma lei física que atua em curvas.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'hard'
  },
  {
    id: 'm3-14',
    text: 'Em uma descida de serra (declive acentuado), a forma correta de dirigir é:',
    options: ['Em ponto morto (banguela) para economizar', 'Com o veículo engrenado em marcha compatível', 'Sempre pisando no freio o tempo todo', 'Desligando o motor'],
    correctAnswer: 1,
    explanation: 'O freio motor ajuda a controlar a velocidade sem superaquecer os freios de serviço.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'hard'
  },
  {
    id: 'm3-15',
    text: 'A "negligência" na direção defensiva ocorre quando o condutor:',
    options: ['É habilidoso mas corre riscos', 'Deixa de fazer a manutenção ou ignora normas básicas', 'Age com pressa e imprudência', 'Não tem habilidade técnica'],
    correctAnswer: 1,
    explanation: 'Negligência = Desleixo/Falta de cuidado. Imperícia = Falta de técnica. Imprudência = Exposição ao risco.',
    module: ModuleId.DIRECAO_DEFENSIVA,
    difficulty: 'hard'
  },

  // --- MÓDULO 4: PRIMEIROS SOCORROS (15 questões) ---
  {
    id: 'm4-1',
    text: 'Ao presenciar um acidente, qual a PRIMEIRA ação a ser tomada?',
    options: ['Retirar as vítimas das ferragens', 'Sinalizar o local e chamar o socorro especializado', 'Tentar reanimar as vítimas', 'Limpar o sangue da pista'],
    correctAnswer: 1,
    explanation: 'Garantir a segurança da área e pedir ajuda profissional evita novos acidentes.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'easy'
  },
  {
    id: 'm4-2',
    text: 'Qual o número de telefone do SAMU?',
    options: ['190', '193', '192', '191'],
    correctAnswer: 2,
    explanation: '192 = SAMU. 193 = Bombeiros. 190 = Polícia Militar.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'easy'
  },
  {
    id: 'm4-3',
    text: 'Deve-se oferecer água para uma vítima de acidente consciente?',
    options: ['Sim, para acalmá-la', 'Não, pois pode causar engasgo ou prejudicar cirurgias', 'Apenas se ela pedir muito', 'Sim, se houver hemorragia'],
    correctAnswer: 1,
    explanation: 'Nunca dê líquidos ou alimentos para vítimas de acidentes graves.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'easy'
  },
  {
    id: 'm4-4',
    text: 'Para sinalizar um acidente durante o dia, a distância mínima para colocar o triângulo em via de 100km/h é:',
    options: ['30 passos', '50 passos', '100 passos', '200 passos'],
    correctAnswer: 2,
    explanation: 'Regra geral: 1 passo por cada km/h permitido na via.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'easy'
  },
  {
    id: 'm4-5',
    text: 'O que fazer se a vítima estiver com o capacete após uma queda de moto?',
    options: ['Retirar imediatamente para ela respirar melhor', 'Não retirar o capacete para evitar lesão na medula', 'Retirar apenas se estiver sujo', 'Pedir para a própria vítima tirar'],
    correctAnswer: 1,
    explanation: 'A retirada inadequada do capacete pode causar paralisia definitiva ou morte.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'easy'
  },
  {
    id: 'm4-6',
    text: 'Em caso de queimaduras, o procedimento correto é:',
    options: ['Passar pasta de dente ou manteiga', 'Lavar apenas com água corrente fria', 'Furar as bolhas que aparecerem', 'Cobrir com algodão'],
    correctAnswer: 1,
    explanation: 'Água corrente ajuda a resfriar. Substâncias caseiras podem causar infecções graves.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'medium'
  },
  {
    id: 'm4-7',
    text: 'Uma vítima apresenta hemorragia externa em um braço. O que fazer?',
    options: ['Fazer um torniquete apertado', 'Aplicar compressão direta no local com pano limpo', 'Lavar com bastante álcool', 'Deixar o braço pendurado para baixo'],
    correctAnswer: 1,
    explanation: 'A compressão direta interrompe o fluxo sanguíneo na maioria dos casos simples.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'medium'
  },
  {
    id: 'm4-8',
    text: 'Se houver um objeto encravado no corpo da vítima, o socorrista deve:',
    options: ['Retirar o objeto rapidamente', 'Não remover e imobilizar o objeto conforme está', 'Tentar empurrar para dentro', 'Cortar o objeto com serra'],
    correctAnswer: 1,
    explanation: 'Remover o objeto pode causar hemorragia incontrolável que o próprio objeto estava contendo.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'medium'
  },
  {
    id: 'm4-9',
    text: 'O que indica que uma vítima parou de respirar?',
    options: ['Ausência de movimentos do tórax e cianose (lábios roxos)', 'Vítima falando muito baixo', 'Vítima pedindo socorro', 'Apenas batimentos cardíacos lentos'],
    correctAnswer: 0,
    explanation: 'A falta de expansão torácica e a cor arroxeada são sinais claros de hipóxia.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'medium'
  },
  {
    id: 'm4-10',
    text: 'Como agir se houver fumaça ou risco de explosão no local?',
    options: ['Ficar perto para filmar', 'Afastar-se e garantir que ninguém se aproxime', 'Tentar apagar o fogo com as mãos', 'Entrar no carro para pegar documentos'],
    correctAnswer: 1,
    explanation: 'A segurança do socorrista vem sempre em primeiro lugar.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'medium'
  },
  {
    id: 'm4-11',
    text: 'A omissão de socorro em acidentes de trânsito é considerada:',
    options: ['Infração de trânsito e crime previsto no Código Penal', 'Apenas um erro ético', 'Um direito do cidadão', 'Obrigatória apenas para médicos'],
    correctAnswer: 0,
    explanation: 'O CTB e o Código Penal punem quem deixa de prestar socorro podendo fazê-lo.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'medium'
  },
  {
    id: 'm4-12',
    text: 'Em caso de desmaio, a vítima deve ser colocada:',
    options: ['Sentada com a cabeça baixa', 'Deitada de costas com as pernas elevadas', 'De pé para acordar logo', 'De bruços'],
    correctAnswer: 1,
    explanation: 'Elevar as pernas ajuda o sangue a retornar ao cérebro.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'medium'
  },
  {
    id: 'm4-13',
    text: 'O que é o estado de choque?',
    options: ['Levar um choque elétrico no carro', 'Falha do sistema circulatório em oxigenar os tecidos', 'Um susto muito grande', 'Ficar nervoso com o acidente'],
    correctAnswer: 1,
    explanation: 'É uma condição clínica grave onde o corpo não consegue manter a pressão sanguínea.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'hard'
  },
  {
    id: 'm4-14',
    text: 'Ao realizar a sinalização com galhos, onde eles devem ser colocados?',
    options: ['No local exato do acidente', 'Antes da curva onde o acidente aconteceu', 'Apenas no acostamento', 'Em cima das vítimas'],
    correctAnswer: 1,
    explanation: 'A sinalização deve avisar o motorista ANTES que ele veja o acidente, permitindo frenagem.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'hard'
  },
  {
    id: 'm4-15',
    text: 'Fraturas expostas devem ser tratadas como?',
    options: ['Tentando colocar o osso no lugar', 'Protegendo com pano limpo e aguardando socorro especializado', 'Limpando o osso com água e sabão', 'Fazendo massagem no local'],
    correctAnswer: 1,
    explanation: 'Nunca manipule fraturas. O risco de infecção e lesão nervosa é altíssimo.',
    module: ModuleId.PRIMEIROS_SOCORROS,
    difficulty: 'hard'
  },

  // --- MÓDULO 5: MEIO AMBIENTE E CIDADANIA (15 questões) ---
  {
    id: 'm5-1',
    text: 'Qual o principal gás poluente emitido por veículos a gasolina?',
    options: ['Oxigênio', 'Monóxido de Carbono (CO)', 'Hidrogênio', 'Vapor d\'água'],
    correctAnswer: 1,
    explanation: 'O monóxido de carbono é um gás tóxico resultante da queima incompleta.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'easy'
  },
  {
    id: 'm5-2',
    text: 'Atirar objetos ou substâncias da janela do veículo é:',
    options: ['Um hábito comum sem punição', 'Infração média e falta de cidadania', 'Permitido em rodovias', 'Recomendado para manter o carro limpo'],
    correctAnswer: 1,
    explanation: 'Causa poluição e pode gerar acidentes para quem vem atrás.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'easy'
  },
  {
    id: 'm5-3',
    text: 'O componente do veículo que ajuda a reduzir a poluição sonora é o:',
    options: ['Radiador', 'Silenciador (escapamento)', 'Carburador', 'Alternador'],
    correctAnswer: 1,
    explanation: 'O silenciador reduz o ruído causado pela explosão no motor.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'easy'
  },
  {
    id: 'm5-4',
    text: 'O que significa ser um cidadão no trânsito?',
    options: ['Respeitar apenas as leis que quiser', 'Ter consciência de direitos e deveres e respeitar o próximo', 'Acelerar para não atrapalhar ninguém', 'Usar a buzina para educar os outros'],
    correctAnswer: 1,
    explanation: 'Cidadania envolve convívio harmonioso e respeito mútuo.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'easy'
  },
  {
    id: 'm5-5',
    text: 'Qual destes materiais demora mais para se decompor na natureza?',
    options: ['Papel', 'Vidro', 'Casca de fruta', 'Palha'],
    correctAnswer: 1,
    explanation: 'O vidro pode demorar milhares de anos para se decompor.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'easy'
  },
  {
    id: 'm5-6',
    text: 'O catalisador é um equipamento que serve para:',
    options: ['Aumentar a potência do motor', 'Filtrar gases tóxicos e transformá-los em menos nocivos', 'Economizar combustível', 'Resfriar o motor'],
    correctAnswer: 1,
    explanation: 'Fica no sistema de escape e é essencial para o controle de emissões.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'medium'
  },
  {
    id: 'm5-7',
    text: 'Manter o motor bem regulado contribui para:',
    options: ['Aumentar a poluição atmosférica', 'Diminuir a emissão de poluentes e economizar combustível', 'Gastar mais óleo', 'Aumentar o ruído'],
    correctAnswer: 1,
    explanation: 'Motores desregulados queimam combustível de forma ineficiente, poluindo mais.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'medium'
  },
  {
    id: 'm5-8',
    text: 'O descarte de óleo de motor usado deve ser feito:',
    options: ['No esgoto comum', 'No solo', 'Em postos de coleta autorizados para reciclagem', 'No lixo orgânico'],
    correctAnswer: 2,
    explanation: 'O óleo é altamente contaminante e deve ser re-refinado.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'medium'
  },
  {
    id: 'm5-9',
    text: 'A poluição visual no trânsito ocorre quando há:',
    options: ['Muitas árvores na beira da estrada', 'Excesso de anúncios, cartazes e luzes que distraem o condutor', 'Faixas de pedestres bem pintadas', 'Céu nublado'],
    correctAnswer: 1,
    explanation: 'Informação visual excessiva causa fadiga mental e distração.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'medium'
  },
  {
    id: 'm5-10',
    text: 'Em relação aos pedestres, o condutor cidadão deve:',
    options: ['Acelerar quando o pedestre estiver atravessando', 'Dar prioridade, especialmente a idosos e pessoas com deficiência', 'Buzinar para o pedestre correr', 'Ignorar se não houver semáforo'],
    correctAnswer: 1,
    explanation: 'O pedestre é o elemento mais frágil e deve ser protegido.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'medium'
  },
  {
    id: 'm5-11',
    text: 'O uso excessivo da buzina causa poluição:',
    options: ['Atmosférica', 'Visual', 'Sonora', 'Hídrica'],
    correctAnswer: 2,
    explanation: 'Ruído excessivo prejudica a saúde mental e o sossego público.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'medium'
  },
  {
    id: 'm5-12',
    text: 'Qual o papel das árvores nas vias urbanas em relação ao trânsito?',
    options: ['Apenas atrapalhar a visão das placas', 'Reter poeira, filtrar gases e reduzir o calor', 'Causar acidentes de propósito', 'Atrair insetos para o carro'],
    correctAnswer: 1,
    explanation: 'A vegetação urbana é vital para a qualidade do ar nas cidades.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'medium'
  },
  {
    id: 'm5-13',
    text: 'A "Inversão Térmica" é um fenômeno que:',
    options: ['Dificulta a dispersão dos poluentes nas cidades', 'Limpa o ar automaticamente', 'Ocorre apenas no verão', 'Acelera os carros'],
    correctAnswer: 0,
    explanation: 'O ar frio fica preso sob o quente, mantendo a poluição perto do solo.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'hard'
  },
  {
    id: 'm5-14',
    text: 'O CONAMA é o órgão responsável por:',
    options: ['Multar motoristas', 'Estabelecer normas e padrões de preservação ambiental', 'Fabricar pneus', 'Pintar as ruas'],
    correctAnswer: 1,
    explanation: 'Conselho Nacional do Meio Ambiente dita as regras de emissões vehiculares.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'hard'
  },
  {
    id: 'm5-15',
    text: 'A sustentabilidade no trânsito pode ser alcançada por:',
    options: ['Uso de veículos individuais sempre', 'Incentivo ao transporte coletivo e modos ativos (bike/pé)', 'Aumento da velocidade das vias', 'Retirada de radares'],
    correctAnswer: 1,
    explanation: 'Reduzir a dependência de carros reduz a emissão total de poluentes.',
    module: ModuleId.MEIO_AMBIENTE,
    difficulty: 'hard'
  }
];
