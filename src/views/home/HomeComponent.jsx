import { useState } from 'react';
import CatalogoComponent from '../../components/CatalogoComponent';
import { Header } from '../../components/layout/HeaderComponent';
import { Sidebar } from '../../components/layout/Sidebar';

function HomePage() {
  const [mode, setMode] = useState(false)

  
  return (
    <>
      <div className=''>
        <header className='border-b py-4 px-6 w-full text-white bg-gray-700 fixed z-50'>
          <div className='mb-3'>
            <Header />
          </div>
          <nav className='border-t md:hidden'>
            <span  onClick={() => setMode((prev) => !prev)}>Categories</span>
          </nav>
        </header>
      <div className={`flex h-screen ${mode ? 'sm:justify-between' : ''} pt-36`}>
        <aside className={`h-full mr-4  px-6 transition-all -translate-x-full ${mode ? 'sm:translate-x-0 z-40' : ''} ${mode ? 'hidden' : ''} ${mode ? '' : 'absolute'} sm:flex`}>
          <Sidebar />
        </aside>
        <main className='w-[70%] absolute z-10 right-0 smm:static'>
          <CatalogoComponent />
        </main>
      </div>
    </div>
    </>
  );
}

export default HomePage;