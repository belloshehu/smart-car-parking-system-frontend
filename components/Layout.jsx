import Header from "./Header"
import Sidebar from "./Sidebar"

const Layout = ({children}) => {
  return (
    <div className='bg-slate-200 p-3 text-center md:p-0 w-screen h-screen overflow-y-hidden'>
      <Header />
      <section className="flex">
        <Sidebar />
        <main className="w-full p-2 md:p-20 mt-10 mb-20 bg-slate-200 h-screen overflow-y-auto">
          {children}
        </main>
      </section>
    </div>
  )
}

export default Layout