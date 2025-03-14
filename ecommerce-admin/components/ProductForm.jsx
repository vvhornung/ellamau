import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import Spinner from "./Spinner";
import { toast } from "react-hot-toast";

function ProductForm({
  _id,
  name: initialName,
  reference: initialRef,
  category: initialCategory,
  description: initialDescription,
  details: initialDetails,
  price: initialPrice,
  stock: initialStock,
  images: initialImages,
  variants: initialVariants,
}) {
  const [name, setName] = useState(initialName || "");
  const [reference, setReference] = useState(initialRef || "");
  const [category, setCategory] = useState(initialCategory?._id || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [details, setDetails] = useState(initialDetails || []);
  const [price, setPrice] = useState(initialPrice || "");
  const [stock, setStock] = useState(initialStock || 0);
  const [images, setImages] = useState(initialImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState(initialVariants || []);
  const [hasVariants, setHasVariants] = useState(
    !(initialName && initialVariants?.length == 0)
  );
  const [goToProducts, setGoToProducts] = useState(false);

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const validateVariant = (variant) => {
    return variant.color?.trim() && variant.size?.trim() && variant.stock >= 0;
  };

  const canAddNewVariant = () => {
    if (variants.length === 0) return true;
    return variants.every(validateVariant);
  };

  async function saveProduct(ev) {
    ev.preventDefault();

    // Basic validation
    if (!name || !reference || !category || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!price) {
      toast.error("Price is required");
      return;
    }

    if (hasVariants) {
      if (variants.length === 0) {
        toast.error("Please add at least one variant");
        return;
      }

      if (!variants.every(validateVariant)) {
        toast.error(
          "All variants must be completed with color, size and stock"
        );
        return;
      }
    } else {
      if (stock === undefined || stock === null || stock < 0) {
        toast.error("Please enter a valid stock amount");
        return;
      }
    }

    const data = {
      name: initialName ? initialName : `${reference}-${name}`,
      reference,
      category,
      description,
      details: details.filter((d) => d.trim() !== ""),
      images,
      price: parseFloat(price),
    };

    if (hasVariants) {
      data.variants = variants.map((variant) => ({
        _id: variant._id, // Preserve existing IDs
        color: variant.color.trim(),
        size: variant.size.trim(),
        stock: parseInt(variant.stock),
        images: variant.images || [], // Also preserve images
      }));
      data.stock = variants.reduce(
        (total, variant) => total + parseInt(variant.stock),
        0
      );
    } else {
      data.stock = parseInt(stock);
      data.variants = [];
    }

    try {
      if (_id) {
        data.id = _id;
        await axios.put("/api/products", data);
        toast.success("Product updated!");
      } else {
        await axios.post("/api/products", data);
        toast.success("Product created!");
      }
      setGoToProducts(true);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error.response?.data?.error || "Error saving product");
    }
  }

  function addVariant() {
    if (!canAddNewVariant()) {
      toast.error("Please complete the current variant first");
      return;
    }

    setVariants([
      ...variants,
      {
        color: "",
        size: "",
        stock: 0,
      },
    ]);
  }

  function updateVariant(index, field, value) {
    const newVariants = [...variants];
    newVariants[index][field] =
      field === "stock" ? parseInt(value) || 0 : value;
    setVariants(newVariants);
  }

  function removeVariant(index) {
    setVariants(variants.filter((_, i) => i !== index));
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      try {
        const res = await axios.post("/api/upload", data);
        setImages((oldImages) => [...oldImages, ...res.data.links]);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Upload failed");
      }
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  if (goToProducts) {
    router.push("/products");
  }

  return (
    <form onSubmit={saveProduct} className="space-y-4">
      <div>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          required
        />
      </div>

      <div>
        <label>Reference</label>
        <input
          type="text"
          placeholder="Product Reference"
          value={reference}
          onChange={(ev) => setReference(ev.target.value)}
          required
        />
      </div>

      <div>
        <label>Category</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories?.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          required
        />
      </div>

      <div>
        <label>Price (applies to all variants)</label>
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
          required
        />
      </div>

      {!hasVariants && (
        <div>
          <label>Stock</label>
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(ev) => setStock(ev.target.value)}
            required
            min="0"
          />
        </div>
      )}
      <div className="mb-4 flex gap-2 items-center justify-start">
        <input
          id="hasVariants"
          type="checkbox"
          checked={hasVariants}
          className="w-fit bg-black"
          onChange={(ev) => {
            setHasVariants(ev.target.checked);
            if (!ev.target.checked) {
              setVariants([]);
            }
          }}
        />
        <label htmlFor="hasVariants" className="mb-2">
          <span>This product has variants (colors, sizes, etc.)</span>
        </label>
      </div>
      {hasVariants && (
        <div className="space-y-4">
          <div className="flex flex-col gap-2 items-start">
            <label className="text-lg font-semibold">Variants</label>
            <button
              type="button"
              onClick={addVariant}
              className={`btn-default ${
                !canAddNewVariant() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!canAddNewVariant()}
            >
              Add Variant
            </button>
          </div>
          {variants.map((variant, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label>Color</label>
                  <input
                    type="text"
                    placeholder="Color"
                    value={variant.color}
                    onChange={(ev) =>
                      updateVariant(index, "color", ev.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <label>Size</label>
                  <input
                    type="text"
                    placeholder="Size"
                    value={variant.size}
                    onChange={(ev) =>
                      updateVariant(index, "size", ev.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={variant.stock}
                    onChange={(ev) =>
                      updateVariant(index, "stock", parseInt(ev.target.value))
                    }
                    required
                    min="0"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="btn-red"
              >
                Remove Variant
              </button>
            </div>
          ))}
        </div>
      )}
      <div>
        <label>Details</label>
        <div className="space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={detail}
                onChange={(ev) => {
                  const newDetails = [...details];
                  newDetails[index] = ev.target.value;
                  setDetails(newDetails);
                }}
                placeholder="Product detail"
                className="flex-grow"
              />
              <button
                type="button"
                onClick={() => {
                  const newDetails = [...details];
                  newDetails.splice(index, 1);
                  setDetails(newDetails);
                }}
                className="btn-red"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setDetails([...details, ""])}
            className="btn-default"
          >
            Add Detail
          </button>
        </div>
      </div>
      <div>
        <label>
          Images{" "}
          <span className="text-sm text-gray-500">
            (First image will be used as preview)
          </span>
        </label>
        <div className="mb-2 flex flex-wrap gap-2 relative">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-2"
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link, index) => (
                <div
                  key={link}
                  className={`h-24 relative ${
                    index === 0
                      ? "border-2 border-neutral-200 p-1 rounded-lg shadow-md"
                      : ""
                  }`}
                >
                  <img src={link} alt="" className="rounded-lg h-24" />
                  {index === 0 && (
                    <div className=" bg-neutral-800 text-white text-xs px-2 py-1 mt-2 rounded-b-lg">
                      Preview
                    </div>
                  )}
                  <button
                    type="button"
                    className="absolute top-0 right-0 flex flex-col justify-center items-center text-center p-1 w-4 h-4 bg-red-500 text-white rounded-full"
                    onClick={() =>
                      setImages(images.filter((img) => img !== link))
                    }
                  >
                    &times;
                  </button>
                </div>
              ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 w-24 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          <label className="w-24 h-24 border text-center flex flex-col items-center justify-center rounded-lg bg-transparent cursor-pointer hover:bg-gray-100 hover:text-black group transition-colors duration-200 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 group-hover:text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div className="text-sm  ">Add Images</div>
            <div className="text-xs text-gray-500 mt-1">(Select multiple)</div>
            <input
              type="file"
              onChange={uploadImages}
              className="hidden"
              multiple
            />
          </label>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="btn-default"
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary" onClick={saveProduct}>
          Save
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
