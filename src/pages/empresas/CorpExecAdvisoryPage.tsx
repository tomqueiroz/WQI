import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Compass, BarChart3, Shield, MessageCircle, Target, TrendingUp, Clock, Users } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { supabase } from '@/integrations/supabase/client';

const TABS = [
  { id: 'para-quem', label: 'Para Quem É' },
  { id: 'metodologia', label: 'Metodologia' },
  { id: 'modulos', label: 'Como Funciona' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'inscricao', label: 'Inscrição' },
];

const COMO_FUNCIONA = [
  { num: '01', titulo: 'Diagnóstico Estratégico AI', duracao: '2h', desc: 'Sessão de imersão para mapear o estágio atual da organização em relação à IA, principais lacunas de liderança e oportunidades de curto prazo.' },
  { num: '02', titulo: 'Plano Estratégico Personalizado', duracao: '4h', desc: 'Co-criação de um roadmap AI First para os próximos 12 meses, com prioridades, KPIs, quick wins e iniciativas de alto impacto.' },
  { num: '03', titulo: 'Sessões de Advisory Mensais', duracao: '4h/mês', desc: 'Encontros regulares com Tom Queiroz para acompanhar o progresso, resolver obstáculos e ajustar a estratégia conforme o contexto evolui.' },
  { num: '04', titulo: 'Acesso à Rede W-Qi', duracao: 'Contínuo', desc: 'Acesso à comunidade exclusiva de CEOs e executivos da W-Qi, benchmarks do setor, relatórios de tendências e conexões estratégicas.' },
];

export default function CorpExecAdvisoryPage() {
  const [activeTab, setActiveTab] = useState('para-quem');
  const [form, setForm] = useState({ nome_completo: '', instituicao: '', cargo: '', email: '', whatsapp: '', tamanho_empresa: 'none', setor: '', num_executivos: '', foco_estrategico: '', mensagem: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsSticky, setTabsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setTabsSticky(!entry.isIntersecting), { threshold: 0 });
    const sentinel = document.getElementById('tabs-sentinel-advisory');
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
      const { error } = await supabase.from('corp_exec_advisory_leads_2026_05_02' as never).insert({
        nome_completo: form.nome_completo,
        instituicao: form.instituicao,
        cargo: form.cargo,
        email: form.email,
        whatsapp: form.whatsapp,
        tamanho_empresa: form.tamanho_empresa === 'none' ? null : form.tamanho_empresa,
        setor: form.setor,
        num_executivos: form.num_executivos,
        foco_estrategico: form.foco_estrategico,
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
          <img src={IMAGES.EMPRESAS_HERO_3} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #001123 55%, rgba(0,17,35,0.4))' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-28 md:py-36">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(122,98,7,0.2)', color: '#c9a227', border: '1px solid rgba(122,98,7,0.4)' }}>
                GERAÇÃO AI FIRST™ · ADVISORY EXECUTIVO B2B
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Advisory Executivo<br />
                <span style={{ color: '#c9a227' }}>AI First™ B2B</span>
              </h1>
              <p className="text-lg md:text-xl text-white/75 mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
                Tom Queiroz como advisor estratégico de IA para a sua liderança executiva. Uma parceria contínua para garantir que a organização não apenas acompanhe a revolução da IA, mas a lidere no seu setor.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => scrollToTab('inscricao')} className="text-white px-8 py-3 text-base rounded-xl" style={{ background: '#7a6207' }}>
                  Solicitar Reunião Executiva
                </Button>
                <a href="https://wa.me/5511915513210" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="px-8 py-3 text-base rounded-xl border-white/30 text-white hover:bg-white/10">
                    <MessageCircle className="w-4 h-4 mr-2" /> Falar diretamente com Tom
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                {[{ val: 'Contínuo', label: 'Parceria anual' }, { val: 'Mensal', label: 'Sessões de advisory' }, { val: 'CEO/CXO', label: 'Nível de acesso' }, { val: 'Exclusivo', label: 'Vagas limitadas' }].map(s => (
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

      <div id="tabs-sentinel-advisory" />

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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Para Quem é o Advisory</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>Um serviço exclusivo de parceria estratégica para líderes que precisam de um advisor de confiança no mundo da IA.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Compass, title: 'CEOs em Transformação Digital', desc: 'Presidentes e CEOs que precisam incorporar IA à estratégia corporativa mas não têm um parceiro de confiança com profundo conhecimento técnico e estratégico.' },
              { icon: BarChart3, title: 'Conselhos e Comitês de Inovação', desc: 'Membros de conselho que precisam avaliar investimentos em IA e fazer perguntas certas ao board sobre projetos e riscos.' },
              { icon: Shield, title: 'CXOs em Funções Emergentes', desc: 'Chief AI Officers, Chief Digital Officers e Chief Data Officers que precisam de um advisor que já percorreu este caminho.' },
              { icon: Users, title: 'Líderes de Holdco e Multi-site', desc: 'Líderes de conglomerados que precisam alinhar estratégia de IA em múltiplas unidades, subsidiárias e geografias.' },
              { icon: Target, title: 'Empresas Pré-IPO ou M&A', desc: 'Organizações que precisam demonstrar capacidade AI First para investidores, due diligence ou processos de fusão e aquisição.' },
              { icon: TrendingUp, title: 'Scale-ups em Expansão', desc: 'Startups e scale-ups que cresceram rápido e precisam estruturar sua jornada AI First para sustentar e acelerar o crescimento.' },
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
              <img src={IMAGES.EMPRESAS_HERO_4} alt="Advisory Executivo" className="rounded-2xl w-full object-cover" style={{ height: '420px' }} />
            </div>
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4" style={{ background: 'rgba(122,98,7,0.15)', color: '#c9a227' }}>Por que Tom Queiroz</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Um Advisor que Já Fez — e Faz Agora</h2>
              <p className="text-white/70 mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
                Tom Queiroz não é apenas um consultor que acompanhou a transformação digital de fora. Ele vive isso todos os dias como CEO e CAIO da <a href="https://pareto.io" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#c9a227' }}>Pareto</a> — startup de IA Generativa com operações no Brasil e no Vale do Silício, criadora da <a href="https://tess.im" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#c9a227' }}>TESS AI</a>.
              </p>
              <div className="space-y-4">
                {['Acesso direto a Tom Queiroz — sem intermediários', 'Perspectiva técnica E estratégica — raro no mercado', 'Rede de conexões globais em IA (Vale do Silício, Brasil, Europa)', 'Benchmarks atualizados com dados reais de empresas semelhantes', 'Confidencialidade total e compromisso com os objetivos da empresa', 'Advisory com visão de longo prazo, não de projeto isolado'].map((item, i) => (
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

      {/* COMO FUNCIONA */}
      <section id="modulos" className="py-20" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Como Funciona o Advisory</h2>
            <p className="text-gray-600 max-w-xl mx-auto" style={{ fontWeight: 300 }}>Uma parceria estruturada em 4 etapas progressivas ao longo do ano.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {COMO_FUNCIONA.map((etapa) => (
              <motion.div key={etapa.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-black" style={{ color: 'rgba(122,98,7,0.15)', fontFamily: 'Montserrat, sans-serif' }}>{etapa.num}</span>
                  <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'rgba(122,98,7,0.08)', color: '#7a6207' }}>
                    <Clock className="w-3 h-3" />{etapa.duracao}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#001123' }}>{etapa.titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontWeight: 300 }}>{etapa.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section id="resultados" className="py-20" style={{ background: '#7a6207' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>O Que o Advisory Entrega</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: 'Clareza', label: 'Estratégica sobre onde e como implementar IA com segurança', icon: Compass },
              { val: 'Decisões', label: 'Mais rápidas e assertivas sobre investimentos em IA', icon: BarChart3 },
              { val: 'Vantagem', label: 'Competitiva sustentável em relação aos concorrentes do setor', icon: TrendingUp },
              { val: 'Parceiro', label: 'Estratégico que entende de IA, negócios E o seu contexto', icon: Users },
            ].map(({ val, label, icon: Icon }) => (
              <div key={val} className="text-center p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <Icon className="w-8 h-8 mx-auto mb-3 text-white/80" />
                <div className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{val}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Solicitar Reunião Executiva</h2>
            <p className="text-gray-600" style={{ fontWeight: 300 }}>Vagas de advisory extremamente limitadas. Preencha o formulário para uma reunião de alinhamento sem compromisso.</p>
          </div>
          {success ? (
            <div className="text-center py-12 rounded-2xl" style={{ background: 'rgba(122,98,7,0.08)' }}>
              <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#7a6207' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: '#001123' }}>Solicitação recebida!</h3>
              <p className="text-gray-600" style={{ fontWeight: 300 }}>Tom Queiroz ou nossa equipe entrará em contato pessoalmente em até 48h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div><Label className="text-sm font-medium mb-1.5 block">Nome Completo *</Label><Input value={form.nome_completo} onChange={e => setForm({ ...form, nome_completo: e.target.value })} required placeholder="Seu nome completo" className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Empresa *</Label><Input value={form.instituicao} onChange={e => setForm({ ...form, instituicao: e.target.value })} required placeholder="Nome da empresa" className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Cargo *</Label><Input value={form.cargo} onChange={e => setForm({ ...form, cargo: e.target.value })} required placeholder="CEO, CFO, CAIO..." className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">E-mail Corporativo *</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="seu@empresa.com" className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">WhatsApp *</Label><Input value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} required placeholder="+55 11 9..." className="rounded-xl" /></div>
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
              <div><Label className="text-sm font-medium mb-1.5 block">Setor da Empresa</Label><Input value={form.setor} onChange={e => setForm({ ...form, setor: e.target.value })} placeholder="Ex: Financeiro, Saúde..." className="rounded-xl" /></div>
              <div><Label className="text-sm font-medium mb-1.5 block">Número de Executivos na Liderança</Label><Input value={form.num_executivos} onChange={e => setForm({ ...form, num_executivos: e.target.value })} placeholder="Ex: 12 (C-level e diretores)" className="rounded-xl" /></div>
              <div><Label className="text-sm font-medium mb-1.5 block">Principal Foco Estratégico</Label><Textarea value={form.foco_estrategico} onChange={e => setForm({ ...form, foco_estrategico: e.target.value })} placeholder="Qual o maior desafio ou objetivo da sua organização que um advisory em IA pode ajudar?" rows={3} className="rounded-xl" /></div>
              <Button type="submit" disabled={loading} className="w-full py-3 text-base rounded-xl text-white" style={{ background: '#7a6207' }}>
                {loading ? 'Enviando...' : 'Solicitar Reunião Executiva'}
              </Button>
              <p className="text-center text-xs text-gray-400">Advisory exclusivo. Vagas extremamente limitadas por trimestre.</p>
            </form>
          )}
        </div>
      </section>

      <section className="py-14" style={{ background: '#001123' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Sua empresa precisa de um <span style={{ color: '#c9a227' }}>Advisor AI First™</span> que já fez isso de verdade
          </h2>
          <p className="text-white/70 mb-8" style={{ fontWeight: 300 }}>Não delegue a decisão mais estratégica da era atual a quem nunca implementou IA em ambiente real.</p>
          <a href="https://wa.me/5511915513210" target="_blank" rel="noopener noreferrer">
            <Button className="px-10 py-3 text-base rounded-xl text-white" style={{ background: '#7a6207' }}>
              <MessageCircle className="w-4 h-4 mr-2" /> Falar diretamente com Tom
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
}
