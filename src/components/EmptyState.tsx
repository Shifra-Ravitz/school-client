
interface EmptyStateProps{
    text:string
}
const EmptyState = ({text}:EmptyStateProps)=>{
    return(
    <p className="card text-center text-slate-500 py-10 px-6">{text}</p>
)}
export default EmptyState


