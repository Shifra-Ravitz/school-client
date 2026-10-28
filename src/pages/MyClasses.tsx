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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((assignment)=>(
            <p key={assignment.id}>
                <Link className="card block p-6 transition hover:shadow-md hover:border-gold" to={`/teacher/assignments/${assignment.id}/students`}>
                <span className="block text-xl font-bold text-primary">{assignment.subject.name}</span>
                <span className="block text-slate-600">כיתה {assignment.class.name}</span>
                <span className="inline-block mt-4 text-sm font-semibold bg-gold-light text-primary rounded-full px-3 py-1">{assignment.studentsCount} תלמידות</span>
                </Link>
            </p>
        ))}
        </div>
    </>)    
}

export default MyClasses









