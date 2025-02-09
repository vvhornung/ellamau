import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import ProductsTable from "@/components/ProductTable";
import { toast } from "react-hot-toast";
import debounce from "lodash.debounce";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch products
  async function fetchProducts() {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/products");
      const products = res.data;
      setProducts(products.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch categories
  async function fetchCategories() {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }


  // Debounce search query
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 300),
    []
  );





  // Delete selected products
  const deleteSelectedProducts = async () => {
    if (!selectedProducts.length) return;

    if (!confirm("Are you sure you want to delete the selected products?")) {
      return;
    }

    try {
      await axios.delete("/api/products", {
        data: { ids: selectedProducts },
      });

      console.log(products)
      setProducts((prev) =>
        prev.filter((product) => !selectedProducts.includes(product._id))
      );
      setSelectedProducts([]);
      toast.success("Products deleted successfully");
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error("Failed to delete products");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        {/* Action Buttons */}
        <div className="flex flex-col gap-4 md:flex-row w-full max-w-screen-lg justify-between">
          <Link className="btn-primary" href="/products/new">
            Add new product
          </Link>
          <Link className="btn-primary" href="/products/upload-excel">
            Upload Products via Excel
          </Link>
          {selectedProducts.length > 0 && (
            <button className="btn-red" onClick={deleteSelectedProducts}>
              Delete Selected ({selectedProducts.length})
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-fit">
              <label className="block mb-2">Filter by category</label>
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
            <div className="w-fit">
              <label className="block mb-2">Search by name</label>
              <input
                type="text"
                placeholder="Search products..."
                className="border rounded px-2 py-1"
                value={searchQuery}
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Products Table */}
          {isLoading ? (
            <div className="flex justify-center py-8">Loading...</div>
          ) : (
            <ProductsTable
              products={products}
              categories={categories}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              filterCategory={filterCategory}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Products;
