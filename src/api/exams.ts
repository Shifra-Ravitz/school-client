import type { Exam, ExamGradesResponse, ExamInput, GradeInput } from "../types"
import { api } from "./client"
//מבנה של מבחן עבור עריכה
export async function getExam(examId:number)
{
    const response = await api.get<Exam>(`/exams/${examId}`)
    return response.data
}
//עבור הזנת הציון של מבחן מסוים לכל הבנות
export async function getExamGrades(examId:number)
{
    const response = await api.get<ExamGradesResponse>(`/exams/${examId}/grades`)
    return response.data
}
//שמירת הציונים שהוזנו
export async function saveExamGrades(examId:number,grades:GradeInput[])
{
    const response = await api.put<ExamGradesResponse>(`/exams/${examId}/grades`,{grades})
    return response.data
}
//הוספת מבחן
export async function createExam(data:ExamInput)
{
    const response = await api.post<Exam>(`/periods/${data.periodId}/exams`,data)
    return response.data
}
//עדכון המבחן שערכו
export async function updateExam(examId:number,data:ExamInput)
{
    const response = await api.patch<Exam>(`/exams/${examId}`,data)
    return response.data
}
//מחיקת מבחן
export async function deleteExam(examId:number)
{
    await api.delete(`/exams/${examId}`)
}