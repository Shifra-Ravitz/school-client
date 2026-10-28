import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { getExamGrades, saveExamGrades } from "../api/exams"
import ErrorMessage from "../components/ErrorMessage"
import Loading from "../components/Loading"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import EmptyState from "../components/EmptyState"
import type { GradeInput } from "../types"

interface ExamGradesForm {
    grades: {
        score: string
        evaluation: string
    }[]
}

const ExamGrades = () => {
    const { examId } = useParams()
    const { data, isPending, error } = useQuery({
        queryKey: ["examGrades", examId],
        queryFn: () => getExamGrades(Number(examId)),
    })
    const queryClient = useQueryClient()
    const examMutation = useMutation({
        mutationFn: (grades:GradeInput[]) => saveExamGrades(Number(examId), grades),
        onSuccess: (response)=>{
            //השרת מחזיר את הרשימה המעודכנת, אז שמים אותה ישר במקום לטעון שוב
            queryClient.setQueryData(["examGrades", examId], response)
            queryClient.invalidateQueries({queryKey:["finalGrades",response.exam.assignmentId],refetchType:"all"})
        }
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ExamGradesForm>()
    useEffect(() => {
        if (!data)
            return
        reset({
            grades: data.items.map((item) => ({
                score: item.score === null ? "" : String(item.score),
                evaluation: item.evaluation ?? ""
            }))
        })
    }, [data, reset])
    if (error)
        return <ErrorMessage error={error} />
    if (isPending)
        return <Loading />

    const onSubmit = (form: ExamGradesForm) => {
        const grades: GradeInput[] = data.items.map((item, index) => ({
            studentId: item.student.id,
            score: form.grades[index].score === "" ? null : Number(form.grades[index].score),
            evaluation: form.grades[index].evaluation
        }))
        examMutation.mutate(grades)
    }

    return (
        <>
            <h3 className="mb-1">{data.exam.title}</h3>
            <p className="text-slate-500 mb-2">{data.exam.date} · {data.exam.period.name} · {data.exam.weight}%</p>
            <Link className="inline-block text-sm font-semibold text-primary hover:underline mb-6" to={`/teacher/assignments/${data.exam.assignmentId}/grades`}>→ חזרה לציונים</Link>
            {data.items.length == 0 && <EmptyState text="אין תלמידות בכיתה" />}
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="table-wrap">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>שם התלמידה</th>
                            <th>ציון</th>
                            <th>הערכה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, index) => (
                            <tr key={item.student.id}>
                                <td className="font-semibold whitespace-nowrap">{item.student.lastName} {item.student.firstName}</td>
                                <td>
                                    <input className="input w-24" type="number" step="0.01" {...register(`grades.${index}.score`, {
                                        min: {
                                            value: 0,
                                            message: "הציון חייב להיות לפחות 0"
                                        },
                                        max: {
                                            value: 100,
                                            message: "הציון יכול להיות עד 100"
                                        },
                                        pattern: {
                                            value: /^\d+(\.\d{1,2})?$/,
                                            message: "עד 2 ספרות אחרי הנקודה"
                                        }
                                    })} />
                                    <p className="field-error">{errors.grades?.[index]?.score?.message}</p>
                                </td>
                                <td>
                                    <input className="input" type="text" {...register(`grades.${index}.evaluation`, {
                                        maxLength: {
                                            value: 500,
                                            message: "ההערכה יכולה להכיל עד 500 תווים בלבד"
                                        },
                                        validate: (value, formValues) =>
                                            value === "" || formValues.grades[index].score !== "" || "אי אפשר לשמור הערכה בלי ציון"
                                    })} />
                                    <p className="field-error">{errors.grades?.[index]?.evaluation?.message}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                {examMutation.error && <ErrorMessage error={examMutation.error} />}
                {examMutation.isSuccess && <p className="rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 mt-4">הציונים נשמרו</p>}
                <button className="btn mt-4" disabled={examMutation.isPending} type="submit">{examMutation.isPending ? "שומר..." : "שמירה"}</button>
            </form>

        </>
    )
}
export default ExamGrades






