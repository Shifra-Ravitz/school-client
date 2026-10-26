import type { LoginInput, LoginResponse, MeResponse } from "../types";
import { api } from "./client";

export async function login(data: LoginInput) {
    const response = await api.post<LoginResponse>("/auth/login", data)
    return response.data
}

export async function getMe()
{
    const response = await api.get<MeResponse>("/auth/me")
    return response.data
}