import React, { useEffect, useState } from 'react'
import LayoutComponent from '../../layout/LayoutMain'
import ProductComponent from '../../components/ProductComponent'
import axios from 'axios'
const ProductPage = () => {

  const [data, setData] = useState({})

  const getData = async () => {
    try {
      const response = await axios.get('https://ecoplace.3.us-1.fl0.io/products/6610152a852120b8531fbdbe')
      setData(response.data)
    }
    catch(err) {
      console.log('Advertesiment '+ err);
    }
  }
  console.log(data.images);

  useEffect(() => {
    getData()
  }, [])


  return (
    <>
      <LayoutComponent>
      <ProductComponent
            name={data.name}
            id={data._id}
            img={data.images[0]}
            brand={data.brand}
            price={data.price}
            description={data.description} />
      </LayoutComponent>
    </>
  )
}

export default ProductPage