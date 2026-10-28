import { getErrorMessage } from "../api/client"

interface ErrorMessageProps{
    error:unknown
}
const ErrorMessage = ({error}:ErrorMessageProps)=>{
    return(
    <p className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 my-3">{getErrorMessage(error)}</p>
)}
export default ErrorMessage


