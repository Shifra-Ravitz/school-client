import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getHomePath } from "../routes/getHomePath"
import Loading from "../components/Loading"
import Logo from "../components/Logo"

const CONTACT_EMAIL = "shifra4139@gmail.com"

const features = [
    {
        title: "למורות",
        text: "מוסיפות מבחנים, מזינות ציונים והערכות, והמערכת מחשבת לבד את ציון התקופה ואת הציון השנתי.",
    },
    {
        title: "לתלמידות",
        text: "רואות את הציונים בכל מקצוע, עם פירוט לפי תקופות ומבחנים.",
    },
    {
        title: "תמיד מעודכן",
        text: "כל ציון שהמורה שומרת מופיע מיד אצל התלמידה, בלי דפים ובלי טבלאות.",
    },
]

const Home = () => {
    const { user, isLoading } = useAuth()
    if (isLoading)
        return <Loading />
    if (user)
        return <Navigate to={getHomePath(user.role)} replace />

    return (
        <div className="flex flex-col">
            <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
                <Logo />
                <Link to="/login" className="text-primary font-semibold hover:underline">
                    כניסה
                </Link>
            </div>

            <div className="max-w-5xl w-full mx-auto">
                <section className="text-center py-16">
                    <h1 className="text-4xl md:text-5xl leading-tight mb-6">
                        כל הציונים של בית הספר,
                        <br />
                        <span className="text-gold">במקום אחד</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                        מערכת פשוטה שבה המורות מנהלות את המבחנים והציונים של הכיתות שלהן,
                        והתלמידות עוקבות אחרי ההישגים שלהן לאורך השנה.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block bg-primary text-white text-lg font-semibold px-8 py-3 rounded-xl shadow hover:bg-primary-light"
                    >
                        כניסה למערכת
                    </Link>
                </section>

                <section className="grid gap-4 md:grid-cols-3 mb-12">
                    {features.map((feature) => (
                        <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h2>{feature.title}</h2>
                            <p className="text-slate-600">{feature.text}</p>
                        </div>
                    ))}
                </section>

                <section className="bg-gold-light border-2 border-gold rounded-2xl p-8 mb-16 text-center">
                    <h2 className="text-2xl">מנהלת?</h2>
                    <p className="text-slate-700 max-w-2xl mx-auto mb-4">
                        רוצה להקל על המורות בהזנת הציונים ועל התלמידות במעקב אחריהם?
                        צרי קשר ונצרף את בית הספר שלך למערכת.
                    </p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary hover:underline" dir="ltr">
                        {CONTACT_EMAIL}
                    </a>
                </section>
            </div>

            <footer className="text-center text-sm text-slate-500 py-6 border-t border-slate-200">
                ציונים בקליק
            </footer>
        </div>
    )
}

export default Home
