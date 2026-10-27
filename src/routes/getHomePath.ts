import type { Role } from "../types";

export function getHomePath(role:Role){
    if(role === "STUDENT")
        return "/student/grades"
    return "/teacher"

}