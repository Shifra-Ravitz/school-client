import type {  MySubject } from "../types";
import PeriodSection from "./PeriodSection";

interface SubjectCardProps {
    subject:MySubject,
    isOpen:boolean,
    onToggle:()=>void
}
const SubjectCard = ({ subject,isOpen,onToggle }: SubjectCardProps) => {
    return <div className="card overflow-hidden">
    <button className="w-full flex flex-wrap items-center gap-3 text-start px-6 py-4 transition hover:bg-slate-50" type="button" onClick={onToggle}>
        <span className="text-gold">{isOpen ? "▼" : "◀"}</span>
        <span className="text-lg font-bold text-primary">{subject.subject.name}</span>
        <span className="text-sm text-slate-500">המורה: {subject.teacher.firstName} {subject.teacher.lastName}</span>
        <span className="ms-auto text-sm font-semibold bg-gold-light text-primary rounded-full px-3 py-1">ציון שנתי: {subject.annualGrade ?? "טרם חושב"}</span>
    </button>
    {isOpen && subject.periods.map(period => <PeriodSection key={period.id} period={period} />)}
    </div>
}
export default SubjectCard