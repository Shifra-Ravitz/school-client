import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App() {

  
  return (
    <>
     <Header/>
     <main className="max-w-6xl mx-auto px-4 py-8">
       <Outlet/>
     </main>

    </>
  )
}

export default App

