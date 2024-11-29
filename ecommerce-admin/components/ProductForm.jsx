import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import Spinner from "./Spinner";
import { toTitleCase } from "@/utils";

function ProductForm({
  _id,
  name: initialName,
  reference: initialRef,
  category: initialCategory,
  description: initialDescription,
  details: initialDetails,
  price: initialPrice,
  images: initialImages,
  properties: initialProperties,
}) {
  const [name, setName] = useState(initialName || "");
  const [reference, setReference] = useState(initialRef || "");
  const [category, setCategory] = useState(initialCategory || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [details, setDetails] = useState(initialDetails || []);
  const [price, setPrice] = useState(initialPrice || "");
  const [images, setImages] = useState(initialImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState(initialProperties || {});
  const [goToProducts, setGoToProducts] = useState(false);

  // Creation of dictionary for pairing name of a category with its _id

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
      

    })
     console.log("Properties:", properties);;
  }, [properties]);

  function saveProduct(ev) {
    ev.preventDefault();

    const data = {
      // include the properties here
      name: `${reference,'-',name.split(' (')[0]} (${Object.values(properties).join(", ")})`,
      reference,
      category,
      description,
      details,
      price,
      images,
      properties,
    };
    console.log("Product data:", data);
    console.log("Product ID:", _id);

    if (_id) {
      data.id = _id;
      axios.put(`/api/products`, data).then((res) => {
        console.log(res.data);
      });
    } else {
      axios.post("/api/products", data).then((res) => {
        console.log(res.data);
      });
    }

    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  function uploadImages(ev) {
    setIsUploading(true);
    const files = ev.target.files;
    if (files?.length) {
      const formData = new FormData();
      for (const file of files) {
        formData.append("images", file);
      }
      axios
        .post("/api/upload", formData)
        .then((res) => setImages([...images, ...res.data.links]))
        .catch((error) => console.error("Error uploading images:", error))
        .finally(() => setIsUploading(false));
    }
  }

  function addProperty(property, ev) {
    const { name } = property;
    setProperties((prev) => ({ ...prev, [name]: ev.target.value }));
  }

  function getProperties(category) {
    const properties = {};
    const seenCategories = new Set();

    let currentCategory = category;
    while (currentCategory && !seenCategories.has(currentCategory._id)) {
      seenCategories.add(currentCategory._id);

      if (Array.isArray(currentCategory.properties)) {
        currentCategory.properties.forEach(({ name, values }) => {
          if (properties[name]) {
            properties[name].values = Array.from(
              new Set([...properties[name].values, ...values])
            );
          } else {
            properties[name] = {
              name,
              values: [...values],
            };
          }
        });
      }

      currentCategory = currentCategory.parentCategory;
    }

    return properties;
  }

  const categoryProperties = useMemo(() => {
    if (category && categories.length > 0) {
      const selectedCategory = categories.find((c) => c._id === category);
      if (selectedCategory) {
        return getProperties(selectedCategory);
      }
    }
    return {};
  }, [category, categories]);



  



  return (
    <form onSubmit={saveProduct} className="space-y-4">
      <div>
        <label htmlFor="">Name</label>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>

      <div>
        <label htmlFor="">Reference</label>
        <input
          type="text"
          placeholder="Product Reference"
          value={reference}
          onChange={(ev) => setReference(ev.target.value)}
        />
      </div>

      <div>
        <label htmlFor="">Categories</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">No Category</option>
          {categories?.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {categoryProperties && Object.keys(categoryProperties).length > 0 && (
        <div className="space-y-2">
          <p className="font-semibold text-lg">Properties</p>
          {Object.values(categoryProperties).map((property, index) => (
            <div key={index}>
              <label>{property.name}</label>
              <select
                value={toTitleCase(properties?.[property.name]) || ""}
                onChange={(ev) => addProperty(property, ev)}
              >
                <option value="">Select a value</option>
                {property.values.map((value, idx) => (
                  <option key={idx} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <div>
        <label htmlFor="">Images</label>
        <div className="space-y-2">
          {images?.length === 0 && (
            <div className="text-xs text-orange-600 ">
              No Images for this product
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            {isUploading && (
              <div className="h-24 w-24 flex items-center bg-slate-800">
                <Spinner />
              </div>
            )}
            <ReactSortable
              list={images}
              className="flex flex-wrap gap-1"
              setList={setImages}
            >
              {images?.length > 0 &&
                images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ))}
            </ReactSortable>
            <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-lg shadow-sm border border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <div>Add image</div>
              <input type="file" onChange={uploadImages} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="">Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </div>

      <div>
        <label htmlFor="">Details</label>
        <div className="flex flex-col gap-4">
          {details.map((detail, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Detail"
                value={detail}
                className="w-1/3"
                onChange={(ev) => {
                  const newDetails = [...details];
                  newDetails[index] = ev.target.value;
                  setDetails(newDetails);
                }}
              />
              {/* button for removing detail */}
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
        </div>
        <button
          type="button"
          onClick={() => setDetails([...details, ""])}
          className="btn-default "
        >
          Add Detail
        </button>
      </div>
      <div>
        <label htmlFor="">Price</label>
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
      </div>
      <button type="submit" className="btn-primary mt-6">
        Save
      </button>
    </form>
  );
}

export default ProductForm;
