import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle, Loader2, MapPin, Mail, Phone, Clock, MessageSquare, Building2, UserCheck } from 'lucide-react';
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { useSubmitLead } from '@/hooks/useSupabaseData';

const WA_LINK = 'https://wa.me/5511915513210?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20W-Qi.';

const CONTACT_OPTIONS = [
  {
    Icon: MessageSquare,
    title: 'WhatsApp Direto',
    desc: 'Para executivos com agenda restrita. Resposta em até 4 horas úteis.',
    action: WA_LINK,
    label: '+55 11 91551-3210',
    external: true,
  },
  {
    Icon: Mail,
    title: 'E-mail Corporativo',
    desc: 'Para propostas formais, apresentações e documentações detalhadas.',
    action: 'mailto:tom@midia-digital.com',
    label: 'tom@midia-digital.com',
    external: false,
  },
  {
    Icon: Building2,
    title: 'Escritório',
    desc: 'Reuniões presenciais sob agendamento. W-Qi Development.',
    action: 'https://maps.google.com/?q=Av.+Paulista+2022+São+Paulo',
    label: 'Av. Paulista, 2.022 — SP',
    external: true,
  },
];

const WHY_CONTACT = [
  { Icon: UserCheck, text: 'Diagnóstico executivo gratuito na primeira conversa' },
  { Icon: Clock,     text: 'Resposta garantida em até 24 horas úteis' },
  { Icon: Building2, text: 'Propostas 100% personalizadas ao seu contexto' },
  { Icon: CheckCircle, text: 'Sem SDRs nem funil automatizado — conversa humana' },
];

export default function ContatoPage() {
  const { submitLead, loading, success, error } = useSubmitLead();
  const [form, setForm] = useState({
    name: '', email: '', whatsapp: '', company: '', role: '', message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLead({
      full_name: form.name,
      email: form.email,
      whatsapp: form.whatsapp || undefined,
      company: form.company || undefined,
      message: `[${form.role}] ${form.message}`,
    });
  };

  return (
    <Layout>
      {/* ── HERO PRÓPRIA — foto de evento ao fundo ── */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden" style={{ background: '#001123' }}>
        {/* Detalhe luz copper */}
        <div className="absolute inset-0 opacity-20 hidden lg:block"
          style={{ background: 'radial-gradient(ellipse at 30% 60%, #7a6207 0%, transparent 60%)' }} />

        {/* Grid decorativo */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 container mx-auto px-4 md:px-8 py-32 md:py-44 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
              style={{ color: '#7a6207', background: 'rgba(122,98,7,0.12)', border: '1px solid rgba(122,98,7,0.25)' }}>
              Fale com W-Qi
            </span>
            <h1 className="text-white mb-5"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 'clamp(2rem,5vw,3.8rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Sua Próxima Decisão<br /><span style={{ color: '#7a6207' }}>Começa com uma Conversa</span>
            </h1>
            <p className="text-white/60 leading-relaxed max-w-2xl" style={{ fontWeight: 300, fontSize: '1rem' }}>
              Líderes que chegam até aqui não estão procurando mais informação.
              Estão prontos para ter uma conversa honesta sobre o que está impedindo o próximo salto.
              Nosso time responde pessoalmente — sem automações, sem scripts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OPÇÕES DE CONTATO ── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {CONTACT_OPTIONS.map((opt, i) => (
              <motion.a key={opt.title} href={opt.action}
                target={opt.external ? '_blank' : undefined}
                rel={opt.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="block p-6 rounded-2xl border border-border/40 hover:border-accent/50 bg-background hover:shadow-md transition-all group">
                <opt.Icon size={22} style={{ color: '#7a6207', marginBottom: 12 }} />
                <div className="font-bold text-primary text-sm mb-1 group-hover:text-accent transition-colors">{opt.title}</div>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3" style={{ fontWeight: 300 }}>{opt.desc}</p>
                <span className="text-xs font-medium" style={{ color: '#7a6207' }}>{opt.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Grid: Por que contatar + Formulário */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Coluna esquerda — proposta de valor */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7a6207' }}>Por que nos contatar?</p>
              <h2 className="text-primary mb-5 text-2xl md:text-3xl">
                Cada Conversa é Única.<br />Cada Proposta, Personalizada.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                Não trabalhamos com tabelas de preços públicas nem com produtos de prateleira.
                O primeiro passo é sempre entender <strong className="text-primary">quem você é, onde está e para onde quer ir</strong>.
                A partir daí, construímos o caminho mais eficiente.
              </p>

              <div className="space-y-4 mb-8">
                {WHY_CONTACT.map((w) => (
                  <div key={w.text} className="flex items-start gap-3">
                    <w.Icon size={16} style={{ color: '#7a6207', flexShrink: 0, marginTop: 2 }} />
                    <span className="text-sm text-muted-foreground" style={{ fontWeight: 300 }}>{w.text}</span>
                  </div>
                ))}
              </div>

              {/* Endereço */}
              <div className="p-4 rounded-xl border border-border/40 bg-muted/20">
                <div className="flex items-start gap-3">
                  <MapPin size={16} style={{ color: '#7a6207', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="text-sm font-semibold text-primary mb-0.5">W-Qi Development</div>
                    <p className="text-xs text-muted-foreground" style={{ fontWeight: 300 }}>
                      Av. Paulista, 2.022 — 2º andar<br />
                      Consolação · São Paulo / SP
                    </p>
                  </div>
                </div>
              </div>

              {/* Redes sociais */}
              <div className="flex items-center gap-3 mt-6">
                <a href="https://linkedin.com/in/wellingtonqueiroz" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors hover:border-accent hover:text-accent border-border/40 text-muted-foreground">
                  <FaLinkedinIn size={14} />
                </a>
                <a href="https://instagram.com/wellingtonqueiroz" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors hover:border-accent hover:text-accent border-border/40 text-muted-foreground">
                  <FaInstagram size={14} />
                </a>
                <a href="https://x.com/wellingtonqueiroz" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors hover:border-accent hover:text-accent border-border/40 text-muted-foreground">
                  <FaXTwitter size={14} />
                </a>
              </div>
            </motion.div>

            {/* Coluna direita — Formulário */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-3">
              <div className="rounded-2xl p-8 border border-border/40 bg-background shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#7a6207' }}>Formulário de Contato</p>
                <h3 className="text-primary text-xl font-bold mb-6">Inicie sua jornada com W-Qi</h3>

                {success ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <CheckCircle size={40} style={{ color: '#7a6207' }} />
                    <p className="font-semibold text-primary">Mensagem recebida!</p>
                    <p className="text-muted-foreground text-sm" style={{ fontWeight: 300 }}>
                      Retornaremos em até 24 horas úteis. Verifique também seu WhatsApp.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-primary">Nome completo *</Label>
                        <Input placeholder="Seu nome" required value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-primary">E-mail corporativo *</Label>
                        <Input type="email" placeholder="nome@empresa.com" required value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-primary">WhatsApp</Label>
                        <Input placeholder="+55 11 99999-9999" value={form.whatsapp}
                          onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} className="text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-primary">Cargo</Label>
                        <Input placeholder="CEO, CMO, Diretor..." value={form.role}
                          onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="text-sm" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-primary">Empresa</Label>
                      <Input placeholder="Nome da empresa" value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-primary">Contexto &amp; Objetivo *</Label>
                      <Textarea
                        placeholder="Descreva brevemente seu momento atual e o que espera de uma mentoria ou consultoria com W-Qi..."
                        rows={4} required value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="text-sm resize-none" />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-destructive text-xs">
                        <AlertCircle size={14} /> Erro ao enviar. Tente pelo WhatsApp.
                      </div>
                    )}

                    <Button type="submit" disabled={loading} className="w-full rounded-full py-3 h-auto font-semibold"
                      style={{ background: '#7a6207', color: 'white' }}>
                      {loading
                        ? <><Loader2 size={15} className="mr-2 animate-spin" /> Enviando...</>
                        : <><Phone size={15} className="mr-2" /> Enviar &amp; Aguardar Retorno</>}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground" style={{ fontWeight: 300 }}>
                      Ou prefere falar agora?{' '}
                      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                        className="font-medium hover:underline" style={{ color: '#7a6207' }}>
                        <FaWhatsapp style={{ display: 'inline', marginRight: 4 }} size={12} />
                        Abrir WhatsApp
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA — Diagnóstico gratuito ── */}
      <section className="py-16 md:py-20" style={{ background: '#001123' }}>
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(122,98,7,0.85)' }}>
              Próximas turmas com vagas limitadas
            </p>
            <h2 className="text-white mb-5">
              Diagnóstico Gratuito — <span style={{ color: '#7a6207' }}>sem compromisso</span>
            </h2>
            <p className="text-white/55 mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
              Uma sessão inicial de 30 minutos com Wellington. Objetivo: entender seu momento, identificar gaps e
              apresentar o formato mais adequado ao seu perfil. Sem pitch de vendas — só conversa qualificada.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full px-8 py-3 h-auto font-semibold text-sm"
                style={{ background: '#7a6207', color: 'white' }}>
                <FaWhatsapp size={14} className="mr-2" /> Agendar Diagnóstico Gratuito
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
