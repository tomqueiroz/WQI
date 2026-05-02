import { Layout } from "@/components/Layout";
import { IMAGES } from "@/assets/images";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, FileText, Users, Database, Clock, UserCheck, Cookie, Mail } from "lucide-react";

export default function PrivacyPage() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary/85 z-10" />
        <div className="relative z-20 flex flex-col justify-end pb-12 px-4 max-w-4xl mx-auto" style={{ minHeight: "35vh" }}>
          <p className="text-white/40 text-xs mb-3">Início / Política de Privacidade</p>
          <h1 className="text-white font-black text-3xl md:text-5xl leading-tight">
            Política de Privacidade
          </h1>
          <p className="text-white/60 text-sm mt-3">
            Última atualização: Maio de 2026 · Conforme LGPD (Lei 13.709/2018)
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-accent" />
              <h2 className="font-bold text-primary text-xl">1. Quem Somos</h2>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              A <strong>W-Qi Development</strong> ("WQI", "nós" ou "nosso") é uma empresa especializada em mentoria executiva, cursos de marketing digital e inteligência artificial, com sede na Av. Paulista, 2.022 - 2º andar - Consolação, São Paulo/SP.
            </p>
            <p>
              <strong>CNPJ:</strong> [Inserir CNPJ]
            </p>
            <p>
              Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-accent" />
              <h2 className="font-bold text-primary text-xl">2. Dados Coletados</h2>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>Coletamos as seguintes categorias de dados pessoais:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Dados de Identificação:</strong> Nome completo, e-mail, telefone/WhatsApp, empresa, cargo.</li>
              <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência, origem de acesso.</li>
              <li><strong>Dados de Uso da Plataforma:</strong> Progresso em cursos, aulas assistidas, certificados obtidos, interações com conteúdo.</li>
              <li><strong>Dados de Pagamento:</strong> Informações de transação processadas por gateways terceiros (não armazenamos dados de cartão de crédito).</li>
              <li><strong>Dados Fornecidos Voluntariamente:</strong> Mensagens de contato, respostas a formulários, feedback sobre programas.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-accent" />
              <h2 className="font-bold text-primary text-xl">3. Finalidade do Tratamento</h2>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>Utilizamos seus dados pessoais para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fornecer acesso à plataforma de cursos e mentorias (LMS).</li>
              <li>Processar inscrições, pagamentos e emitir certificados.</li>
              <li>Enviar comunicações sobre programas, atualizações de conteúdo e novidades relevantes.</li>
              <li>Personalizar sua experiência de aprendizado com base em seu progresso e interesses.</li>
              <li>Realizar análises estatísticas para melhorar nossos serviços.</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
              <li>Responder a solicitações de suporte e atendimento ao cliente.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-accent" />
              <h2 className="font-bold text-primary text-xl">4. Base Legal (LGPD)</h2>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>O tratamento de seus dados pessoais é fundamentado nas seguintes bases legais previstas nos artigos 7º e 11 da LGPD:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Execução de Contrato (Art. 7º, V):</strong> Para fornecer os serviços contratados (cursos, mentorias, acesso à plataforma).</li>
              <li><strong>Consentimento (Art. 7º, I):</strong> Para envio de comunicações de marketing e newsletters (você pode revogar a qualquer momento).</li>
              <li><strong>Legítimo Interesse (Art. 7º, IX):</strong> Para análises internas, melhoria de serviços e segurança da plataforma.</li>
              <li><strong>Cumprimento de Obrigação Legal (Art. 7º, II):</strong> Para atender exigências fiscais, contábeis e regulatórias.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-accent" />
              <h2 className="font-bold text-primary text-xl">5. Compartilhamento de Dados</h2>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              <strong>Não vendemos, alugamos ou comercializamos seus dados pessoais.</strong> Compartilhamos informações apenas nas seguintes situações:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Prestadores de Serviço:</strong> Supabase (hospedagem de banco de dados), AWS (infraestrutura), gateways de pagamento, ferramentas de e-mail marketing — todos sob contratos de confidencialidade e conformidade com LGPD.</li>
              <li><strong>Obrigações Legais:</strong> Quando exigido por lei, ordem judicial ou autoridade competente.</li>
              <li><strong>Proteção de Direitos:</strong> Para proteger nossos direitos, propriedade ou segurança, bem como de nossos usuários.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-accent" />
              <h2 className="font-bold text-primary text-xl">6. Segurança e Retenção de Dados</h2>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda, destruição ou alteração:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Criptografia:</strong> Dados sensíveis são criptografados em trânsito (HTTPS/TLS) e em repouso.</li>
              <li><strong>Infraestrutura Segura:</strong> Hospedagem em Supabase (PostgreSQL) e AWS, com backups automáticos e redundância.</li>
              <li><strong>Controle de Acesso:</strong> Apenas colaboradores autorizados têm acesso a dados pessoais, mediante autenticação e logs de auditoria.</li>
              <li><strong>Monitoramento:</strong> Sistemas de detecção de intrusão e análise de vulnerabilidades.</li>
            </ul>
            <p className="mt-4">
              <strong>Retenção:</strong> Mantemos seus dados pelo período necessário para cumprir as finalidades descritas, respeitando prazos legais (mínimo de 5 anos para dados fiscais/contratuais). Após esse período, os dados são anonimizados ou excluídos de forma segura.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-accent" />
              <h2 className="font-bold text-primary text-xl">7. Direitos do Titular</h2>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>Conforme a LGPD (Art. 18), você tem os seguintes direitos:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Acesso:</strong> Confirmar a existência de tratamento e solicitar cópia dos seus dados.</li>
              <li><strong>Correção:</strong> Atualizar dados incompletos, inexatos ou desatualizados.</li>
              <li><strong>Exclusão:</strong> Solicitar a eliminação de dados tratados com base em consentimento ou quando desnecessários.</li>
              <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado e interoperável.</li>
              <li><strong>Revogação de Consentimento:</strong> Retirar consentimento para tratamentos baseados nessa base legal.</li>
              <li><strong>Oposição:</strong> Opor-se a tratamentos realizados com base em legítimo interesse.</li>
              <li><strong>Informação sobre Compartilhamento:</strong> Saber com quais entidades públicas e privadas compartilhamos seus dados.</li>
            </ul>
            <p className="mt-4">
              Para exercer seus direitos, entre em contato através do e-mail: <a href="mailto:tom@midia-digital.com" className="text-accent hover:underline font-semibold">tom@midia-digital.com</a>
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Cookie className="w-6 h-6 text-accent" />
              <h2 className="font-bold text-primary text-xl">8. Cookies e Tecnologias Similares</h2>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>Utilizamos cookies e tecnologias similares para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Essenciais:</strong> Garantir o funcionamento da plataforma (autenticação, sessão).</li>
              <li><strong>Analytics:</strong> Analisar o uso do site e melhorar a experiência do usuário (Google Analytics, Hotjar).</li>
              <li><strong>Preferências:</strong> Lembrar suas configurações e preferências de navegação.</li>
            </ul>
            <p className="mt-4">
              Você pode gerenciar cookies através das configurações do seu navegador. Note que desabilitar cookies essenciais pode afetar a funcionalidade da plataforma.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-accent" />
              <h2 className="font-bold text-primary text-xl">9. Encarregado de Dados (DPO) e Contato</h2>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              Para dúvidas, solicitações ou reclamações relacionadas ao tratamento de dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados (DPO):
            </p>
            <div className="bg-muted/30 rounded-xl p-4 mt-4 space-y-2">
              <p><strong>E-mail:</strong> <a href="mailto:tom@midia-digital.com" className="text-accent hover:underline">tom@midia-digital.com</a></p>
              <p><strong>Telefone/WhatsApp:</strong> <a href="https://wa.me/5511915513210" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">+55 11 91551-3210</a></p>
              <p><strong>Endereço:</strong> Av. Paulista, 2.022 - 2º andar - Consolação, São Paulo/SP</p>
            </div>
            <p className="mt-4">
              Responderemos sua solicitação em até 15 dias úteis, conforme previsto na LGPD.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary text-white text-center rounded-2xl p-8 mt-12">
          <h3 className="text-2xl font-black mb-3">Dúvidas sobre Privacidade?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Nossa equipe está pronta para esclarecer qualquer questão sobre o tratamento dos seus dados pessoais.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-white hover:bg-accent/90 rounded-full px-8 py-6 text-base font-semibold"
          >
            <a
              href="https://wa.me/5511915513210?text=Olá%2C%20tenho%20dúvidas%20sobre%20a%20Política%20de%20Privacidade."
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com Especialista
            </a>
          </Button>
        </Card>
      </div>
    </Layout>
  );
}