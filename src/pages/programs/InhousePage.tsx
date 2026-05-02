import { ProgramPageTemplate } from '@/components/ProgramPageTemplate';
import { INDIVIDUAL_PROGRAMS_DATA } from '@/lib/programsData';

export default function InhousePage() {
  const prog = INDIVIDUAL_PROGRAMS_DATA.inhouse;
  return (
    <ProgramPageTemplate
      programData={prog}
      formType="individual"
      tableName={prog.tableName}
    />
  );
}
