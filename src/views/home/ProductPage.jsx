import { useEffect, useState } from "react";
import LayoutComponent from "../../layout/LayoutMain";
import ProductComponent from "../../components/ProductComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../../styles/Global.css';

const ProductPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://34.201.92.59:3000/products/${id}`
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.log("Advertesiment " + err);
      }
    };

    getData();
  }, [id]);

  const updateCartCount = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const response = await axios.get("http://34.201.92.59:3000/carts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartCount(response.data.items.length);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    updateCartCount(); // Fetch the cart count on mount
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <LayoutComponent cartCount={cartCount}>
      <ProductComponent
        name={data?.name}
        id={data?._id}
        images={data?.images || []}
        brand={data?.brand}
        price={data?.price}
        description={data?.description}
        onAddToCart={updateCartCount}
      />
    </LayoutComponent>
  );
};

export default ProductPage;