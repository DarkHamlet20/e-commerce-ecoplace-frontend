import { useEffect, useState } from "react";
import LayoutComponent from "../../layout/LayoutMain";
import ProductComponent from "../../components/ProductComponent";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setData(response.data);
        setLoading(false)
      } catch (err) {
        console.log("Advertesiment " + err);
      }
    };

    getData();
  }, [id]);

  if(loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <LayoutComponent>
        <ProductComponent
          name={data?.name}
          id={data?._id}
          img={data?.images[0]}
          brand={data?.brand}
          price={data?.price}
          description={data?.description}
        />
      </LayoutComponent>
    </>
  );
};

export default ProductPage;
