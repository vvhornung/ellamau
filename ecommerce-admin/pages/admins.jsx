import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    const { data } = await axios.get("/api/admins");
    setAdmins(data);
  }

  async function addAdmin(e) {
    e.preventDefault();
    if (!email) return;
    await axios.post("/api/admins", { email });
    setEmail("");
    fetchAdmins();
  }

  async function removeAdmin(id) {
    if (!window.confirm("Are you sure you want to remove this admin?")) return;
    await axios.delete(`/api/admins?id=${id}`);
    fetchAdmins();
  }

  return (
    <Layout>
      <h1>Admin Management</h1>
      <form onSubmit={addAdmin} className="flex gap-2">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input w-2/3"
        />
        <button type="submit" className="btn-primary">
          Add Admin
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.email}</td>
              <td>
                <button
                  className="btn-red"
                  onClick={() => removeAdmin(admin._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
