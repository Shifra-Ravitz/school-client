import { NavLink } from "react-router-dom"

interface AssignmentTabsProps{
    assignmentId:string
}
const AssignmentTabs = ({assignmentId}:AssignmentTabsProps)=>{
    return(
    <nav>
        <NavLink to={`/teacher/assignments/${assignmentId}/students`}>תלמידות</NavLink>
        {" | "}
        <NavLink to={`/teacher/assignments/${assignmentId}/grades`}>ציונים</NavLink>

    </nav>
    
)}
export default AssignmentTabs


