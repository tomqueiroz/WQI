import { ProgramPageTemplate } from '@/components/ProgramPageTemplate';
import { CORPORATE_PROGRAMS_DATA } from '@/lib/programsData';

export default function CorpAiLeadershipPage() {
  const prog = CORPORATE_PROGRAMS_DATA.aiLeadership;
  return (
    <ProgramPageTemplate
      programData={prog}
      formType="corporate"
      tableName={prog.tableName}
    />
  );
}
