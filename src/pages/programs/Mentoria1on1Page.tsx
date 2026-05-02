import { ProgramPageTemplate } from '@/components/ProgramPageTemplate';
import { INDIVIDUAL_PROGRAMS_DATA } from '@/lib/programsData';

export default function Mentoria1on1Page() {
  const prog = INDIVIDUAL_PROGRAMS_DATA.mentoria1on1;
  return (
    <ProgramPageTemplate
      programData={prog}
      formType="individual"
      tableName={prog.tableName}
    />
  );
}
