import type { MyExam } from "../types";

interface ExamRowProps {
    exam: MyExam
}
const ExamRow = ({ exam }: ExamRowProps)=>{
    return(
        <p>
            {exam.title} · תאריך: {exam.date.split("-").reverse().join("/")} · משקל: {exam.weight}% · ציון: {exam.score ?? "אין ציון"}
            {exam.evaluation && <> · הערכה: {exam.evaluation}</>}
        </p>

    )
}
export default ExamRow