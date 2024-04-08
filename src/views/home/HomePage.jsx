import { useState } from 'react'
import CatalogoComponent from '../../components/CatalogoComponent'
import { Sidebar } from '../../components/Sidebar'
import LayoutComponent from '../../layout/LayoutMain'

const HomePage = () => {
  const [showSide, setShowSide] = useState(false)

  const handleSide = () => {
    setShowSide(!showSide)
  }


  return (
    <>
      <LayoutComponent fuction={handleSide}>
      <div className=''>
          <div className='flex justify-center smm:justify-bettwen w-screen'>
            <Sidebar showSide={showSide} />
            <CatalogoComponent />
          </div>
        </div>
      </LayoutComponent>
    </>
  )
}

export default HomePage