import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import type { Role } from "../types"
const roleNames:Record<Role, string>={
    TEACHER:"מורה",
    PRINCIPAL:"מנהלת",
    STUDENT:"תלמידה"
}
const Header=()=>{
    const navigate = useNavigate()
    const{user,logout} = useAuth()
     function handleLogout()
    {
        logout()
        navigate("/login")
    }
    if(user == null)
        return null
    const isStudent = user.role === "STUDENT"
    return <header>
        <div>
            <span>שלום, {user.firstName}</span>
            <span>{roleNames[user.role]}</span>
            <span>{user.school.name}</span>
        </div>
        <nav>
            {isStudent?<Link to="/student/grades">לציונים שלי</Link>:<Link to="/teacher">הכיתות שלי</Link> }
            <button onClick={()=>handleLogout()}>התנתקות</button>
        </nav>

    </header>
}

export default Header