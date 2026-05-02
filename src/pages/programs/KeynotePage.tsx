import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Mic, Users, Globe, Sparkles, CheckCircle2, ArrowRight, Star, Quote } from 'lucide-react'
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'

export default function KeynotePage() {
  const { submitLead, loading, success, error, reset } = useSubmitLead('keynote_leads')
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company: '',
    event_type: '',
    event_date: '',
    attendees: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead({
      full_name: formData.full_name,
      email: formData.email,
      company: formData.company,
      whatsapp: '',
      message: `Tipo de Evento: ${formData.event_type} | Data: ${formData.event_date} | Participantes: ${formData.attendees} | Mensagem: ${formData.message}`
    })
  }

  const handleReset = () => {
    setFormData({
      full_name: '',
      email: '',
      company: '',
      event_type: '',
      event_date: '',
      attendees: '',
      message: ''
    })
    reset()
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGES.TOM_HERO_BG}
              alt="Wellington Queiroz palestrando"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 container mx-auto px-4 text-center"
          >
            <Badge className="mb-6 bg-accent text-accent-foreground px-6 py-2 text-sm font-semibold">
              200+ KEYNOTES REALIZADAS
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Insights que Movem Platéias.
              <br />
              <span className="text-accent">Ideias que Transformam Organizações.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light">
              Palestras executivas que combinam profundidade analítica, dados atuais e narrativa que engaja do CEO ao analista.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
                onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Solicitar Proposta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                asChild
              >
                <a href="https://linkedin.com/in/wellingtonqueiroz" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className="mr-2 h-5 w-5" />
                  Ver Perfil
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Tom Como Palestrante</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Mais de duas décadas de experiência executiva em marcas globais, traduzidas em palestras memoráveis.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Mic, value: '200+', label: 'Keynotes Realizadas', color: 'text-accent' },
                { icon: Star, value: 'NPS 94', label: 'Satisfação Média', color: 'text-accent' },
                { icon: Globe, value: '18', label: 'Países Alcançados', color: 'text-accent' },
                { icon: Sparkles, value: '100%', label: 'Conteúdo Customizado', color: 'text-accent' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center hover:shadow-xl transition-shadow">
                    <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Temas de Keynote</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conteúdo customizado para o contexto e urgências da sua audiência.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'AI First Era & The Future of Work',
                  audience: 'C-Suite, Conselhos, Líderes de Transformação',
                  description: 'Como a IA está redefinindo o trabalho, a liderança e a vantagem competitiva das organizações.'
                },
                {
                  title: 'Digital Marketing in 2030',
                  audience: 'CMOs, VPs de Marketing, Diretores Comerciais',
                  description: 'O que os líderes de marketing precisam saber hoje para vencer nos próximos 5 anos.'
                },
                {
                  title: 'Leading Transformational Change',
                  audience: 'Executivos Sênior, Gestores de Mudança',
                  description: 'Frameworks práticos para liderar transformação em mercados disruptivos e incertos.'
                },
                {
                  title: 'The CMO of the Future',
                  audience: 'Marketing Leaders, Heads of Growth',
                  description: 'Data, IA e julgamento humano: o novo perfil do líder de marketing de alto impacto.'
                },
                {
                  title: 'Building a Culture of Innovation',
                  audience: 'CEOs, CHROs, Líderes de Inovação',
                  description: 'Como criar ambientes onde a inovação contínua não é exceção, mas a regra.'
                }
              ].map((theme, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold mb-4">{theme.title}</h3>
                    <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                      {theme.audience}
                    </Badge>
                    <p className="text-muted-foreground">{theme.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Como Funciona</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Processo estruturado para garantir máximo impacto no seu evento.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Briefing Estratégico',
                  description: 'Entendimento profundo do contexto, audiência e objetivos do evento.'
                },
                {
                  step: '02',
                  title: 'Customização de Conteúdo',
                  description: 'Desenvolvimento de narrativa e cases específicos para sua realidade.'
                },
                {
                  step: '03',
                  title: 'Entrega da Keynote',
                  description: 'Apresentação de 60-90 minutos com Q&A executivo ao final.'
                },
                {
                  step: '04',
                  title: 'Follow-up Estratégico',
                  description: 'Material de apoio e disponibilidade para conversas pós-evento.'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full">
                    <div className="text-5xl font-bold text-accent/20 mb-4">{step.step}</div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Formatos Disponíveis</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Flexibilidade para atender diferentes tipos de eventos e audiências.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Keynote Principal',
                  duration: '60-90 minutos',
                  description: 'Apresentação principal de abertura ou encerramento de eventos corporativos, summits e conferências.'
                },
                {
                  title: 'Painel Executivo',
                  duration: '45-60 minutos',
                  description: 'Participação em painéis de discussão com outros executivos e especialistas do setor.'
                },
                {
                  title: 'Masterclass Executiva',
                  duration: '2-4 horas',
                  description: 'Sessão aprofundada com frameworks práticos e exercícios aplicados para grupos menores.'
                },
                {
                  title: 'Fireside Chat',
                  duration: '30-45 minutos',
                  description: 'Conversa intimista e interativa com moderador, ideal para eventos de networking executivo.'
                }
              ].map((format, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold mb-2">{format.title}</h3>
                    <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                      {format.duration}
                    </Badge>
                    <p className="text-muted-foreground">{format.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">O Que Dizem os Organizadores</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Feedback de quem já trouxe Wellington para seus eventos.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Fernanda Almeida',
                  role: 'Diretora de Eventos',
                  company: 'Summit Marketing Brasil',
                  text: 'Wellington foi o palestrante mais bem avaliado do nosso evento. NPS de 96 e pedidos de bis. Conteúdo denso, entrega impecável.'
                },
                {
                  name: 'Ricardo Tavares',
                  role: 'CEO',
                  company: 'Associação Brasileira de Marketing',
                  text: 'Trouxe insights que nenhum outro palestrante conseguiu. A plateia saiu com frameworks aplicáveis no dia seguinte.'
                },
                {
                  name: 'Juliana Campos',
                  role: 'Head de RH',
                  company: 'TechCorp LATAM',
                  text: 'Customizou 100% do conteúdo para nossa realidade. Nosso time de liderança ainda cita a palestra 6 meses depois.'
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full">
                    <Quote className="h-10 w-10 text-accent/30 mb-4" />
                    <p className="text-lg mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="form" className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Solicite uma Proposta</h2>
              <p className="text-xl text-muted-foreground">
                Preencha o formulário e nossa equipe entrará em contato em até 24 horas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8">
                {success ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Solicitação Enviada com Sucesso!</h3>
                    <p className="text-muted-foreground mb-8">
                      Nossa equipe entrará em contato em até 24 horas para discutir os detalhes do seu evento.
                    </p>
                    <Button onClick={handleReset} variant="outline">
                      Enviar Nova Solicitação
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                        <Input
                          required
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">E-mail Corporativo *</label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Empresa / Organização *</label>
                      <Input
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nome da empresa"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Tipo de Evento *</label>
                        <Select
                          value={formData.event_type}
                          onValueChange={(value) => setFormData({ ...formData, event_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="keynote">Keynote Principal</SelectItem>
                            <SelectItem value="painel">Painel Executivo</SelectItem>
                            <SelectItem value="masterclass">Masterclass</SelectItem>
                            <SelectItem value="fireside">Fireside Chat</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Data Prevista</label>
                        <Input
                          value={formData.event_date}
                          onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                          placeholder="Ex: Junho 2026"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Número de Participantes *</label>
                      <Select
                        value={formData.attendees}
                        onValueChange={(value) => setFormData({ ...formData, attendees: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50-100">50-100 pessoas</SelectItem>
                          <SelectItem value="100-300">100-300 pessoas</SelectItem>
                          <SelectItem value="300-500">300-500 pessoas</SelectItem>
                          <SelectItem value="500+">Mais de 500 pessoas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Mensagem / Contexto do Evento</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Conte-nos mais sobre o evento, audiência e objetivos..."
                        rows={5}
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-white"
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Solicitar Proposta'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-accent/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pronto Para Elevar o Nível do Seu Evento?
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                Entre em contato agora e garanta uma palestra que sua audiência não vai esquecer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg"
                  onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Solicitar Proposta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                  asChild
                >
                  <a
                    href="https://wa.me/5511999999999?text=Olá! Gostaria de solicitar uma proposta de keynote."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="mr-2 h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
