import type { MyPeriod } from "../types";
import ExamRow from "./ExamRow";

interface PeriodSectionProps {
    period: MyPeriod
}
const PeriodSection = ({ period }: PeriodSectionProps) => {
    return <div className="border-t border-slate-100 px-6 py-4">
    <p className="font-semibold text-primary mb-2">{period.name} ({period.weight}% מהציון השנתי) · ציון {period.name}: {period.grade ?? "טרם הושלם"}</p>
    {period.exams.map(exam=> <ExamRow key={exam.id} exam={exam} />)}
       

    </div>
}
export default PeriodSection