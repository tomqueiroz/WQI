import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';

const WA_LINK = 'https://wa.me/5511915513210?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20W-Qi.';

const TIMELINE = [
  { year: '2004', role: 'Marketing Manager', company: 'Sony Electronics', desc: 'Liderou lançamentos de produto no mercado brasileiro, com campanhas multicanal de alto impacto.' },
  { year: '2008', role: 'Head of Marketing', company: 'Honda Automóveis', desc: 'Estratégia de marca e campanhas digitais para reposicionamento em mercado premium.' },
  { year: '2013', role: 'Director of Digital', company: 'Rakuten Brasil', desc: 'Implantação do e-commerce data-driven e growth hacking com equipes internacionais.' },
  { year: '2017', role: 'Chief Marketing Officer', company: 'Shell Brasil', desc: 'P&L de marketing de R$ 400M+, transformação digital e integração de IA nas operações.' },
  { year: '2021', role: 'Chief AI & Innovation Officer', company: 'W-Qi Development', desc: 'Fundação da consultoria de mentoria executiva e metodologia AI-First Framework™.' },
  { year: '2023', role: 'Professor Convidado', company: 'FGV EAESP', desc: 'MBA e Executive Education em Marketing Digital, IA Generativa e Estratégia de Negócios.' },
];

const CREDENTIALS = [
  { Icon: GraduationCap, title: 'FGV EAESP', desc: 'Professor convidado em MBA e Executive Education, temas de Marketing Digital e IA.' },
  { Icon: Globe, title: '8 Países', desc: 'Mentoria ativa com executivos do Brasil, EUA, Portugal, Espanha, México, Colômbia, Argentina e Alemanha.' },
  { Icon: Zap, title: 'AI-First Framework™', desc: 'Metodologia proprietária baseada em 500+ casos reais de transformação digital com IA.' },
  { Icon: TrendingUp, title: 'ROI Médio 10x', desc: 'Resultado médio documentado em projetos de marketing com IA generativa nos últimos 3 anos.' },
  { Icon: BookOpen, title: '20 Anos', desc: 'Duas décadas de execução em marketing corporativo nos mais exigentes mercados globais.' },
  { Icon: Users, title: '500+ Executivos', desc: 'Líderes de C-Suite, VPs e diretores mentoreados em programas individuais e cohorts.' },
];

const PHILOSOPHY = [
  {
    Icon: Target,
    title: 'Resultado antes da teoria',
    desc: 'Cada sessão começa com o diagnóstico do problema real — não com frameworks genéricos. O ponto de partida é sempre o seu contexto, seu setor, sua equipe.',
  },
  {
    Icon: BarChart3,
    title: 'KPIs antes do primeiro encontro',
    desc: 'Nenhum programa começa sem métricas definidas. Medir o antes e o depois não é opcional — é o contrato tácito de toda mentoria séria.',
  },
  {
    Icon: Briefcase,
    title: 'Execução, não inspiração',
    desc: 'Palestras motivacionais são baratas. O que transforma carreiras é ter ao lado alguém que já executou — e que sabe exatamente onde você vai travar.',
  },
  {
    Icon: Lightbulb,
    title: 'IA como alavanca, não como moda',
    desc: 'Tom foi early adopter de IA em contexto corporativo real. Hoje, entrega o caminho mais curto entre onde você está e o uso estratégico da tecnologia.',
  },
];

const PRESS = [
  { pub: 'Valor Econômico', quote: '"Tom Queiroz é um dos maiores especialistas em marketing digital e IA do Brasil."' },
  { pub: 'Exame', quote: '"Tom Queiroz conecta a visão executiva com a praticidade da IA generativa de forma única."' },
  { pub: 'MIT Technology Review BR', quote: '"Referência em implementação de IA aplicada a negócios no mercado latino-americano."' },
];

export default function SobrePage() {
  return (
    <Layout>
      {/* ── HERO PRÓPRIA — layout 2 colunas: copy esq (5 cols) + foto dir (7 cols) ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden" style={{ background: '#001123' }}>
        {/* Gradiente de fundo sutil */}
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(120deg, #001123 45%, #0a1e38 100%)' }} />
        {/* Luz copper decorativa no canto direito */}
        <div className="absolute right-0 top-0 w-2/3 h-full z-0 pointer-events-none hidden lg:block"
          style={{ background: 'radial-gradient(ellipse at 90% 50%, rgba(122,98,7,0.18) 0%, transparent 60%)' }} />

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">

          {/* ── COLUNA ESQ — Copy (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-32 lg:py-40">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
              style={{ color: '#7a6207', background: 'rgba(122,98,7,0.12)', border: '1px solid rgba(122,98,7,0.25)' }}>
              Sobre o Mentor
            </span>
            <h1 className="text-white mb-5" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Conheça<br /><span style={{ color: '#7a6207' }}>Tom Queiroz</span>
            </h1>
            <p className="text-white/70 leading-relaxed mb-3 max-w-md" style={{ fontWeight: 300, fontSize: '1.05rem' }}>
              Mundialmente conhecido como <strong className="text-white/90 font-semibold">Tom Queiroz</strong>, ele é Chief AI &amp; Innovation Officer,
              ex-diretor em corporações globais de primeira linha e Professor da FGV EAESP.
            </p>
            <p className="text-white/55 leading-relaxed mb-8 max-w-md" style={{ fontWeight: 300, fontSize: '0.95rem' }}>
              Com 20 anos de execução real no marketing corporativo — de Sony a Shell, em 8 países —,
              Tom decidiu dedicar sua expertise a acelerar carreiras e negócios de outros líderes.
              Ele não ensina o que leu. Ensina o que viveu.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full px-6 py-3 h-auto font-semibold text-sm"
                  style={{ background: '#7a6207', color: 'white' }}>
                  <MessageCircle size={15} className="mr-2" /> Conversar com Tom
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/wellingtonqueiroz/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full px-6 py-3 h-auto text-sm"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', background: 'transparent' }}>
                  <FaLinkedinIn size={14} className="mr-2" /> LinkedIn
                </Button>
              </a>
            </div>
            {/* Stats rápidos */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[{ v: '500+', l: 'Executivos' }, { v: '20 anos', l: 'Experiência' }, { v: '8 países', l: 'Alcance global' }].map(s => (
                <div key={s.v} className="text-center border border-white/10 rounded-xl py-2 px-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="text-accent font-black text-lg leading-none">{s.v}</div>
                  <div className="text-white/40 text-[10px] mt-1" style={{ fontWeight: 300 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── COLUNA DIR — Foto (7 cols), ocupa toda a altura ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-7 relative hidden lg:block">
            {/* Imagem preenche 100% da altura da hero */}
            <img
              src={IMAGES.TOM_PROFILE_ALT}
              alt="Tom Queiroz — Mentor Executivo"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Gradiente à esquerda para fundir com o fundo navy */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #001123 0%, rgba(0,17,35,0.35) 35%, transparent 65%)' }} />
            {/* Badge flutuante copper */}
            <div className="absolute bottom-10 right-8 rounded-2xl px-5 py-4 shadow-2xl text-center z-10"
              style={{ background: 'rgba(122,98,7,0.92)', backdropFilter: 'blur(8px)', color: 'white' }}>
              <div className="text-3xl font-black leading-none">20+</div>
              <div className="text-[11px] font-light mt-1 leading-tight opacity-90">Anos de<br />execução global</div>
            </div>
          </motion.div>

          {/* Foto para mobile (col única) */}
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

      {/* ── TRAJETÓRIA — Timeline ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7a6207' }}>Trajetória</p>
            <h2 className="text-primary mb-4">Duas décadas de C-Suite</h2>
            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontWeight: 300 }}>
              Uma carreira construída em multinacionais de excelência, com responsabilidade real de P&amp;L e times internacionais.
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Linha vertical */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #7a6207, rgba(122,98,7,0.1))' }} />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <motion.div key={item.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex gap-6 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row pl-14 md:pl-0`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 -translate-x-1/2"
                    style={{ background: '#001123', borderColor: '#7a6207' }} />

                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="inline-flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                        style={{ background: 'rgba(122,98,7,0.12)', color: '#7a6207' }}>{item.year}</span>
                    </div>
                    <div className="font-semibold text-primary text-sm">{item.role}</div>
                    <div className="text-xs font-medium mb-1" style={{ color: '#7a6207' }}>{item.company}</div>
                    <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                  </div>

                  {/* Spacer para a outra coluna */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENCIAIS — 6 cards ── */}
      <section className="py-20 md:py-28" style={{ background: '#f4f5f7' }}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7a6207' }}>Credenciais</p>
            <h2 className="text-primary">Autoridade construída na prática</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREDENTIALS.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background rounded-2xl p-6 shadow-sm border border-border/40 hover:border-accent/40 transition-colors">
                <c.Icon size={22} style={{ color: '#7a6207', marginBottom: 12 }} />
                <div className="font-bold text-primary text-sm mb-1">{c.title}</div>
                <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontWeight: 300 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILOSOFIA DE MENTORIA ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7a6207' }}>Filosofia</p>
            <h2 className="text-primary mb-4">Como Tom Queiroz Pensa sobre Mentoria</h2>
            <p className="text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
              Mentoria não é coaching motivacional. É a transferência direta de modelos mentais testados em situações reais
              de alta pressão — adaptados ao seu contexto, com métricas claras de antes e depois.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {PHILOSOPHY.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl border border-border/40 bg-muted/20 hover:bg-muted/40 transition-colors">
                <p.Icon size={20} style={{ color: '#7a6207', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="font-bold text-primary text-sm mb-1">{p.title}</div>
                  <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontWeight: 300 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENCIONADO NA IMPRENSA ── */}
      <section className="py-16 md:py-20" style={{ background: '#001123' }}>
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-10" style={{ color: 'rgba(122,98,7,0.8)' }}>
            Mencionado na imprensa
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRESS.map((p, i) => (
              <motion.div key={p.pub} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7a6207' }}>{p.pub}</div>
                <p className="text-white/70 italic text-sm leading-relaxed" style={{ fontWeight: 300 }}>{p.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Award size={32} style={{ color: '#7a6207', margin: '0 auto 16px' }} />
            <h2 className="text-primary mb-4">Pronto para uma Mentoria de Alto Nível?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
              Tom trabalha com um número limitado de mentorandos por ciclo. Cada programa começa com um diagnóstico gratuito —
              sem compromisso, com profundidade real. O próximo passo é uma conversa honesta sobre onde você quer chegar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full px-8 py-3 h-auto font-semibold"
                  style={{ background: '#7a6207', color: 'white' }}>
                  <FaWhatsapp size={15} className="mr-2" /> Solicitar Diagnóstico Gratuito
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/wellingtonqueiroz/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full px-8 py-3 h-auto text-sm border-primary/20 hover:border-accent hover:text-accent">
                  <FaLinkedinIn size={14} className="mr-2" /> Conectar no LinkedIn
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
