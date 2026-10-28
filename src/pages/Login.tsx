
import type { LoginInput } from "../types"
import { useForm } from "react-hook-form"
import {login as loginRequest} from "../api/auth"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
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
        <div>
        <Logo size="large"/>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">כתובת המייל שלך</label>
            <input id="email" placeholder="name@example.com" type="email" 
            {...register("email",{
                required:"יש להזין מייל",
                pattern:{
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:"כתובת מייל לא תקינה"
                }
            })} />
            <p>{errors.email?.message}</p>
            <label htmlFor="password">סיסמה</label>
            <input id="password" type="password" {...register("password",{required:"יש להזין סיסמה"})}/>
            <p>{errors.password?.message}</p>
            {loginMutation.error && <ErrorMessage error={loginMutation.error} />}
            <button disabled={loginMutation.isPending} type="submit">{loginMutation.isPending?"מתחבר...":"התחברות"}</button>
        </form>
        </div>
    )
}




