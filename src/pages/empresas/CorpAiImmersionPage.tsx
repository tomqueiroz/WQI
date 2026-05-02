import { ProgramPageTemplate } from '@/components/ProgramPageTemplate';
import { CORPORATE_PROGRAMS_DATA } from '@/lib/programsData';

export default function CorpAiImmersionPage() {
  const prog = CORPORATE_PROGRAMS_DATA.aiImmersion;
  return (
    <ProgramPageTemplate
      programData={prog}
      formType="corporate"
      tableName={prog.tableName}
    />
  );
}
