import type {  MySubject } from "../types";
import PeriodSection from "./PeriodSection";

interface SubjectCardProps {
    subject:MySubject,
    isOpen:boolean,
    onToggle:()=>void
}
const SubjectCard = ({ subject,isOpen,onToggle }: SubjectCardProps) => {
    return <div>
    <button type="button" onClick={onToggle}>
        {isOpen ? "▼" : "◀"} {subject.subject.name} · המורה: {subject.teacher.firstName} {subject.teacher.lastName} · ציון שנתי: {subject.annualGrade ?? "טרם חושב"}
    </button>
    {isOpen && subject.periods.map(period => <PeriodSection key={period.id} period={period} />)}
    </div>
}
export default SubjectCard