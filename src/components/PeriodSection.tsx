import type { MyPeriod } from "../types";
import ExamRow from "./ExamRow";

interface PeriodSectionProps {
    period: MyPeriod
}
const PeriodSection = ({ period }: PeriodSectionProps) => {
    return <>
    <p>{period.name} ({period.weight}% מהציון השנתי) · ציון {period.name}: {period.grade ?? "טרם הושלם"}</p>
    {period.exams.map(exam=> <ExamRow key={exam.id} exam={exam} />)}
       

    </>
}
export default PeriodSection