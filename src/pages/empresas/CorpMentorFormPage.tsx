import { ProgramPageTemplate } from '@/components/ProgramPageTemplate';
import { CORPORATE_PROGRAMS_DATA } from '@/lib/programsData';

export default function CorpMentorFormPage() {
  const prog = CORPORATE_PROGRAMS_DATA.mentorForm;
  return (
    <ProgramPageTemplate
      programData={prog}
      formType="corporate"
      tableName={prog.tableName}
    />
  );
}
