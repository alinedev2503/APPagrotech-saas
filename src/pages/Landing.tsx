import { useState } from 'react'
import {
  Sprout,
  ChevronDown,
  Check,
  Star,
  Menu,
  X,
  ArrowRight,
  Shield,
  BarChart3,
  CloudSun,
  Tractor,
  Warehouse,
  Users,
  Smartphone,
  Wifi,
  Clock,
  TrendingUp,
  FlaskConical,
  ScrollText,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const benefits = [
  {
    icon: BarChart3,
    title: 'Painel unificado',
    description: 'Todas as operações da fazenda em um só lugar. De insumos a vendas, sem planilhas ou sistemas isolados.',
  },
  {
    icon: CloudSun,
    title: 'Clima e mercado em tempo real',
    description: 'Alertas de geada, estresse térmico e cotações da B3 integrados automaticamente ao seu planejamento.',
  },
  {
    icon: FlaskConical,
    title: 'Manejo sanitário inteligente',
    description: 'Calendário de vacinas, histórico do rebanho e alertas preventivos para reduzir perdas.',
  },
  {
    icon: Tractor,
    title: 'Agricultura de precisão',
    description: 'Talhões mapeados, produtividade por gleba e recomendações baseadas em dados reais da sua safra.',
  },
  {
    icon: Warehouse,
    title: 'Estoque enxuto',
    description: 'Controle de insumos com alerta de vencimento e reposição automática. Nunca mais compre o que já tem.',
  },
  {
    icon: Users,
    title: 'Gestão de equipe no campo',
    description: 'Escala de funcionários, tarefas por talhão e comunicação direta — mesmo offline.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Conecte sua fazenda',
    description: 'Cadastre talhões, rebanho, insumos e equipe em menos de 30 minutos. Importação via planilha ou manual.',
  },
  {
    number: '02',
    title: 'Acompanhe em tempo real',
    description: 'Painéis automáticos com clima, mercado, estoque e sanidade. Alertas no celular sem precisar ligar nada.',
  },
  {
    number: '03',
    title: 'Decida com dados',
    description: 'Relatórios prontos para financiamento, auditoria e planejamento da próxima safra. Deixe o achismo de lado.',
  },
]

const testimonials = [
  {
    name: 'Carlos Mendes',
    farm: 'Fazenda Santa Helena',
    text: 'Reduzi em 40% as perdas por geada graças aos alertas antecipados. O AgroControl virou meu braço direito no campo.',
    rating: 5,
  },
  {
    name: 'Ana Oliveira',
    farm: 'Agropecuária Boi Verde',
    text: 'Unificamos 4 planilhas diferentes em um só sistema. Economizamos 12 horas por semana só na gestão de estoque.',
    rating: 5,
  },
  {
    name: 'Roberto Lima',
    farm: 'Sítio São José',
    text: 'O manejo sanitário salvou 15 cabeças no último surto. O calendário automático de vacinas evitou o pior.',
    rating: 5,
  },
  {
    name: 'Fernanda Costa',
    farm: 'Fazenda Boa Esperança',
    text: 'Relatórios prontos para o banco em 2 cliques. Consegui um crédito rural 60% mais rápido que no ano passado.',
    rating: 5,
  },
]

const faqs = [
  {
    q: 'Precisa de internet no campo?',
    a: 'Não. O AgroControl funciona offline e sincroniza quando houver conexão. Você registra tudo no talhão e os dados sobem automaticamente.',
  },
  {
    q: 'Funciona para pequenas propriedades?',
    a: 'Sim. O plano inicial cobre até 200 hectares e 50 cabeças. Se precisar de mais, os planos crescem com você.',
  },
  {
    q: 'Posso migrar meus dados de planilhas?',
    a: 'Sim. Importamos CSV, Excel e até dados de sistemas concorrentes. A equipe de onboarding faz isso por você em até 48h.',
  },
  {
    q: 'Tem aplicativo mobile?',
    a: 'Sim. Android e iOS com funcionalidade completa offline. O que você registra no campo aparece no painel web na hora.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'Suporte por WhatsApp com resposta em até 2h em dias úteis. Planos Pro têm canal prioritário e gerente dedicado.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim. Sem fidelidade. Cancele pelo painel a qualquer momento. Se cancelar nos primeiros 14 dias, devolvemos 100%.',
  },
]

const plans = [
  {
    name: 'Essencial',
    price: 'R$ 97',
    period: '/mês',
    description: 'Para pequenos produtores começando a digitalizar a gestão.',
    features: [
      'Até 200 hectares',
      'Até 50 cabeças',
      'Painel financeiro básico',
      'Alertas climáticos',
      'Cotações B3',
      'Suporte WhatsApp',
      '1 usuário',
    ],
    cta: 'Começar grátis',
    highlighted: false,
  },
  {
    name: 'Profissional',
    price: 'R$ 197',
    period: '/mês',
    description: 'Para fazendas em crescimento com operação mais complexa.',
    features: [
      'Até 800 hectares',
      'Até 300 cabeças',
      'Tudo do Essencial',
      'Manejo sanitário completo',
      'Agricultura de precisão',
      'Relatórios bancários',
      '3 usuários',
      'Suporte prioritário',
    ],
    cta: 'Começar grátis',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    period: '',
    description: 'Para grupos e usinas com múltiplas unidades.',
    features: [
      'Hectares ilimitados',
      'Rebanho ilimitado',
      'Tudo do Profissional',
      'API para integração',
      'Gerente de conta dedicado',
      'Usuários ilimitados',
      'Onboarding presencial',
      'SLA 4h',
    ],
    cta: 'Falar com vendas',
    highlighted: false,
  },
]

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2">
              <Sprout className="text-primary" size={28} />
              <span className="text-xl font-bold tracking-tight">
                AGRO<span className="text-stone-900">CONTROL</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-500">
              <button onClick={() => scrollTo('benefits')} className="hover:text-primary transition-colors">Recursos</button>
              <button onClick={() => scrollTo('how-it-works')} className="hover:text-primary transition-colors">Como funciona</button>
              <button onClick={() => scrollTo('pricing')} className="hover:text-primary transition-colors">Preços</button>
              <button onClick={() => scrollTo('faq')} className="hover:text-primary transition-colors">Dúvidas</button>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button className="px-5 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
                Entrar
              </button>
              <button
                onClick={() => scrollTo('hero-cta')}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95"
              >
                Começar grátis
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-stone-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                <button onClick={() => scrollTo('benefits')} className="p-3 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-xl text-left">Recursos</button>
                <button onClick={() => scrollTo('how-it-works')} className="p-3 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-xl text-left">Como funciona</button>
                <button onClick={() => scrollTo('pricing')} className="p-3 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-xl text-left">Preços</button>
                <button onClick={() => scrollTo('faq')} className="p-3 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-xl text-left">Dúvidas</button>
                <hr className="my-2 border-stone-100" />
                <button className="p-3 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-xl text-left">Entrar</button>
                <button
                  onClick={() => scrollTo('hero-cta')}
                  className="p-3 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl text-center mt-2"
                >
                  Começar grátis
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-light text-primary text-xs font-bold rounded-full mb-6">
              <Smartphone size={14} />
              Lançamento 2026 — 14 dias grátis
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-stone-900">
              Sua fazenda no controle.{' '}
              <span className="text-primary">Não o contrário.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
              Chega de planilhas perdidas, alertas que chegam tarde e decisão no achismo.
              O AgroControl unifica clima, mercado, sanidade, estoque e equipe em um painel que funciona até offline.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" id="hero-cta">
              <button className="px-8 py-4 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded-2xl shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center">
                Começar meu teste grátis
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 text-base font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-2xl transition-colors w-full sm:w-auto justify-center flex items-center gap-2">
                Ver demonstração
                <ChevronDown size={18} />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-400">
              <span className="flex items-center gap-1.5"><Shield size={14} /> Sem fidelidade</span>
              <span className="flex items-center gap-1.5"><Wifi size={14} /> Funciona offline</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> Setup em 30 min</span>
            </div>
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
            <div className="bg-stone-50 border border-stone-200 rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 bg-stone-100 border-b border-stone-200">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-stone-400 font-mono">app.agrocontrol.com.br/dashboard</span>
              </div>
              <div className="p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-3"><BarChart3 size={14} /> Clima</div>
                  <div className="text-2xl font-bold text-stone-900">28°C</div>
                  <div className="text-xs text-stone-400 mt-1">Umidade 62% · Vento 12 km/h</div>
                  <div className="mt-3 h-2 w-full bg-amber-100 rounded-full"><div className="h-2 w-3/4 bg-amber-500 rounded-full" /></div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-3"><TrendingUp size={14} /> Boi Gordo</div>
                  <div className="text-2xl font-bold text-green-600">R$ 245,50</div>
                  <div className="text-xs text-green-500 mt-1">▲ 1,2% hoje</div>
                  <div className="mt-3 h-2 w-full bg-green-100 rounded-full"><div className="h-2 w-4/5 bg-green-500 rounded-full" /></div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-3"><FlaskConical size={14} /> Sanidade</div>
                  <div className="text-2xl font-bold text-stone-900">3 alertas</div>
                  <div className="text-xs text-amber-500 mt-1">2 vacinas vencendo esta semana</div>
                  <div className="mt-3 h-2 w-full bg-amber-100 rounded-full"><div className="h-2 w-1/4 bg-red-500 rounded-full" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / STATS */}
      <section className="py-12 border-y border-stone-100 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">850+</div>
              <div className="text-sm text-stone-500 mt-1">fazendas cadastradas</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">42 mil</div>
              <div className="text-sm text-stone-500 mt-1">cabeças monitoradas</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">180 mil</div>
              <div className="text-sm text-stone-500 mt-1">hectares geridos</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">98%</div>
              <div className="text-sm text-stone-500 mt-1">retenção de clientes</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20 sm:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Tudo que sua fazenda precisa em um só lugar
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              Seis módulos integrados que trabalham juntos para você tomar decisões mais rápidas e certeiras.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white border border-stone-100 rounded-2xl p-6 hover:shadow-lg hover:border-stone-200 transition-all"
              >
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center text-primary mb-4">
                  <benefit.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{benefit.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 sm:py-28 px-4 bg-stone-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Começar leva menos de 30 minutos
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              Sem implementação complexa. Sem consultoria cara. Sem desculpas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-extrabold mx-auto shadow-lg shadow-primary/20">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mt-6 mb-3">{step.title}</h3>
                <p className="text-stone-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-8 py-4 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded-2xl shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95">
              Quero começar agora
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Quem usa, aprova
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              Produtores reais, resultados reais. Veja o que estão dizendo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-sm text-stone-900">{t.name}</div>
                  <div className="text-xs text-stone-400">{t.farm}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 sm:py-28 px-4 bg-stone-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Planos que crescem com você
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              Do pequeno produtor ao grande grupo. Sem surpresas no fim do mês.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className={`rounded-2xl border-2 p-8 flex flex-col ${
                  plan.highlighted
                    ? 'border-primary bg-white shadow-xl shadow-primary/10 scale-105'
                    : 'border-stone-100 bg-white shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <div className="text-xs font-bold text-primary bg-primary-light px-3 py-1 rounded-full inline-block w-fit mb-4">
                    MAIS POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-stone-900">{plan.name}</h3>
                <p className="text-sm text-stone-500 mt-1">{plan.description}</p>

                <div className="mt-6 mb-8">
                  <span className="text-4xl font-extrabold text-stone-900">{plan.price}</span>
                  {plan.period && <span className="text-stone-400 text-sm ml-1">{plan.period}</span>}
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-stone-600">
                      <Check size={18} className="text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
                    plan.highlighted
                      ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-hover'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-stone-400 flex items-center justify-center gap-2">
              <Shield size={14} /> Teste grátis por 14 dias. Sem cartão de crédito. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Dúvidas frequentes
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              Tudo que você precisa saber antes de começar.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-stone-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  {faq.q}
                  <ChevronDown
                    size={18}
                    className={`text-stone-400 transition-transform duration-200 shrink-0 ml-2 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-stone-500 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-28 px-4 bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Sua fazenda merece uma gestão à altura dela
          </h2>
          <p className="mt-4 text-lg text-stone-400">
            Junte-se a 850+ produtores que já trocaram o achismo por dados.
            Teste grátis por 14 dias, sem compromisso.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 text-base font-bold text-stone-900 bg-white hover:bg-stone-100 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center">
              Começar meu teste grátis
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 text-base font-semibold text-white border-2 border-stone-600 hover:border-stone-400 rounded-2xl transition-colors w-full sm:w-auto justify-center flex items-center gap-2">
              Falar com consultor
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500">
            <span className="flex items-center gap-1.5"><Shield size={14} /> Sem fidelidade</span>
            <span className="flex items-center gap-1.5"><ScrollText size={14} /> Sem cartão de crédito</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> Cancele quando quiser</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 bg-stone-950 text-stone-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-white mb-4">
                <Sprout size={22} />
                <span className="text-lg font-bold tracking-tight">
                  AGRO<span className="text-stone-300">CONTROL</span>
                </span>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed">
                Gestão agropecuária inteligente para produtores que não querem perder tempo com planilha.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-widest mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollTo('benefits')} className="hover:text-white transition-colors">Recursos</button></li>
                <li><button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors">Preços</button></li>
                <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">Como funciona</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-widest mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-white transition-colors cursor-pointer">Sobre</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Blog</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Contato</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-white transition-colors cursor-pointer">Privacidade</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Termos</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">LGPD</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-800 text-xs text-stone-600 text-center">
            &copy; {new Date().getFullYear()} AgroControl. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
