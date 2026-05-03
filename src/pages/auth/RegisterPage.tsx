import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LMS_ROUTES } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirm_password) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, { full_name: formData.full_name });
      setSuccess(true);
      setTimeout(() => {
        navigate(LMS_ROUTES.LOGIN);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Link to={LMS_ROUTES.HOME} className="inline-block mb-6">
              <img
                src={IMAGES.LOGO_RECOGNISE_BRANCO}
                alt="Recognise"
                className="h-12 w-auto mx-auto object-contain"
              />
            </Link>
            <h2 className="text-2xl font-bold text-white mb-2">
              Criar Conta
            </h2>
            <p className="text-white/60 text-sm">
              Preencha seus dados para começar sua jornada
            </p>
          </div>

          {success && (
            <Alert className="mb-6 bg-green-500/10 border-green-500/30 text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Conta criada com sucesso! Redirecionando...
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6 bg-destructive/10 border-destructive/30">
              <AlertDescription className="text-white">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-white/90 text-sm font-medium">
                Nome Completo
              </Label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.full_name}
                onChange={handleChange}
                required
                disabled={loading}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent/20 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90 text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent/20 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90 text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent/20 h-11"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-white/5 text-white/60 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm_password" className="text-white/90 text-sm font-medium">
                Confirmar Senha
              </Label>
              <div className="relative">
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Digite a senha novamente"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent/20 h-11"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-white/5 text-white/60 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-accent text-white hover:bg-accent/90 font-semibold h-11 rounded-full transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar Conta'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Já tem uma conta?{' '}
              <Link
                to={LMS_ROUTES.LOGIN}
                className="text-accent font-semibold hover:text-accent/80 transition-colors"
              >
                Entrar
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link
              to={LMS_ROUTES.HOME}
              className="text-white/50 hover:text-white/80 text-sm transition-colors inline-flex items-center gap-1"
            >
              ← Voltar para o site
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
