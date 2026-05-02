import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { CheckCircle2, TrendingUp, Users, Target, Zap, ArrowRight, Linkedin, MessageCircle, X } from 'lucide-react'

export default function Mentoria1on1Page() {
  const { submitLead, loading, success, error, reset } = useSubmitLead('mentoria_1on1_leads')
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    company: '',
    role: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6 bg-accent text-accent-foreground px-4 py-2 text-sm font-medium">
                  MENTORIA EXCLUSIVA
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  O Caminho Mais Rápido Para o Seu Próximo Patamar
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  A aceleração mais rara: atenção total de quem já navegou até onde você quer chegar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Solicitar Diagnóstico
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border hover:bg-secondary"
                    asChild
                  >
                    <a href="https://linkedin.com/in/wellingtonqueiroz" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-5 w-5" />
                      Conectar no LinkedIn
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10" />
                  <img
                    src={IMAGES.TOM_PROFILE_ALT}
                    alt="Wellington Queiroz - Mentor Executivo"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
                Mentoria não é consultoria. É a transferência direta de modelos mentais testados.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Não existe atalho. Mas existe o caminho certo — percorrido com quem já mapeou cada obstáculo. Nossa Mentoria 1:1 é um compromisso de transformação: personalizado em cada detalhe, rigoroso em cada entrega, e construído inteiramente ao redor do seu momento, do seu mercado e dos seus objetivos. Quando você trabalha diretamente com quem já liderou times de 1.500 pessoas, implementou IA em escala global e navegou C-suites de marcas como Sony, Honda e Shell, você não aprende teoria — você absorve decisões reais, frameworks testados e a clareza que só vem da experiência.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Para Quem É Esta Mentoria
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Três perfis executivos que encontram na mentoria 1:1 o catalisador que faltava
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: TrendingUp,
                  title: 'Executivo em Transição de Carreira',
                  description: 'Você está entre posições, buscando o próximo movimento estratégico, ou quer reposicionar sua marca pessoal para atrair oportunidades de maior impacto.'
                },
                {
                  icon: Users,
                  title: 'Founder Escalando para C-Suite',
                  description: 'Você fundou, cresceu, e agora precisa dominar as dinâmicas políticas, de governança e de liderança executiva que separam founders de CEOs consolidados.'
                },
                {
                  icon: Zap,
                  title: 'Líder Buscando Domínio de IA',
                  description: 'Você lidera marketing, estratégia ou inovação e sabe que IA não é mais opcional — mas precisa de um framework claro para implementar sem perder o controle estratégico.'
                }
              ].map((profile, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full hover:shadow-xl transition-shadow border-border">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                      <profile.icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {profile.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {profile.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Metodologia de Transformação
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Quatro fases estruturadas para resultados mensuráveis
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto space-y-8">
              {[
                {
                  number: '01',
                  title: 'Pré-Diagnóstico Minucioso',
                  description: 'Análise profunda do seu contexto atual: carreira, mercado, objetivos, gaps de competência e oportunidades estratégicas. Não começamos sem clareza total.'
                },
                {
                  number: '02',
                  title: 'Mapeamento de Gaps',
                  description: 'Identificação precisa das lacunas entre onde você está e onde precisa chegar — em habilidades, rede, posicionamento e execução.'
                },
                {
                  number: '03',
                  title: 'Plano Personalizado',
                  description: 'Construção de um roadmap de 90 dias com marcos claros, entregáveis concretos e métricas de progresso. Cada sessão tem objetivo e resultado esperado.'
                },
                {
                  number: '04',
                  title: 'Acompanhamento Contínuo',
                  description: 'Sessões regulares, acesso assíncrono via WhatsApp para decisões urgentes, e revisão constante de estratégia conforme o contexto evolui.'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 border-l-4 border-l-accent hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-6">
                      <div className="text-5xl font-bold text-accent/20">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Módulos Programáticos
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conteúdo adaptado ao seu contexto e objetivos específicos
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'Executive Presence & Personal Brand',
                  topics: [
                    'Construção de autoridade executiva',
                    'LinkedIn como plataforma de influência',
                    'Storytelling para liderança',
                    'Gestão de reputação profissional'
                  ]
                },
                {
                  title: 'AI-First Decision Making',
                  topics: [
                    'Frameworks de decisão com IA',
                    'Automação de processos estratégicos',
                    'Análise preditiva e cenários',
                    'Implementação prática de ferramentas'
                  ]
                },
                {
                  title: 'Career Architecture',
                  topics: [
                    'Mapeamento de trajetória executiva',
                    'Negociação de pacotes C-level',
                    'Transição entre indústrias',
                    'Construção de advisory board pessoal'
                  ]
                },
                {
                  title: 'Stakeholder Influence',
                  topics: [
                    'Política organizacional estratégica',
                    'Gestão de board e investidores',
                    'Comunicação executiva de alto impacto',
                    'Construção de coalizões'
                  ]
                },
                {
                  title: 'Data-Driven Growth',
                  topics: [
                    'Métricas que importam para C-suite',
                    'Dashboards executivos eficazes',
                    'Cultura de dados em organizações',
                    'ROI de iniciativas estratégicas'
                  ]
                }
              ].map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow border-border">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      {module.title}
                    </h3>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                O Custo Real de Não Ter Mentoria
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 border-destructive/20 bg-destructive/5">
                <div className="flex items-center gap-3 mb-6">
                  <X className="h-8 w-8 text-destructive" />
                  <h3 className="text-2xl font-bold text-foreground">Sem Mentoria</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Decisões baseadas em tentativa e erro',
                    'Meses perdidos em caminhos sem saída',
                    'Falta de clareza estratégica',
                    'Rede limitada ao círculo atual',
                    'Aprendizado lento e custoso',
                    'Oportunidades perdidas por falta de timing'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-8 border-accent/20 bg-accent/5">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                  <h3 className="text-2xl font-bold text-foreground">Com Tom Queiroz</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Decisões validadas por 20+ anos de experiência',
                    'Atalhos para resultados comprovados',
                    'Clareza estratégica desde a primeira sessão',
                    'Acesso a rede executiva de alto nível',
                    'Frameworks prontos para aplicar',
                    'Timing perfeito em cada movimento'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Resultados Mensuráveis
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  metric: '+40%',
                  label: 'Clareza Estratégica',
                  description: 'Média reportada após 90 dias'
                },
                {
                  metric: '2.3x',
                  label: 'Taxa de Promoção',
                  description: 'Em 12 meses pós-mentoria'
                },
                {
                  metric: '94%',
                  label: 'NPS de Mentorados',
                  description: 'Recomendariam a outros executivos'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center hover:shadow-xl transition-shadow border-border">
                    <div className="text-5xl font-bold text-accent mb-3">
                      {stat.metric}
                    </div>
                    <div className="text-xl font-semibold text-foreground mb-2">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.description}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="form-section" className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Solicite Seu Diagnóstico Estratégico
                </h2>
                <p className="text-xl text-muted-foreground">
                  Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas
                </p>
              </motion.div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="p-12 text-center border-accent/20 bg-accent/5">
                    <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Solicitação Recebida!
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Obrigado pelo seu interesse. Nossa equipe analisará seu perfil e entrará em contato em breve.
                    </p>
                    <Button
                      onClick={() => {
                        reset()
                        setFormData({
                          full_name: '',
                          email: '',
                          whatsapp: '',
                          company: '',
                          role: '',
                          message: ''
                        })
                      }}
                      variant="outline"
                    >
                      Enviar Nova Solicitação
                    </Button>
                  </Card>
                </motion.div>
              ) : (
                <Card className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Nome Completo *
                        </label>
                        <Input
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          required
                          placeholder="Seu nome"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          E-mail *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="seu@email.com"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          WhatsApp
                        </label>
                        <Input
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="(11) 99999-9999"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Empresa
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Nome da empresa"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Cargo Atual
                      </label>
                      <Input
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Ex: CMO, VP Marketing, Founder"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Conte-nos sobre seus objetivos
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Descreva brevemente seus principais desafios e o que espera alcançar com a mentoria..."
                        className="w-full"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {loading ? 'Enviando...' : 'Solicitar Diagnóstico'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-accent-foreground">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Pronto Para Acelerar Sua Trajetória?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Fale diretamente com nossa equipe via WhatsApp e agende sua sessão de diagnóstico
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-accent hover:bg-white/90"
                asChild
              >
                <a
                  href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre a Mentoria Executiva 1:1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}