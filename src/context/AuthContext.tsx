import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { UserWithSchool } from "../types";
import { TOKEN_KEY } from "../api/config";
import { getMe } from "../api/auth";

interface AuthContextValue
 {
   user:UserWithSchool | null
   token:string | null
   isLoading: boolean
   login:(token:string,user:UserWithSchool)=>void
   logout:()=>void
};

export const AuthContext = createContext<AuthContextValue>({
    user:null,
    token:null,
    isLoading: false,
   login:()=>{},
   logout:()=>{}
});

interface AuthProviderProps {
    children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token,setToken] = useState<string | null>(()=>localStorage.getItem(TOKEN_KEY))
    const [user,setUser] = useState<UserWithSchool | null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(token !== null)
    useEffect(()=>{
        if(!token)
            return
        getMe().then((response)=>setUser(response.user))
        .catch(()=>logout())
        .finally(()=>setIsLoading(false))
    },[])
    function login(token:string,user:UserWithSchool)
    {
        localStorage.setItem(TOKEN_KEY,token)
        setToken(token)
        setUser(user)
    }
    function logout()
    {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
        setUser(null)
    }
    return <AuthContext.Provider value={{
        user,
        token,
        isLoading,
        login,
        logout
    }}>{children}</AuthContext.Provider>
}
export function useAuth(){
    return useContext(AuthContext)
}
export default AuthProvider