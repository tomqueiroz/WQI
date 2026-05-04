import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, LayoutDashboard, Shield, ChevronUp, MessageCircle, Mail, MapPin, ChevronDown, ChevronRight, Building2, Calendar } from 'lucide-react';
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NAV_ITEMS, LMS_ROUTES } from '@/lib/index';
import { useAuth } from '@/contexts/AuthContext';
import { IMAGES } from '@/assets/images';
import { supabase } from '@/integrations/supabase/client';

interface LayoutProps {
  children: React.ReactNode;
}

const EMPRESAS_SUBMENU = [
  { label: 'Liderança AI First™ Corporativa', href: LMS_ROUTES.CORP_AI_LEADERSHIP },
  { label: 'Imersão AI First™ in Company', href: LMS_ROUTES.CORP_AI_IMMERSION },
  { label: 'Formação de Mentores IA', href: LMS_ROUTES.CORP_MENTOR_FORM },
  { label: 'Advisory Executivo AI', href: LMS_ROUTES.CORP_EXEC_ADVISORY },
];

const PROGRAM_SUBMENU = [
  { label: 'Mentoria Executiva 1:1', href: LMS_ROUTES.PROG_1ON1 },
  { label: 'Cohort Executivo', href: LMS_ROUTES.PROG_COHORT },
  { label: 'In-Company Transformation', href: LMS_ROUTES.PROG_INHOUSE },
  { label: 'MasterClass AI-First', href: LMS_ROUTES.PROG_MASTERCLASS },
  { label: 'Keynotes & Palestras', href: LMS_ROUTES.PROG_KEYNOTE },
  { label: 'Cursos Digitais', href: LMS_ROUTES.PROG_DIGITAL },
];

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [exitIntentOpen, setExitIntentOpen] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [exitFormData, setExitFormData] = useState({ full_name: '', email: '', whatsapp: '' });
  const [exitFormLoading, setExitFormLoading] = useState(false);
  const [exitFormSuccess, setExitFormSuccess] = useState(false);
  const [showProgramasMenu, setShowProgramasMenu] = useState(false);
  const [showEmpresasMenu, setShowEmpresasMenu] = useState(false);
  const [programasMobileOpen, setProgramasMobileOpen] = useState(false);
  const [empresasMobileOpen, setEmpresasMobileOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hasShown = localStorage.getItem('wqi_exit_v2');
    if (hasShown) {
      setExitIntentShown(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5 && !exitIntentShown) {
        setExitIntentOpen(true);
        setExitIntentShown(true);
        localStorage.setItem('wqi_exit_v2', 'true');
      }
    };

    timeoutId = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [exitIntentShown]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navega para rota e rola para o topo imediatamente
  const handleNavClick = (href: string) => {
    navigate(href);
    // Garante scroll ao topo após a navegação (funciona com HashRouter)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }), 0);
  };

  const handleNavClickMobile = (href: string) => {
    setMobileMenuOpen(false);
    navigate(href);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }), 0);
  };

  const handleExitFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setExitFormLoading(true);

    try {
      const { error } = await supabase.from('leads').insert({
        full_name: exitFormData.full_name,
        email: exitFormData.email,
        whatsapp: exitFormData.whatsapp || null,
        source: 'exit_intent',
      });

      if (error) throw error;

      setExitFormSuccess(true);
      setTimeout(() => {
        setExitIntentOpen(false);
        setExitFormData({ full_name: '', email: '', whatsapp: '' });
        setExitFormSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting exit intent form:', error);
    } finally {
      setExitFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="fixed top-3 left-3 right-3 md:top-4 md:left-4 md:right-4 z-50 max-w-7xl mx-auto"
      >
        <div
        className={`h-14 md:h-16 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'bg-gray-800/70 backdrop-blur-2xl border border-white/10 shadow-xl'
              : 'bg-gray-900/30 backdrop-blur-sm border border-white/5'
          }`}
        >
          <div className="flex items-center justify-between h-full px-4 md:px-6">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center cursor-pointer"
              aria-label="Ir para página inicial"
            >
              <img
                src={IMAGES.LOGO_RECOGNISE_BRANCO}
                alt="Recognise"
                className="h-10 md:h-[52px] w-auto object-contain"
                style={{ minWidth: '130px', opacity: 0.8 }}
              />
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const isRoute = item.href.startsWith('/');
                const isProgramas = item.label === 'Programas';
                const isEmpresas = item.label === 'Para Empresas';

                if (isProgramas) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setShowProgramasMenu(true)}
                      onMouseLeave={() => setShowProgramasMenu(false)}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="text-white/85 hover:text-white transition nav-item flex items-center gap-1 cursor-pointer"
                        style={{ fontSize: '0.9375rem', fontWeight: 300, letterSpacing: '0.055em', background: 'none', border: 'none', padding: 0 }}
                      >
                        {item.label}
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      <AnimatePresence>
                        {showProgramasMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-72 bg-[#001123] rounded-xl border shadow-xl overflow-hidden"
                            style={{ borderColor: 'rgba(122,98,7,0.25)' }}
                          >
                            {PROGRAM_SUBMENU.map((subItem) => (
                              <button
                                key={subItem.href}
                                onClick={() => { handleNavClick(subItem.href); setShowProgramasMenu(false); }}
                                className="flex items-center gap-2 px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors w-full text-left"
                              >
                                <ChevronRight className="w-4 h-4" style={{ color: '#7a6207' }} />
                                <span className="text-sm" style={{ fontWeight: 300, letterSpacing: '0.03em' }}>
                                  {subItem.label}
                                </span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (isEmpresas) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setShowEmpresasMenu(true)}
                      onMouseLeave={() => setShowEmpresasMenu(false)}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all hover:scale-105 nav-item cursor-pointer"
                        style={{ fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '0.055em', background: 'rgba(122,98,7,0.18)', color: '#c9a227', border: '1px solid rgba(122,98,7,0.35)' }}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        {item.label}
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      <AnimatePresence>
                        {showEmpresasMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-72 bg-[#001123] rounded-xl border shadow-xl overflow-hidden"
                            style={{ borderColor: 'rgba(122,98,7,0.35)' }}
                          >
                            <div className="px-4 py-2 border-b" style={{ borderColor: 'rgba(122,98,7,0.2)' }}>
                              <span className="text-xs font-semibold uppercase" style={{ color: '#c9a227', letterSpacing: '0.1em' }}>Soluções para Empresas</span>
                            </div>
                            {EMPRESAS_SUBMENU.map((subItem) => (
                              <button
                                key={subItem.href}
                                onClick={() => { handleNavClick(subItem.href); setShowEmpresasMenu(false); }}
                                className="flex items-center gap-2 px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors w-full text-left"
                              >
                                <ChevronRight className="w-4 h-4" style={{ color: '#7a6207' }} />
                                <span className="text-sm" style={{ fontWeight: 300, letterSpacing: '0.03em' }}>
                                  {subItem.label}
                                </span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (isRoute) {
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="text-white/85 hover:text-white transition nav-item cursor-pointer"
                      style={{ fontSize: '0.9375rem', fontWeight: 300, letterSpacing: '0.055em', background: 'none', border: 'none', padding: 0 }}
                    >
                      {item.label}
                    </button>
                  );
                }
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-white/85 hover:text-white transition nav-item"
                    style={{ fontSize: '0.9375rem', fontWeight: 300, letterSpacing: '0.055em' }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              {user && profile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none focus:ring-2 focus:ring-accent rounded-full">
                      <Avatar className="w-9 h-9 bg-accent text-white cursor-pointer">
                        <AvatarFallback className="bg-accent text-white font-semibold">
                          {getInitials(profile.full_name)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to={LMS_ROUTES.DASHBOARD} className="cursor-pointer">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={LMS_ROUTES.PROFILE} className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        Meu Perfil
                      </Link>
                    </DropdownMenuItem>
                    {(profile.role === 'admin' || profile.role === 'mentor') && (
                      <DropdownMenuItem asChild>
                        <Link to={LMS_ROUTES.ADMIN} className="cursor-pointer">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    asChild
                    className="hidden md:inline-flex border border-white/25 text-white/80 text-xs h-8 px-3 hover:bg-white/10"
                  >
                    <Link to={LMS_ROUTES.LOGIN}>Entrar</Link>
                  </Button>
                  <Button
                    asChild
                    className="hidden md:inline-flex text-xs font-semibold h-8 px-4 rounded-full transition-all hover:scale-105"
                    style={{ background: '#7a6207', color: 'white' }}
                  >
                    <a href="https://calendly.com/tom-queiroz-pareto/30min" target="_blank" rel="noopener noreferrer">
                      Agende com Especialista
                    </a>
                  </Button>
                </>
              )}

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    aria-label="Toggle menu"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {NAV_ITEMS.map((item) => {
                      const isRoute = item.href.startsWith('/');
                      const isProgramas = item.label === 'Programas';
                      const isEmpresasMobile = item.label === 'Para Empresas';

                      if (isProgramas) {
                        return (
                          <div key={item.href}>
                            <button
                              onClick={() => setProgramasMobileOpen(!programasMobileOpen)}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-foreground hover:bg-muted rounded-md transition-colors"
                              style={{ fontSize: '0.9375rem', fontWeight: 300, letterSpacing: '0.055em' }}
                            >
                              <span>{item.label}</span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${programasMobileOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {programasMobileOpen && (
                              <div className="ml-4 mt-2 flex flex-col gap-1">
                                {PROGRAM_SUBMENU.map((subItem) => (
                                  <button
                                    key={subItem.href}
                                    onClick={() => handleNavClickMobile(subItem.href)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors w-full text-left"
                                  >
                                    <ChevronRight className="w-3.5 h-3.5" style={{ color: '#7a6207' }} />
                                    {subItem.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (isEmpresasMobile) {
                        return (
                          <div key={item.href}>
                            <button
                              onClick={() => setEmpresasMobileOpen(!empresasMobileOpen)}
                              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-semibold transition-colors"
                              style={{ fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '0.055em', background: 'rgba(122,98,7,0.12)', color: '#7a6207', border: '1px solid rgba(122,98,7,0.25)' }}
                            >
                              <span className="flex items-center gap-2"><Building2 size={15} />{item.label}</span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${empresasMobileOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {empresasMobileOpen && (
                              <div className="ml-4 mt-2 flex flex-col gap-1">
                                <button
                                  onClick={() => handleNavClickMobile(item.href)}
                                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors w-full text-left"
                                  style={{ color: '#c9a227', fontWeight: 600 }}
                                >
                                  <Building2 className="w-3.5 h-3.5" style={{ color: '#7a6207' }} />
                                  Visão Geral Para Empresas
                                </button>
                                {EMPRESAS_SUBMENU.map((subItem) => (
                                  <button
                                    key={subItem.href}
                                    onClick={() => handleNavClickMobile(subItem.href)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors w-full text-left"
                                  >
                                    <ChevronRight className="w-3.5 h-3.5" style={{ color: '#7a6207' }} />
                                    {subItem.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (isRoute) {
                        return (
                          <button
                            key={item.href}
                            onClick={() => handleNavClickMobile(item.href)}
                            className="px-4 py-2.5 text-foreground hover:bg-muted rounded-md transition-colors w-full text-left"
                            style={{ fontSize: '0.9375rem', fontWeight: 300, letterSpacing: '0.055em', background: 'none', border: 'none' }}
                          >
                            {item.label}
                          </button>
                        );
                      }
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-4 py-2.5 text-foreground hover:bg-muted rounded-md transition-colors"
                          style={{ fontSize: '0.9375rem', fontWeight: 300, letterSpacing: '0.055em' }}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                    <div className="border-t pt-4 mt-4 flex flex-col gap-2">
                      {user && profile ? (
                        <>
                          <Button asChild variant="outline" className="w-full">
                            <Link to={LMS_ROUTES.DASHBOARD} onClick={() => setMobileMenuOpen(false)}>
                              <LayoutDashboard className="w-4 h-4 mr-2" />
                              Dashboard
                            </Link>
                          </Button>
                          <Button onClick={handleSignOut} variant="outline" className="w-full">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sair
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button asChild variant="outline" className="w-full">
                            <Link to={LMS_ROUTES.LOGIN} onClick={() => setMobileMenuOpen(false)}>
                              Entrar
                            </Link>
                          </Button>
                          <Button asChild className="w-full text-white font-semibold" style={{ background: '#7a6207' }}>
                            <a
                              href="https://calendly.com/tom-queiroz-pareto/30min"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Agende com Especialista
                            </a>
                          </Button>
                        </>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* WhatsApp flutuante - acima do botão Calendly */}
      <AnimatePresence>
        <motion.a
          href="https://wa.me/5511915513210?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20Recognise."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="fixed bottom-24 left-6 z-40 bg-green-600 text-white rounded-full px-5 py-3 shadow-xl text-sm font-semibold flex items-center gap-2 hover:bg-green-700 transition-colors"
        >
          <FaWhatsapp className="w-4 h-4" />
          Falar com Especialista
        </motion.a>
      </AnimatePresence>

      {/* Diagnóstico Gratuito - link Calendly - inferior esquerdo */}
      <AnimatePresence>
        <motion.a
          href="https://calendly.com/tom-queiroz-pareto/30min"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-6 left-6 z-40 text-white rounded-full px-5 py-3 shadow-xl text-sm font-semibold flex items-center gap-2 transition-colors hover:opacity-90"
          style={{ background: '#7a6207' }}
        >
          <Calendar className="w-4 h-4" />
          Diagnóstico Gratuito
        </motion.a>
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 bg-primary/80 text-white rounded-full p-3 shadow-xl hover:bg-primary transition-colors"
            aria-label="Voltar ao topo"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <Dialog open={exitIntentOpen} onOpenChange={setExitIntentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Antes de ir...</DialogTitle>
            <DialogDescription>
              Deixe seu contato ou agende um diagnóstico gratuito com nossos especialistas em IA.
            </DialogDescription>
          </DialogHeader>

          {/* Opção de agendamento em destaque */}
          <div className="flex flex-col gap-2 pb-1">
            <a
              href="https://calendly.com/tom-queiroz-pareto/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setExitIntentOpen(false)}
              className="w-full flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold text-white transition hover:opacity-90"
              style={{ background: '#7a6207' }}
            >
              <Calendar className="w-4 h-4" />
              Agendar Diagnóstico Gratuito (30 min)
            </a>
            <p className="text-center text-xs text-muted-foreground">— ou deixe seu contato —</p>
          </div>

          {exitFormSuccess ? (
            <div className="py-8 text-center">
              <p className="text-lg font-semibold text-accent">Obrigado!</p>
              <p className="text-sm text-muted-foreground mt-2">Entraremos em contato em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleExitFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="exit-name">Nome Completo *</Label>
                <Input
                  id="exit-name"
                  required
                  value={exitFormData.full_name}
                  onChange={(e) => setExitFormData({ ...exitFormData, full_name: e.target.value })}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <Label htmlFor="exit-email">Email *</Label>
                <Input
                  id="exit-email"
                  type="email"
                  required
                  value={exitFormData.email}
                  onChange={(e) => setExitFormData({ ...exitFormData, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <Label htmlFor="exit-whatsapp">WhatsApp (opcional)</Label>
                <Input
                  id="exit-whatsapp"
                  value={exitFormData.whatsapp}
                  onChange={(e) => setExitFormData({ ...exitFormData, whatsapp: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <Button type="submit" disabled={exitFormLoading} className="w-full bg-accent text-white hover:bg-accent/90">
                {exitFormLoading ? 'Enviando...' : 'Quero ser contactado'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <footer className="bg-[#001123] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <img
                src={IMAGES.LOGO_RECOGNISE_BRANCO}
                alt="Recognise"
                className="h-10 mb-4"
              />
              <p className="text-white/60 text-sm mb-4 leading-relaxed" style={{ fontWeight: 300 }}>
                Especialistas em desenvolvimento de habilidades baseadas em IA para profissionais e corporações que já decidiram liderar na nova Era da Inteligência Artificial.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/in/wellingtonqueiroz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-accent transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a
                  href="https://instagram.com/wellingtonqueiroz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-accent transition"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://twitter.com/wellingtonqueiroz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-accent transition"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter size={18} />
                </a>
              </div>
            </div>

            <div>
              <h6 className="text-white/40 text-xs uppercase tracking-widest mb-4">Links Rápidos</h6>
              <nav className="flex flex-col gap-2">
                {/* Links principais — todos são rotas /*, usar Link + scroll to top */}
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
                    className="text-white/70 hover:text-accent text-sm transition"
                  >
                    {item.label}
                  </Link>
                ))}
                {/* Links extras sem duplicar NAV_ITEMS */}
                <Link
                  to={LMS_ROUTES.PRIVACY}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
                  className="text-white/70 hover:text-accent text-sm transition"
                >
                  Privacidade
                </Link>
                <Link
                  to={LMS_ROUTES.TERMS}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
                  className="text-white/70 hover:text-accent text-sm transition"
                >
                  Termos de Uso
                </Link>
                <Link
                  to={LMS_ROUTES.BLOG}
                  onClick={() => {
                    // Navega para o blog e depois rola até Coming Up
                    setTimeout(() => {
                      const el = document.getElementById('coming-up');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 400);
                  }}
                  className="text-white/70 hover:text-accent text-sm transition"
                >
                  Eventos de IA
                </Link>
              </nav>
            </div>

            <div>
              <h6 className="text-white/40 text-xs uppercase tracking-widest mb-4">Contato</h6>
              <div className="mb-4">
                <a
                  href="https://calendly.com/tom-queiroz-pareto/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: '#7a6207' }}
                >
                  <Calendar className="w-4 h-4" /> Agendar com Especialista
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-white/60" />
                  <a
                    href="mailto:tom@recognise.com.br"
                    className="text-white/70 hover:text-accent text-sm transition"
                  >
                    tom@midia-digital.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaWhatsapp className="w-4 h-4 text-white/60" />
                  <a
                    href="https://wa.me/5511915513210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-accent text-sm transition"
                  >
                    +55 11 91551-3210
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-white/60 mt-0.5 flex-shrink-0" />
                  <p className="text-white/60 text-sm">
                    Recognise | Av. Paulista, 2.022 - 2º andar - Consolação, São Paulo/SP
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">© 2026 Recognise. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <Link
                to={LMS_ROUTES.PRIVACY}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
                className="text-white/40 hover:text-white/70 text-xs transition"
              >
                Política de Privacidade
              </Link>
              <Link
                to={LMS_ROUTES.TERMS}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
                className="text-white/40 hover:text-white/70 text-xs transition"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}