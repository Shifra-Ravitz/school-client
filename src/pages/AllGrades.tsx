import { Link, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getFinalGrades } from "../api/assignments"
import ErrorMessage from "../components/ErrorMessage"
import Loading from "../components/Loading"
import AssignmentTabs from "../components/AssignmentTabs"
import EmptyState from "../components/EmptyState"
import { Fragment } from "react"
import { deleteExam } from "../api/exams"
import { getErrorMessage } from "../api/client"

const AllGrades = () => {
    const { id } = useParams()
    const { data, isPending, error } = useQuery({
        queryKey: ["finalGrades", Number(id)],
        queryFn: () => getFinalGrades(Number(id)),
    })
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: (examId: number) => deleteExam(examId),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["periods", Number(id)] })
            await queryClient.invalidateQueries({ queryKey: ["finalGrades", Number(id)] })
        },
        onError: (error) => alert(getErrorMessage(error)),
    })

    function handleDelete(examId: number) {
        if (confirm("למחוק את המבחן? כל הציונים שהוזנו בו יימחקו."))
            deleteMutation.mutate(examId)
    }


    if (error)
        return <ErrorMessage error={error} />
    if (isPending)
        return <Loading />
    return (<>
        <div>
            <AssignmentTabs assignmentId={id!} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="mb-0">{data.assignment.subject.name} · {data.assignment.class.name} · {data.students.length} תלמידות</h3>
        <Link className="btn" to={`/teacher/assignments/${id}/exams/new`}>+ מבחן חדש</Link>
        </div>
        {data.problems.map((problem) => <p className="rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-2 mb-2" key={problem}>{problem}</p>)}
        {data.students.length === 0 ? <EmptyState text="אין נתונים להצגה" /> :
            <div className="table-wrap mt-4">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>שם התלמידה</th>
                        {data.periods.map((period) => (
                            <Fragment key={period.id}>
                                {period.exams.map((exam) => <th className="text-center whitespace-nowrap" key={exam.id}>
                                    <Link className="icon-btn" to={`/teacher/exams/${exam.id}/edit`} title="עריכת מבחן">✏️</Link>
                                    <Link className="icon-btn" to={`/teacher/exams/${exam.id}/grades`} title="הזנת ציונים">📝</Link>
                                    <button className="icon-btn" title="מחיקת מבחן" onClick={() => handleDelete(exam.id)} disabled={deleteMutation.isPending}>🗑️</button>
                                    <br />
                                    {exam.title} <br />({exam.weight}%)</th>)}
                                <th className="text-center bg-primary-light">ציון {period.name}</th>
                            </Fragment>
                        )
                        )}
                        <th className="text-center bg-gold text-primary">ציון שנתי</th>
                    </tr>
                </thead>
                <tbody>
                    {data.students.map((student) => (
                        <tr key={student.studentId}>
                            <td className="font-semibold whitespace-nowrap">{student.lastName} {student.firstName}</td>
                            {data.periods.map((period) => (
                                <Fragment key={period.id}>
                                    {period.exams.map((exam) => <td className="text-center" key={exam.id}>{student.scores[exam.id] ?? "-"}</td>)}
                                    <td className="text-center font-semibold text-primary bg-slate-100/70">{student.periodGrades[period.id] ?? "לא הושלם"}</td>
                                </Fragment>
                            )
                            )}
                            <td className="text-center font-bold text-primary bg-gold-light/60">{student.annualGrade ?? "לא הושלם"}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        }
    </>)
}
export default AllGrades

