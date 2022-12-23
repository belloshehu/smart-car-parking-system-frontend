import Header from "./Header"

const Layout = ({children}) => {
  return (
    <div className='bg-slate-800 p-3 text-center md:p-0 w-screen h-full' >
      <Header />
      <main className="p-2 md:p-20 mt-20">
        {children}
      </main>
    </div>
  )
}

export default Layout