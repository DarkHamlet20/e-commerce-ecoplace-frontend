import CatalogoComponent from '../../components/CatalogoComponent'
import { Sidebar } from '../../components/Sidebar'
import LayoutComponent from '../../layout/LayoutMain'

const HomePage = () => {
  return (
    <>
      <LayoutComponent>
        <div className=''>
          <div className={`flex flex-row`}>
            <Sidebar />
            <CatalogoComponent />
          </div>
        </div>
      </LayoutComponent>
    </>
  )
}

export default HomePage