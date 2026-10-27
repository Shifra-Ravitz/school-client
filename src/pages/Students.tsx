

import { useParams } from "react-router-dom"
import AssignmentTabs from "../components/AssignmentTabs"

const Students = () => {
    const { id } = useParams()
    return <div>
        <AssignmentTabs assignmentId={id!} />
        <p>פרטי תלמידות - שם, כתובת, טלפון, ת.ז</p>
    </div>
}

export default Students










