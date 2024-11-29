import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductsTable from "@/components/ProductTable";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const response = res.data;
      setProducts(response.data || []);
    });

    axios.get("/api/categories").then((res) => {
      setCategories(res.data || []);
    });
  }, []);

  const deleteSelectedProducts = () => {
    if (!selectedProducts.length) return;

    if (!confirm("Are you sure you want to delete the selected products?")) {
      return;
    }

    axios
      .delete("/api/products", {
        data: { ids: selectedProducts },
      })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter(
            (product) => !selectedProducts.includes(product._id)
          )
        );
        setSelectedProducts([]);
      })
      .catch((err) => {
        console.error("Error deleting products:", err);
      });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4 md:flex-row w-full max-w-screen-lg justify-between">
        <Link className="btn-primary" href={"/products/new"}>
          Add new product
        </Link>
        <Link href={"/products/upload-excel"} className="btn-primary">
          Upload Products via Excel
        </Link>
        {selectedProducts.length > 0 && (
          <button className="btn-red" onClick={deleteSelectedProducts}>
            Delete Selected ({selectedProducts.length})
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-4">
          <div className="w-fit">
            <label>Filter by category</label>
            <select
              className="border rounded px-2 py-1"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <div>
              <label>Search by name</label>
              <input
                type="text"
                placeholder="Search by name"
                className="border rounded px-2 py-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <ProductsTable
          products={products}
          categories={categories}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          filterCategory={filterCategory}
          searchQuery={searchQuery}
        />
      </div>
    </Layout>
  );
}

export default Products;
