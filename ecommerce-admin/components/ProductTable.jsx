import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import Link from "next/link";

const ProductsTable = ({
  products,
  categories,
  selectedProducts,
  setSelectedProducts,
  filterCategory,
  searchQuery = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [expandedBaseProduct, setExpandedBaseProduct] = useState(null);
  const toggledProducts = useRef(new Set());

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust this value

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, searchQuery]);

  // Create a complete category map with all category data
  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((cat) => map.set(cat._id.toString(), cat));
    return map;
  }, [categories]);

  // Get all child categories recursively
  const getAllChildCategories = useCallback(
    (categoryId) => {
      if (!categoryId) return [];

      const category = categoryMap.get(categoryId.toString());
      if (!category) return [categoryId];

      let allCategories = [categoryId];

      // Recursively get all children
      if (Array.isArray(category.children)) {
        category.children.forEach((childId) => {
          const childCategories = getAllChildCategories(childId.toString());
          allCategories = [...allCategories, ...childCategories];
        });
      }

      return allCategories;
    },
    [categoryMap]
  );

  // Filter products with memoization
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    let result = products;

    // Apply category filter
    if (filterCategory) {
      const categoryIds = getAllChildCategories(filterCategory);
      result = result.filter((product) =>
        categoryIds.includes(product.category?._id?.toString())
      );
    }

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    return result;
  }, [products, filterCategory, searchQuery, getAllChildCategories]);

  const formatPrice = useMemo(() => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return (price) => formatter.format(price);
  }, []);

  const getTotalStock = useMemo(() => {
    return (product) => {
      if (product.variants?.length > 0) {
        return product.variants.reduce(
          (total, variant) => total + (parseInt(variant.stock) || 0),
          0
        );
      }
      return product.stock || 0;
    };
  }, []);

  const handleMouseDown = (productId) => {
    setIsDragging(true);
    toggledProducts.current.clear();
    toggleProduct(productId);
    toggledProducts.current.add(productId);
  };

  const handleMouseOver = (productId) => {
    if (!isDragging || toggledProducts.current.has(productId)) return;
    toggleProduct(productId);
    toggledProducts.current.add(productId);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    toggledProducts.current.clear();
  };

  const toggleProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev?.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleVariant = (productId) => {
    setExpandedBaseProduct((current) =>
      current === productId ? null : productId
    );
  };

  const renderVariantRow = (variant, productId, idx) => (
    <tr key={`${productId}-variant-${idx}`} className="bg-neutral-800">
      <td className="hidden md:block" />
      <td className="select-none pl-8">
        {variant.color && variant.size
          ? `${variant.color} / ${variant.size}`
          : variant.color || variant.size}
      </td>
      <td />
      <td className="select-none">{variant.stock}</td>
      <td className="select-none">-</td>
      <td />
    </tr>
  );

  const renderProductActions = (productId) => (
    <div className="flex gap-2">
      <Link
        className="btn-default"
        href={`/products/edit/${productId}`}
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        <span className="hidden md:inline">Edit</span>
      </Link>
      <Link
        className="btn-red"
        href={`/products/delete/${productId}`}
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <span className="hidden md:inline">Delete</span>
      </Link>
    </div>
  );

  // Calculate pagination info with safety checks
  const paginationInfo = useMemo(() => {
    const totalItems = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    // Ensure current page is valid
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentItems = filteredProducts.slice(startIndex, endIndex);

    return {
      totalItems,
      totalPages,
      currentItems,
      startIndex,
      endIndex,
      isEmpty: totalItems === 0,
    };
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Improved pagination controls
  const renderPagination = () => {
    const { totalPages, isEmpty, totalItems, startIndex, endIndex } =
      paginationInfo;

    if (isEmpty) {
      return (
        <div className="mt-4 px-4 text-sm text-gray-500">No items found</div>
      );
    }

    return (
      <div className="mt-4 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            className="btn-default px-3 py-1"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn-default px-3 py-1"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {totalItems === 0
            ? "No items"
            : `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} items`}
        </div>
      </div>
    );
  };

  return (
    <div>
      <table className="w-full basic" onMouseUp={handleMouseUp}>
        <thead>
          <tr>
            <td className="hidden md:block">Select</td>
            <td>Product name</td>
            <td>Category</td>
            <td>Stock</td>
            <td>Price</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {paginationInfo.isEmpty ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No products found
              </td>
            </tr>
          ) : (
            paginationInfo.currentItems.map((product) => (
              <React.Fragment key={product._id}>
                <tr
                  className={`
                    ${
                      selectedProducts.includes(product._id)
                        ? "bg-zinc-900"
                        : ""
                    }
                    ${product.variants?.length > 0 ? "font-semibold" : ""}
                  `}
                  onMouseDown={() => handleMouseDown(product._id)}
                  onMouseOver={() => handleMouseOver(product._id)}
                >
                  <td className="hidden md:block">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      readOnly
                    />
                  </td>
                  <td className="select-none">
                    <div className="flex items-center gap-2">
                      <span>{product.name}</span>
                      {product.variants?.length > 0 && (
                        <button
                          className="btn-default text-xs"
                          onClick={() => toggleVariant(product._id)}
                        >
                          {expandedBaseProduct === product._id
                            ? "Hide"
                            : "Show"}{" "}
                          Variants ({product.variants.length})
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="select-none">
                    {product?.category?.name || "N/A"}
                  </td>
                  <td className="select-none">{getTotalStock(product)}</td>
                  <td className="select-none">{formatPrice(product.price)}</td>
                  <td>{renderProductActions(product._id)}</td>
                </tr>
                {expandedBaseProduct === product._id &&
                  product.variants?.map((variant, idx) =>
                    renderVariantRow(variant, product._id, idx)
                  )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default ProductsTable;
