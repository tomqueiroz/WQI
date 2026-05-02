import { ProgramPageTemplate } from '@/components/ProgramPageTemplate';
import { INDIVIDUAL_PROGRAMS_DATA } from '@/lib/programsData';

export default function CursosDigitaisPage() {
  const prog = INDIVIDUAL_PROGRAMS_DATA.cursosDigitais;
  return (
    <ProgramPageTemplate
      programData={prog}
      formType="individual"
      tableName={prog.tableName}
    />
  );
}
