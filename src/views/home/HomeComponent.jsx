import CatalogoComponent from '../../components/CatalogoComponent';
import { Sidebar } from '../../components/layout/Sidebar';

function HomePage() {

  
  return (
    <>
      <div className={`flex h-screen sm:justify-between pt-28`}>
            <Sidebar />
            <CatalogoComponent />
      </div>
    </>
  );
}

export default HomePage;