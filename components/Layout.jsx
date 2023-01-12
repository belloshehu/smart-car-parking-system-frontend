import Header from "./Header"
import Sidebar from "./Sidebar"

const Layout = ({children}) => {
  return (
    <div className='bg-slate-200 text-center md:p-0 w-screen h-screen overflow-y-hidden'>
      <Header />
      <section className="flex">
        <Sidebar />
        <main className="w-full p-0 md:p-0 pb-10 mt-10 py-20 mb-20 bg-slate-200 h-screen overflow-y-auto">
          {children}
        </main>
      </section>
    </div>
  )
}

export default Layout