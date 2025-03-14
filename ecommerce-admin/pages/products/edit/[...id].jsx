import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import Spinner from "@/components/Spinner";
import { toast } from "react-hot-toast";

export default function EditProductPage() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/products?id=${id}`);
        if (res.data?.data) {
          setProduct(res.data.data);
        } else {
          toast.error("Product not found");
          navigateBack();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error loading product");
        navigateBack();
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  const navigateBack = () => {
    // Get stored filters
    const category = localStorage.getItem("productFilterCategory") || "";
    const search = localStorage.getItem("productSearchQuery") || "";

    // Build query object for router
    const query = {};
    if (category) query.category = category;
    if (search) query.search = search;

    router.push({
      pathname: "/products",
      query,
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold m-0">
            Edit Product - {product?.reference}
          </h1>
          <button className="btn-default" onClick={navigateBack}>
            Back to Products
          </button>
        </div>

        {product && <ProductForm {...product} _id={id} />}
      </div>
    </Layout>
  );
}
