import CatalogoComponent from '../../components/CatalogoComponent'
import { Header } from '../../components/HeaderComponent'
import { Sidebar } from '../../components/Sidebar'
import LayoutComponent from '../../layout/LayoutMain'
import HomeComponent from './HomeComponent'

const HomePage = () => {
  return (
    <>
      <LayoutComponent>
      <div className=''>
        <div className={`flex h-screen `}>
            <Sidebar />
            <CatalogoComponent />
        </div>
      </div>
      </LayoutComponent>
    </>
  )
}

export default HomePage