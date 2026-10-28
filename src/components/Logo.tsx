type LogoProps = {
    size?: "small" | "large"
}

const Logo = ({ size = "small" }: LogoProps) => {
    const isLarge = size === "large"
    return (
        <div className="flex items-center gap-2">
            <svg
                viewBox="0 0 48 48"
                className={isLarge ? "w-16 h-16" : "w-10 h-10"}
                aria-hidden="true"
            >
                <rect x="2" y="2" width="44" height="44" rx="12" fill="#1e3a5f" />
                <path d="M13 25 L21 33 L36 16" fill="none" stroke="#c9a227" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={isLarge ? "text-3xl font-bold text-primary" : "text-xl font-bold text-primary"}>
                ציונים <span className="text-gold">בקליק</span>
            </span>
        </div>
    )
}

export default Logo
