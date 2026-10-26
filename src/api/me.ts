import type { MyGradesResponse } from "../types"
import { api } from "./client"

export async function getMyGrades()
{
    const response = await api.get<MyGradesResponse>("/me/grades")
    return response.data
}

