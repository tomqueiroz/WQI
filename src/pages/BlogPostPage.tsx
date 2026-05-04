import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft, Clock, Calendar, Eye, Share2, BookOpen,
  TrendingUp, ChevronRight, ExternalLink, MessageCircle,
  Linkedin, Twitter, Link2, Tag, Home,
} from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa6';
import { Layout } from '@/components/Layout';
import { useBlogPost, useAllBlogPosts } from '@/hooks/useBlog';
import { LMS_ROUTES } from '@/lib/index';
import type { BlogPost } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/assets/images';

const NAVY = '#001123';
const COPPER = '#7a6207';
const COPPER_LIGHT = '#c9a227';

// ─── Dados estáticos dos posts (fallback + conteúdo rico) ─────────────────────
const STATIC_POSTS_MAP: Record<string, {
  slug: string; title: string; excerpt: string; category: string;
  categoryColor: string; image: string; readTime: number; views: number;
  tags: string[]; keyInsight: string; sources: string[];
  author: string; authorTitle: string; linkedIn: string; date: string;
  content: string;
}> = {
  'projetos-ia-falham': {
    slug: 'projetos-ia-falham',
    title: '95% dos projetos de IA nas empresas fracassam. E agora?',
    excerpt: 'MIT (2025) e RAND Corporation documentaram que o gap de liderança — não a tecnologia — é o maior inibidor de ROI em IA corporativa.',
    category: 'Insights', categoryColor: '#0ea5e9',
    image: IMAGES.CORP_AI_TRAIN_1 || '',
    readTime: 7, views: 2841, tags: ['IA Corporativa', 'Liderança', 'ROI', 'MIT'],
    keyInsight: '80% das iniciativas de IA falham por falta de liderança capacitada, não por problemas técnicos.',
    sources: ['MIT Sloan Management Review 2025', 'RAND Corporation AI Adoption Study', 'Gartner Hype Cycle 2025', 'McKinsey Global AI Survey 2026'],
    author: 'Tom Queiroz', authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '28 Abr 2026',
    content: `## O problema não é a IA. É a liderança.

Vou começar com uma provocação: você já viu empresa comprar uma Ferrari e deixar um motorista de kart pilotar?

É mais ou menos o que está acontecendo com IA nas empresas brasileiras — e no mundo. A tecnologia está lá. O investimento foi feito. O comunicado para o mercado foi enviado. E aí... nada.

Segundo o MIT Sloan Management Review (2025), **80% das iniciativas de IA corporativa falham antes de chegarem à escala**. A RAND Corporation, em estudo mais recente, vai além: apenas **5% dos MVPs de IA chegam à produção com ROI mensurável**.

O Gartner chama de "AI Disappointment" — e coloca liderança despreparada no centro do diagnóstico.

## Por que 95% falham?

A resposta curta: **não é bug, é feature da liderança.** Mais especificamente, ausência dela.

Os três grandes vilões documentados nas pesquisas são:

**1. Falta de literacy executiva em IA**
Quando o CEO não entende o que é um modelo de linguagem, como funciona um agente autônomo ou qual a diferença entre IA Generativa e IA preditiva, ele não consegue fazer as perguntas certas. E sem as perguntas certas, os projetos viram projetos de TI — não de negócio.

**2. Ausência de sponsor de negócio**
Projetos de IA sem um patrocinador executivo com KPIs claros de negócio morrem na primeira revisão de budget. O MIT documenta que projetos com C-Level sponsor ativo têm **3,2x mais chance de escalar**.

**3. Cultura que rejeita mudança**
IA não é um plugin. É uma mudança de paradigma operacional. Empresas que tratam IA como "mais uma ferramenta de TI" pulam exatamente a parte mais difícil: rever processos, redesenhar papéis e treinar pessoas para operar diferente.

## O que os que deram certo fizeram diferente?

A McKinsey Global Survey (2026) identificou três padrões nas empresas com IA que funciona de verdade:

- **Investiram em desenvolvimento executivo antes de tecnologia** — treinamento de liderança antecede implementação
- **Criaram papéis híbridos** com autonomia real (Chief AI Officers, AI Product Owners)
- **Mediram impacto de negócio desde o dia zero** — não métricas de TI, mas receita, custo e experiência do cliente

## O Brasil no ranking

A situação fica ainda mais crítica quando olhamos para o mercado brasileiro. Segundo a TI Inside (2026), **98% das empresas no Brasil relatam dificuldade em encontrar profissionais com habilidades em IA**. O INSEAD AI Talent Index coloca o Brasil na 52ª posição global de prontidão para IA.

Paradoxalmente, o Brasil tem uma das maiores bases de usuários de ferramentas de IA Generativa do mundo — mas uso pessoal não se converte automaticamente em capacidade corporativa estratégica.

## O que fazer a partir de agora

Não existe bala de prata. Mas existe uma sequência que funciona:

**1.** Comece pela liderança — antes de qualquer stack técnica, desenvolva a literacy executiva do seu time sênior

**2.** Defina um caso de uso de negócio com ROI mensurável em 90 dias — não um "piloto de exploração"

**3.** Crie um Chapter de IA interno com sponsor de C-Level e budget de produto (não de TI)

**4.** Meça, ajuste, escale. IA bem implementada não é sprint — é maratona com checkpoints claros

## Conclusão: liderança AI First não é opcional

A IA está avançando mais rápido do que as organizações conseguem absorver. Isso não é pessimismo — é uma janela de oportunidade para os que agem agora.

O gap não é técnico. É de liderança. E isso, ao contrário do que muita gente pensa, é uma boa notícia: **liderança se desenvolve**.

E você? Sua empresa está entre os 5% que estão escalando — ou nos 95%? Me conta nos comentários. Adoro trocar ideias sobre cases reais.`,
  },
  'gap-talentos-ia-brasil': {
    slug: 'gap-talentos-ia-brasil',
    title: 'O Brasil tem um gap gigantesco de talentos em IA. E agora?',
    excerpt: '98% das empresas no Brasil relatam dificuldade em encontrar profissionais com habilidades em IA. TI Inside (2026).',
    category: 'Liderança', categoryColor: '#8b5cf6',
    image: IMAGES.CORP_AI_TRAIN_2 || '',
    readTime: 6, views: 1623, tags: ['Talentos', 'Brasil', 'Mercado de Trabalho', 'IA'],
    keyInsight: 'O Brasil ocupa a 52ª posição no ranking global de prontidão para IA — abaixo de países como Chile e Colômbia.',
    sources: ['TI Inside 2026', 'ManpowerGroup Talent Shortage Survey 2026', 'INSEAD AI Talent Index 2025', 'Brasscom 2025'],
    author: 'Tom Queiroz', authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '22 Abr 2026',
    content: `## O recrutador ligou. Mas o candidato não existe.

Cena real, vivida por dezenas de CHROs brasileiros em 2026: a empresa aprovou budget para contratar um AI Product Owner Sênior. Salary band competitivo. Empresa boa, projeto real. E aí... silêncio.

Não é que os candidatos não apareçam — é que os candidatos com o perfil certo simplesmente não existem em quantidade suficiente.

Segundo a TI Inside (2026), **98% das empresas no Brasil relatam dificuldade séria em encontrar profissionais com habilidades em IA**. O ManpowerGroup Talent Shortage Survey coloca IA & Machine Learning como a segunda skill mais escassa globalmente, atrás apenas de cybersecurity.

## O gap estrutural que ninguém calculou

O Brasil tem um problema duplo, e é preciso encarar de frente:

**Problema 1: Escassez de produção de talentos**
O sistema educacional brasileiro, apesar de melhorias recentes, ainda não produz engenheiros, cientistas de dados e AI practitioners em escala. A Brasscom projeta um déficit de **800 mil profissionais de tecnologia até 2026** — e IA é o gargalo mais crítico.

**Problema 2: Skills de gestão e liderança em IA praticamente inexistentes**
Aqui está o ponto que mais me preocupa como educador e como executivo: a escassez não é só de devs e data scientists. É de **líderes que sabem como usar IA para tomar decisões melhores de negócio**.

O INSEAD AI Talent Index 2025 coloca o Brasil na 52ª posição global — atrás de Chile (41ª), Colômbia (47ª) e Peru (49ª).

## O que as empresas estão fazendo errado

A resposta padrão das empresas é: "vamos contratar externamente". Mas o mercado não tem o que elas buscam.

A segunda resposta padrão é: "vamos importar da Índia ou EUA". Funciona para perfis técnicos específicos. Mas não resolve o problema real: **a liderança brasileira, que toma decisões estratégicas e operacionais, precisa desenvolver AI literacy**.

## O caminho que está funcionando

Empresas que estão avançando no Brasil têm algo em comum: **elas investiram em reskilling da liderança sênior antes de escalar a implementação técnica**.

A Harvard Business Review (2026) documenta que empresas que investem 1 hora/semana de desenvolvimento em IA para lideranças sênior têm **2,8x mais velocidade de implementação** e **40% menos custos de re-trabalho**.

## O que você pode fazer agora

**Para CHROs e CEOs:**
- Mapeie o AI literacy atual da sua liderança com um diagnóstico estruturado
- Crie trilhas de desenvolvimento por nível hierárquico e área de negócio
- Inclua AI skills nos critérios de promoção e avaliação de performance

**Para líderes individuais:**
- Não espere sua empresa te desenvolver — tome a frente
- 2 horas semanais de aprendizado estruturado em IA aplicada ao seu contexto já fazem diferença mensurável em 90 dias
- Encontre um mentor com experiência real, não só teórica

## Conclusão

O gap de talentos em IA não é um problema de TI. É um risco estratégico de competitividade nacional.

A boa notícia? Você está lendo isso. Isso significa que já está um passo à frente.

Me conta: qual é o maior obstáculo que você está enfrentando na contratação ou desenvolvimento de talentos em IA?`,
  },
  'agentes-ia-risco-csuite': {
    slug: 'agentes-ia-risco-csuite',
    title: 'Agentes de IA: o maior risco que o C-suite ainda não precificou',
    excerpt: 'Sistemas agentic chegam com autonomia real para tomar decisões em produção.',
    category: 'Tendências', categoryColor: '#f59e0b',
    image: IMAGES.CORP_AI_TRAIN_5 || '',
    readTime: 8, views: 1987, tags: ['Agentes de IA', 'Riscos', 'C-Suite', 'Governança'],
    keyInsight: 'Até 2027, 25% das iniciativas de IA corporativas usarão agentes autônomos com impacto direto em decisões de negócio.',
    sources: ['Gartner Predictions 2026', 'Anthropic Safety Research 2025', 'Forbes C-Suite AI Survey', 'McKinsey Technology Trends 2026'],
    author: 'Tom Queiroz', authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '15 Abr 2026',
    content: `## Seu sistema de IA acabou de assinar um contrato. Você sabia?

Não é ficção científica — é o futuro imediato. Sistemas de IA agentic já estão sendo implantados em empresas Fortune 500 para executar tarefas autônomas: comprar mídia, responder clientes, ajustar preços, aprovar crédito, recrutar candidatos.

Sem supervisão humana em tempo real. Com orçamento real. Com impacto real.

O Gartner Predictions 2026 estima que **até 2027, 25% das iniciativas de IA corporativas utilizarão agentes autônomos com impacto direto em decisões de negócio**.

## O que são Agentes de IA?

Agentic AI são sistemas que não apenas respondem perguntas. Eles **planejam, executam e avaliam** sequências complexas de ações para atingir um objetivo, usando ferramentas externas de forma autônoma.

A diferença para um chatbot tradicional é brutal: um chatbot responde. Um agente **age**.

## Os riscos que o C-suite ainda não precificou

**Risco 1: Responsabilidade jurídica difusa**
Quando um agente de IA toma uma decisão equivocada, quem responde? A empresa. Não o agente. E a regulação está evoluindo para atribuir responsabilidade aos operadores.

**Risco 2: Cascata de erros difícil de auditar**
Agentes autônomos criam logs de decisão complexos. Quando algo dá errado, reconstruir a cadeia de raciocínio pode ser um pesadelo operacional.

**Risco 3: Over-reliance e atrofia humana**
O MIT documenta um fenômeno chamado de "automation bias": quanto mais eficientes os agentes ficam, menos as equipes humanas questionam suas decisões.

**Risco 4: Segurança e prompt injection**
Agentes com acesso a sistemas críticos são vetores de ataque sofisticados. A Anthropic documenta que "prompt injection" — manipulação de agentes via inputs externos — já é uma técnica de ataque real.

## E as oportunidades?

Os agentes fazem coisas extraordinárias quando bem implementados:

- Automação de processos complexos que exigem raciocínio multi-etapa
- Análise e síntese de dados em volume que humanos não conseguem processar
- Atendimento personalizado em escala com capacidade de resolução real

A McKinsey estima que agentes de IA podem criar **US$ 4,4 trilhões em valor econômico anual** quando bem implementados.

## O que o executivo AI First faz diferente

**Governance first:** Antes de implantar qualquer agente autônomo, defina políticas claras de supervisão, limites de autorização e processos de auditoria.

**Pilote em contextos de baixo risco:** Comece onde o impacto de um erro é reversível e aprendível.

**Desenvolva a equipe para supervisionar, não substituir:** O papel humano migra de executor para supervisor e definidor de critérios.

## Conclusão

Agentes de IA não são uma ameaça — são uma alavanca. O C-suite que entender isso agora, e construir os frameworks corretos de governance e supervisão, vai capturar uma vantagem competitiva difícil de recuperar depois.

O que você está fazendo para preparar sua liderança para a era dos agentes?`,
  },
  'brasil-ia-generativa-janela': {
    slug: 'brasil-ia-generativa-janela',
    title: 'O Brasil e a IA Generativa: estamos aproveitando a janela?',
    excerpt: 'Enquanto EUA e China definem o padrão global, o Brasil debate regulamentação e tenta entender o impacto.',
    category: 'Inovação', categoryColor: '#10b981',
    image: IMAGES.CORP_AI_TRAIN_3 || '',
    readTime: 9, views: 2204, tags: ['Brasil', 'IA Generativa', 'Política', 'Competitividade'],
    keyInsight: 'O Brasil investe apenas 1,2% do PIB em P&D — contra 3,5% da Coreia do Sul. A janela de oportunidade está se fechando.',
    sources: ['WEF Global Competitiveness 2026', 'INSEAD Innovation Index', 'Estratégia Brasileira de IA (EBIA)', 'Statista AI Users Global 2026'],
    author: 'Tom Queiroz', authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '08 Abr 2026',
    content: `## Janela de oportunidade tem prazo de validade.

Em tecnologia, chegamos sempre tarde à festa. O PC, a internet, o smartphone — o Brasil sempre adotou depois dos EUA, mas com entusiasmo compensatório. Com IA Generativa, pela primeira vez na história, a janela pode se fechar antes de entrarmos.

Não é pessimismo — é matemática de curva de adoção.

## Onde o Brasil está agora

Os dados são contraditórios, e é importante ser honesto sobre isso:

**O lado positivo:**
- O Brasil tem a **quinta maior base de usuários de ferramentas de IA Generativa do mundo** (Statista, 2026)
- Temos um ecossistema de startups vibrante, com players globais como a Pareto — empresa que co-fundei, com operações no Brasil e Vale do Silício
- A Estratégia Brasileira de IA (EBIA) existe, e está sendo revisada

**O lado preocupante:**
- O Brasil investe apenas **1,2% do PIB em P&D** — contra 3,5% da Coreia do Sul e 3,1% dos EUA
- O PL de regulamentação de IA está em tramitação há 3 anos sem consenso
- O INSEAD Innovation Index coloca o Brasil na 52ª posição global de prontidão para IA

## A janela que não queremos perder

A IA Generativa está criando uma "janela de oportunidade tecnológica" — um período em que o custo de entrada ainda é relativamente acessível e a vantagem competitiva ainda está disponível para os rápidos.

Essa janela não dura para sempre. Quando o mercado se consolida em poucos players dominantes, entrar passa a custar 10x mais.

A boa notícia: ainda estamos na janela. Mas ela está se fechando.

## O que separa o Brasil da liderança

**Gap 1: Capacidade de pesquisa**
A China publica 6x mais papers sobre IA do que o Brasil. Os EUA, 4x.

**Gap 2: Liderança corporativa preparada**
Executivos sem AI literacy não conseguem tomar decisões estratégicas corretas sobre IA.

**Gap 3: Ecossistema regulatório claro**
Investidores globais hesitam em aportar em mercados com regulação incerta.

## Conclusão

Temos tudo para não apenas acompanhar a IA Generativa, mas liderar na América Latina. Temos criatividade, adaptabilidade e um mercado interno enorme para pilotar soluções.

O que falta é velocidade de decisão — nas empresas, no governo e na academia.

Você sente que sua empresa está aproveitando a janela?`,
  },
  'hierarquia-corporativa-ia': {
    slug: 'hierarquia-corporativa-ia',
    title: 'Da pirâmide à rede: como a IA está destruindo a hierarquia corporativa',
    excerpt: 'O executivo do futuro não gerencia pessoas em silos — gerencia sistemas inteligentes que operam em rede.',
    category: 'Carreira', categoryColor: '#ec4899',
    image: IMAGES.CORP_AI_TRAIN_4 || '',
    readTime: 7, views: 1456, tags: ['Futuro do Trabalho', 'Gestão', 'Transformação', 'HBR'],
    keyInsight: 'Empresas com IA bem implementada reduziram camadas hierárquicas em 30% e aumentaram velocidade de decisão em 45%.',
    sources: ['Harvard Business Review 2026', 'McKinsey Quarterly', 'MIT Sloan Work of the Future', 'Amazon Leadership Principles'],
    author: 'Tom Queiroz', authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '01 Abr 2026',
    content: `## A pirâmide tinha 200 anos. A IA levou 2 para começar a desmontá-la.

A estrutura hierárquica corporativa foi projetada para um mundo onde informação era escassa e processamento humano era o único disponível.

Esse mundo acabou.

A Harvard Business Review (2026) documenta que empresas com IA bem implementada já **reduziram camadas hierárquicas em 30% e aumentaram velocidade de decisão em 45%**. Não por escolha filosófica — por necessidade operacional.

## O que está mudando, concretamente

**1. A informação não precisa mais subir e descer a pirâmide**

O modelo tradicional funciona assim: dado coletado pela operação → analistas processam → gerentes interpretam → diretores decidem → implementação desce. Ciclo de semanas ou meses.

Com IA, dados de negócio em tempo real chegam direto a quem precisa agir. A análise é instantânea. O ciclo vira horas — às vezes minutos.

**2. O papel do gerente médio está mudando radicalmente**

O gerente que existia para compilar relatórios, filtrar informação e repassar para cima não tem mais função nessa nova arquitetura. Mas o gerente que sabe **definir critérios de decisão, supervisionar sistemas de IA e desenvolver sua equipe** fica ainda mais valioso.

**3. Times pequenos estão batendo times grandes**

Com IA, a lógica dos "two-pizza teams" se radicalizou: startups com 5 pessoas constroem produtos que antes exigiam 50.

A McKinsey documenta que as 10% de empresas com melhor performance em IA têm **times médios 40% menores** e entregam **60% mais resultado por pessoa**.

## O que o executivo AI First faz diferente

O executivo que vai prosperar não é o mais inteligente nem o mais experiente. É o que entende como **orquestrar humanos e sistemas de IA** para obter resultado de negócio.

Isso exige:
- **Systems thinking:** entender como decisões automatizadas afetam o sistema todo
- **AI governance:** definir onde IA decide e onde humano deve estar no loop
- **Data literacy:** ler e questionar outputs de modelos com senso crítico

## O risco de ficar parado

Empresas que não evoluírem sua estrutura organizacional para acomodar IA vão sofrer o que chamo de "organizational drag" — a inércia estrutural que faz com que iniciativas de IA nunca saiam do piloto porque o organograma não tem onde encaixar.

## Conclusão

A mensagem não é "IA vai demitir todo mundo". A mensagem é: **a forma como organizamos o trabalho humano precisa mudar para aproveitar o que IA oferece**.

Qual é o maior obstáculo que você está enfrentando para modernizar sua estrutura organizacional?`,
  },
  'ia-regulacao-brasil-ue': {
    slug: 'ia-regulacao-brasil-ue',
    title: 'IA e regulação: enquanto a UE corre, o Brasil ainda debate',
    excerpt: 'O EU AI Act já está em vigor. O Brasil tem um PL em tramitação desde 2021. O risco não é só legal — é de competitividade.',
    category: 'Bem-Estar', categoryColor: '#f97316',
    image: IMAGES.CORP_AI_TRAIN_9 || '',
    readTime: 6, views: 1102, tags: ['Regulação', 'EU AI Act', 'Compliance', 'Governança'],
    keyInsight: '72% dos executivos globais temem riscos regulatórios de IA, mas apenas 18% têm um plano de compliance estruturado.',
    sources: ['EU AI Act Official Text 2024', 'OneTrust AI Governance Report 2026', 'PwC AI Predictions 2026', 'PL 2338/2023 Brasil'],
    author: 'Tom Queiroz', authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '25 Mar 2026',
    content: `## Regulação não é sobre burocracia. É sobre confiança.

Vou começar com uma afirmação contraintuitiva: **ter regulação clara é vantagem competitiva, não entrave**.

A Europa entendeu isso. O EU AI Act, aprovado em 2024 e em vigor a partir de 2026, não travou a inovação europeia em IA — criou um framework de confiança que está atraindo investimentos de empresas globais que precisam de previsibilidade jurídica.

O Brasil ainda está debatendo.

## O que diz o EU AI Act

O EU AI Act é a primeira regulação abrangente de IA do mundo. Sua lógica é baseada em risco:

- **Risco inaceitável:** Sistemas proibidos (manipulação comportamental subliminar)
- **Alto risco:** Sistemas com requisitos rigorosos de transparência e auditoria (recrutamento, crédito, saúde)
- **Risco limitado:** Obrigações de transparência (chatbots devem se identificar como IA)
- **Risco mínimo:** Sem obrigações específicas (filtros de spam)

As multas chegam a **€35 milhões ou 7% do faturamento global**.

## O que o Brasil tem

O PL 2338/2023 existe. É um avanço em relação ao vácuo regulatório anterior. Mas está em tramitação há 3 anos, gerando incerteza para investidores e empresas que precisam de previsibilidade.

## O que os executivos precisam saber agora

**72% dos executivos globais temem riscos regulatórios de IA**, mas apenas **18% têm um plano de compliance estruturado** (OneTrust, 2026).

Independente do status do PL brasileiro, empresas que operam em mercados europeus precisam se preparar agora. As razões:

**1.** Clientes enterprise já exigem compliance em processos de procurement
**2.** A regulação virá — construir processos agora é sempre mais barato do que adaptar depois
**3.** Governance bem feita é diferencial de marca e confiança

## O que fazer na prática

- Mapeie seus sistemas de IA por nível de risco
- Documente seu processo de desenvolvimento com salvaguardas
- Crie um comitê de AI ethics interno com poder real
- Monitore o PL 2338/2023 — quando for aprovado, o prazo de adequação pode ser curto

## Conclusão

A regulação de IA não é um problema do departamento jurídico. É uma questão estratégica que o C-Level precisa estar à frente.

Sua empresa já tem um plano de AI compliance?`,
  },
};

// ─── Componente: Parse Markdown para JSX ─────────────────────────────────────
function parseMarkdown(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl md:text-3xl font-bold mt-12 mb-5 pb-3 border-b" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif', borderColor: '#e4e7ed' }}>
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} className="font-bold mt-5 mb-2" style={{ color: NAVY }}>
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].replace('- ', ''));
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="space-y-2 my-5 pl-4">
          {items.map((item, idx) => {
            const parts = item.split(/\*\*(.*?)\*\*/g);
            return (
              <li key={idx} className="flex items-start gap-2 text-base leading-relaxed" style={{ color: '#374151', fontWeight: 300 }}>
                <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COPPER }} />
                <span>{parts.map((p, pi) => pi % 2 === 1 ? <strong key={pi} style={{ color: NAVY }}>{p}</strong> : p)}</span>
              </li>
            );
          })}
        </ul>
      );
      continue;
    } else if (line.trim() === '') {
      // skip
    } else if (line.startsWith('**')) {
      // Numbered list style items like **1. Item**
      const boldParts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <p key={i} className="my-4 leading-relaxed text-base" style={{ color: '#374151', fontWeight: 300 }}>
          {boldParts.map((part, pi) => pi % 2 === 1 ? <strong key={pi} style={{ color: NAVY, fontWeight: 700 }}>{part}</strong> : part)}
        </p>
      );
    } else {
      // Regular paragraph — handle **bold** inline
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <p key={i} className="my-4 leading-relaxed text-base" style={{ color: '#374151', fontWeight: 300 }}>
          {parts.map((part, pi) => pi % 2 === 1 ? <strong key={pi} style={{ color: NAVY, fontWeight: 700 }}>{part}</strong> : part)}
        </p>
      );
    }

    i++;
  }

  return elements;
}

// ─── Outros artigos para sidebar (estáticos como fallback) ───────────────────
const OTHER_POSTS = Object.values(STATIC_POSTS_MAP);

// ─── Categorias para crossnavigation ─────────────────────────────────────────
const BLOG_CATEGORIES_NAV = ['Insights', 'Liderança', 'Tendências', 'Inovação', 'Estratégia', 'Carreira', 'Bem-Estar', 'Governança', 'Tech & IA', 'Eventos'];

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 500], [0, 80]);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeCatFilter, setActiveCatFilter] = useState<string | null>(null);

  // Supabase: post individual
  const { data: dbPost, loading, error } = useBlogPost(slug || '');
  // Supabase: todos os posts para sidebar e crossnavigation
  const { data: allPosts } = useAllBlogPosts();

  const staticPost = slug ? STATIC_POSTS_MAP[slug] : null;
  const post = dbPost || (staticPost ? {
    id: staticPost.slug,
    slug: staticPost.slug,
    title: staticPost.title,
    excerpt: staticPost.excerpt,
    content: staticPost.content,
    cover_image_url: staticPost.image,
    image: staticPost.image,
    category: staticPost.category,
    categoryColor: staticPost.categoryColor,
    tags: staticPost.tags,
    author_name: staticPost.author,
    author_bio: staticPost.authorTitle,
    read_time_minutes: staticPost.readTime,
    readTime: staticPost.readTime,
    is_published: true,
    is_featured: true,
    views_count: staticPost.views,
    views: staticPost.views,
    published_at: staticPost.date,
    date: staticPost.date,
    created_at: staticPost.date,
    key_insight: staticPost.keyInsight,
    sources: staticPost.sources,
  } : null);

  const postKeyInsight = post?.key_insight || staticPost?.keyInsight;
  const postSources = (post?.sources as string[]) || staticPost?.sources || [];
  const postImage = post?.cover_image_url || post?.image_url || staticPost?.image || '';
  const postAuthorLinkedIn = staticPost?.linkedIn || 'https://www.linkedin.com/in/wellingtonqueiroz/';
  const postReadTime = post?.read_time_minutes || staticPost?.readTime || 7;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(Math.min(scrolled, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    if (dateString.includes(' ')) return dateString;
    try { return new Date(dateString).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return dateString; }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: post?.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Sidebar: usa posts do Supabase (ou fallback estático), excluindo o atual
  const supabaseSidebar = (allPosts || []).filter(p => p.slug !== slug).slice(0, 6);
  const sidebarPostsRaw = supabaseSidebar.length > 0
    ? supabaseSidebar
    : OTHER_POSTS.filter(p => p.slug !== slug).slice(0, 5);
  // Cast para BlogPost[] para ter type safety unificado
  const sidebarPosts = sidebarPostsRaw as unknown as BlogPost[];

  // Crossnavigation: posts filtrados por categoria
  const filteredByCategory = activeCatFilter
    ? (allPosts || []).filter(p => p.category?.toLowerCase() === activeCatFilter?.toLowerCase() && p.slug !== slug).slice(0, 4)
    : (allPosts || []).filter(p => p.slug !== slug).slice(0, 4);

  if (loading && !staticPost) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: COPPER }} />
        </div>
      </Layout>
    );
  }

  if ((!post && !loading) || (error && !staticPost)) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: NAVY }}>Post não encontrado</h1>
          <p className="text-gray-500 mb-6">Este artigo pode ter sido removido ou o link está incorreto.</p>
          <Link to={LMS_ROUTES.BLOG}>
            <Button className="rounded-full px-6" style={{ background: COPPER, color: 'white' }}>← Voltar ao Blog</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!post) return null;

  return (
    <Layout>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 z-[100] h-0.5 transition-all"
        style={{ width: `${readingProgress}%`, background: `linear-gradient(90deg, ${COPPER}, ${COPPER_LIGHT})` }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative overflow-hidden" style={{ height: 'clamp(380px, 50vh, 520px)' }}>
        <motion.div
          style={{ y: heroParallax }}
          className="absolute inset-0 w-full scale-110"
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: postImage ? `url(${postImage})` : `linear-gradient(135deg, ${NAVY} 0%, #0d2040 100%)`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              opacity: postImage ? 0.45 : 1,
            }}
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${NAVY} 0%, rgba(0,17,35,0.75) 50%, rgba(0,17,35,0.3) 100%)` }} />

        {/* Back button */}
        <div className="absolute top-8 left-4 md:left-8 z-30 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={15} /> Voltar
          </button>
          <span className="text-white/30 text-xs">|</span>
          <Link to={LMS_ROUTES.BLOG} onClick={() => window.scrollTo(0,0)} className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm">
            <Home size={13} /> Blog
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 px-4 md:px-8 z-20">
          <div className="max-w-4xl mx-auto">
            {/* Category badge */}
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider"
              style={{ background: `rgba(122,98,7,0.25)`, color: COPPER_LIGHT, border: `1px solid rgba(201,162,39,0.3)` }}
            >
              {post.category}
            </span>

            <h1
              className="text-white font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', fontFamily: 'Montserrat, sans-serif' }}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <Clock size={13} style={{ color: COPPER_LIGHT }} />
                {postReadTime || post.read_time_minutes} min de leitura
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} style={{ color: COPPER_LIGHT }} />
                {formatDate(post.published_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={13} style={{ color: COPPER_LIGHT }} />
                {(post.views_count || 0).toLocaleString('pt-BR')} leituras
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── ARTICLE ──────────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Back navigation bar */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: '#e4e7ed' }}>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all hover:opacity-80"
                style={{ background: 'rgba(0,17,35,0.06)', color: NAVY }}
              >
                <ArrowLeft size={14} /> Voltar
              </button>
              <Link
                to={LMS_ROUTES.BLOG}
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all hover:opacity-80"
                style={{ background: `rgba(122,98,7,0.1)`, color: COPPER }}
              >
                <Home size={14} /> Blog & Eventos
              </Link>
            </div>

            {/* Author card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="rounded-2xl p-5 flex items-center gap-4 mb-8"
              style={{ background: 'rgba(0,17,35,0.04)', border: `1px solid rgba(122,98,7,0.15)` }}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: COPPER }}>
                <img src={IMAGES.TOM_HERO_PORTRAIT} alt="Tom Queiroz" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-base" style={{ color: NAVY }}>{post.author_name}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#6b7280', fontWeight: 300 }}>{post.author_bio || 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios'}</p>
                <div className="flex items-center gap-3 mt-2">
                  <a
                    href={postAuthorLinkedIn}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: '#0077b5' }}
                  >
                    <FaLinkedinIn size={12} /> Conectar no LinkedIn
                  </a>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs" style={{ color: '#9ca3af' }}>Publicado em {formatDate(post.published_at)}</span>
                </div>
              </div>
            </motion.div>

            {/* Key insight banner */}
            {postKeyInsight && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="rounded-2xl p-5 mb-8 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, rgba(122,98,7,0.08) 0%, rgba(201,162,39,0.05) 100%)`, border: `1px solid rgba(122,98,7,0.2)` }}
              >
                <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: `linear-gradient(to bottom, ${COPPER}, ${COPPER_LIGHT})` }} />
                <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: COPPER }}>Insight-Chave</p>
                <p className="text-base font-semibold leading-relaxed" style={{ color: NAVY }}>{postKeyInsight}</p>
              </motion.div>
            )}

            {/* Excerpt */}
            <p className="text-lg leading-relaxed mb-8 italic" style={{ color: '#4b5563', fontWeight: 300, borderLeft: `3px solid ${COPPER}`, paddingLeft: '1.25rem' }}>
              {post.excerpt}
            </p>

            {/* Content */}
            <motion.article
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="prose-custom"
              style={{ fontSize: '1rem', lineHeight: '1.8' }}
            >
              {parseMarkdown(post.content)}
            </motion.article>

            {/* ── CROSS NAVIGATION: Temas ─────────────────────────────── */}
            <div className="mt-12 pt-8 border-t" style={{ borderColor: '#e4e7ed' }}>
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#9ca3af' }}>Explorar por Tema</p>
              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  onClick={() => setActiveCatFilter(null)}
                  className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
                  style={{
                    background: activeCatFilter === null ? NAVY : 'rgba(0,17,35,0.05)',
                    color: activeCatFilter === null ? 'white' : NAVY,
                    border: `1px solid ${activeCatFilter === null ? NAVY : 'rgba(0,17,35,0.15)'}`,
                  }}
                >
                  Todos
                </button>
                {BLOG_CATEGORIES_NAV.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCatFilter(cat === activeCatFilter ? null : cat)}
                    className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
                    style={{
                      background: activeCatFilter === cat ? COPPER : 'rgba(122,98,7,0.06)',
                      color: activeCatFilter === cat ? 'white' : COPPER,
                      border: `1px solid ${activeCatFilter === cat ? COPPER : 'rgba(122,98,7,0.2)'}`,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {filteredByCategory.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredByCategory.map(p => (
                    <Link
                      key={p.slug}
                      to={`/blog/${p.slug}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="rounded-xl p-4 border group hover:shadow-md transition-all"
                      style={{ borderColor: '#e4e7ed', background: 'white' }}
                    >
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-2"
                        style={{ background: `rgba(122,98,7,0.1)`, color: COPPER }}
                      >
                        {p.category}
                      </span>
                      <p className="text-xs font-semibold leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity" style={{ color: NAVY }}>
                        {p.title}
                      </p>
                      <p className="text-[10px] mt-1" style={{ color: '#9ca3af' }}>{p.readTime || p.read_time_minutes} min</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#9ca3af' }}>Nenhum artigo nessa categoria ainda.</p>
              )}
              <div className="mt-4 text-center">
                <Link
                  to={LMS_ROUTES.BLOG}
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: COPPER }}
                >
                  Ver todos os artigos <ChevronRight size={12} />
                </Link>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t" style={{ borderColor: '#e4e7ed' }}>
                <Tag size={14} className="mt-0.5" style={{ color: COPPER }} />
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(122,98,7,0.08)', color: COPPER, border: `1px solid rgba(122,98,7,0.2)` }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Sources */}
            {postSources.length > 0 && (
              <div className="mt-8 pt-6 border-t" style={{ borderColor: '#e4e7ed' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#9ca3af' }}>Fontes & Referências</p>
                <ul className="space-y-1">
                  {postSources.map((source, idx) => (
                    <li key={idx} className="text-xs flex items-start gap-1.5" style={{ color: '#6b7280' }}>
                      <span style={{ color: COPPER }}>·</span> {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Share + CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-10 pt-8 border-t" style={{ borderColor: '#e4e7ed' }}>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all border"
                style={{ borderColor: COPPER, color: COPPER }}
              >
                {copied ? <><Link2 size={14} /> Link copiado!</> : <><Share2 size={14} /> Compartilhar</>}
              </button>
              <a
                href="https://www.linkedin.com/in/wellingtonqueiroz/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-all"
                style={{ background: '#0077b5' }}
              >
                <Linkedin size={14} /> Compartilhar no LinkedIn
              </a>
              <a
                href="https://twitter.com/intent/tweet?text=Artigo+imperdível+de+@tomqueiroz&url="
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-all"
                style={{ background: '#1da1f2' }}
              >
                <Twitter size={14} /> X / Twitter
              </a>
            </div>

            {/* Comment CTA */}
            <div className="mt-10 rounded-2xl p-6 text-center" style={{ background: `rgba(0,17,35,0.03)`, border: `1px solid rgba(0,17,35,0.07)` }}>
              <MessageCircle size={28} className="mx-auto mb-3" style={{ color: COPPER }} />
              <h3 className="font-bold text-base mb-2" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>Qual é a sua visão sobre o tema?</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#6b7280', fontWeight: 300 }}>
                Tom Queiroz adora trocar ideias e receber perspectivas diferentes. Comente no LinkedIn — ele vai responder!
              </p>
              <a
                href={`https://www.linkedin.com/in/wellingtonqueiroz/`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all"
                style={{ background: '#0077b5' }}
              >
                <FaLinkedinIn size={13} /> Comentar no LinkedIn
              </a>
            </div>

            {/* CTA Programas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl p-8 text-center mt-12"
              style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d2040 100%)` }}
            >
              <h3 className="text-white font-black text-xl mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Pronto para desenvolver sua liderança <span style={{ color: COPPER_LIGHT }}>AI First</span>?</h3>
              <p className="text-white/70 text-sm mb-6 max-w-xl mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
                Transforme teoria em prática com os programas de mentoria executiva da Recognise. Desenvolvidos por quem viveu a transformação por dentro.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to={LMS_ROUTES.PROGRAMAS}>
                  <Button className="rounded-full px-6" style={{ background: COPPER, color: 'white', border: 'none' }}>
                    Explorar Programas
                  </Button>
                </Link>
                <a href="https://wa.me/5511915513210?text=Olá%2C%20li%20um%20artigo%20da%20Recognise%20e%20gostaria%20de%20saber%20mais." target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full px-6" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                    Falar com Especialista
                  </Button>
                </a>
              </div>
            </motion.div>

          </div>

          {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="space-y-6">

              {/* Author mini card */}
              <div className="rounded-2xl p-5" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d2040 100%)` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: COPPER }}>
                    <img src={IMAGES.TOM_HERO_PORTRAIT} alt="Tom Queiroz" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Tom Queiroz</p>
                    <p className="text-white/50 text-[10px] leading-tight">CEO & CAIO Pareto Plus<br />Prof. Me. FGV IA Aplicada</p>
                  </div>
                </div>
                <p className="text-white/60 text-xs leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                  Executivo, educador e mentor na interseção entre IA, negócios e liderança. Atuando com IA Generativa desde 2021.
                </p>
                <a
                  href={postAuthorLinkedIn}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: COPPER, color: 'white' }}
                >
                  <FaLinkedinIn size={13} /> Seguir no LinkedIn
                </a>
              </div>

              {/* Mais lidos */}
              <div className="rounded-2xl border p-5" style={{ borderColor: '#e4e7ed' }}>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={14} style={{ color: COPPER }} />
                  <p className="font-black text-xs uppercase tracking-widest" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>Artigos Relacionados</p>
                </div>
                <div className="space-y-4">
                  {sidebarPosts.map((p, i) => (
                    <Link
                      key={p.slug || i}
                      to={`/blog/${p.slug}`}
                      className="flex items-start gap-3 group"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <span className="font-black text-xl leading-none flex-shrink-0 mt-0.5" style={{ color: 'rgba(0,17,35,0.12)', fontFamily: 'Montserrat, sans-serif' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-xs font-semibold leading-snug line-clamp-2 group-hover:underline" style={{ color: NAVY }}>
                          {p.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{ background: `rgba(122,98,7,0.1)`, color: p.categoryColor || COPPER }}
                          >
                            {p.category}
                          </span>
                          <span className="text-[10px]" style={{ color: '#94a3b8' }}>
                            {p.readTime || p.read_time_minutes || 7} min
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags populares */}
              {post.tags && post.tags.length > 0 && (
                <div className="rounded-2xl border p-5" style={{ borderColor: '#e4e7ed' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={14} style={{ color: COPPER }} />
                    <p className="font-black text-xs uppercase tracking-widest" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>Temas</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(122,98,7,0.08)', color: COPPER }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA sidebar */}
              <div className="rounded-2xl p-5 text-center" style={{ background: `rgba(122,98,7,0.06)`, border: `1px solid rgba(122,98,7,0.2)` }}>
                <BookOpen size={22} className="mx-auto mb-3" style={{ color: COPPER }} />
                <p className="font-bold text-sm mb-2" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>Mentoria 1:1 com Tom</p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: '#6b7280', fontWeight: 300 }}>
                  Sessões executivas personalizadas para acelerar sua jornada AI First.
                </p>
                <Link to={LMS_ROUTES.PROG_1ON1}>
                  <button
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${COPPER} 0%, ${COPPER_LIGHT} 100%)` }}
                  >
                    Saiba Mais <ChevronRight size={13} className="inline" />
                  </button>
                </Link>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </Layout>
  );
}
