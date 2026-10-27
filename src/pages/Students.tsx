

import { useParams } from "react-router-dom"
import AssignmentTabs from "../components/AssignmentTabs"
import { useQuery } from "@tanstack/react-query"
import { getAssignment, getClassStudents } from "../api/assignments"
import { useState } from "react"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import EmptyState from "../components/EmptyState"

const Students = () => {
    const { id } = useParams()
    const { data: assignment, isPending, error } = useQuery({
        queryKey: ["assignment", id],
        queryFn: () => getAssignment(Number(id))
    })
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("lastName")
    const classId = assignment?.class.id
    const { data: students, isPending: studentsLoading, error: studentsError } = useQuery({
        queryKey: ["students", classId, search, sortBy],
        queryFn: () => getClassStudents(classId!, search, sortBy),
        enabled: !!classId
    })
    if (isPending) {
        return <Loading />
    }
    if (error)
        return <ErrorMessage error={error} />
    return (
        <>
            <div>
                <AssignmentTabs assignmentId={id!} />
            </div>
            <h1>{assignment.subject.name} · {assignment.class.name} · {assignment.studentsCount} תלמידות</h1>
            <input value={search} placeholder="חיפוש לפי שם או תעודת זהות" onChange={({ target }) => setSearch(target.value)} />
            <label>
                מיון לפי:
                <select value={sortBy} onChange={({ target }) => setSortBy(target.value)}>
                    <option value="lastName">שם משפחה</option>
                    <option value="firstName">שם פרטי</option>
                    <option value="address">כתובת</option>
                </select>
            </label>
            {studentsLoading?<Loading/>:studentsError?<ErrorMessage error={studentsError}/>:students.length === 0?<EmptyState text="אין תלמידות להצגה"/>:
                <table>
                    <thead>
                        <tr>
                            <th>שם משפחה</th>
                            <th>שם פרטי</th>
                            <th>תעודת זהות</th>
                            <th>כתובת</th>
                            <th>טלפון</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student)=>(
                            <tr key={student.id}>
                                <td>{student.lastName}</td>
                                <td>{student.firstName}</td>
                                <td>{student.idNumber ??"-"}</td>
                                <td>{student.address ?? "-"}</td>
                                <td>{student.phone ??"-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            


        </>
    )
}

export default Students









