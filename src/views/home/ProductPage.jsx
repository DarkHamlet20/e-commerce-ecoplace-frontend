import { useEffect, useState } from 'react'
import LayoutComponent from '../../layout/LayoutMain'
import ProductComponent from '../../components/ProductComponent'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductPage = () => {

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://ecoplace.3.us-1.fl0.io/products/${id}`);
        setData(response.data)
      }
      catch (err) {
        console.log('Advertesiment ' + err);
      }
    };

    getData();
  }, [id])

  return (
    <>
      <LayoutComponent>
        <ProductComponent
          name={data?.name}
          id={data?._id}
          img={data?.images[0]}
          brand={data?.brand}
          price={data?.price}
          description={data?.description} />
      </LayoutComponent>
    </>
  )
}

export default ProductPage