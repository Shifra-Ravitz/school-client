import { Link, useNavigate, useParams } from "react-router-dom"
import { createExam, getExam, updateExam } from "../api/exams"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPeriods } from "../api/assignments"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import type { ApiErrorBody, ExamInput } from "../types"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import axios from "axios"

const ExamForm = ()=>{
    const{id,examId} = useParams()
    const isEdit = examId != undefined
        const {data:exam,isLoading:examLoading,error:examError} = useQuery({
        queryKey: ["exam", examId],
        queryFn: () => getExam(Number(examId)),
        enabled:!!examId
    })
    const assignmentId = isEdit?exam?.assignmentId:Number(id)
        const {data:periods,isPending:periodsPending,error:periodsError} = useQuery({
        queryKey: ["periods", assignmentId],
        queryFn: () => getPeriods(assignmentId!),
        enabled: !!assignmentId
    })
    const { register,handleSubmit,formState: { errors },watch,reset,setError} = useForm<ExamInput>()
    //בעריכה: כשהמבחן מגיע מהשרת ממלאים איתו את הטופס
    useEffect(()=>{
        if(!exam)
            return
        reset({
            title: exam.title,
            date: exam.date,
            periodId: exam.period.id,
            weight: exam.weight,
            description: exam.description ?? ""
        })
    },[exam,reset])

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const examMutation = useMutation({
        mutationFn: (data:ExamInput) => isEdit ? updateExam(Number(examId),data) : createExam(data),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["finalGrades",assignmentId]})
            queryClient.invalidateQueries({queryKey:["periods",assignmentId]})
            if(isEdit)
                queryClient.invalidateQueries({queryKey:["exam",examId]})
            navigate(`/teacher/assignments/${assignmentId}/grades`)
        },
        onError: (error)=>{
            if(!axios.isAxiosError<{error:ApiErrorBody}>(error))
                return
            const status = error.response?.status
            const body = error.response?.data?.error
            if(status === 422)
                setError("weight",{message:body?.message})
            //400: רשימה של שדות לא תקינים, הודעה ליד כל שדה
            if(status === 400 && Array.isArray(body?.details))
                body.details.forEach((item)=>setError(item.field as keyof ExamInput,{message:item.message}))
        }
    })
    const onSubmit = (data:ExamInput) => examMutation.mutate(data)
    const errorStatus = axios.isAxiosError(examMutation.error) ? examMutation.error.response?.status : undefined
    const showGeneralError = examMutation.error && errorStatus !== 400 && errorStatus !== 422
    if(examError)
        return <ErrorMessage error={examError}/>
    if(periodsError)
        return <ErrorMessage error={periodsError}/>
    if(examLoading || periodsPending)
        return <Loading/>

    //כמה משקל נשאר בתקופה שנבחרה
    const selectedPeriodId = watch("periodId")
    const selectedPeriod = periods.items.find((period)=>period.id === selectedPeriodId)
    let remaining = 100
    if(selectedPeriod){
        remaining = 100 - selectedPeriod.examsWeight
        if(exam && exam.period.id === selectedPeriodId)
            remaining += exam.weight
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <h3>{isEdit?"עריכת מבחן":"מבחן חדש"}</h3>
        <label htmlFor="title">שם המבחן</label>
        <input id="title" type="text" {...register("title",{required:"יש להזין שם מבחן",
        minLength: {
      value: 2,
      message: "שם המבחן חייב להכיל לפחות 2 תווים"
    },
    maxLength: {
      value: 80,
      message: "שם המבחן יכול להכיל עד 80 תווים בלבד"}})}/>
        <p>{errors.title?.message}</p>
        <label htmlFor="date">תאריך</label>
        <input id="date" type="date" {...register("date",{required:"יש להזין תאריך"})}/>
        <p>{errors.date?.message}</p>
        <label htmlFor="periodId">תקופה</label>
        <select id="periodId" {...register("periodId",{required:"יש לבחור תקופה",valueAsNumber:true})}>
            <option value="">בחרי תקופה</option>
            {periods.items.map((period)=>(
                <option key={period.id} value={period.id}>{period.name}</option>
            ))}
        </select>
        <p>{errors.periodId?.message}</p>
        <label htmlFor="weight">משקל (באחוזים)</label>
        <input id="weight" type="number" {...register("weight",{required:"יש להזין משקל",valueAsNumber:true,
        min: {
      value: 1,
      message: "המשקל חייב להיות לפחות 1"
    },
    max: {
      value: remaining,
      message: "המשקל גבוה ממה שנשאר בתקופה"
    },
    validate: (value) => Number.isInteger(value) || "המשקל חייב להיות מספר שלם"})}/>
        {selectedPeriod && <span>נשאר עוד {remaining}%</span>}
        <p>{errors.weight?.message}</p>
        <label htmlFor="description">תיאור (רשות)</label>
        <textarea id="description" {...register("description",{
    maxLength: {
      value: 500,
      message: "התיאור יכול להכיל עד 500 תווים בלבד"}})}/>
        <p>{errors.description?.message}</p>
        {showGeneralError && <ErrorMessage error={examMutation.error} />}
        <button disabled={examMutation.isPending} type="submit">{examMutation.isPending?"שומר...":isEdit?"שמירה":"הוספה"}</button>
        <Link to={`/teacher/assignments/${assignmentId}/grades`}>ביטול</Link>
        </form>
    )
}

export default ExamForm



// export default function Login() {
//     const navigate = useNavigate()
//     const {login} = useAuth()
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<LoginInput>()
//     const loginMutation = useMutation({
//         mutationFn:loginRequest,
//         onSuccess:(response)=>{
//             login(response.token,response.user)
//             navigate(getHomePath(response.user.role))
//         }   
//     })
//     const onSubmit = (data:LoginInput) => loginMutation.mutate(data)
//     return (
//         <form noValidate onSubmit={handleSubmit(onSubmit)}>
//             <label htmlFor="email">כתובת המייל שלך</label>
//             <input id="email" placeholder="name@example.com" type="email" 
//             {...register("email",{
//                 required:"יש להזין מייל",
//                 pattern:{
//                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                     message:"כתובת מייל לא תקינה"
//                 }
//             })} />
//             <p>{errors.email?.message}</p>
//             <label htmlFor="password">סיסמה</label>
//             <input id="password" type="password" {...register("password",{required:"יש להזין סיסמה"})}/>
//             <p>{errors.password?.message}</p>
//             {loginMutation.error && <ErrorMessage error={loginMutation.error} />}
//             <button disabled={loginMutation.isPending} type="submit">{loginMutation.isPending?"מתחבר...":"התחברות"}</button>
//         </form>
//     )
// }
