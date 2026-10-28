import { useQuery } from "@tanstack/react-query"
import { getMyGrades } from "../api/me"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import EmptyState from "../components/EmptyState"
import { useState } from "react"
import SubjectCard from "../components/SubjectCard"

const Grades = () => {
    const [selectedSubjectId, setSelectedSubjectId] = useState("")
    const [openSubjectId, setOpenSubjectId] = useState<number | null>(null)

    const handleToggle = (assignmentId: number) => {
        setOpenSubjectId(openSubjectId === assignmentId ? null : assignmentId)
    }

    const { data, isPending, error } = useQuery({
        queryKey: ["myGrades"],
        queryFn: getMyGrades
    })
    if (isPending) {
        return <Loading />
    }
    if (error)
        return <ErrorMessage error={error} />
    if (data.subjects.length === 0)
        return <EmptyState text="אין לך עדיין מקצועות" />

    const filteredSubjects = data.subjects.filter((subject) =>
        selectedSubjectId === "" || String(subject.subject.id) === selectedSubjectId
    )

    return <>
        <h3>הציונים שלי</h3>

        <select value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)}>
            <option value="">כל המקצועות</option>
            {data.subjects.map((subject) => (
                <option key={subject.assignmentId} value={subject.subject.id}>{subject.subject.name}</option>
            ))}
        </select>

        {filteredSubjects.map((subject) => (
            <SubjectCard key={subject.assignmentId} isOpen={openSubjectId === subject.assignmentId} onToggle={() => handleToggle(subject.assignmentId)} subject={subject} />
        ))}
    </>
}
export default Grades