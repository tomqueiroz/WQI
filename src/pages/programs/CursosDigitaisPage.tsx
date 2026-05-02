import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, PlayCircle, Users, Award, BookOpen, Clock, TrendingUp, Target, Zap, Shield } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const ECOSYSTEM_PILLARS = [
  {
    icon: PlayCircle,
    title: 'Videoaulas Premium',
    description: 'Conteúdo gravado em alta qualidade com Wellington Queiroz'
  },
  {
    icon: Target,
    title: 'Projetos Práticos',
    description: 'Implementação real com feedback personalizado'
  },
  {
    icon: Users,
    title: 'Comunidade Ativa',
    description: 'Networking com milhares de profissionais de marketing'
  },
  {
    icon: Award,
    title: 'Certificação WQI',
    description: 'Reconhecimento profissional que diferencia no mercado'
  }
]

const COURSES = [
  {
    title: 'Marketing Digital Avançado',
    modules: 12,
    duration: '24h',
    description: 'Da estratégia à execução: domine todos os pilares do marketing digital moderno'
  },
  {
    title: 'Analytics & BI para Líderes',
    modules: 8,
    duration: '16h',
    description: 'Decisões baseadas em dados: dashboards, métricas e storytelling com números'
  },
  {
    title: 'Estratégia de Conteúdo com IA',
    modules: 10,
    duration: '20h',
    description: 'Produza conteúdo de alto impacto em escala usando IA Generativa'
  },
  {
    title: 'Performance & Growth Hacking',
    modules: 9,
    duration: '18h',
    description: 'Frameworks de crescimento acelerado e otimização de conversão'
  },
  {
    title: 'LinkedIn para Executivos',
    modules: 6,
    duration: '12h',
    description: 'Construa autoridade e gere leads qualificados na maior rede B2B do mundo'
  }
]

const METHODOLOGY = [
  {
    icon: BookOpen,
    title: 'Learn',
    description: 'Absorva frameworks e metodologias testadas em grandes marcas'
  },
  {
    icon: Zap,
    title: 'Apply',
    description: 'Implemente imediatamente com projetos práticos do seu contexto'
  },
  {
    icon: TrendingUp,
    title: 'Measure',
    description: 'Acompanhe resultados e evolua com métricas claras de progresso'
  }
]

const INCLUSIONS = [
  'Acesso vitalício a todos os cursos',
  'Atualizações de conteúdo sem custo adicional',
  'Certificados de conclusão reconhecidos',
  'Comunidade exclusiva de alunos',
  'Suporte via fórum e Q&A',
  'Material complementar (templates, checklists, frameworks)'
]

const TARGET_PROFILES = [
  {
    title: 'Profissionais em Transição',
    description: 'Analistas e coordenadores buscando promoção para cargos de liderança'
  },
  {
    title: 'Gestores de Marketing',
    description: 'Gerentes e diretores que precisam dominar novas disciplinas digitais'
  },
  {
    title: 'Empreendedores & Founders',
    description: 'Donos de negócio que precisam estruturar marketing de alto padrão'
  }
]

export default function CursosDigitaisPage() {
  const { submitLead, loading, success, error } = useSubmitLead('digital_course_leads')
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    course_interest: '',
    company: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead({
      full_name: formData.full_name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      company: formData.company,
      message: `Interesse em: ${formData.course_interest}`
    })
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <section className="relative py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp}>
                <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                  <span className="text-sm font-medium text-accent tracking-wide">CURSOS DIGITAIS — ACESSO VITALÍCIO</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Conhecimento de Elite. No Seu Ritmo. No Seu Tempo.
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  O acesso ao conhecimento de alto padrão nunca deveria depender de agenda ou fuso horário. Nosso ecossistema de cursos digitais reúne décadas de experiência prática em módulos estruturados, progressivos e aplicáveis.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                    <a href="#catalogo">Ver Catálogo</a>
                  </Button>
                  <Button size="lg" variant="outline">
                    <a href="#form">Falar com Especialista</a>
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
                    src={IMAGES.PROG_DIGITAL_2}
                    alt="Cursos Digitais WQI"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Ecossistema de Aprendizado</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Uma plataforma completa para sua evolução profissional
              </p>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {ECOSYSTEM_PILLARS.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-card p-8 rounded-xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{pillar.title}</h3>
                    <p className="text-muted-foreground">{pillar.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        <section id="catalogo" className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Catálogo de Cursos</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Programas completos para dominar as principais disciplinas do marketing digital
              </p>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {COURSES.map((course, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.modules} módulos</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{course.title}</h3>
                    <p className="text-muted-foreground mb-6">{course.description}</p>
                    <Button variant="outline" className="w-full">
                      <a href="#form">Saiba Mais</a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Metodologia de Aprendizado</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Um ciclo completo de transformação profissional
              </p>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {METHODOLOGY.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">O Que Está Incluído</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Tudo que você precisa para acelerar sua carreira
              </p>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {INCLUSIONS.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-3 bg-card p-6 rounded-xl border border-border"
                >
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Para Quem É</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Profissionais e líderes de marketing em todos os estágios de carreira
              </p>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {TARGET_PROFILES.map((profile, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-card p-8 rounded-xl border border-border hover:border-accent/50 transition-all duration-300"
                >
                  <Shield className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{profile.title}</h3>
                  <p className="text-muted-foreground">{profile.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Resultados Comprovados</h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">4.9/5</div>
                <p className="text-muted-foreground">Satisfação média dos alunos</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">89%</div>
                <p className="text-muted-foreground">Taxa de conclusão dos cursos</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">12.000+</div>
                <p className="text-muted-foreground">Alunos formados</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="form" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-foreground mb-4">Comece Sua Jornada</h2>
                <p className="text-xl text-muted-foreground">
                  Preencha o formulário e receba mais informações sobre nossos cursos
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl border border-border space-y-6">
                  <div>
                    <Label htmlFor="full_name">Nome Completo *</Label>
                    <Input
                      id="full_name"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail Corporativo *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp *</Label>
                    <Input
                      id="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="course_interest">Curso de Interesse *</Label>
                    <Select
                      value={formData.course_interest}
                      onValueChange={(value) => setFormData({ ...formData, course_interest: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um curso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketing-digital">Marketing Digital Avançado</SelectItem>
                        <SelectItem value="analytics-bi">Analytics & BI para Líderes</SelectItem>
                        <SelectItem value="conteudo-ia">Estratégia de Conteúdo com IA</SelectItem>
                        <SelectItem value="growth-hacking">Performance & Growth Hacking</SelectItem>
                        <SelectItem value="linkedin">LinkedIn para Executivos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nome da empresa"
                    />
                  </div>
                  {success && (
                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg text-accent">
                      Mensagem enviada com sucesso! Entraremos em contato em breve.
                    </div>
                  )}
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
                    {loading ? 'Enviando...' : 'Solicitar Informações'}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-accent to-accent/80 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">Pronto Para Transformar Sua Carreira?</h2>
              <p className="text-xl mb-8 text-white/90">
                Junte-se a milhares de profissionais que já aceleraram suas carreiras com nossos cursos
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <a href="#catalogo">Ver Todos os Cursos</a>
                </Button>
                <Button
                  size="lg"
                  className="bg-white text-accent hover:bg-white/90"
                  asChild
                >
                  <a
                    href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os Cursos Digitais WQI."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <SiWhatsapp className="w-5 h-5" />
                    Falar no WhatsApp
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