import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function ProductForm({
  _id,
  name: initialName,
  description: initialDescription,
  price: initialPrice,
}) {
  const [name, setName] = useState(initialName || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [price, setPrice] = useState(initialPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();


  function saveProduct(ev) {
    ev.preventDefault();

    const data = { name, description, price };

    if(_id){
      axios.put(`/api/products?id=${_id}`, data).then((res) => {
        console.log(res.data);
      });
    }else{
    axios.post("/api/products", data).then((res) => {
      console.log(res.data);
    });
    }



    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
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
