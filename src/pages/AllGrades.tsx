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
        <h3>{data.assignment.subject.name} · {data.assignment.class.name} · {data.students.length} תלמידות</h3>
        <Link to={`/teacher/assignments/${id}/exams/new`}>מבחן חדש</Link>
        {data.problems.map((problem) => <p key={problem}>{problem}</p>)}
        {data.students.length === 0 ? <EmptyState text="אין נתונים להצגה" /> :
            <table>
                <thead>
                    <tr>
                        <th>שם התלמידה</th>
                        {data.periods.map((period) => (
                            <Fragment key={period.id}>
                                {period.exams.map((exam) => <th key={exam.id}>
                                    <Link to={`/teacher/exams/${exam.id}/edit`} title="עריכת מבחן">✏️</Link>
                                    <Link to={`/teacher/exams/${exam.id}/grades`} title="הזנת ציונים">📝</Link>
                                    <button title="מחיקת מבחן" onClick={() => handleDelete(exam.id)} disabled={deleteMutation.isPending}>🗑️</button>
                                    <br />
                                    {exam.title} <br />({exam.weight}%)</th>)}
                                <th>ציון {period.name}</th>
                            </Fragment>
                        )
                        )}
                        <th>ציון שנתי</th>
                    </tr>
                </thead>
                <tbody>
                    {data.students.map((student) => (
                        <tr key={student.studentId}>
                            <td>{student.lastName} {student.firstName}</td>
                            {data.periods.map((period) => (
                                <Fragment key={period.id}>
                                    {period.exams.map((exam) => <td key={exam.id}>{student.scores[exam.id] ?? "-"}</td>)}
                                    <td>{student.periodGrades[period.id] ?? "לא הושלם"}</td>
                                </Fragment>
                            )
                            )}
                            <td>{student.annualGrade ?? "לא הושלם"}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        }
    </>)
}
export default AllGrades

