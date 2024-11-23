import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

function EditProductPage() {
  const [product, setProduct] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/api/products?id=${id}`);
      const product = res.data;
      setProduct(product.data);

    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return (
    <Layout>
      <h1>Edit Product</h1>
      <button onClick={() => router.push("/products")}>Go to Products</button>
      
      {
        product && (
          
          <ProductForm {...product}/>
        )
      }

      
    </Layout>
  );
}

export default EditProductPage;
