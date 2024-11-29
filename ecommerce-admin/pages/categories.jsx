import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  async function saveCategory(e) {
    e.preventDefault();
    const payload = {
      name,
      parentCategory: parentCategory || null,
      properties: properties.map((property) => ({
        name: property.name,
        values: property.value.split(",").map((v) => v.trim()),
      })),
    };

    console.log("Payload:", payload);

    if (editingCategory) {
      // If editing, include the ID for updating
      payload.id = editingCategory._id;
      await axios
        .put("/api/categories", payload) // Send a PUT request for updates
        .then((res) => {
          console.log("Category updated:", res.data);
        })
        .catch((err) => {
          console.error("Error updating category:", err);
        });
      setEditingCategory(null);
    } else {
      // Otherwise, create a new category
      await axios
        .post("/api/categories", payload) // Send a POST request for creation
        .then((res) => {
          console.log("Category created:", res.data);
        })
        .catch((err) => {
          console.error("Error creating category:", err);
        });
    }

    clearForm();
    fetchCategories();
  }

  function editCategory(category) {
    setEditingCategory(category);
    setName(category.name);
    setParentCategory(category.parentCategory?._id || "");
    setProperties(
      category.properties.map((property) => ({
        name: property.name,
        value: property.values.join(", "),
      }))
    );
  }

  async function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios
            .delete(`/api/categories?id=${_id}`)
            .then((res) => {
              console.log("Category deleted:", res.data);
              fetchCategories();
              setEditingCategory(null);
            })
            .catch((err) => {
              console.error("Error deleting category:", err);
            });
        }
      });
  }

  function addProperty() {
    setProperties([...properties, { name: "", value: "" }]);
  }

  function handlePropertyNameChange(ev, index) {
    const newProperties = [...properties];
    newProperties[index].name = ev.target.value;
    setProperties(newProperties);
  }

  function handlePropertyValuesChange(ev, index) {
    const newProperties = [...properties];
    newProperties[index].value = ev.target.value;
    setProperties(newProperties);
  }

  function deleteProperty(index) {
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);
  }

  function clearForm() {
    setName("");
    setParentCategory("");
    setProperties([]);
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <form onSubmit={saveCategory} action="" className="my-4 space-y-4">
        <h2>Add a new Category</h2>
        <div>
          <label htmlFor="">
            {editingCategory
              ? `Edit Category ${editingCategory.name}`
              : "Add Category"}
          </label>
          <div className="flex gap-1 items-center">
            <input
              type="text"
              placeholder="Category Name"
              onChange={(ev) => setName(ev.target.value)}
              value={name}
            />
            <select
              name=""
              id=""
              value={parentCategory}
              onChange={(ev) => setParentCategory(ev.target.value)}
            >
              <option value="">No Parent Category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="my-2 space-y-2">
          <label htmlFor="" className="block">
            Properties
          </label>
          <button
            type="button"
            className="btn-default text-sm"
            onClick={addProperty}
          >
            add new property
          </button>
          {properties.map((property, index) => (
            <div key={index} className="flex gap-1 items-center ">
              <input
                type="text"
                placeholder="Property Name ex. Colors"
                value={property.name}
                onChange={(ev) => handlePropertyNameChange(ev, index)}
              />
              <input
                type="text"
                placeholder="Property Value comma separated ex. s,m,l"
                value={property.value}
                onChange={(ev) => handlePropertyValuesChange(ev, index)}
              />
              <button
                type="button"
                className="btn-red mb-2"
                onClick={(index) => deleteProperty(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {
          // If editing, show the cancel button
          editingCategory && (
            <button
              type="button"
              className="btn-red mr-2"
              onClick={() => {
                setEditingCategory(null);
                clearForm();
              }}
            >
              Cancel
            </button>
          )
        }
        <button type="submit" className="btn-primary py-2 ">
          Save
        </button>
      </form>

      {!editingCategory && (
        <>
          <h2>
            {categories.length > 0  ? "Categories" : "No Categories"}
          </h2>
          <table className="basic w-2/3">
            <thead>
              <tr>
                <td>Category Name</td>
                <td>Parent Category</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.parentCategory?.name}</td>
                    <td>
                      <a
                        className="btn-default"
                        onClick={() => editCategory(category)}
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
                        <span className="hidden lg:inline w-1/3">Edit</span>
                      </a>
                      <a
                        className="btn-red"
                        onClick={() => deleteCategory(category)}
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
                        <span className="hidden lg:inline w-1/3">Delete</span>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="1">No Categories</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
