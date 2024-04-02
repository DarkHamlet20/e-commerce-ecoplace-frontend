import React,{useState, useEffect} from 'react'

const ProductCard = () => {

  const [data, setData] = useState()

  

  useEffect(() => {
    const fetchProducts = fetch('https://ecoplace.3.us-1.fl0.io/products')
    fetchProducts.then(res => res.json()).then(data => console.log(data))
  },[])


  return (
    <div>Products</div>
  )
}

export default ProductCard