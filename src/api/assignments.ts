import type { Assignment, FinalGradesResponse, PeriodsResponse, User } from "../types"
import { api } from "./client"
//כל השיבוצים של המורה
export async function getAssignments()
{
    const response = await api.get<Assignment[]>("/assignments")
    return response.data
}
//שיבוץ אחד לפי id
export async function getAssignment(id:number)
{
    const response = await api.get<Assignment>(`/assignments/${id}`)
    return response.data
}
//התקופות האפשריות של השיבוץ
export async function getPeriods(assignmentId:number)
{
    const response = await api.get<PeriodsResponse>(`/assignments/${assignmentId}/periods`)
    return response.data
}
//טבלת ציונים - allGrades
export async function getFinalGrades(assignmentId:number)
{
    const response = await api.get<FinalGradesResponse>(`/assignments/${assignmentId}/final-grades`)
    return response.data
}
//הצגת תלמידות הכיתה - students
export async function getClassStudents(classId:number,search:string,sortBy:string)
{
    const response = await api.get<User[]>(`/classes/${classId}/students`,{params:{search:search || undefined,sortBy}})
    return response.data
}
