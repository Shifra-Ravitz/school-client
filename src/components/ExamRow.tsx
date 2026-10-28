import type { MyExam } from "../types";

interface ExamRowProps {
    exam: MyExam
}
const ExamRow = ({ exam }: ExamRowProps)=>{
    return(
        <p className="text-sm text-slate-700 ms-4 ps-4 py-2 border-s-2 border-gold-light">
            {exam.title} · תאריך: {exam.date.split("-").reverse().join("/")} · משקל: {exam.weight}% · ציון: {exam.score ?? "אין ציון"}
            {exam.evaluation && <> · הערכה: {exam.evaluation}</>}
        </p>

    )
}
export default ExamRow