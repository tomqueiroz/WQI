import { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LMS_ROUTES } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { LayoutDashboard, BookOpen, Users, Mail, LogOut, Menu, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate(LMS_ROUTES.LOGIN);
  };

  const navItems = [
    { label: 'Dashboard', href: LMS_ROUTES.ADMIN, icon: LayoutDashboard },
    { label: 'Cursos', href: LMS_ROUTES.ADMIN_COURSES, icon: BookOpen },
    { label: 'Alunos', href: LMS_ROUTES.ADMIN_STUDENTS, icon: Users },
    { label: 'Leads', href: LMS_ROUTES.ADMIN_LEADS, icon: Mail },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <img 
          src={IMAGES.LOGO_WQI_BRANCO} 
          alt="WQI" 
          className="h-10 w-auto object-contain"
        />
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white/15 text-white font-semibold shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3 px-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-accent/20 text-accent font-semibold">
              {profile?.full_name ? getInitials(profile.full_name) : 'AD'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {profile?.full_name || 'Admin'}
            </p>
            <p className="text-xs text-white/50 truncate">
              {profile?.email}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full text-white/60 hover:text-red-400 hover:bg-white/5 justify-start"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="hidden md:flex fixed left-0 top-0 w-64 h-screen bg-slate-950 text-white flex-col z-50">
        <SidebarContent />
      </aside>

      <div className="flex-1 md:ml-64 w-full">
        <header className="sticky top-0 z-40 bg-white border-b border-border h-16 px-4 md:px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-slate-950 text-white border-slate-800">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Admin</span>
              {title && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground">{title}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(LMS_ROUTES.HOME)}
              className="hidden sm:flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Ver Site
            </Button>
            <Avatar className="w-9 h-9">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {profile?.full_name ? getInitials(profile.full_name) : 'AD'}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}