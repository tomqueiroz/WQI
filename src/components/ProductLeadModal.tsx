import { useState } from 'react'
import { useProductLead } from '@/hooks/useProductLeads'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, Loader2 } from 'lucide-react'

type ProductLeadModalProps = {
  open: boolean
  onClose: () => void
  productId: string
  productTitle: string
  tableName: string
}

export function ProductLeadModal({ open, onClose, productId, productTitle, tableName }: ProductLeadModalProps) {
  const { submitLead, loading, success, error, reset } = useProductLead(tableName)
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    company: '',
    role: '',
    message: '',
    team_size: '',
    event_interest: ''
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const dataToSubmit: { full_name: string; email: string; whatsapp?: string; company?: string; role?: string; message?: string; team_size?: string; event_interest?: string } = {
      full_name: formData.full_name,
      email: formData.email
    }

    if (formData.whatsapp) dataToSubmit.whatsapp = formData.whatsapp
    if (formData.company) dataToSubmit.company = formData.company
    if (formData.role) dataToSubmit.role = formData.role
    if (formData.message) dataToSubmit.message = formData.message
    
    if (tableName === 'inhouse_leads' && formData.team_size) {
      dataToSubmit.team_size = formData.team_size
    }
    
    if (tableName === 'keynote_leads' && formData.event_interest) {
      dataToSubmit.event_interest = formData.event_interest
    }

    await submitLead(dataToSubmit)
  }

  const handleClose = () => {
    setFormData({
      full_name: '',
      email: '',
      whatsapp: '',
      company: '',
      role: '',
      message: '',
      team_size: '',
      event_interest: ''
    })
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <DialogTitle className="text-2xl font-bold text-primary mb-2">
              Solicitação Enviada!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground max-w-sm">
              Recebemos sua solicitação para <span className="font-semibold text-foreground">{productTitle}</span>. Nossa equipe entrará em contato em até 24 horas.
            </DialogDescription>
            <Button
              onClick={handleClose}
              className="mt-6 bg-accent text-white hover:bg-accent/90"
            >
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">
                {productTitle}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Preencha o formulário abaixo para receber mais informações sobre este programa.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-sm font-medium">
                  Nome Completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="full_name"
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-mail <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-sm font-medium">
                  WhatsApp
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  placeholder="(11) 91234-5678"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Empresa
                </Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Nome da empresa"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Cargo
                </Label>
                <Input
                  id="role"
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  placeholder="Seu cargo atual"
                  className="w-full"
                />
              </div>

              {tableName === 'inhouse_leads' && (
                <div className="space-y-2">
                  <Label htmlFor="team_size" className="text-sm font-medium">
                    Tamanho do Time
                  </Label>
                  <Select
                    value={formData.team_size}
                    onValueChange={(value) => handleChange('team_size', value)}
                  >
                    <SelectTrigger id="team_size" className="w-full">
                      <SelectValue placeholder="Selecione o tamanho do time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-10">5-10 pessoas</SelectItem>
                      <SelectItem value="11-25">11-25 pessoas</SelectItem>
                      <SelectItem value="26-50">26-50 pessoas</SelectItem>
                      <SelectItem value="51-100">51-100 pessoas</SelectItem>
                      <SelectItem value="100+">Mais de 100 pessoas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {tableName === 'keynote_leads' && (
                <div className="space-y-2">
                  <Label htmlFor="event_interest" className="text-sm font-medium">
                    Interesse no Evento
                  </Label>
                  <Select
                    value={formData.event_interest}
                    onValueChange={(value) => handleChange('event_interest', value)}
                  >
                    <SelectTrigger id="event_interest" className="w-full">
                      <SelectValue placeholder="Tipo de evento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keynote">Keynote Principal</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="painel">Painel de Discussão</SelectItem>
                      <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Mensagem
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Conte-nos mais sobre seus objetivos e desafios..."
                  className="w-full min-h-[100px] resize-none"
                />
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <DialogFooter className="flex-col gap-3 sm:flex-col">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-white hover:bg-accent/90 font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Solicitar Mais Infos'
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center italic">
                  Todos os programas são personalizados de acordo com perfil e objetivos específicos. Sem compromisso — retornamos em até 24h.
                </p>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
