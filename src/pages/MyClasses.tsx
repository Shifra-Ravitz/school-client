import { useQuery } from "@tanstack/react-query"
import { getAssignments } from "../api/assignments"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import EmptyState from "../components/EmptyState"
import { Link } from "react-router-dom"


const MyClasses = ()=>{
        const{data,isPending,error} = useQuery({
            queryKey:["assignments"],
            queryFn:getAssignments
        })
   if(isPending){
    return <Loading/>
   }
   if(error)
    return <ErrorMessage error={error}/>
   if(data.length === 0)
    return <EmptyState text="אין לך כיתות משובצות"/>
    return(<>
        <h1>הכיתות שלי</h1>
        {data.map((assignment)=>(
            <p key={assignment.id}>
                <Link to={`/teacher/assignments/${assignment.id}/students`}>
                {assignment.subject.name} · {assignment.class.name} · {assignment.studentsCount} תלמידות
                </Link>
            </p>
        ))}
    </>)    
}

export default MyClasses









