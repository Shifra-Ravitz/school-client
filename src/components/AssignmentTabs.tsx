import { NavLink } from "react-router-dom"

interface AssignmentTabsProps{
    assignmentId:string
}
const AssignmentTabs = ({assignmentId}:AssignmentTabsProps)=>{
    return(
    <nav className="flex gap-2 mb-6 border-b border-slate-200">
        <NavLink className="tab" to={`/teacher/assignments/${assignmentId}/students`}>תלמידות</NavLink>
        <NavLink className="tab" to={`/teacher/assignments/${assignmentId}/grades`}>ציונים</NavLink>

    </nav>
    
)}
export default AssignmentTabs


