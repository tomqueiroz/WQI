import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, Mail, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  full_name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  role?: string;
  message?: string;
  team_size?: string;
  event_interest?: string;
  created_at: string;
}

const LEAD_TABLES = [
  { key: 'leads', label: 'Geral', table: 'leads' },
  { key: 'mentoria_1on1', label: 'Mentoria 1:1', table: 'mentoria_1on1_leads' },
  { key: 'cohort', label: 'Cohort', table: 'mentoria_cohort_leads' },
  { key: 'incompany', label: 'In-Company', table: 'inhouse_leads' },
  { key: 'masterclass', label: 'MasterClass', table: 'masterclass_ai_leads' },
  { key: 'keynote', label: 'Keynote', table: 'keynote_leads' },
  { key: 'digital', label: 'Cursos Digitais', table: 'digital_course_leads' },
];

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState<Record<string, Lead[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchLeadsForTab(activeTab);
  }, [activeTab]);

  async function fetchLeadsForTab(tabKey: string) {
    const tableConfig = LEAD_TABLES.find(t => t.key === tabKey);
    if (!tableConfig) return;

    setLoading(prev => ({ ...prev, [tabKey]: true }));

    try {
      const { data, error } = await supabase
        .from(tableConfig.table)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(prev => ({ ...prev, [tabKey]: (data as Lead[]) || [] }));
    } catch (error) {
      toast({
        title: 'Erro ao carregar leads',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    } finally {
      setLoading(prev => ({ ...prev, [tabKey]: false }));
    }
  }

  function exportToCSV(tabKey: string) {
    const filteredLeads = getFilteredLeads(tabKey);
    const headers = ['Nome', 'Email', 'WhatsApp', 'Empresa', 'Cargo', 'Mensagem', 'Data'];
    
    if (tabKey === 'incompany') {
      headers.splice(5, 0, 'Tamanho do Time');
    }
    if (tabKey === 'keynote') {
      headers.splice(5, 0, 'Interesse em Evento');
    }

    const rows = filteredLeads.map(lead => {
      const baseRow = [
        lead.full_name,
        lead.email,
        lead.whatsapp || '',
        lead.company || '',
        lead.role || '',
      ];

      if (tabKey === 'incompany') {
        baseRow.push(lead.team_size || '');
      }
      if (tabKey === 'keynote') {
        baseRow.push(lead.event_interest || '');
      }

      baseRow.push(
        lead.message || '',
        new Date(lead.created_at).toLocaleDateString('pt-BR')
      );

      return baseRow;
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const tableLabel = LEAD_TABLES.find(t => t.key === tabKey)?.label || tabKey;
    link.download = `leads_${tableLabel.toLowerCase().replace(/\s+/g, '_')}_${dateStr}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Exportação concluída',
      description: `${filteredLeads.length} leads exportados com sucesso.`,
    });
  }

  function getFilteredLeads(tabKey: string): Lead[] {
    const tabLeads = leads[tabKey] || [];

    if (!searchQuery.trim()) {
      return tabLeads;
    }

    const query = searchQuery.toLowerCase();
    return tabLeads.filter(
      lead =>
        lead.full_name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        (lead.company && lead.company.toLowerCase().includes(query))
    );
  }

  function renderLeadsTable(tabKey: string) {
    const isLoading = loading[tabKey];
    const filteredLeads = getFilteredLeads(tabKey);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      );
    }

    if (filteredLeads.length === 0) {
      return (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {searchQuery ? 'Nenhum lead encontrado com os critérios de busca.' : 'Nenhum lead cadastrado ainda.'}
          </p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">WhatsApp</TableHead>
              <TableHead className="hidden lg:table-cell">Empresa</TableHead>
              <TableHead className="hidden xl:table-cell">Cargo</TableHead>
              {tabKey === 'incompany' && (
                <TableHead className="hidden xl:table-cell">Tamanho do Time</TableHead>
              )}
              {tabKey === 'keynote' && (
                <TableHead className="hidden xl:table-cell">Interesse em Evento</TableHead>
              )}
              <TableHead className="hidden sm:table-cell">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.full_name}</TableCell>
                <TableCell className="text-sm">{lead.email}</TableCell>
                <TableCell className="hidden md:table-cell">{lead.whatsapp || '-'}</TableCell>
                <TableCell className="hidden lg:table-cell">{lead.company || '-'}</TableCell>
                <TableCell className="hidden xl:table-cell">{lead.role || '-'}</TableCell>
                {tabKey === 'incompany' && (
                  <TableCell className="hidden xl:table-cell">{lead.team_size || '-'}</TableCell>
                )}
                {tabKey === 'keynote' && (
                  <TableCell className="hidden xl:table-cell">{lead.event_interest || '-'}</TableCell>
                )}
                <TableCell className="hidden sm:table-cell">
                  {new Date(lead.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  const currentTabLeads = leads[activeTab] || [];
  const filteredCount = getFilteredLeads(activeTab).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Gerenciamento de Leads</h1>
          <p className="text-muted-foreground">Visualize e exporte leads de todos os programas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold">{currentTabLeads.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Filtrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-2xl font-bold">{filteredCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Leads por Programa</CardTitle>
                <CardDescription>Selecione uma aba para visualizar os leads de cada programa</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email ou empresa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button onClick={() => exportToCSV(activeTab)} variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 mb-6">
                {LEAD_TABLES.map((table) => (
                  <TabsTrigger key={table.key} value={table.key} className="text-xs sm:text-sm">
                    {table.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {LEAD_TABLES.map((table) => (
                <TabsContent key={table.key} value={table.key}>
                  {renderLeadsTable(table.key)}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}