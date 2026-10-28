import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import type { Role } from "../types"
import Logo from "./Logo"
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
    return <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <Logo/>
        <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold">שלום, {user.firstName}</span>
            <span className="text-xs font-semibold bg-gold-light text-primary rounded-full px-3 py-1">{roleNames[user.role]}</span>
            <span className="text-sm text-slate-500">{user.school.name}</span>
        </div>
        <nav className="flex items-center gap-4">
            {isStudent?<Link className="font-semibold text-primary hover:underline" to="/student/grades">לציונים שלי</Link>:<Link className="font-semibold text-primary hover:underline" to="/teacher">הכיתות שלי</Link> }
            <button className="btn-outline py-1.5 px-4 text-sm" onClick={()=>handleLogout()}>התנתקות</button>
        </nav>
        </div>

    </header>
}

export default Header