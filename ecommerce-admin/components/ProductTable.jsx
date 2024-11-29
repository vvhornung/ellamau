import React, { useState, useRef } from "react";
import Link from "next/link";

const ProductsTable = ({
  products,
  categories,
  selectedProducts,
  setSelectedProducts,
  filterCategory,
  searchQuery,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [expandedBaseProduct, setExpandedBaseProduct] = useState(null);
  const toggledProducts = useRef(new Set());

  const handleMouseDown = (productId) => {
    setIsDragging(true);
    toggledProducts.current.clear();
    toggleProduct(productId);
    toggledProducts.current.add(productId);
  };

  const handleMouseOver = (productId) => {
    if (!isDragging) return;

    if (!toggledProducts.current.has(productId)) {
      toggleProduct(productId);
      toggledProducts.current.add(productId);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    toggledProducts.current.clear();
  };

  const toggleProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const getAllChildCategoryIds = (parentId, categories) => {
    const childCategories = categories.filter(
      (category) => category.parentCategory?._id === parentId
    );

    const childIds = childCategories.map((category) => category._id);

    const descendantIds = childIds.flatMap((childId) =>
      getAllChildCategoryIds(childId, categories)
    );

    return [parentId, ...descendantIds];
  };

  const filteredProducts = products.filter((product) => {
    if (filterCategory) {
      const relevantCategoryIds = getAllChildCategoryIds(
        filterCategory,
        categories
      );
      return relevantCategoryIds.includes(product.category);
    }
    return true;
  });

  const groupByBaseName = (products) => {
    const grouped = {};
    products.forEach((product) => {
      const baseName = product.name.split(" (")[0];
      if (!grouped[baseName]) {
        grouped[baseName] = [];
      }
      grouped[baseName].push(product);
    });
    return grouped;
  };

  const groupedProducts = groupByBaseName(
    filteredProducts.filter((product) =>
      searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
  );

  return (
    <table className="w-full basic" onMouseUp={handleMouseUp}>
      <thead>
        <tr>
          <td>Select</td>
          <td>Product name</td>
          <td>Category</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedProducts).map(([baseName, variants]) =>
          variants.length === 1 ? (
            // Render single product as is
            <tr
              key={variants[0]._id}
              className={
                selectedProducts.includes(variants[0]._id) ? "bg-zinc-900" : ""
              }
              onMouseDown={() => handleMouseDown(variants[0]._id)}
              onMouseOver={() => handleMouseOver(variants[0]._id)}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(variants[0]._id)}
                  readOnly
                />
              </td>
              <td className="select-none">{variants[0].name}</td>
              <td className="select-none">
                {categories.find((c) => c._id === variants[0].category)?.name ||
                  "N/A"}
              </td>
              <td>
                <div>
                  <Link
                    className="btn-default"
                    href={`/products/edit/${variants[0]._id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn-red"
                    href={`/products/delete/${variants[0]._id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ) : (
            // Render base product with variants
            <React.Fragment key={baseName}>
              <tr className="bg-neutral-900">
                <td></td>
                <td className="font-semibold flex flex-col xl:flex-row items-center text-pretty justify-between">
                  {baseName}
                  <button
                    className="btn-primary mx-4 md:text-sm "
                    onClick={() =>
                      setExpandedBaseProduct(
                        expandedBaseProduct === baseName ? null : baseName
                      )
                    }
                  >
                    {expandedBaseProduct === baseName
                      ? "Hide Variants"
                      : `Show Variants (${variants.length})`}
                  </button>
                </td>
                <td>
                  {categories.find((c) => c._id === variants[0]?.category)
                    ?.name || "N/A"}
                </td>
                <td></td>
              </tr>
              {expandedBaseProduct === baseName &&
                variants.map((product) => (
                  <tr
                    key={product._id}
                    className={
                      selectedProducts.includes(product._id)
                        ? "bg-zinc-900"
                        : ""
                    }
                    onMouseDown={() => handleMouseDown(product._id)}
                    onMouseOver={() => handleMouseOver(product._id)}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        readOnly
                      />
                    </td>
                    <td className="select-none w-fit">{product.name}</td>
                    <td className="select-none">
                      {categories.find((c) => c._id === product.category)
                        ?.name || "N/A"}
                    </td>
                    <td>
                      <div className="w-max">
                        <Link
                          className="btn-default"
                          href={`/products/edit/${product._id}`}
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
                          <p className="hidden md:inline">
                            Edit
                          </p>
                        </Link>
                        <Link
                          className="btn-red"
                          href={`/products/delete/${product._id}`}
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
                            <p className="hidden md:inline">
                                Delete
                            </p>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          )
        )}
      </tbody>
    </table>
  );
};

export default ProductsTable;
