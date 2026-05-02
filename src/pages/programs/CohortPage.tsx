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
import { Users, Target, TrendingUp, Calendar, Clock, CheckCircle2, Star, Award, Zap } from 'lucide-react'
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'

export default function CohortPage() {
  const { submitLead, loading, success, error, reset } = useSubmitLead('mentoria_cohort_leads')
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    company: '',
    role: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <section className="relative py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-accent text-accent-foreground">
                  COHORT EXECUTIVO — TURMAS FECHADAS
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                  Sua Maior Vantagem Competitiva Pode Estar Sentada ao Seu Lado
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Os melhores líderes do mundo não aprendem sozinhos. Aprendem em comunidade — com pares que os desafiam, parceiros que os expandem e um mentor que os orienta.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">
                    <FaWhatsapp className="mr-2 h-5 w-5" />
                    Falar com Especialista
                  </Button>
                  <Button size="lg" variant="outline">
                    <FaLinkedinIn className="mr-2 h-5 w-5" />
                    Conectar no LinkedIn
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={IMAGES.PROG_COHORT_1}
                    alt="Cohort Executivo"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-foreground">Por Que Cohort?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                O Cohort Executivo reúne 8 a 12 líderes cuidadosamente selecionados em uma jornada de 6 meses de aprendizado coletivo, accountability e crescimento acelerado.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'Peer Learning',
                  description: 'Aprenda com executivos que enfrentam desafios similares aos seus. Troca de experiências reais, não teoria.',
                },
                {
                  icon: Target,
                  title: 'Accountability Estruturado',
                  description: 'Compromissos semanais, metas claras e acompanhamento contínuo. Você não está sozinho na jornada.',
                },
                {
                  icon: TrendingUp,
                  title: 'Crescimento Acelerado',
                  description: 'Taxa de promoção 2.3x maior em 12 meses pós-programa. Resultados mensuráveis e comprovados.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="p-8 h-full hover:shadow-xl transition-shadow">
                    <item.icon className="h-12 w-12 text-accent mb-4" />
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-foreground">Perfil do Participante</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Selecionamos cuidadosamente líderes que compartilham ambição, humildade e compromisso com excelência.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Award, text: 'Líderes de Marketing, Estratégia ou Inovação' },
                { icon: TrendingUp, text: 'Executivos em transição para C-Suite' },
                { icon: Zap, text: 'Profissionais com 8+ anos de experiência' },
                { icon: Star, text: 'Comprometidos com crescimento contínuo' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <item.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                    <p className="text-foreground font-medium">{item.text}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Jornada dos 6 Meses</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Cada mês é uma fase estratégica de transformação, construída de forma progressiva e cumulativa.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { month: 'M1', title: 'Diagnóstico', description: 'Mapeamento completo de gaps, oportunidades e objetivos individuais.' },
                { month: 'M2', title: 'Estratégia', description: 'Construção de planos de 90 dias e frameworks de decisão estratégica.' },
                { month: 'M3', title: 'Execução', description: 'Implementação prática com feedback semanal e ajustes em tempo real.' },
                { month: 'M4', title: 'Liderança', description: 'Desenvolvimento de presença executiva e influência organizacional.' },
                { month: 'M5', title: 'IA & Inovação', description: 'Adoção de IA no processo decisório e metodologias de inovação.' },
                { month: 'M6', title: 'Legado', description: 'Consolidação de aprendizados e plano de continuidade pós-programa.' },
              ].map((phase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="p-6 bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-colors">
                    <div className="text-accent text-3xl font-bold mb-2">{phase.month}</div>
                    <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                    <p className="opacity-90 leading-relaxed">{phase.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-foreground">Formato Semanal</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Cadência estruturada para maximizar aprendizado e aplicação prática.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Calendar, title: 'Sessão Ao Vivo', description: '2h semanais com Wellington Queiroz + convidados especiais' },
                { icon: Users, title: 'Peer Groups', description: '1h semanal em grupos de 3-4 para accountability e troca' },
                { icon: Clock, title: 'Office Hours', description: 'Acesso direto ao mentor para dúvidas e orientações' },
                { icon: CheckCircle2, title: 'Projetos Práticos', description: 'Implementação real com feedback contínuo e ajustes' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <item.icon className="h-10 w-10 text-accent mb-4" />
                    <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-foreground">Módulos Programáticos</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Go-To-Market Strategy in the AI Era',
                  topics: ['Posicionamento estratégico', 'Segmentação avançada', 'Proposta de valor diferenciada', 'Canais de aquisição'],
                },
                {
                  title: 'Digital Revenue Architecture',
                  topics: ['Funis de conversão', 'Modelos de atribuição', 'LTV e CAC otimizados', 'Growth loops'],
                },
                {
                  title: 'Leading High-Performance Teams',
                  topics: ['Cultura de dados', 'Gestão de talentos', 'Feedback estruturado', 'OKRs e métricas'],
                },
                {
                  title: 'Executive Communication & Influence',
                  topics: ['Storytelling executivo', 'Apresentações de impacto', 'Stakeholder management', 'Personal branding'],
                },
                {
                  title: 'Innovation Sprint Methodology',
                  topics: ['Design thinking', 'Prototipagem rápida', 'Testes de hipóteses', 'Cultura de experimentação'],
                },
              ].map((module, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-4 text-foreground">{module.title}</h3>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIdx) => (
                        <li key={topicIdx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-foreground">Resultados Comprovados</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { value: '2.3x', label: 'Taxa de promoção em 12 meses' },
                { value: '94%', label: 'Satisfação dos participantes' },
                { value: '87%', label: 'Aplicam aprendizados na semana seguinte' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="p-8 text-center hover:shadow-xl transition-shadow">
                    <div className="text-5xl font-bold text-accent mb-2">{stat.value}</div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="p-8 md:p-12 border-accent/20">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-accent text-accent-foreground">PRÓXIMA TURMA</Badge>
                  <h2 className="text-4xl font-bold mb-4 text-foreground">Agosto 2026</h2>
                  <p className="text-xl text-muted-foreground mb-2">Apenas 3 vagas restantes</p>
                  <p className="text-muted-foreground">Processo seletivo rigoroso. Inscrições até 15 de julho.</p>
                </div>
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Solicitação Enviada!</h3>
                    <p className="text-muted-foreground mb-6">
                      Nossa equipe entrará em contato em até 24h para agendar uma conversa.
                    </p>
                    <Button onClick={reset} variant="outline">
                      Enviar Outra Solicitação
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Nome Completo *</label>
                        <Input
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          required
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">E-mail Corporativo *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">WhatsApp *</label>
                        <Input
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          required
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Empresa</label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Nome da empresa"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Cargo Atual</label>
                      <Input
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Ex: Diretor de Marketing"
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
                      className="w-full bg-accent hover:bg-accent/90"
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Solicitar Vaga na Próxima Turma'}
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Pronto Para Acelerar Sua Jornada Executiva?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Junte-se a líderes que estão redefinindo o futuro do marketing e da inovação.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <FaWhatsapp className="mr-2 h-5 w-5" />
                Falar com Especialista Agora
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
