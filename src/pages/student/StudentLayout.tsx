import { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookOpen, User, Shield, LogOut, Menu } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { LMS_ROUTES } from '@/lib/index'
import { IMAGES } from '@/assets/images'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface StudentLayoutProps {
  children: ReactNode
  title?: string
}

export function StudentLayout({ children, title }: StudentLayoutProps) {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate(LMS_ROUTES.LOGIN)
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: LMS_ROUTES.DASHBOARD },
    { icon: BookOpen, label: 'Meus Cursos', to: LMS_ROUTES.COURSES },
    { icon: User, label: 'Meu Perfil', to: LMS_ROUTES.PROFILE },
  ]

  const NavContent = () => (
    <>
      <div className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {(profile?.role === 'admin' || profile?.role === 'mentor') && (
          <>
            <div className="my-2 border-t border-white/10" />
            <NavLink
              to={LMS_ROUTES.ADMIN}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <Shield className="w-5 h-5" />
              <span>Admin</span>
            </NavLink>
          </>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-accent/20 text-accent font-semibold">
              {getInitials(profile?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {profile?.full_name || 'Usuário'}
            </p>
            <p className="text-white/50 text-xs truncate">
              {profile?.email || user?.email}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen">
      <aside className="fixed left-0 top-0 w-64 h-screen bg-primary flex-col hidden md:flex">
        <div className="px-4 pt-4 mb-6">
          <img src={IMAGES.LOGO_WQI_BRANCO} alt="WQI" className="h-10 w-auto object-contain" />
        </div>

        <NavContent />
      </aside>

      <main className="md:ml-64 min-h-screen bg-background flex-1">
        <div className="sticky top-0 z-10 h-14 bg-background border-b flex items-center px-4 gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-primary border-0">
              <div className="px-4 pt-4 mb-6">
                <img src={IMAGES.LOGO_WQI_BRANCO} alt="WQI" className="h-10 w-auto object-contain" />
              </div>
              <NavContent />
            </SheetContent>
          </Sheet>

          {title && <h1 className="text-lg font-semibold flex-1">{title}</h1>}

          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-accent/20 text-accent text-xs font-semibold">
              {getInitials(profile?.full_name)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  )
}
