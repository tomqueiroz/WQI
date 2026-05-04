import { motion } from 'framer-motion';
import { GeracaoAiFirstTm, AiFirstTm } from '@/components/AiFirstTm';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/assets/images';
import {
  MessageCircle,
  GraduationCap,
  Globe,
  Zap,
  TrendingUp,
  BookOpen,
  Users,
  Award,
  Target,
  BarChart3,
  Briefcase,
  Lightbulb,
  CheckCircle,
  Brain,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { LMS_ROUTES } from '@/lib/index';

const WA_LINK = 'https://wa.me/5511915513210?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20Recognise.';

const TIMELINE = [
  // ── FORMAÇÃO ACADÊMICA E INÍCIO (cronologicamente do mais antigo ao mais recente)
  { year: '1994–1996', role: 'Técnico em Administração', company: 'Fundação Bradesco', desc: 'Formação técnica em Administração de Empresas pela Fundação Bradesco — base sólida em gestão e negócios que sustentou toda a trajetória executiva.' },
  { year: '1997–2000', role: 'Formação — Propaganda & Marketing', company: 'Universidade Mackenzie', desc: 'Bacharel em Propaganda e Marketing pela Universidade Presbiteriana Mackenzie. Base sólida em comunicação, branding e estratégia de mercado.' },
  { year: '2003–2008', role: 'Coordenador de Marketing e Comunicação', company: 'Stihl — Porto Alegre', desc: 'Responsável pelo reposicionamento da marca e abertura de novos mercados além dos implementos agrícolas. Liderou equipe especializada, melhorou comunicação, otimizou publicidade offline e impulsionou crescimento de vendas.' },
  { year: '2005', role: 'Consultor de Business Development', company: 'Shell — Programa Líderes do Futuro', desc: 'Selecionado para o altamente disputado Programa de Líderes do Futuro Shell. Abertura de novos mercados para Lubrificantes na Região Sul com ativação B2B e conquista de aumento de 18% em market share.' },
  { year: '2006–2009', role: 'MBA — Inovação em Marketing', company: 'PUC-RS', desc: 'MBA em Inovação em Marketing pela PUC-RS. Aprofundamento em estratégias de inovação e desenvolvimento de produtos.' },
  { year: '2008–2012', role: 'Executivo de Comunicação e Marcas', company: 'Sony Electronics', desc: 'Desenvolveu estratégia de posicionamento de marca com foco na nova Classe C brasileira — triplicou faturamento em 2 anos. Liderou trade marketing com mais de 1.500 promotores em todo o Brasil, concorrendo diretamente com Samsung e LG.' },
  { year: '2012–2014', role: 'Executivo de Marketing Digital LATAM', company: 'Kobo Inc. (Canadá)', desc: 'Responsável por introduzir a marca canadense na América Latina. Criou estratégias de marketing e liderou times internacionais no mercado de e-books e tablets, resultando em dezenas de contratos e receita expressiva.' },
  { year: '2014–2017', role: 'MBA — Marketing Digital', company: 'FGV — Fundação Getúlio Vargas', desc: 'MBA em Marketing Digital pela FGV — uma das mais respeitadas instituições de negócios do Brasil. Aprofundamento em estratégias digitais e analytics.' },
  { year: '2014–2017', role: 'Executivo Sênior de Marketing Digital', company: 'Honda Automóveis do Brasil', desc: 'Liderou transformação digital com tecnologias 3D/CGI e Realidade Virtual no ponto de venda. Implementou CRM Salesforce. Alcançou crescimento de 50% em market share em SUVs. Responsável pelos lançamentos dos icônicos HR-V e WR-V — Prêmio The Advertising of The Year 2015.' },
  { year: '2014–2017', role: 'Fundador & Empreendedor Digital', company: 'Digital MarTech XP + Pearson Brasil', desc: 'Fundou startup de educação online em parceria com a Pearson Brasil — maior editora do mundo. Abriu mais de 250 convênios, premiado por performance em vendas e inovação em marketing digital.' },
  { year: '2021', role: 'Executivo de Marketing Digital — Pioneiro em IA', company: 'Arco Educação + IBM Watson', desc: 'Integrou IA com tecnologia IBM Watson como assistente virtual para ativação em eventos — antes do boom global da IA Generativa ao final de 2023. Impulsionou crescimento de audiência e conversão superior a 10% YoY com estratégias inovadoras.' },
  { year: '2021–2022', role: 'Full-Stack Developer & Fundação da Recognise', company: 'Digital MarTech + Recognise', desc: 'Concluiu formação em Full-Stack Web Development e contribuiu para a fundação da Recognise — empresa especializada em desenvolvimento de capacidades baseadas em IA para profissionais e corporações, com metodologia AI First Framework™ proprietária.' },
  { year: '2022–2023', role: 'Head de Marketing Digital Sênior', company: 'Faculdade São Leopoldo Mandic', desc: 'Reestruturou marketing com equipe de 25 profissionais em squads especializados, alcançando crescimento histórico de 10x em leads qualificados. Implementou IA em campanhas e automações com otimização de investimentos em mídia.' },
  { year: '2023–Atual', role: 'Professor Msc — IA Generativa Aplicada a Negócios', company: 'FGV EAESP', desc: 'Professor associado em Marketing Digital e Inteligência Artificial Generativa na Fundação Getúlio Vargas EAESP — compartilhando expertise com líderes de alto potencial em MBA e Executive Education.' },
  { year: '2024–Atual', role: 'CEO & CAIO — IA Generativa', company: 'Pareto (pareto.io) · TESS AI (tess.im)', desc: 'CEO e CAIO na Pareto Plus — referência brasileira em GenAI com operações no Brasil e no Vale do Silício. Responsável estratégico da plataforma proprietária TESS AI (tess.im), adotada por centenas de empresas. Certificado AI Leader em AI Ads, AI Social, AI Design, AI Email e Engenharia de Prompt.' },
];

const CREDENTIALS = [
  { Icon: GraduationCap, title: 'FGV EAESP', desc: 'Professor Msc. em Marketing Digital e IA Generativa Aplicada — MBA e Executive Education. Formando a próxima geração de líderes AI First.' },
  { Icon: Globe, title: 'LATAM de Referência', desc: 'Equipe Recognise com especialistas reconhecidos no mercado de IA Aplicada no Brasil e América Latina, líderes de suas próprias empresas de IA.' },
  { Icon: Zap, title: 'AI-First Framework™', desc: 'Metodologia proprietária baseada em 500+ casos reais de transformação com IA Generativa — desenvolvida de dentro para fora de cada organização.' },
  { Icon: TrendingUp, title: 'ROI Médio 10x', desc: 'Resultado médio documentado em projetos de marketing e operação com IA generativa nos últimos 3 anos.' },
  { Icon: BookOpen, title: '25+ Anos C-Suite', desc: 'Trajetória executiva em Sony, Honda, Rakuten, Shell e Kobo — entregando resultado real em mercados altamente competitivos, em múltiplos países.' },
  { Icon: Users, title: '500+ Executivos Formados', desc: 'Líderes de C-Suite, VPs, diretores e times formados em programas individuais, cohorts e in-company no Brasil e no mundo.' },
  { Icon: Award, title: 'Premiação Internacional', desc: 'Prêmio The Advertising of The Year 2015 pelo lançamento do Honda HR-V — reposicionamento histórico de 50% em market share em SUVs.' },
  { Icon: BarChart3, title: 'TESS AI · Pareto.io', desc: 'Plataforma proprietária de IA Generativa adotada por centenas de empresas no Brasil e no Vale do Silício. A Recognise nasce desta expertise de implementação real.' },
];

const PHILOSOPHY = [
  {
    Icon: Brain,
    title: 'Novo Modelo Mental — Não Apenas Novas Ferramentas',
    desc: 'A Recognise não vende cursos de IA. Desenvolvemos um novo modelo mental a partir da cultura, know-how, valores e indústria de cada profissional. A transformação começa por dentro — depois as ferramentas fazem sentido.',
  },
  {
    Icon: Target,
    title: 'Diagnóstico Profundo Antes de Qualquer Proposta',
    desc: 'Nada começa sem diagnóstico real. Mapeamos contexto, cultura, gaps, valores e prioridades estratégicas de cada cliente antes de propor qualquer programa. Personalização total não é slogan — é o único jeito de fazer funcionar.',
  },
  {
    Icon: BarChart3,
    title: 'Especialistas LATAM que Constroem com IA, Diariamente',
    desc: 'Nossa equipe não fala sobre IA — a constrói. Líderes de empresas de IA, desenvolvedores de plataformas proprietárias, professores de universidades de topo, formadores da próxima geração AI First.',
  },
  {
    Icon: Lightbulb,
    title: 'Para Visionários que Já Decidiram se Transformar',
    desc: 'Não tentamos convencer ninguém sobre a revolução da IA. Trabalhamos com executivos e organizações que já tomaram a decisão e buscam o parceiro certo para percorrer esta jornada com profundidade e resultado.',
  },
];

const TEAM_VALUES = [
  { icon: Brain, title: 'Mentalidade antes de Método', desc: 'Transformar como se pensa sobre IA é a base de tudo. O método vem depois — personalizado para cada realidade.' },
  { icon: Users, title: 'Especialistas com Pele no Jogo', desc: 'Nossa equipe lidera empresas de IA, não apenas ensina sobre elas. Conhecemos os erros, os atalhos e os resultados reais.' },
  { icon: Rocket, title: 'Personalização Total', desc: 'Módulos proprietários, recriados para cada contexto. Não existe programa genérico na Recognise — por princípio e por resultado.' },
  { icon: CheckCircle, title: 'Resultado Mensurável', desc: 'KPIs definidos antes de começar. Cada etapa é revisada e ajustada. A Recognise é comprometida com o depois, não apenas com o durante.' },
];

export default function SobrePage() {
  return (
    <Layout>
      {/* ── HERO — Recognise: Sobre Nós ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ background: '#001123' }}>
        {/* Gradiente de fundo */}
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(120deg, #001123 45%, #0a1e38 100%)' }} />
        {/* Luz copper */}
        <div className="absolute right-0 top-0 w-2/3 h-full z-0 pointer-events-none hidden lg:block"
          style={{ background: 'radial-gradient(ellipse at 90% 50%, rgba(122,98,7,0.18) 0%, transparent 60%)' }} />

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 min-h-[85vh]">
          {/* ── Copy (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-32 lg:py-40">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
              style={{ color: '#7a6207', background: 'rgba(122,98,7,0.12)', border: '1px solid rgba(122,98,7,0.25)' }}>
              Especialistas LATAM em IA Aplicada
            </span>
            <h1 className="text-white mb-5" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem,3.5vw,3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Uma nova era de<br /><span style={{ color: '#7a6207' }}>liderança em IA</span><br />começa aqui.
            </h1>
            <p className="text-white/70 leading-relaxed mb-4 max-w-md" style={{ fontWeight: 300, fontSize: '1.05rem' }}>
              A <strong className="text-white/90">Recognise</strong> é uma empresa especializada em desenvolvimento de capacidades baseadas em IA para profissionais e corporações — nascida de dentro de uma empresa de implementação de IA. Não ensinamos ferramentas. Desenvolvemos um novo modelo mental.
            </p>
            <p className="text-white/55 leading-relaxed mb-8 max-w-md" style={{ fontWeight: 300, fontSize: '0.95rem' }}>
              Nossa equipe é formada por talentos reconhecidos no mercado LATAM de IA Aplicada — executivos que construíram padrões de implementação de IA no Brasil, líderes de suas próprias empresas de IA, professores de universidades de topo e formadores da próxima <strong className="text-white/75 font-medium"><GeracaoAiFirstTm /></strong>.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full px-6 py-3 h-auto font-semibold text-sm"
                  style={{ background: '#7a6207', color: 'white' }}>
                  <MessageCircle size={15} className="mr-2" /> Falar com Especialista
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/wellingtonqueiroz/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full px-6 py-3 h-auto text-sm"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', background: 'transparent' }}>
                  <FaLinkedinIn size={14} className="mr-2" /> LinkedIn Tom Queiroz
                </Button>
              </a>
            </div>
            {/* Stats rápidos */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[{ v: '500+', l: 'Executivos formados' }, { v: 'LATAM', l: 'Talentos reconhecidos' }, { v: '100%', l: 'Personalizado' }].map(s => (
                <div key={s.v} className="text-center border border-white/10 rounded-xl py-2 px-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="text-accent font-black text-lg leading-none">{s.v}</div>
                  <div className="text-white/40 text-[10px] mt-1" style={{ fontWeight: 300 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Foto (7 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-7 relative hidden lg:block">
            <img
              src={IMAGES.TOM_PROFILE_ALT}
              alt="Tom Queiroz — Head de Conteúdo e Mentor Sênior Recognise"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #001123 0%, rgba(0,17,35,0.35) 35%, transparent 65%)' }} />
            <div className="absolute bottom-10 right-8 rounded-2xl px-5 py-4 shadow-2xl text-center z-10"
              style={{ background: 'rgba(122,98,7,0.92)', backdropFilter: 'blur(8px)', color: 'white' }}>
              <div className="text-3xl font-black leading-none">AI First</div>
              <div className="text-[11px] font-light mt-1 leading-tight opacity-90">Metodologia<br />Proprietária Recognise</div>
            </div>
          </motion.div>

          {/* Foto mobile */}
          <div className="lg:hidden relative w-full" style={{ height: 340 }}>
            <img
              src={IMAGES.TOM_PROFILE_ALT}
              alt="Tom Queiroz"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #001123 0%, transparent 30%, transparent 70%, #001123 100%)' }} />
          </div>
        </div>
      </section>

      {/* ── O QUE É A RECOGNISE ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="site-container">
          {/* Logo parallax no topo da seção */}
          <div className="flex justify-center mb-10">
            <motion.img
              src={IMAGES.LOGO_RECOGNISE_COLOR}
              alt="Recognise"
              className="h-16 md:h-24 w-auto object-contain"
              style={{ opacity: 0.3 }}
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ color: '#7a6207', background: 'rgba(122,98,7,0.1)' }}>Nossa Origem</span>
              <h2 className="text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
                Uma Vertical de Implementação<br />de IA, Voltada para Pessoas.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
                <p>A Recognise nasceu de dentro. Somos uma vertical especializada em <strong className="text-primary">desenvolvimento de capacidades baseadas em IA</strong> para profissionais e corporações — criada por uma empresa que já implementa IA aplicada aos negócios há anos no Brasil e na América Latina.</p>
                <p>Essa origem não é por acaso. Ela define tudo o que somos: <strong className="text-primary">não falamos sobre IA como observadores</strong> — a construímos, testamos, erramos e entregamos resultado com ela. Diariamente. Em empresas reais, com pressão de mercado real.</p>
                <p>A <strong className="text-primary">Recognise</strong> existe porque percebemos que a lacuna que faz 95% dos projetos de IA falharem não é tecnológica. É humana. É cultural. É de liderança. E decidimos fazer algo a respeito.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
              <div className="grid grid-cols-2 gap-4">
                {TEAM_VALUES.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <motion.div key={v.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="p-5 rounded-2xl border border-border/40 bg-muted/20 hover:bg-muted/40 transition-colors">
                      <Icon size={20} style={{ color: '#7a6207', marginBottom: 10 }} />
                      <div className="font-bold text-primary text-sm mb-2">{v.title}</div>
                      <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontWeight: 300 }}>{v.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FILOSOFIA DA RECOGNISE ── */}
      <section className="py-20 md:py-28" style={{ background: '#f4f5f7' }}>
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7a6207' }}>Nossa Filosofia</p>
            <h2 className="text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
              A revolução da IA já está em curso.<br />Apenas quem se move agora vai liderar.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
              Não estamos aqui para convencer ninguém sobre a necessidade de se transformar. Trabalhamos com visionários que já tomaram esta decisão — e buscam o parceiro certo para percorrer esta jornada com profundidade e resultado.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PHILOSOPHY.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl border border-border/40 bg-background hover:border-accent/30 transition-colors">
                <p.Icon size={20} style={{ color: '#7a6207', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="font-bold text-primary text-sm mb-2">{p.title}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontWeight: 300 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERFIL TOM QUEIROZ — Head de Conteúdo ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7a6207' }}>Quem Lidera Nosso Conteúdo</p>
            <h2 className="text-primary" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>Tom Queiroz</h2>
            <p className="text-muted-foreground mt-2 text-sm">CEO & CAIO Pareto · Prof. Me. FGV EAESP · Pioneiro em IA Generativa no Brasil</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="lg:col-span-1">
                <div className="rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '3/4' }}>
                  <img src={IMAGES.TOM_PROFILE_ALT} alt="Tom Queiroz" className="w-full h-full object-cover object-top" />
                </div>
                <div className="mt-4 text-center space-y-2">
                  <a href="https://www.linkedin.com/in/wellingtonqueiroz/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors" style={{ color: '#7a6207' }}>
                    <FaLinkedinIn size={16} /> Conectar no LinkedIn
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
                className="lg:col-span-2 flex flex-col justify-center">
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base" style={{ fontWeight: 300 }}>
                  <p>Wellington Queiroz — mais conhecido como <strong className="text-primary font-semibold">Tom Queiroz</strong> — é o head de conteúdo e mentor sênior da Recognise. Com mais de 25 anos de trajetória executiva em corporações globais como <strong className="text-primary">Sony, Honda, Rakuten e Shell</strong>, Tom sabe exatamente o que é entregar resultado sob pressão — em mercados altamente competitivos, com times reais e responsabilidade de P&L.</p>
                  <p>Pioneiro em IA Generativa no Brasil, Tom trabalhou com <strong className="text-primary">IBM Watson desde 2021</strong> — dois anos antes do boom global. Hoje é <strong className="text-primary">CEO e CAIO da <a href="https://pareto.io" target="_blank" rel="noopener noreferrer" className="underline decoration-accent/50 hover:decoration-accent transition-colors">Pareto</a></strong>, startup brasileira referência em IA Generativa com operações no Brasil e no Vale do Silício, e criador da plataforma proprietária <strong className="text-primary"><a href="https://tess.im" target="_blank" rel="noopener noreferrer" className="underline decoration-accent/50 hover:decoration-accent transition-colors">TESS AI</a></strong>.</p>
                  <p>Professor Me. na <strong className="text-primary">FGV EAESP</strong> em IA Generativa Aplicada aos Negócios, Tom reserva um tempo especial para atuar como <strong className="text-primary">mentor e conselheiro</strong> na Recognise — acreditando no potencial transformador da troca de experiências entre quem já construiu e quem está construindo.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8 mb-6">
                  {[
                    { Icon: GraduationCap, label: 'FGV EAESP', sub: 'Prof. Me. IA Generativa' },
                    { Icon: Globe, label: '8 Países', sub: 'Alcance de Mentoria' },
                    { Icon: Zap, label: 'TESS AI', sub: 'Plataforma Proprietária' },
                    { Icon: TrendingUp, label: 'ROI 10x', sub: 'Média em Projetos Reais' },
                  ].map((c) => (
                    <div key={c.label} className="flex items-start gap-3 bg-muted/40 rounded-xl p-3">
                      <c.Icon size={18} style={{ color: '#7a6207', flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <div className="text-primary font-bold text-sm">{c.label}</div>
                        <div className="text-muted-foreground text-xs">{c.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 py-3 h-auto font-semibold text-sm">
                      <MessageCircle className="mr-2" size={15} /> Falar com Especialista
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/wellingtonqueiroz/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-primary/20 hover:border-accent hover:text-accent text-primary rounded-full px-5 py-3 text-sm font-medium transition-colors">
                    <FaLinkedinIn size={15} /> Conectar no LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAJETÓRIA — Timeline ── */}
      <section className="py-20 md:py-28" style={{ background: '#f4f5f7' }}>
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7a6207' }}>Trajetória</p>
            <h2 className="text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>Duas Décadas de Execução Real</h2>
            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontWeight: 300 }}>
              Uma carreira construída em multinacionais de excelência, com responsabilidade real de P&L, times internacionais e inovação como norte.
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #7a6207, rgba(122,98,7,0.1))' }} />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <motion.div key={`${item.year}-${i}`} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`relative flex gap-6 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row pl-14 md:pl-0`}>
                  <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 -translate-x-1/2"
                    style={{ background: '#f4f5f7', borderColor: '#7a6207' }} />

                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="inline-flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                        style={{ background: 'rgba(122,98,7,0.12)', color: '#7a6207' }}>{item.year}</span>
                    </div>
                    <div className="font-semibold text-primary text-sm">{item.role}</div>
                    <div className="text-xs font-medium mb-1" style={{ color: '#7a6207' }}>{item.company}</div>
                    <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENCIAIS ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7a6207' }}>Credenciais & Resultados</p>
            <h2 className="text-primary" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>Autoridade construída na prática</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CREDENTIALS.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-muted/20 rounded-2xl p-6 border border-border/40 hover:border-accent/40 transition-colors">
                <c.Icon size={22} style={{ color: '#7a6207', marginBottom: 12 }} />
                <div className="font-bold text-primary text-sm mb-2">{c.title}</div>
                <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontWeight: 300 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE — Recognise ── */}
      <section className="py-20" style={{ background: '#001123' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-white/90 italic leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 300 }}>
            "A revolução da IA não espera. Ela está em curso agora. Apenas aqueles que escolhem se mover com propósito, com o modelo mental certo e com especialistas ao lado, permanecem relevantes — e lideram."
          </motion.blockquote>
          <p className="text-accent text-sm font-semibold mt-6">— Recognise · Especialistas LATAM em IA Aplicada</p>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Award size={32} style={{ color: '#7a6207', margin: '0 auto 16px' }} />
            <h2 className="text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
              Você já tomou a decisão de se transformar?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto" style={{ fontWeight: 300 }}>
              Se sim, a Recognise é o seu parceiro para esta jornada. Não começamos com um programa — começamos com escuta. Com um diagnóstico profundo da sua realidade. Com a convicção de que a transformação certa parte de dentro.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full px-8 py-4 h-auto font-bold text-base"
                  style={{ background: '#7a6207', color: 'white' }}>
                  <MessageCircle size={16} className="mr-2" /> Iniciar Diagnóstico Gratuito
                </Button>
              </a>
              <Link to={LMS_ROUTES.PROGRAMAS} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button variant="outline" className="rounded-full px-8 py-4 h-auto font-semibold text-base border-primary/20 hover:border-accent hover:text-accent transition-colors">
                  Ver Programas <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
