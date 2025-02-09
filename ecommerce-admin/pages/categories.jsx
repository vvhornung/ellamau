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

  async function fetchCategories() {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function saveCategory(e) {
    e.preventDefault();

    if (!name.trim()) {
      swal.fire("Error", "Category name cannot be empty", "error");
      return;
    }

    const payload = {
      name,
      parentCategory: parentCategory || null,
      properties: properties.map((property) => ({
        name: property.name,
        values: property.value.split(",").map((v) => v.trim()),
      })),
    };

    try {
      if (editingCategory) {
        payload.id = editingCategory._id;
        await axios.put("/api/categories", payload);
      } else {
        await axios.post("/api/categories", payload);
      }
      clearForm();
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
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
          try {
            await axios.delete(`/api/categories?id=${category._id}`);
            fetchCategories();
            setEditingCategory(null);
          } catch (error) {
            console.error("Error deleting category:", error);
          }
        }
      });
  }

  function addProperty() {
    setProperties([...properties, { name: "", value: "" }]);
  }

  function handlePropertyChange(ev, index, field) {
    const newProperties = [...properties];
    newProperties[index][field] = ev.target.value;
    setProperties(newProperties);
  }

  function deleteProperty(index) {
    setProperties(properties.filter((_, i) => i !== index));
  }

  function clearForm() {
    setName("");
    setParentCategory("");
    setProperties([]);
    setEditingCategory(null);
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <form onSubmit={saveCategory} className="my-4 space-y-4">
        <h2>
          {editingCategory
            ? `Edit Category: ${editingCategory.name}`
            : "Add a New Category"}
        </h2>
        <div className="flex gap-1 items-center">
          <input
            type="text"
            placeholder="Category Name"
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <select
            value={parentCategory}
            onChange={(ev) => setParentCategory(ev.target.value)}
          >
            <option value="">No Parent Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="my-2 space-y-2 flex flex-col w-fit">
          <label>Properties</label>
          <button
            type="button"
            className="btn-default text-sm"
            onClick={addProperty}
          >
            Add New Property
          </button>
          {properties.map((property, index) => (
            <div key={index} className="flex gap-1 items-center">
              <input
                type="text"
                placeholder="Property Name"
                value={property.name}
                onChange={(ev) => handlePropertyChange(ev, index, "name")}
              />
              <input
                type="text"
                placeholder="Values (comma separated)"
                value={property.value}
                onChange={(ev) => handlePropertyChange(ev, index, "value")}
              />
              <button
                type="button"
                className="btn-red"
                onClick={() => deleteProperty(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {editingCategory && (
          <button type="button" className="btn-red mr-2" onClick={clearForm}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
      <h2>{categories.length > 0 ? "Categories" : "No Categories"}</h2>
      <table className="basic w-2/3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Parent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.parentCategory?.name || "-"}</td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      className="btn-default"
                      onClick={() => editCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-red"
                      onClick={() => deleteCategory(category)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Categories</td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }) => <Categories swal={swal} />);
