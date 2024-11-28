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
      <div className="flex gap-2 items-center">
        <h1 className="m-0">Edit Product - </h1>
        <button className="text-primary" onClick={() => router.push("/products")}>Go to Products</button>
      </div>

      {product && <ProductForm {...product} />}
    </Layout>
  );
}

export default EditProductPage;
