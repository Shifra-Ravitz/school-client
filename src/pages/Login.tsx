
import type { LoginInput } from "../types"
import { useForm } from "react-hook-form"
import {login as loginRequest} from "../api/auth"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { getHomePath } from "../routes/getHomePath"
import ErrorMessage from "../components/ErrorMessage"
import Logo from "../components/Logo"
export default function Login() {
    const navigate = useNavigate()
    const {login} = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>()
    const loginMutation = useMutation({
        mutationFn:loginRequest,
        onSuccess:(response)=>{
            login(response.token,response.user)
            navigate(getHomePath(response.user.role))
        }   
    })
    const onSubmit = (data:LoginInput) => loginMutation.mutate(data)
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-10">
        <Logo size="large"/>
        <form className="card w-full max-w-md p-8" noValidate onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center">כניסה למערכת</h1>
            <label className="label" htmlFor="email">כתובת המייל שלך</label>
            <input className="input" id="email" placeholder="name@example.com" type="email" 
            {...register("email",{
                required:"יש להזין מייל",
                pattern:{
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:"כתובת מייל לא תקינה"
                }
            })} />
            <p className="field-error">{errors.email?.message}</p>
            <label className="label" htmlFor="password">סיסמה</label>
            <input className="input" id="password" type="password" {...register("password",{required:"יש להזין סיסמה"})}/>
            <p className="field-error">{errors.password?.message}</p>
            {loginMutation.error && <ErrorMessage error={loginMutation.error} />}
            <button className="btn w-full mt-2" disabled={loginMutation.isPending} type="submit">{loginMutation.isPending?"מתחבר...":"התחברות"}</button>
        </form>
        <Link className="text-sm text-slate-500 hover:text-primary hover:underline" to="/">חזרה לדף הבית</Link>
        </div>
    )
}




