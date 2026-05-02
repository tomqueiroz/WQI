import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Sparkles, Clock, Users, TrendingUp, CheckCircle2, Zap, Brain, Target, Rocket, Award, Calendar } from 'lucide-react'

export default function MasterclassPage() {
  const { submitLead, loading, success, error, reset } = useSubmitLead('masterclass_ai_leads')
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    company: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-[#000d1e]">
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-purple-500/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 text-sm px-4 py-2">
                  MASTERCLASS INTENSIVA — 8H AO VIVO
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Da Estratégia ao Pipeline. IA Gerando Resultados Reais, Hoje.
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  8 horas que redefinirão a forma como você pensa sobre marketing. Domine as ferramentas, metodologias e frameworks que estão redefinindo a indústria.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-white/90">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span className="font-semibold">Próxima turma: Junho 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="font-semibold">50 vagas disponíveis</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8">
                    Garantir Minha Vaga
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Falar com Especialista
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
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-purple-500/20 mix-blend-overlay" />
                  <img
                    src={IMAGES.PROG_MASTERCLASS_1}
                    alt="MasterClass AI-First Marketing"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-[#000d1e] to-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Por Que Agora?
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                A janela de oportunidade está aberta. Quem dominar IA hoje lidera amanhã.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { stat: '78%', label: 'dos CMOs já usam IA em suas estratégias', icon: Brain },
                { stat: '3x', label: 'ROI médio em campanhas com IA aplicada', icon: TrendingUp },
                { stat: '93%', label: 'aplicam ferramentas na semana seguinte', icon: Rocket }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-8 text-center hover:bg-white/10 transition-all">
                    <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                    <div className="text-5xl font-bold text-accent mb-3">{item.stat}</div>
                    <p className="text-white/80 text-lg">{item.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Para Quem É Esta MasterClass?
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Gerentes de Marketing',
                  description: 'Profissionais que precisam implementar IA nas operações diárias e demonstrar ROI tangível.',
                  icon: Target
                },
                {
                  title: 'Diretores & VPs',
                  description: 'Líderes que buscam transformar estratégias de marketing com adoção acelerada de IA.',
                  icon: Sparkles
                },
                {
                  title: 'Founders & Empreendedores',
                  description: 'Executivos que querem escalar marketing com eficiência máxima e custos otimizados.',
                  icon: Zap
                }
              ].map((profile, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-white/5 border-accent/20 p-8 h-full hover:border-accent/40 transition-all">
                    <profile.icon className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">{profile.title}</h3>
                    <p className="text-white/70 leading-relaxed">{profile.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-primary to-[#000d1e]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Agenda das 8 Horas
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Imersão completa com metodologia prática e aplicação imediata.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  time: '09:00 - 11:00',
                  title: 'Fundamentos de IA Generativa',
                  topics: ['Arquitetura de LLMs', 'Prompt Engineering Avançado', 'Casos de Uso em Marketing']
                },
                {
                  time: '11:00 - 13:00',
                  title: 'Automação de Conteúdo',
                  topics: ['Content Pipelines com IA', 'SEO & IA Generativa', 'Personalização em Escala']
                },
                {
                  time: '14:00 - 16:00',
                  title: 'Analytics & Attribution',
                  topics: ['Predictive Lead Scoring', 'AI-Driven Attribution', 'Dashboard Executivo']
                },
                {
                  time: '16:00 - 18:00',
                  title: 'Implementação Prática',
                  topics: ['Workflows com Make/n8n', 'Integração HubSpot + IA', 'Plano de 30 Dias']
                }
              ].map((block, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-white/5 border-accent/20 p-8 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-6 h-6 text-accent" />
                      <span className="text-accent font-semibold">{block.time}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{block.title}</h3>
                    <ul className="space-y-2">
                      {block.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/70">
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
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

        <section className="py-20 bg-[#000d1e]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                O Que Você Leva
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                'Framework AI-First Marketing completo',
                'Biblioteca de 100+ prompts testados',
                'Templates de automação prontos',
                'Certificado WQI reconhecido',
                'Acesso à gravação por 90 dias',
                'Comunidade exclusiva de praticantes'
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="bg-white/5 border-accent/20 p-6 hover:bg-white/10 transition-all">
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <p className="text-white font-medium">{item}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Módulos Programáticos
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'Generative AI Strategy',
                  description: 'Arquitetura de decisão para líderes de marketing'
                },
                {
                  title: 'Prompt Engineering',
                  description: 'Técnicas avançadas de comunicação com LLMs'
                },
                {
                  title: 'Content Automation',
                  description: 'Pipelines de produção em escala com qualidade'
                },
                {
                  title: 'Predictive Analytics',
                  description: 'Lead scoring e attribution modeling com IA'
                },
                {
                  title: 'Workflow Automation',
                  description: 'Integração HubSpot, Make, n8n e ferramentas'
                }
              ].map((module, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 p-8 h-full hover:border-accent/40 transition-all">
                    <h3 className="text-xl font-bold text-white mb-3">{module.title}</h3>
                    <p className="text-white/70">{module.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-primary to-[#000d1e]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 text-sm px-4 py-2">
                  ÚLTIMAS VAGAS — JUNHO 2026
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Garanta Sua Vaga Agora
                </h2>
                <p className="text-xl text-white/70">
                  Apenas 50 vagas disponíveis. Inscrições encerram em 7 dias.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-white/5 border-accent/20 p-8">
                  {success ? (
                    <div className="text-center py-8">
                      <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Solicitação Enviada!</h3>
                      <p className="text-white/70 mb-6">
                        Nossa equipe entrará em contato em até 24 horas.
                      </p>
                      <Button onClick={reset} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        Enviar Outra Solicitação
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="full_name" className="text-white mb-2 block">Nome Completo</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white mb-2 block">E-mail Corporativo</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="whatsapp" className="text-white mb-2 block">WhatsApp</Label>
                        <Input
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-white mb-2 block">Empresa</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="Nome da empresa"
                        />
                      </div>
                      {error && (
                        <div className="bg-destructive/20 border border-destructive/30 text-destructive px-4 py-3 rounded-lg">
                          {error}
                        </div>
                      )}
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 text-lg"
                      >
                        {loading ? 'Enviando...' : 'Garantir Minha Vaga'}
                      </Button>
                    </form>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-[#000d1e] to-accent/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Não Deixe Seus Concorrentes Saírem na Frente
              </h2>
              <p className="text-xl text-white/80 mb-8">
                A diferença entre liderar e seguir está em agir agora. Junte-se aos executivos que estão redefinindo o marketing com IA.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-12 py-6 text-lg">
                Falar com Especialista no WhatsApp
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}