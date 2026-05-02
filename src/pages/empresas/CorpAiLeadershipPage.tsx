import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Users, Brain, TrendingUp, Shield, Award, Clock, Target, ChevronDown, MessageCircle, BarChart3, Layers, Star } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { supabase } from '@/integrations/supabase/client';
import { LMS_ROUTES } from '@/lib/index';

const TABS = [
  { id: 'para-quem', label: 'Para Quem É' },
  { id: 'metodologia', label: 'Metodologia' },
  { id: 'modulos', label: 'Módulos' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'inscricao', label: 'Inscrição' },
];

const MODULOS = [
  { num: '01', titulo: 'AI First Mindset para Líderes', duracao: '4h', desc: 'O que muda no papel da liderança quando IA passa a ser fator estratégico competitivo. Casos reais e reframing executivo.' },
  { num: '02', titulo: 'Mapeamento de Oportunidades AI', duracao: '4h', desc: 'Como identificar onde IA gera mais valor na operação, quais iniciativas priorizar e como montar o roadmap de adoção.' },
  { num: '03', titulo: 'Gestão de Times na Era AI', duracao: '4h', desc: 'Liderança de equipes híbridas (humano + IA), cultura de inovação, reskilling e retenção de talentos em transição.' },
  { num: '04', titulo: 'Tomada de Decisão Aumentada por IA', duracao: '4h', desc: 'Frameworks de decisão com suporte de dados e IA. Como calibrar o julgamento humano com insights gerados por máquina.' },
  { num: '05', titulo: 'Ética, Risco e Governança AI', duracao: '3h', desc: 'Responsabilidade de líderes frente a dilemas de viés, privacidade, regulação e gestão de risco em iniciativas de IA.' },
  { num: '06', titulo: 'Plano AI First — Implementação Prática', duracao: '5h', desc: 'Cada líder sai com seu plano 90 dias de implementação. Sessão de co-criação facilitada com mentoria ao vivo.' },
];

export default function CorpAiLeadershipPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('para-quem');
  const [form, setForm] = useState({ nome_completo: '', instituicao: '', cargo: '', email: '', whatsapp: '', tamanho_empresa: 'none', setor: '', desafio: '', mensagem: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsSticky, setTabsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setTabsSticky(!entry.isIntersecting), { threshold: 0 });
    const sentinel = document.getElementById('tabs-sentinel');
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const scrollToTab = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('corp_ai_leadership_leads_2026_05_02' as never).insert({
        nome_completo: form.nome_completo,
        instituicao: form.instituicao,
        cargo: form.cargo,
        email: form.email,
        whatsapp: form.whatsapp,
        tamanho_empresa: form.tamanho_empresa === 'none' ? null : form.tamanho_empresa,
        setor: form.setor,
        desafio: form.desafio,
        mensagem: form.mensagem,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden" style={{ background: '#001123' }}>
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.CORP_AI_TRAIN_2} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #001123 60%, rgba(0,17,35,0.5))' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-28 md:py-36">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(122,98,7,0.2)', color: '#c9a227', border: '1px solid rgba(122,98,7,0.4)' }}>
                GERAÇÃO AI FIRST™ · PROGRAMA CORPORATIVO
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Liderança AI First™<br />
                <span style={{ color: '#c9a227' }}>Corporativa</span>
              </h1>
              <p className="text-lg md:text-xl text-white/75 mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
                Prepare seus líderes para compreender, estrategizar e implementar IA como vantagem competitiva — não como buzzword. Um programa executivo intensivo que transforma a mentalidade e a capacidade de decisão de toda a liderança.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => scrollToTab('inscricao')} className="text-white px-8 py-3 text-base rounded-xl" style={{ background: '#7a6207' }}>
                  Solicitar Proposta Corporativa
                </Button>
                <a href="https://wa.me/5511915513210" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="px-8 py-3 text-base rounded-xl border-white/30 text-white hover:bg-white/10">
                    <MessageCircle className="w-4 h-4 mr-2" /> Falar com especialista
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                {[{ val: '24h', label: 'Carga horária' }, { val: '6', label: 'Módulos práticos' }, { val: '100%', label: 'Customizável' }, { val: 'B2B', label: 'Exclusivo empresas' }].map(s => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold" style={{ color: '#c9a227', fontFamily: 'Montserrat, sans-serif' }}>{s.val}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TABS SENTINEL */}
      <div id="tabs-sentinel" />

      {/* TABS NAV */}
      <div ref={tabsRef} className={`z-40 transition-all duration-300 ${tabsSticky ? 'sticky top-0 shadow-md' : ''}`} style={{ background: '#001123', borderBottom: '1px solid rgba(122,98,7,0.25)' }}>
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-0 no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => scrollToTab(tab.id)}
              className="flex-shrink-0 px-5 py-4 text-sm font-medium transition-all border-b-2"
              style={{ fontWeight: activeTab === tab.id ? 600 : 300, color: activeTab === tab.id ? '#c9a227' : 'rgba(255,255,255,0.6)', borderColor: activeTab === tab.id ? '#c9a227' : 'transparent', letterSpacing: '0.04em' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* PARA QUEM */}
      <section id="para-quem" className="py-20" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Para Quem é Este Programa</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>Desenhado para organizações que reconhecem que a IA mudou as regras — e querem liderar, não reagir.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'C-Level & Alta Liderança', desc: 'CEOs, CFOs, COOs, CMOs que precisam integrar IA às decisões estratégicas de forma embasada e segura.' },
              { icon: Target, title: 'Diretores e Gerentes Sênior', desc: 'Líderes de área que precisam entender como IA impacta seus departamentos e como liderar times em transição.' },
              { icon: Brain, title: 'Times de Inovação e Transformação', desc: 'Squads e comitês responsáveis por iniciativas de transformação digital que precisam de base sólida em IA aplicada.' },
              { icon: BarChart3, title: 'Empresas de 200+ Colaboradores', desc: 'Organizações com massa crítica suficiente para implementar IA em escala e colher resultados sistêmicos.' },
              { icon: Layers, title: 'Setores de Alto Impacto', desc: 'Finanças, varejo, saúde, indústria, logística, serviços — onde IA já está transformando operações e relações.' },
              { icon: TrendingUp, title: 'Líderes em Aceleração', desc: 'Profissionais que identificaram que IA é o próximo diferencial competitivo e querem chegar lá antes da concorrência.' },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(122,98,7,0.08)' }}>
                  <Icon className="w-6 h-6" style={{ color: '#7a6207' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#001123' }}>{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section id="metodologia" className="py-20" style={{ background: '#001123' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4" style={{ background: 'rgba(122,98,7,0.15)', color: '#c9a227' }}>Metodologia Exclusiva</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>AI First Executive Framework™</h2>
              <p className="text-white/70 mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
                Desenvolvida por Tom Queiroz com base em sua experiência como CEO e CAIO na Pareto — plataforma de IA Generativa com presença no Vale do Silício e operações no Brasil — e em mais de 500 projetos de mentoria com executivos de empresas globais.
              </p>
              <div className="space-y-4">
                {[
                  'Pré-diagnóstico individual por líder (antes do programa)',
                  'Sessões de imersão presenciais ou híbridas customizadas',
                  'Casos de uso reais mapeados do setor da sua empresa',
                  'Workshop hands-on de implementação com IA real',
                  'Plano 90 dias individual por participante',
                  'Sessão de follow-up 60 dias após o programa',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c9a227' }} />
                    <span className="text-white/80 text-sm" style={{ fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src={IMAGES.CORP_AI_TRAIN_3} alt="Metodologia AI First" className="rounded-2xl w-full object-cover" style={{ height: '420px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos" className="py-20" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Conteúdo Programático</h2>
            <p className="text-gray-600 max-w-xl mx-auto" style={{ fontWeight: 300 }}>6 módulos progressivos, do mindset à implementação prática. Carga horária total: 24h.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULOS.map((mod) => (
              <motion.div key={mod.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-black" style={{ color: 'rgba(122,98,7,0.15)', fontFamily: 'Montserrat, sans-serif' }}>{mod.num}</span>
                  <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'rgba(122,98,7,0.08)', color: '#7a6207' }}>
                    <Clock className="w-3 h-3" />{mod.duracao}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#001123' }}>{mod.titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontWeight: 300 }}>{mod.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section id="resultados" className="py-20" style={{ background: '#7a6207' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>O Que Sua Empresa Ganha</h2>
            <p className="text-white/80 max-w-xl mx-auto" style={{ fontWeight: 300 }}>Resultados concretos que nossos parceiros corporativos reportam após o programa.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: '87%', label: 'dos líderes reportam maior clareza estratégica sobre IA', icon: Brain },
              { val: '3x', label: 'mais iniciativas de IA avançam do MVP para produção', icon: TrendingUp },
              { val: '60%', label: 'redução de resistência interna à adoção de IA', icon: Shield },
              { val: '100%', label: 'dos times desenvolvem plano de ação concreto e executável', icon: Award },
            ].map(({ val, label, icon: Icon }) => (
              <div key={val} className="text-center p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <Icon className="w-8 h-8 mx-auto mb-3 text-white/80" />
                <div className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{val}</div>
                <p className="text-sm text-white/80 leading-relaxed" style={{ fontWeight: 300 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="inscricao" className="py-20" style={{ background: '#f8f9fa' }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Solicitar Proposta Corporativa</h2>
            <p className="text-gray-600" style={{ fontWeight: 300 }}>Preencha o formulário e nossa equipe entrará em contato em até 24h com uma proposta personalizada.</p>
          </div>
          {success ? (
            <div className="text-center py-12 rounded-2xl" style={{ background: 'rgba(122,98,7,0.08)' }}>
              <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#7a6207' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: '#001123' }}>Proposta solicitada com sucesso!</h3>
              <p className="text-gray-600" style={{ fontWeight: 300 }}>Nossa equipe entrará em contato em até 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Nome Completo *</Label>
                  <Input value={form.nome_completo} onChange={e => setForm({ ...form, nome_completo: e.target.value })} required placeholder="Seu nome completo" className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Instituição / Empresa *</Label>
                  <Input value={form.instituicao} onChange={e => setForm({ ...form, instituicao: e.target.value })} required placeholder="Nome da empresa" className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Cargo *</Label>
                  <Input value={form.cargo} onChange={e => setForm({ ...form, cargo: e.target.value })} required placeholder="CEO, Diretor, VP..." className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">E-mail Corporativo *</Label>
                  <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="seu@empresa.com" className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">WhatsApp *</Label>
                  <Input value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} required placeholder="+55 11 9..." className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Porte da Empresa</Label>
                  <Select value={form.tamanho_empresa} onValueChange={v => setForm({ ...form, tamanho_empresa: v })}>
                    <SelectTrigger className="rounded-xl"><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Selecione</SelectItem>
                      <SelectItem value="200-500">200 a 500 colaboradores</SelectItem>
                      <SelectItem value="500-2000">500 a 2.000 colaboradores</SelectItem>
                      <SelectItem value="2000+">Acima de 2.000 colaboradores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Setor de Atuação</Label>
                <Input value={form.setor} onChange={e => setForm({ ...form, setor: e.target.value })} placeholder="Ex: Financeiro, Varejo, Saúde..." className="rounded-xl" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Principal Desafio com IA</Label>
                <Textarea value={form.desafio} onChange={e => setForm({ ...form, desafio: e.target.value })} placeholder="Descreva brevemente o maior desafio ou objetivo da sua organização com IA..." rows={3} className="rounded-xl" />
              </div>
              <Button type="submit" disabled={loading} className="w-full py-3 text-base rounded-xl text-white" style={{ background: '#7a6207' }}>
                {loading ? 'Enviando...' : 'Solicitar Proposta Corporativa'}
              </Button>
              <p className="text-center text-xs text-gray-400">Seus dados estão seguros. Não compartilhamos informações com terceiros.</p>
            </form>
          )}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-14" style={{ background: '#001123' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Pronto para formar a <span style={{ color: '#c9a227' }}>Geração AI First™</span> na sua empresa?
          </h2>
          <p className="text-white/70 mb-8" style={{ fontWeight: 300 }}>Fale diretamente com nossos especialistas e receba uma proposta customizada para a sua realidade.</p>
          <a href="https://wa.me/5511915513210" target="_blank" rel="noopener noreferrer">
            <Button className="px-10 py-3 text-base rounded-xl text-white" style={{ background: '#7a6207' }}>
              <MessageCircle className="w-4 h-4 mr-2" /> Falar com Especialista
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
}
