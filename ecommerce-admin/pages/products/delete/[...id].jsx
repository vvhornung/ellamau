import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

function DeleteProduct() {
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

  const deleteProduct = async () => {
    const res = await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      router.push("/products");
    } else {
      console.error("Failed to delete product");
    }
  };

  const goBack = () => {
    router.push("/products");
  };

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &nbsp;&quot;{product?.name}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}

export default DeleteProduct;
