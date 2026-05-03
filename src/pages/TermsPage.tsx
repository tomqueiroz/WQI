import { Layout } from "@/components/Layout";
import { IMAGES } from "@/assets/images";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function TermsPage() {
  return (
    <Layout>
      <div className="relative overflow-hidden" style={{ minHeight: "35vh" }}>
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.PARALLAX_HUMAN_ROBOT}
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0 bg-primary/95 z-10" />
        <div className="relative z-20 flex flex-col justify-end pb-12 px-4 max-w-4xl mx-auto" style={{ minHeight: "35vh" }}>
          <h1 className="text-white font-black text-3xl md:text-5xl">
            Termos de Uso
          </h1>
          <p className="text-white/60 mt-3 text-sm">
            Última atualização: Maio de 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">1. Aceitação dos Termos</h2>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              Ao acessar e utilizar a plataforma Recognise ("Recognise", "nós", "nosso"), você ("usuário", "você") concorda em cumprir e estar vinculado aos presentes Termos de Uso.
            </p>
            <p>
              Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
            </p>
            <p>
              Estes Termos constituem um acordo legal vinculante entre você e a Recognise, CNPJ 00.000.000/0001-00, com sede na Av. Paulista, 2.022 - 2º andar - Consolação, São Paulo/SP.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">2. Descrição dos Serviços</h2>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              A WQI oferece os seguintes serviços através de sua plataforma digital:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Mentoria Executiva 1:1</strong>: Sessões individuais personalizadas de mentoria em marketing digital, estratégia e IA generativa</li>
              <li><strong>Programa de Cohort Executivo</strong>: Turmas fechadas de aprendizado coletivo com pares de alto calibre</li>
              <li><strong>In-Company Transformation</strong>: Programas customizados para empresas e equipes</li>
              <li><strong>MasterClasses e Workshops</strong>: Imersões intensivas em temas específicos de marketing e IA</li>
              <li><strong>Keynotes e Palestras</strong>: Apresentações executivas para eventos corporativos</li>
              <li><strong>Cursos Digitais</strong>: Conteúdo educacional em formato self-paced através de nossa plataforma LMS</li>
            </ul>
            <p>
              Todos os serviços são fornecidos "como estão" e podem ser modificados, suspensos ou descontinuados a qualquer momento, mediante aviso prévio quando aplicável.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">3. Cadastro e Conta de Usuário</h2>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              Para acessar determinados serviços, você deverá criar uma conta fornecendo informações precisas, completas e atualizadas.
            </p>
            <p>
              Você é responsável por:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Manter a confidencialidade de suas credenciais de acesso</li>
              <li>Todas as atividades realizadas através de sua conta</li>
              <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
              <li>Garantir que suas informações de cadastro estejam sempre atualizadas</li>
            </ul>
            <p>
              Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos ou que permaneçam inativas por período superior a 24 meses.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">4. Propriedade Intelectual</h2>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              Todo o conteúdo disponibilizado na plataforma Recognise — incluindo, mas não se limitando a, textos, vídeos, áudios, imagens, gráficos, logotipos, frameworks, metodologias, materiais didáticos e código-fonte — é de propriedade exclusiva da Recognise ou de seus licenciadores.
            </p>
            <p>
              É expressamente proibido:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Reproduzir, distribuir, modificar ou criar obras derivadas sem autorização prévia por escrito</li>
              <li>Fazer engenharia reversa, descompilar ou desmontar qualquer parte da plataforma</li>
              <li>Remover ou alterar avisos de direitos autorais, marcas registradas ou outros avisos de propriedade</li>
              <li>Utilizar conteúdo da plataforma para fins comerciais sem licença específica</li>
              <li>Compartilhar credenciais de acesso ou conteúdo exclusivo com terceiros não autorizados</li>
            </ul>
            <p>
              A licença de uso concedida é pessoal, intransferível e não exclusiva, limitada ao período de vigência de sua assinatura ou matrícula.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">5. Uso Permitido e Proibido</h2>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              <strong>Uso Permitido:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Acessar e utilizar o conteúdo para fins de aprendizado pessoal e desenvolvimento profissional</li>
              <li>Aplicar os conhecimentos adquiridos em seu contexto profissional</li>
              <li>Participar de discussões e atividades propostas nos programas</li>
            </ul>
            <p className="mt-4">
              <strong>Uso Proibido:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violar leis, regulamentos ou direitos de terceiros</li>
              <li>Transmitir vírus, malware ou qualquer código malicioso</li>
              <li>Realizar atividades fraudulentas, enganosas ou que violem a privacidade de outros</li>
              <li>Fazer scraping, crawling ou extração automatizada de dados da plataforma</li>
              <li>Sobrecarregar ou interferir com a infraestrutura da plataforma</li>
              <li>Personificar outra pessoa ou entidade</li>
              <li>Revender, sublicenciar ou comercializar acesso aos serviços sem autorização</li>
            </ul>
            <p>
              Violações podem resultar em suspensão imediata da conta e ações legais cabíveis.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">6. Pagamentos e Política de Reembolso</h2>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              <strong>Pagamentos:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Os valores dos programas são informados no momento da contratação e podem variar conforme personalização</li>
              <li>Aceitamos pagamento via cartão de crédito, PIX e boleto bancário</li>
              <li>Parcelamento disponível conforme condições específicas de cada programa</li>
              <li>O acesso aos serviços é liberado após confirmação do pagamento</li>
            </ul>
            <p className="mt-4">
              <strong>Política de Reembolso (Código de Defesa do Consumidor):</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Você tem direito a arrependimento em até <strong>7 (sete) dias corridos</strong> a partir da contratação ou do primeiro acesso ao conteúdo, o que ocorrer primeiro</li>
              <li>Para solicitar reembolso, envie e-mail para tom@midia-digital.com com assunto "Solicitação de Reembolso"</li>
              <li>O reembolso será processado em até 10 dias úteis após aprovação</li>
              <li>Após o período de 7 dias, não há direito a reembolso, exceto em casos de falha técnica comprovada da plataforma</li>
              <li>Programas in-company e mentorias 1:1 possuem política de cancelamento específica definida em contrato</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">7. Limitação de Responsabilidade</h2>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              A Recognise não se responsabiliza por:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Resultados específicos de carreira, promoções ou aumentos salariais decorrentes da participação nos programas</li>
              <li>Decisões de negócio tomadas com base no conteúdo fornecido</li>
              <li>Interrupções temporárias de serviço devido a manutenção, falhas técnicas ou eventos de força maior</li>
              <li>Perda de dados causada por problemas técnicos do usuário ou de terceiros</li>
              <li>Conteúdo de terceiros acessado através de links externos</li>
            </ul>
            <p>
              Nossos programas são educacionais e de desenvolvimento profissional. Os resultados dependem do esforço, dedicação e contexto individual de cada participante.
            </p>
            <p>
              Em nenhuma hipótese nossa responsabilidade total excederá o valor pago pelo usuário nos últimos 12 meses.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">8. Modificações dos Termos</h2>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.
            </p>
            <p>
              Alterações significativas serão comunicadas através de:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>E-mail para o endereço cadastrado</li>
              <li>Notificação na plataforma</li>
              <li>Aviso destacado na página inicial</li>
            </ul>
            <p>
              O uso continuado da plataforma após a publicação das alterações constitui aceitação dos novos termos.
            </p>
            <p>
              Caso não concorde com as modificações, você deverá descontinuar o uso dos serviços e poderá solicitar o cancelamento de sua conta.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">9. Lei Aplicável e Foro</h2>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.
            </p>
            <p>
              Fica eleito o foro da Comarca de <strong>São Paulo/SP</strong> para dirimir quaisquer controvérsias decorrentes destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
            </p>
            <p>
              Buscamos sempre resolver disputas de forma amigável através de nossos canais de atendimento antes de qualquer medida judicial.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary">10. Contato</h2>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Para dúvidas, sugestões ou solicitações relacionadas a estes Termos de Uso, entre em contato:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">E-mail</p>
                  <a
                    href="mailto:tom@midia-digital.com"
                    className="text-accent hover:underline"
                  >
                    tom@midia-digital.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Telefone / WhatsApp</p>
                  <a
                    href="https://wa.me/5511915513210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    +55 11 91551-3210
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Endereço</p>
                  <p className="text-sm">
                    Recognise<br />
                    Av. Paulista, 2.022 - 2º andar<br />
                    Consolação, São Paulo/SP
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm italic border-t border-border pt-4 mt-4">
              Horário de atendimento: Segunda a sexta, das 9h às 18h (horário de Brasília)
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary text-white text-center rounded-2xl p-8 mt-12">
          <h3 className="text-2xl font-bold mb-3">
            Pronto para Transformar sua Carreira?
          </h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Explore nossos programas de mentoria executiva e acelere sua jornada em marketing digital e IA generativa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-white hover:bg-accent/90 rounded-full font-semibold"
            >
              <a href="/programas">Explorar Programas</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-full font-semibold"
            >
              <a
                href="https://wa.me/5511915513210?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20Recognise."
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com Especialista
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}