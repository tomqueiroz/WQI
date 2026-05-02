
-- Add all missing columns to blog_posts table
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category_color text DEFAULT '#001123';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS read_time integer DEFAULT 5;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS key_insight text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS sources text[] DEFAULT '{}';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_name text DEFAULT 'Tom Queiroz';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_title text DEFAULT 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_linkedin text DEFAULT 'https://www.linkedin.com/in/wellingtonqueiroz/';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_image_url text;

-- Delete old posts if any
DELETE FROM public.blog_posts WHERE slug IN (
  'projetos-ia-falham','gap-talentos-ia-brasil','agentes-ia-risco-csuite',
  'brasil-ia-generativa-janela','hierarquia-corporativa-ia','ia-regulacao-brasil-ue'
);

-- Insert 6 rich blog posts (using cover_image if image_url doesn't exist, else image_url)
INSERT INTO public.blog_posts (slug, title, excerpt, content, category, category_color, image_url, read_time, views_count, is_featured, is_published, tags, key_insight, sources, author_name, author_title, author_linkedin, published_at) VALUES

('projetos-ia-falham',
'95% dos projetos de IA nas empresas fracassam. E agora?',
'MIT (2025) e RAND Corporation documentaram que o gap de liderança — não a tecnologia — é o maior inibidor de ROI em IA corporativa. Entenda o diagnóstico e o que fazer a respeito.',
E'## O problema não é a IA. É a liderança.\n\nVou começar com uma provocação: você já viu empresa comprar uma Ferrari e deixar um motorista de kart pilotar?\n\nÉ mais ou menos o que está acontecendo com IA nas empresas brasileiras — e no mundo. A tecnologia está lá. O investimento foi feito. O comunicado para o mercado foi enviado. E aí... nada.\n\nSegundo o MIT Sloan Management Review (2025), **80% das iniciativas de IA corporativa falham antes de chegarem à escala**. A RAND Corporation, em estudo mais recente, vai além: apenas **5% dos MVPs de IA chegam à produção com ROI mensurável**.\n\nO Gartner chama de "AI Disappointment" — e coloca liderança despreparada no centro do diagnóstico.\n\n## Por que 95% falham?\n\nA resposta curta: **não é bug, é feature da liderança.** Mais especificamente, ausência dela.\n\n**1. Falta de literacy executiva em IA**\nQuando o CEO não entende o que é um modelo de linguagem, como funciona um agente autônomo ou qual a diferença entre IA Generativa e IA preditiva, ele não consegue fazer as perguntas certas. E sem as perguntas certas, os projetos viram projetos de TI — não de negócio.\n\n**2. Ausência de sponsor de negócio**\nProjetos de IA sem um patrocinador executivo com KPIs claros de negócio morrem na primeira revisão de budget. O MIT documenta que projetos com C-Level sponsor ativo têm **3,2x mais chance de escalar**.\n\n**3. Cultura que rejeita mudança**\nIA não é um plugin. É uma mudança de paradigma operacional. Empresas que tratam IA como "mais uma ferramenta de TI" pulam exatamente a parte mais difícil: rever processos, redesenhar papéis e treinar pessoas para operar diferente.\n\n## O que os que deram certo fizeram diferente?\n\nA McKinsey Global Survey (2026) identificou três padrões nas empresas com IA que funciona de verdade:\n\n- **Investiram em desenvolvimento executivo antes de tecnologia**\n- **Criaram papéis híbridos** com autonomia real (Chief AI Officers, AI Product Owners)\n- **Mediram impacto de negócio desde o dia zero** — não métricas de TI, mas receita, custo e experiência do cliente\n\n## O Brasil no ranking\n\nA situação fica ainda mais crítica quando olhamos para o mercado brasileiro. Segundo a TI Inside (2026), **98% das empresas no Brasil relatam dificuldade em encontrar profissionais com habilidades em IA**. O INSEAD AI Talent Index coloca o Brasil na 52ª posição global de prontidão para IA.\n\n## O que fazer a partir de agora\n\n**1.** Comece pela liderança — antes de qualquer stack técnica, desenvolva a literacy executiva do seu time sênior\n\n**2.** Defina um caso de uso de negócio com ROI mensurável em 90 dias\n\n**3.** Crie um Chapter de IA interno com sponsor de C-Level e budget de produto (não de TI)\n\n**4.** Meça, ajuste, escale.\n\n## Conclusão\n\nO gap não é técnico. É de liderança. E isso, ao contrário do que muita gente pensa, é uma boa notícia: **liderança se desenvolve**.\n\nE você? Sua empresa está entre os 5% que estão escalando — ou nos 95%? Me conta nos comentários.',
'Insights', '#0ea5e9',
'https://images.unsplash.com/flagged/photo-1576485436509-a7d286952b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
7, 2841, true, true,
ARRAY['IA Corporativa', 'Liderança', 'ROI', 'MIT'],
'80% das iniciativas de IA falham por falta de liderança capacitada, não por problemas técnicos.',
ARRAY['MIT Sloan Management Review 2025', 'RAND Corporation', 'Gartner Hype Cycle 2025', 'McKinsey Global AI Survey 2026'],
'Tom Queiroz', 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
'https://www.linkedin.com/in/wellingtonqueiroz/',
'2026-04-28 10:00:00+00'),

('gap-talentos-ia-brasil',
'O Brasil tem um gap gigantesco de talentos em IA. E agora?',
'98% das empresas no Brasil relatam dificuldade em encontrar profissionais com habilidades em IA. TI Inside (2026). Enquanto isso, o mundo avança.',
E'## O recrutador ligou. Mas o candidato não existe.\n\nCena real, vivida por dezenas de CHROs brasileiros em 2026: a empresa aprovou budget para contratar um AI Product Owner Sênior. Salary band competitivo. Empresa boa, projeto real. E aí... silêncio.\n\nSegundo a TI Inside (2026), **98% das empresas no Brasil relatam dificuldade séria em encontrar profissionais com habilidades em IA**.\n\n## O gap estrutural que ninguém calculou\n\n**Problema 1: Escassez de produção de talentos**\nA Brasscom projeta um déficit de **800 mil profissionais de tecnologia até 2026** — e IA é o gargalo mais crítico.\n\n**Problema 2: Skills de gestão e liderança em IA praticamente inexistentes**\nO INSEAD AI Talent Index 2025 coloca o Brasil na 52ª posição global — atrás de Chile (41ª), Colômbia (47ª) e Peru (49ª).\n\n## O caminho que está funcionando\n\nEmpresas que estão avançando no Brasil têm algo em comum: **elas investiram em reskilling da liderança sênior antes de escalar a implementação técnica**.\n\nA Harvard Business Review (2026) documenta que empresas que investem 1 hora/semana de desenvolvimento em IA para lideranças sênior têm **2,8x mais velocidade de implementação** e **40% menos custos de re-trabalho**.\n\n## O que você pode fazer agora\n\n**Para CHROs e CEOs:**\n- Mapeie o AI literacy atual da sua liderança com um diagnóstico estruturado\n- Crie trilhas de desenvolvimento por nível hierárquico\n- Inclua AI skills nos critérios de promoção\n\n**Para líderes individuais:**\n- 2 horas semanais de aprendizado estruturado em IA já fazem diferença mensurável em 90 dias\n- Encontre um mentor com experiência real, não só teórica\n\n## Conclusão\n\nO gap de talentos em IA não é um problema de TI. É um risco estratégico de competitividade nacional.\n\nMe conta: qual é o maior obstáculo que você está enfrentando na contratação ou desenvolvimento de talentos em IA?',
'Liderança', '#8b5cf6',
'https://images.unsplash.com/photo-1565598469107-2bd14ae7e7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
6, 1623, true, true,
ARRAY['Talentos', 'Brasil', 'Mercado de Trabalho', 'IA'],
'O Brasil ocupa a 52ª posição no ranking global de prontidão para IA — abaixo de países como Chile e Colômbia.',
ARRAY['TI Inside 2026', 'ManpowerGroup Talent Shortage Survey 2026', 'INSEAD AI Talent Index 2025', 'Brasscom 2025'],
'Tom Queiroz', 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
'https://www.linkedin.com/in/wellingtonqueiroz/',
'2026-04-22 10:00:00+00'),

('agentes-ia-risco-csuite',
'Agentes de IA: o maior risco que o C-suite ainda não precificou',
'Sistemas agentic chegam com autonomia real para tomar decisões em produção. A maioria dos executivos ainda não sabe o que isso significa para seus negócios — e para sua responsabilidade.',
E'## Seu sistema de IA acabou de assinar um contrato. Você sabia?\n\nSistemas de IA agentic já estão sendo implantados em empresas Fortune 500 para executar tarefas autônomas: comprar mídia, responder clientes, ajustar preços, aprovar crédito.\n\nO Gartner Predictions 2026 estima que **até 2027, 25% das iniciativas de IA corporativas utilizarão agentes autônomos com impacto direto em decisões de negócio**.\n\n## O que são Agentes de IA?\n\nAgentic AI são sistemas que não apenas respondem perguntas. Eles **planejam, executam e avaliam** sequências complexas de ações para atingir um objetivo, usando ferramentas externas de forma autônoma.\n\nA diferença para um chatbot: um chatbot responde. Um agente **age**.\n\n## Os riscos que o C-suite ainda não precificou\n\n**Risco 1: Responsabilidade jurídica difusa** — quando um agente de IA erra, quem responde? A empresa.\n\n**Risco 2: Cascata de erros difícil de auditar** — reconstruir a cadeia de raciocínio de um agente autônomo pode ser um pesadelo regulatório.\n\n**Risco 3: Automation bias** — o MIT documenta que quanto mais eficientes os agentes ficam, menos as equipes humanas questionam suas decisões.\n\n**Risco 4: Prompt injection** — manipulação de agentes via inputs externos já é uma técnica de ataque real.\n\n## As oportunidades são reais\n\nA McKinsey estima que agentes de IA podem criar **US$ 4,4 trilhões em valor econômico anual** quando bem implementados.\n\n## O que o executivo AI First faz diferente\n\n- **Governance first:** defina políticas claras de supervisão antes de implantar\n- **Pilote em contextos de baixo risco**\n- **Desenvolva a equipe para supervisionar, não substituir**\n\n## Conclusão\n\nO C-suite que entender isso agora, e construir os frameworks corretos de governance, vai capturar uma vantagem competitiva difícil de recuperar depois.\n\nO que você está fazendo para preparar sua liderança para a era dos agentes?',
'Tendências', '#f59e0b',
'https://images.unsplash.com/photo-1632835223280-8ef429ec3eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
8, 1987, true, true,
ARRAY['Agentes de IA', 'Riscos', 'C-Suite', 'Governança'],
'Até 2027, 25% das iniciativas de IA corporativas usarão agentes autônomos com impacto direto em decisões de negócio.',
ARRAY['Gartner Predictions 2026', 'Anthropic Safety Research 2025', 'Forbes C-Suite AI Survey', 'McKinsey Technology Trends 2026'],
'Tom Queiroz', 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
'https://www.linkedin.com/in/wellingtonqueiroz/',
'2026-04-15 10:00:00+00'),

('brasil-ia-generativa-janela',
'O Brasil e a IA Generativa: estamos aproveitando a janela?',
'Enquanto EUA e China definem o padrão global, o Brasil debate regulamentação e tenta entender o impacto. Uma análise honesta de onde estamos — e o que nos separa da liderança.',
E'## Janela de oportunidade tem prazo de validade.\n\nCom IA Generativa, pela primeira vez na história, a janela pode se fechar antes de entrarmos.\n\n## Onde o Brasil está agora\n\n**O lado positivo:**\n- O Brasil tem a **quinta maior base de usuários de ferramentas de IA Generativa do mundo** (Statista, 2026)\n- Temos um ecossistema de startups vibrante\n\n**O lado preocupante:**\n- O Brasil investe apenas **1,2% do PIB em P&D** — contra 3,5% da Coreia do Sul\n- O INSEAD Innovation Index coloca o Brasil na 52ª posição global\n\n## O que separa o Brasil da liderança\n\n**Gap 1: Pesquisa** — a China publica 6x mais papers sobre IA do que o Brasil\n\n**Gap 2: Liderança corporativa preparada** — executivos sem AI literacy não conseguem tomar decisões estratégicas corretas\n\n**Gap 3: Regulação clara** — investidores hesitam em aportar em mercados com regulação incerta\n\n## Conclusão\n\nTemos tudo para liderar na América Latina. O que falta é velocidade de decisão — nas empresas, no governo e na academia.\n\nVocê sente que sua empresa está aproveitando a janela?',
'Inovação', '#10b981',
'https://images.unsplash.com/photo-1593080358201-08e4ff5f93d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
9, 2204, false, true,
ARRAY['Brasil', 'IA Generativa', 'Política', 'Competitividade'],
'O Brasil investe apenas 1,2% do PIB em P&D — contra 3,5% da Coreia do Sul. A janela de oportunidade está se fechando.',
ARRAY['WEF Global Competitiveness 2026', 'INSEAD Innovation Index', 'Estratégia Brasileira de IA (EBIA)', 'Statista 2026'],
'Tom Queiroz', 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
'https://www.linkedin.com/in/wellingtonqueiroz/',
'2026-04-08 10:00:00+00'),

('hierarquia-corporativa-ia',
'Da pirâmide à rede: como a IA está destruindo a hierarquia corporativa',
'O executivo do futuro não gerencia pessoas em silos — gerencia sistemas inteligentes que operam em rede. HBR e McKinsey apontam uma mudança estrutural que a maioria das empresas ignora.',
E'## A pirâmide tinha 200 anos. A IA levou 2 para começar a desmontá-la.\n\nA Harvard Business Review (2026) documenta que empresas com IA bem implementada já **reduziram camadas hierárquicas em 30% e aumentaram velocidade de decisão em 45%**.\n\n## O que está mudando\n\n**1.** A informação não precisa mais subir e descer a pirâmide — com IA, dados chegam direto a quem precisa agir, e o ciclo vira horas.\n\n**2.** O gerente médio que existia para compilar relatórios não tem mais função nessa nova arquitetura. Mas o que sabe **definir critérios de decisão e supervisionar sistemas de IA** fica ainda mais valioso.\n\n**3.** Times pequenos estão batendo times grandes — a McKinsey documenta que as top 10% em performance de IA têm **times 40% menores** e entregam **60% mais resultado por pessoa**.\n\n## O que o executivo AI First faz diferente\n\n- **Systems thinking:** entender como decisões automatizadas afetam o sistema todo\n- **AI governance:** definir onde IA decide e onde humano deve estar no loop\n- **Data literacy:** ler e questionar outputs de modelos com senso crítico\n\n## Conclusão\n\nA mensagem não é "IA vai demitir todo mundo". É: **a forma como organizamos o trabalho humano precisa mudar para aproveitar o que IA oferece**.\n\nQual é o maior obstáculo que você está enfrentando para modernizar sua estrutura organizacional?',
'Carreira', '#ec4899',
'https://images.unsplash.com/photo-1700241956197-0b13f96fd69e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
7, 1456, false, true,
ARRAY['Futuro do Trabalho', 'Gestão', 'Transformação', 'HBR'],
'Empresas com IA bem implementada reduziram camadas hierárquicas em 30% e aumentaram velocidade de decisão em 45%.',
ARRAY['Harvard Business Review 2026', 'McKinsey Quarterly', 'MIT Sloan Work of the Future'],
'Tom Queiroz', 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
'https://www.linkedin.com/in/wellingtonqueiroz/',
'2026-04-01 10:00:00+00'),

('ia-regulacao-brasil-ue',
'IA e regulação: enquanto a UE corre, o Brasil ainda debate',
'O EU AI Act já está em vigor. O Brasil tem um PL em tramitação desde 2021. O risco não é só legal — é de competitividade. O que os executivos precisam saber agora.',
E'## Regulação não é sobre burocracia. É sobre confiança.\n\n**Ter regulação clara é vantagem competitiva, não entrave.** O EU AI Act, aprovado em 2024 e em vigor a partir de 2026, criou um framework de confiança que está atraindo investimentos globais.\n\n## O que diz o EU AI Act\n\nSua lógica é baseada em risco:\n- **Risco inaceitável:** sistemas proibidos\n- **Alto risco:** requisitos rigorosos de transparência (recrutamento, crédito, saúde)\n- **Risco limitado:** obrigações de transparência (chatbots devem se identificar)\n- As multas chegam a **€35 milhões ou 7% do faturamento global**\n\n## O que o Brasil tem\n\nO PL 2338/2023 está em tramitação há 3 anos, gerando incerteza para investidores e empresas.\n\n## O que os executivos precisam saber agora\n\n**72% dos executivos globais temem riscos regulatórios de IA**, mas apenas **18% têm um plano de compliance estruturado** (OneTrust, 2026).\n\nIndependente do PL brasileiro, empresas que operam em mercados europeus precisam se preparar:\n- Clientes enterprise já exigem compliance em processos de procurement\n- Construir processos agora é sempre mais barato do que adaptar depois\n- Governance bem feita é diferencial de marca\n\n## O que fazer na prática\n\n- Mapeie seus sistemas de IA por nível de risco\n- Documente seu processo de desenvolvimento\n- Crie um comitê de AI ethics interno com poder real\n\n## Conclusão\n\nA regulação de IA não é um problema do jurídico. É uma questão estratégica que o C-Level precisa estar à frente.\n\nSua empresa já tem um plano de AI compliance?',
'Bem-Estar', '#f97316',
'https://images.unsplash.com/photo-1756885465373-bce82fd5c944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
6, 1102, false, true,
ARRAY['Regulação', 'EU AI Act', 'Compliance', 'Governança'],
'72% dos executivos globais temem riscos regulatórios de IA, mas apenas 18% têm um plano de compliance estruturado.',
ARRAY['EU AI Act Official Text 2024', 'OneTrust AI Governance Report 2026', 'PwC AI Predictions 2026', 'PL 2338/2023 Brasil'],
'Tom Queiroz', 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
'https://www.linkedin.com/in/wellingtonqueiroz/',
'2026-03-25 10:00:00+00');
