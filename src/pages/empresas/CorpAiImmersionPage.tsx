import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Zap, Users, Brain, TrendingUp, Clock, MessageCircle, Layers, Target } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { supabase } from '@/integrations/supabase/client';

const TABS = [
  { id: 'para-quem', label: 'Para Quem É' },
  { id: 'metodologia', label: 'Metodologia' },
  { id: 'modulos', label: 'Agenda' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'inscricao', label: 'Inscrição' },
];

const AGENDA = [
  { dia: 'Dia 1 — Manhã', titulo: 'AI First Readiness Assessment', duracao: '3h', desc: 'Diagnóstico ao vivo do estágio de maturidade em IA de cada participante. Identificação de gaps, oportunidades e quick wins individuais.' },
  { dia: 'Dia 1 — Tarde', titulo: 'Casos Reais do Seu Setor', duracao: '3h', desc: 'Destrinchamento de cases de sucesso e fracasso de IA no setor da empresa participante. O que funcionou, por quê e como replicar.' },
  { dia: 'Dia 2 — Manhã', titulo: 'Workshop: IA Generativa na Prática', duracao: '4h', desc: 'Hands-on com as principais ferramentas de IA generativa (GPT, Claude, Gemini, TESS AI) aplicadas à realidade do negócio dos participantes.' },
  { dia: 'Dia 2 — Tarde', titulo: 'Construção do Plano de Ação', duracao: '3h', desc: 'Cada participante sai com seu roadmap AI First personalizado para os próximos 90 dias, revisado e validado por Tom Queiroz.' },
];

export default function CorpAiImmersionPage() {
  const [activeTab, setActiveTab] = useState('para-quem');
  const [form, setForm] = useState({ nome_completo: '', instituicao: '', cargo: '', email: '', whatsapp: '', tamanho_empresa: 'none', setor: '', num_participantes: '', objetivo: '', mensagem: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsSticky, setTabsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setTabsSticky(!entry.isIntersecting), { threshold: 0 });
    const sentinel = document.getElementById('tabs-sentinel-immersion');
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
      const { error } = await supabase.from('corp_ai_immersion_leads_2026_05_02' as never).insert({
        nome_completo: form.nome_completo,
        instituicao: form.instituicao,
        cargo: form.cargo,
        email: form.email,
        whatsapp: form.whatsapp,
        tamanho_empresa: form.tamanho_empresa === 'none' ? null : form.tamanho_empresa,
        setor: form.setor,
        num_participantes: form.num_participantes,
        objetivo: form.objetivo,
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
          <img src={IMAGES.CORP_MENTOR_2} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #001123 55%, rgba(0,17,35,0.4))' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-28 md:py-36">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(122,98,7,0.2)', color: '#c9a227', border: '1px solid rgba(122,98,7,0.4)' }}>
                GERAÇÃO AI FIRST™ · IMERSÃO CORPORATIVA
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Imersão AI First™<br />
                <span style={{ color: '#c9a227' }}>para Times Corporativos</span>
              </h1>
              <p className="text-lg md:text-xl text-white/75 mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
                Uma imersão de 2 dias que transforma a relação do seu time com a IA — do ceticismo à maestria prática. Cases do setor, hands-on com ferramentas reais e plano de ação individual para cada participante.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => scrollToTab('inscricao')} className="text-white px-8 py-3 text-base rounded-xl" style={{ background: '#7a6207' }}>
                  Solicitar Imersão para Minha Empresa
                </Button>
                <a href="https://wa.me/5511915513210" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="px-8 py-3 text-base rounded-xl border-white/30 text-white hover:bg-white/10">
                    <MessageCircle className="w-4 h-4 mr-2" /> Falar com especialista
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                {[{ val: '2 dias', label: 'Formato intensivo' }, { val: '13h', label: 'Conteúdo prático' }, { val: 'In-company', label: 'Na sua empresa' }, { val: '8-30', label: 'Participantes ideal' }].map(s => (
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

      <div id="tabs-sentinel-immersion" />

      {/* TABS */}
      <div ref={tabsRef} className={`z-40 transition-all duration-300 ${tabsSticky ? 'sticky top-0 shadow-md' : ''}`} style={{ background: '#001123', borderBottom: '1px solid rgba(122,98,7,0.25)' }}>
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-0">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => scrollToTab(tab.id)} className="flex-shrink-0 px-5 py-4 text-sm font-medium transition-all border-b-2" style={{ fontWeight: activeTab === tab.id ? 600 : 300, color: activeTab === tab.id ? '#c9a227' : 'rgba(255,255,255,0.6)', borderColor: activeTab === tab.id ? '#c9a227' : 'transparent', letterSpacing: '0.04em' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* PARA QUEM */}
      <section id="para-quem" className="py-20" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Para Quem é a Imersão</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>Ideal para equipes que precisam nivelar o conhecimento e criar uma linguagem comum sobre IA dentro da organização.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Times de Liderança', desc: 'Grupos de diretores e gerentes que precisam alinhar visão e vocabulário sobre IA antes de tomar grandes decisões.' },
              { icon: Zap, title: 'Squads de Inovação', desc: 'Times de produto, data e inovação que querem acelerar sua capacidade de entregar projetos de IA com mais assertividade.' },
              { icon: Target, title: 'Onboarding de Líderes', desc: 'Programas de desenvolvimento de novos líderes que incluem formação em competências digitais e IA aplicada.' },
              { icon: Brain, title: 'Comitês Estratégicos', desc: 'Conselhos, comitês de governança e grupos de tomada de decisão que precisam avaliar iniciativas de IA com propriedade.' },
              { icon: TrendingUp, title: 'Times em Transição', desc: 'Departamentos cuja função está sendo transformada por IA e que precisam reskilling estruturado e acelerado.' },
              { icon: Layers, title: 'Projetos de Kick-off AI', desc: 'Times iniciando projetos piloto de IA que precisam de base sólida antes de comprometer recursos e orçamento.' },
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
              <img src={IMAGES.CORP_AI_TRAIN_4} alt="Imersão Corporativa" className="rounded-2xl w-full object-cover" style={{ height: '420px' }} />
            </div>
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4" style={{ background: 'rgba(122,98,7,0.15)', color: '#c9a227' }}>Nossa Abordagem</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Aprendizado que Transforma, Não Informa</h2>
              <p className="text-white/70 mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
                Nada de slides teóricos desconexos da realidade. A imersão é construída em torno dos desafios reais da sua empresa — com ferramentas que os participantes vão usar de volta ao trabalho na segunda-feira.
              </p>
              <div className="space-y-4">
                {['Pré-briefing com a liderança para customização completa', 'Diagnóstico individual antes da imersão', 'Facilitação por Tom Queiroz e especialistas convidados', 'Dinâmicas práticas com IA generativa ao vivo', 'Plano de ação 90 dias por participante', 'Relatório de maturidade AI do time pós-imersão'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c9a227' }} />
                    <span className="text-white/80 text-sm" style={{ fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section id="modulos" className="py-20" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Agenda da Imersão</h2>
            <p className="text-gray-600 max-w-xl mx-auto" style={{ fontWeight: 300 }}>2 dias transformadores, estruturados para máximo aprendizado e aplicabilidade imediata.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {AGENDA.map((bloco) => (
              <motion.div key={bloco.dia} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#7a6207' }}>{bloco.dia}</span>
                  <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'rgba(122,98,7,0.08)', color: '#7a6207' }}>
                    <Clock className="w-3 h-3" />{bloco.duracao}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#001123' }}>{bloco.titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontWeight: 300 }}>{bloco.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section id="resultados" className="py-20" style={{ background: '#7a6207' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Impacto da Imersão</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: '94%', label: 'dos participantes aplicam o aprendizado nas primeiras 2 semanas' },
              { val: '2x', label: 'mais propostas de projetos de IA geradas nos 30 dias seguintes' },
              { val: '78%', label: 'de redução de medo e ceticismo em relação à IA nos times' },
              { val: '100%', label: 'customizado para a realidade do seu setor e empresa' },
            ].map(({ val, label }) => (
              <div key={val} className="text-center p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.12)' }}>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Solicitar Imersão para Minha Empresa</h2>
            <p className="text-gray-600" style={{ fontWeight: 300 }}>Informe seus dados e receba uma proposta customizada para a realidade do seu time.</p>
          </div>
          {success ? (
            <div className="text-center py-12 rounded-2xl" style={{ background: 'rgba(122,98,7,0.08)' }}>
              <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#7a6207' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: '#001123' }}>Solicitação enviada!</h3>
              <p className="text-gray-600" style={{ fontWeight: 300 }}>Nossa equipe entrará em contato em até 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div><Label className="text-sm font-medium mb-1.5 block">Nome Completo *</Label><Input value={form.nome_completo} onChange={e => setForm({ ...form, nome_completo: e.target.value })} required placeholder="Seu nome completo" className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Empresa *</Label><Input value={form.instituicao} onChange={e => setForm({ ...form, instituicao: e.target.value })} required placeholder="Nome da empresa" className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Cargo *</Label><Input value={form.cargo} onChange={e => setForm({ ...form, cargo: e.target.value })} required placeholder="CEO, Diretor..." className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">E-mail Corporativo *</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="seu@empresa.com" className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">WhatsApp *</Label><Input value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} required placeholder="+55 11 9..." className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Nº Participantes Estimado</Label><Input value={form.num_participantes} onChange={e => setForm({ ...form, num_participantes: e.target.value })} placeholder="Ex: 15" className="rounded-xl" /></div>
              </div>
              <div><Label className="text-sm font-medium mb-1.5 block">Setor da Empresa</Label><Input value={form.setor} onChange={e => setForm({ ...form, setor: e.target.value })} placeholder="Ex: Financeiro, Varejo..." className="rounded-xl" /></div>
              <div><Label className="text-sm font-medium mb-1.5 block">Objetivo Principal com a Imersão</Label><Textarea value={form.objetivo} onChange={e => setForm({ ...form, objetivo: e.target.value })} placeholder="O que você espera que os participantes saiam capazes de fazer?" rows={3} className="rounded-xl" /></div>
              <Button type="submit" disabled={loading} className="w-full py-3 text-base rounded-xl text-white" style={{ background: '#7a6207' }}>
                {loading ? 'Enviando...' : 'Solicitar Imersão Corporativa'}
              </Button>
            </form>
          )}
        </div>
      </section>

      <section className="py-14" style={{ background: '#001123' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Seu time ainda não fala a língua da <span style={{ color: '#c9a227' }}>Geração AI First™</span>?</h2>
          <p className="text-white/70 mb-8" style={{ fontWeight: 300 }}>Dois dias podem mudar isso completamente. Fale com nossos especialistas.</p>
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
