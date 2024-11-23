import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

function ProductForm({
  _id,
  name: initialName,
  description: initialDescription,
  price: initialPrice,
  images: initialImages,
}) {
  const [name, setName] = useState(initialName || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [price, setPrice] = useState(initialPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(initialImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  function saveProduct(ev) {
    ev.preventDefault();

    const data = { name, description, price, images };

    if (_id) {
      axios.put(`/api/products?id=${_id}`, data).then((res) => {
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
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const newImages = res.data.links;
          setImages([...images, ...newImages]);
        });
    }
    setIsUploading(false);
  }

  return (
    <form onSubmit={saveProduct}>
      <label htmlFor="">Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />

      <label htmlFor="">Images</label>

      <div className="space-y-2">
        {images?.length == 0 && (
          <div className="text-sm ">No Images for this product</div>
        )}

        <div className="flex flex-wrap gap-1">
          {isUploading && (
            <div className="h-24 w-24 flex items-center bg-slate-800">
              loadingggg
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
                  width={100}
                  height={400}
                  className="w-24 h-24 object-cover rounded-md"
                  />
   
              ))}
          </ReactSortable>
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
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
      <label htmlFor="">Description</label>
      <textarea
        type="text"
        placeholder="Description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />

      <label htmlFor="">Price</label>
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}

export default ProductForm;
