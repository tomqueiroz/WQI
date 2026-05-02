import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building2, Users, Target, TrendingUp, CheckCircle2, ArrowRight, Sparkles, Zap, BarChart3 } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

export default function InhousePage() {
  const { submitLead, loading, success, error, reset } = useSubmitLead('inhouse_leads')
  const [formData, setFormData] = useState({
    company: '',
    full_name: '',
    email: '',
    whatsapp: '',
    employees: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead({
      full_name: formData.full_name,
      email: formData.email,
      company: formData.company,
      whatsapp: formData.whatsapp,
      message: `Funcionários: ${formData.employees}. Objetivo: ${formData.message}`
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                  <Building2 className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">IN-COMPANY</span>
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
                  A Transformação Mais Eficaz Começa Dentro de Casa
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Quando o conhecimento chega até o seu time — no contexto do seu negócio, com a linguagem da sua cultura e a urgência dos seus desafios — a mudança acontece de verdade.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                    Solicitar Diagnóstico
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/5">
                    <SiWhatsapp className="mr-2 w-4 h-4" />
                    Falar com Especialista
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
                  <img
                    src={IMAGES.PROG_INHOUSE_3}
                    alt="In-Company Transformation"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
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
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                O Desafio das Empresas
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Três obstáculos que impedem a transformação digital de acontecer
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'Times Desalinhados',
                  description: 'Liderança quer inovação, mas a execução segue processos antigos. Falta linguagem comum e visão compartilhada.'
                },
                {
                  icon: Target,
                  title: 'Conhecimento Genérico',
                  description: 'Cursos online não resolvem. Sua empresa tem desafios únicos que exigem soluções personalizadas e contextualizadas.'
                },
                {
                  icon: TrendingUp,
                  title: 'Urgência sem Método',
                  description: 'Pressão por resultados rápidos sem estrutura para implementação. Iniciativas morrem na primeira dificuldade.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-card rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
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
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Nossa Abordagem
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Metodologia comprovada em 4 fases para transformação sustentável
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  phase: '01',
                  title: 'Diagnóstico Profundo',
                  description: 'Mapeamento de maturidade digital, gaps de competência e oportunidades de impacto rápido.'
                },
                {
                  phase: '02',
                  title: 'Design Personalizado',
                  description: 'Programa sob medida com conteúdo, formato e cadência alinhados à sua realidade e objetivos.'
                },
                {
                  phase: '03',
                  title: 'Implementação Ativa',
                  description: 'Workshops práticos, sprints de execução e acompanhamento contínuo com métricas claras.'
                },
                {
                  phase: '04',
                  title: 'Sustentação',
                  description: 'Suporte pós-programa, comunidade de prática e revisões trimestrais para garantir continuidade.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="text-5xl font-bold text-accent/20 mb-4">{item.phase}</div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Formatos Disponíveis
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Escolha o modelo que melhor se adapta à sua organização
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: 'Workshops Intensivos',
                  duration: '1-3 dias',
                  description: 'Imersão concentrada para kickoff de transformação ou capacitação rápida em temas específicos.',
                  ideal: 'Times de 10-30 pessoas'
                },
                {
                  icon: Zap,
                  title: 'Programas de Transformação',
                  duration: '3-6 meses',
                  description: 'Jornada estruturada com sessões semanais, projetos práticos e acompanhamento executivo.',
                  ideal: 'Times de 20-100 pessoas'
                },
                {
                  icon: BarChart3,
                  title: 'Consultoria Estratégica',
                  duration: 'Customizado',
                  description: 'Parceria de longo prazo com diagnóstico contínuo, implementação e otimização de processos.',
                  ideal: 'Empresas 100+ pessoas'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-card rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <div className="text-sm text-accent font-medium mb-4">{item.duration}</div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  <div className="text-sm text-muted-foreground font-medium">{item.ideal}</div>
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
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Temas Disponíveis
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conteúdo modular adaptado às necessidades da sua empresa
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Digital Culture & AI Adoption',
                  topics: ['Mindset de transformação', 'IA no dia a dia', 'Cultura data-driven', 'Change management']
                },
                {
                  title: 'Marketing Performance',
                  topics: ['Growth hacking', 'Analytics avançado', 'Automação de marketing', 'Attribution modeling']
                },
                {
                  title: 'Customer Experience AI-First',
                  topics: ['Personalização em escala', 'Jornada do cliente', 'CRM inteligente', 'Chatbots e automação']
                },
                {
                  title: 'Data Literacy para Líderes',
                  topics: ['Dashboards executivos', 'KPIs estratégicos', 'Storytelling com dados', 'Decisão baseada em evidências']
                },
                {
                  title: 'Innovation Sprints',
                  topics: ['Design thinking', 'Prototipagem rápida', 'Testes A/B', 'MVP e validação']
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.topics.map((topic, topicIdx) => (
                      <li key={topicIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
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
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Resultados Comprovados
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { value: '+35%', label: 'Performance de Marketing Digital em 90 dias' },
                { value: '4.8/5', label: 'Satisfação média dos participantes' },
                { value: '87%', label: 'Aplicam o aprendizado na primeira semana' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Solicite um Diagnóstico Gratuito
                </h2>
                <p className="text-lg text-muted-foreground">
                  Vamos entender seus desafios e desenhar uma proposta personalizada
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-2xl p-8 border border-border shadow-xl"
              >
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Solicitação Enviada!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Nossa equipe entrará em contato em até 24 horas para agendar o diagnóstico.
                    </p>
                    <Button onClick={reset} variant="outline">
                      Enviar Nova Solicitação
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Empresa *
                        </label>
                        <Input
                          required
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          placeholder="Nome da empresa"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Seu Nome *
                        </label>
                        <Input
                          required
                          value={formData.full_name}
                          onChange={(e) => handleChange('full_name', e.target.value)}
                          placeholder="Nome completo"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          E-mail Corporativo *
                        </label>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          WhatsApp
                        </label>
                        <Input
                          value={formData.whatsapp}
                          onChange={(e) => handleChange('whatsapp', e.target.value)}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Número de Funcionários *
                      </label>
                      <Select value={formData.employees} onValueChange={(value) => handleChange('employees', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o porte da empresa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5-50">5-50 funcionários</SelectItem>
                          <SelectItem value="51-200">51-200 funcionários</SelectItem>
                          <SelectItem value="201-500">201-500 funcionários</SelectItem>
                          <SelectItem value="500+">500+ funcionários</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Objetivo do Programa
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Descreva brevemente os principais desafios e objetivos da sua empresa..."
                        rows={4}
                      />
                    </div>
                    {error && (
                      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                        {error}
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-accent hover:bg-accent/90 text-white"
                      size="lg"
                    >
                      {loading ? 'Enviando...' : 'Solicitar Diagnóstico Gratuito'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Pronto para Transformar Sua Empresa?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Agende uma conversa estratégica sem compromisso e descubra como podemos acelerar sua transformação digital.
              </p>
              <Button
                size="lg"
                className="bg-white text-accent hover:bg-white/90"
              >
                <SiWhatsapp className="mr-2 w-5 h-5" />
                Falar com Especialista no WhatsApp
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}