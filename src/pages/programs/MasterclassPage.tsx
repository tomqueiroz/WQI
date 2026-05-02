import { ProgramPageTemplate } from '@/components/ProgramPageTemplate';
import { INDIVIDUAL_PROGRAMS_DATA } from '@/lib/programsData';

export default function MasterclassPage() {
  const prog = INDIVIDUAL_PROGRAMS_DATA.masterclass;
  return (
    <ProgramPageTemplate
      programData={prog}
      formType="individual"
      tableName={prog.tableName}
    />
  );
}
