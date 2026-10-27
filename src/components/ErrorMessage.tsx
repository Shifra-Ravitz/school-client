import { getErrorMessage } from "../api/client"

interface ErrorMessageProps{
    error:unknown
}
const ErrorMessage = ({error}:ErrorMessageProps)=>{
    return(
    <p style={{color:"red"}}>{getErrorMessage(error)}</p>
)}
export default ErrorMessage


