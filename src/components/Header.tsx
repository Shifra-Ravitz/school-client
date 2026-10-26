import { Link } from "react-router-dom"

const Header=()=>{

    return <header>
        <div>
            <span>שלום מרים</span>
            <span>מורה</span>
        </div>
        <nav>
            <Link to="/login">יציאה</Link>
            <Link to="/teacher">הכיתות שלי</Link>
            <Link to="/student/grades">לציונים שלי</Link>
        </nav>

    </header>
}

export default Header