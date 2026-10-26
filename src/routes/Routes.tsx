import { createBrowserRouter, Navigate } from "react-router-dom";
import AllGrades from "../pages/AllGrades";
import ExamForm from "../pages/ExamForm";
import ExamGrades from "../pages/ExamGrades";
import Grades from "../pages/Grades";
import Login from "../pages/Login";
import MyClasses from "../pages/MyClasses";
import Students from "../pages/Students";
import App from "../App";

const routes = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path:"",
                element:<Navigate to="/login" replace></Navigate>
            },
            {
                path: "teacher",
                element: <MyClasses></MyClasses>,

            },
            {
                path: "teacher/assignments/:id/students",
                element: <Students></Students>,
            },
            {
                path: "teacher/assignments/:id/grades",
                element: <AllGrades></AllGrades>,
            },
            {
                path: "teacher/assignments/:id/exams/new",
                element: <ExamForm></ExamForm>,
            },
            {
                path: "teacher/exams/:examId/edit",
                element: <ExamForm></ExamForm>,
            },
            {
                path: "teacher/exams/:examId/grades",
                element: <ExamGrades></ExamGrades>,
            },
            {
                path: "student/grades",
                element: <Grades></Grades>,
            },
            {
                path: "*",
                element: <div style={{ color: "red" }}>404</div>
            }
        ],
    },
    {
        path: "login",
        element: <Login></Login>
    }
])

export default routes