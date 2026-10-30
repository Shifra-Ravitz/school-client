import { Link } from "react-router-dom"

type LogoProps = {
    size?: "small" | "large"
}

const Logo = ({ size = "small" }: LogoProps) => {
    const isLarge = size === "large"
    return (
        <Link to="/" className="group flex items-center gap-2" title="לדף הבית">
            <svg
                viewBox="0 0 48 48"
                className={(isLarge ? "w-16 h-16" : "w-10 h-10") + " motion-safe:animate-pop transition group-hover:-rotate-6"}
                aria-hidden="true"
            >
                <rect x="2" y="2" width="44" height="44" rx="12" fill="#1e3a5f" />
                <path className="[stroke-dasharray:1] motion-safe:animate-draw" pathLength="1" d="M13 25 L21 33 L36 16" fill="none" stroke="#c9a227" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={isLarge ? "text-3xl font-bold text-primary" : "text-xl font-bold text-primary"}>
                ציונים <span className="text-gold">בקליק</span>
            </span>
        </Link>
    )
}

export default Logo
