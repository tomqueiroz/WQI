import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Award, Users, Brain, BookOpen, Clock, MessageCircle, Star, Shield, Target } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { supabase } from '@/integrations/supabase/client';

const TABS = [
  { id: 'para-quem', label: 'Para Quem É' },
  { id: 'metodologia', label: 'Metodologia' },
  { id: 'modulos', label: 'Módulos' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'inscricao', label: 'Inscrição' },
];

const MODULOS = [
  { num: '01', titulo: 'O Mentor AI First — Identidade e Propósito', duracao: '4h', desc: 'O que é ser mentor na era da IA. Diferença entre coach, consultor e mentor. Como o mentor AI First catalisa transformação organizacional.' },
  { num: '02', titulo: 'Fundamentos de IA para Mentores', duracao: '6h', desc: 'Vocabulário, conceitos e ferramentas que mentores precisam dominar para orientar mentorandos em projetos de IA com segurança e propriedade.' },
  { num: '03', titulo: 'Metodologias de Mentoria Corporativa com IA', duracao: '6h', desc: 'AI First Mentoring Framework™. Como estruturar sessões, definir KPIs, acompanhar progresso e ajustar estratégia em mentorias focadas em transformação digital.' },
  { num: '04', titulo: 'Gestão de Dinâmicas e Resistências', duracao: '4h', desc: 'Como lidar com ceticismo, medo e resistência à mudança. Técnicas de influência e persuasão para mentores internos e externos.' },
  { num: '05', titulo: 'Cases ao Vivo e Supervisão', duracao: '6h', desc: 'Cada participante apresenta um caso real e recebe feedback estruturado de Tom Queiroz e pares. Aprendizado por observação e prática supervisionada.' },
  { num: '06', titulo: 'Certificação e Plano de Atuação', duracao: '4h', desc: 'Avaliação final, certificação W-Qi Development e construção do plano de atuação como mentor AI First interno ou externo.' },
];

export default function CorpMentorFormPage() {
  const [activeTab, setActiveTab] = useState('para-quem');
  const [form, setForm] = useState({ nome_completo: '', instituicao: '', cargo: '', email: '', whatsapp: '', tamanho_empresa: 'none', setor: '', num_colaboradores: '', objetivo: '', mensagem: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsSticky, setTabsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setTabsSticky(!entry.isIntersecting), { threshold: 0 });
    const sentinel = document.getElementById('tabs-sentinel-mentor');
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
      const { error } = await supabase.from('corp_mentor_form_leads_2026_05_02' as never).insert({
        nome_completo: form.nome_completo,
        instituicao: form.instituicao,
        cargo: form.cargo,
        email: form.email,
        whatsapp: form.whatsapp,
        tamanho_empresa: form.tamanho_empresa === 'none' ? null : form.tamanho_empresa,
        setor: form.setor,
        num_colaboradores: form.num_colaboradores,
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
          <img src={IMAGES.CORP_MENTOR_6} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #001123 60%, rgba(0,17,35,0.4))' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-28 md:py-36">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(122,98,7,0.2)', color: '#c9a227', border: '1px solid rgba(122,98,7,0.4)' }}>
                GERAÇÃO AI FIRST™ · FORMAÇÃO DE MENTORES
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Formação de Mentores<br />
                <span style={{ color: '#c9a227' }}>Corporativos com IA</span>
              </h1>
              <p className="text-lg md:text-xl text-white/75 mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
                O programa que forma os multiplicadores de transformação AI First dentro da sua organização. Forme mentores internos certificados que perpetuam a cultura de inovação baseada em IA — sem depender de consultores externos para sempre.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => scrollToTab('inscricao')} className="text-white px-8 py-3 text-base rounded-xl" style={{ background: '#7a6207' }}>
                  Candidatar Minha Empresa
                </Button>
                <a href="https://wa.me/5511915513210" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="px-8 py-3 text-base rounded-xl border-white/30 text-white hover:bg-white/10">
                    <MessageCircle className="w-4 h-4 mr-2" /> Falar com especialista
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                {[{ val: '30h', label: 'Carga horária total' }, { val: '6', label: 'Módulos aprofundados' }, { val: 'Certificado', label: 'W-Qi Development' }, { val: 'Exclusivo', label: 'In-company ou cohort' }].map(s => (
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

      <div id="tabs-sentinel-mentor" />

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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Para Quem é a Formação</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>Empresas que querem construir capacidade interna de transformação — não dependência externa.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Líderes Sênior com Visão de Futuro', desc: 'Diretores e gerentes experientes que querem multiplicar seu impacto orientando outros líderes na jornada AI First.' },
              { icon: BookOpen, title: 'Profissionais de RH & T&D', desc: 'Especialistas em Treinamento & Desenvolvimento que precisam incorporar IA no portfólio de desenvolvimento de lideranças.' },
              { icon: Star, title: 'Consultores Internos', desc: 'Profissionais de áreas de Transformação Digital, Inovação e Estratégia que atuam como catalisadores de mudança.' },
              { icon: Brain, title: 'Especialistas em IA que Querem Mentoriar', desc: 'Profissionais técnicos de dados e IA que querem desenvolver habilidades de mentoria para ampliar seu impacto.' },
              { icon: Target, title: 'Programas de Alta Performance', desc: 'Organizações com trilhas de desenvolvimento de talentos e lideranças que querem incluir IA como competência central.' },
              { icon: Shield, title: 'Organizações com Maturidade Digital', desc: 'Empresas que já investiram em IA e precisam de multiplicadores para sustentar e expandir essas iniciativas internamente.' },
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
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4" style={{ background: 'rgba(122,98,7,0.15)', color: '#c9a227' }}>Metodologia</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>AI First Mentoring Framework™</h2>
              <p className="text-white/70 mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
                Desenvolvido por Tom Queiroz com base em suas experiências como mentor de 500+ executivos e como CEO da Pareto — plataforma de IA Generativa líder no Brasil. O framework combina técnicas de mentoria executiva com profundo conhecimento de IA aplicada.
              </p>
              <div className="space-y-4">
                {['Aprendizado em espiral: conceito → prática → reflexão → aplicação', 'Supervisão individual com feedback de Tom Queiroz', 'Mentoria peer-to-peer entre participantes do programa', 'Casos reais do setor de cada empresa participante', 'Certificação W-Qi Development reconhecida no mercado', 'Comunidade de prática pós-formação com encontros mensais'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c9a227' }} />
                    <span className="text-white/80 text-sm" style={{ fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src={IMAGES.CORP_MENTOR_3} alt="Formação de Mentores" className="rounded-2xl w-full object-cover" style={{ height: '420px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos" className="py-20" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Conteúdo Programático</h2>
            <p className="text-gray-600 max-w-xl mx-auto" style={{ fontWeight: 300 }}>6 módulos progressivos. Carga total: 30h. Formato: presencial, híbrido ou online.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>O Que a Formação Entrega</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: 'Mentores', label: 'Internos certificados W-Qi prontos para atuar', icon: Award },
              { val: '5x', label: 'de alcance de impacto por mentor formado vs. consultor externo', icon: Users },
              { val: '60%', label: 'de redução no custo de consultorias externas de IA a longo prazo', icon: Target },
              { val: 'Cultura', label: 'AI First sustentável, autônoma e escalável na organização', icon: Shield },
            ].map(({ val, label, icon: Icon }) => (
              <div key={val} className="text-center p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <Icon className="w-8 h-8 mx-auto mb-3 text-white/80" />
                <div className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{val}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#001123' }}>Candidatar Minha Empresa</h2>
            <p className="text-gray-600" style={{ fontWeight: 300 }}>Preencha o formulário para receber mais informações e uma proposta personalizada.</p>
          </div>
          {success ? (
            <div className="text-center py-12 rounded-2xl" style={{ background: 'rgba(122,98,7,0.08)' }}>
              <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#7a6207' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: '#001123' }}>Candidatura recebida!</h3>
              <p className="text-gray-600" style={{ fontWeight: 300 }}>Nossa equipe entrará em contato em até 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div><Label className="text-sm font-medium mb-1.5 block">Nome Completo *</Label><Input value={form.nome_completo} onChange={e => setForm({ ...form, nome_completo: e.target.value })} required placeholder="Seu nome completo" className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Empresa *</Label><Input value={form.instituicao} onChange={e => setForm({ ...form, instituicao: e.target.value })} required placeholder="Nome da empresa" className="rounded-xl" /></div>
                <div><Label className="text-sm font-medium mb-1.5 block">Cargo *</Label><Input value={form.cargo} onChange={e => setForm({ ...form, cargo: e.target.value })} required placeholder="CEO, Diretor de RH..." className="rounded-xl" /></div>
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
              <div><Label className="text-sm font-medium mb-1.5 block">Setor da Empresa</Label><Input value={form.setor} onChange={e => setForm({ ...form, setor: e.target.value })} placeholder="Ex: Financeiro, Varejo, Saúde..." className="rounded-xl" /></div>
              <div><Label className="text-sm font-medium mb-1.5 block">Nº de Líderes para Formar como Mentores</Label><Input value={form.num_colaboradores} onChange={e => setForm({ ...form, num_colaboradores: e.target.value })} placeholder="Ex: 10" className="rounded-xl" /></div>
              <div><Label className="text-sm font-medium mb-1.5 block">Objetivo Principal</Label><Textarea value={form.objetivo} onChange={e => setForm({ ...form, objetivo: e.target.value })} placeholder="O que você espera construir com mentores internos certificados?" rows={3} className="rounded-xl" /></div>
              <Button type="submit" disabled={loading} className="w-full py-3 text-base rounded-xl text-white" style={{ background: '#7a6207' }}>
                {loading ? 'Enviando...' : 'Candidatar Minha Empresa'}
              </Button>
            </form>
          )}
        </div>
      </section>

      <section className="py-14" style={{ background: '#001123' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Construa a <span style={{ color: '#c9a227' }}>Geração AI First™</span> de dentro para fora
          </h2>
          <p className="text-white/70 mb-8" style={{ fontWeight: 300 }}>Mentores internos certificados multiplicam o impacto — sem depender de consultores externos para sempre.</p>
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
