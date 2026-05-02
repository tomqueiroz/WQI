import { ProgramPageTemplate } from '@/components/ProgramPageTemplate';
import { INDIVIDUAL_PROGRAMS_DATA } from '@/lib/programsData';

export default function KeynotePage() {
  const prog = INDIVIDUAL_PROGRAMS_DATA.keynote;
  return (
    <ProgramPageTemplate
      programData={prog}
      formType="individual"
      tableName={prog.tableName}
    />
  );
}
