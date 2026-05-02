import { ProgramPageTemplate } from '@/components/ProgramPageTemplate';
import { CORPORATE_PROGRAMS_DATA } from '@/lib/programsData';

export default function CorpExecAdvisoryPage() {
  const prog = CORPORATE_PROGRAMS_DATA.execAdvisory;
  return (
    <ProgramPageTemplate
      programData={prog}
      formType="corporate"
      tableName={prog.tableName}
    />
  );
}
