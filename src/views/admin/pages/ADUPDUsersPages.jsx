import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";

const ADUPDUsersPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    country: "",
    zip: "",
    role: "",
  });
  const token = localStorage.getItem("auth_token");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchUserDetails();
    fetchRoles();
  }, [id, token]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData(response.data);
    } catch (error) {
      showErrorAlert("Error fetching user details");
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesResponse = await axios.get("http://localhost:3000/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoles(rolesResponse.data);
    } catch (error) {
      showErrorAlert("Error fetching roles");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/users/admin/users/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showConfirmationAlert(
        "Actualizar Usuario",
        "User updated successfully"
      );
      navigate("/admin/users/view");
    } catch (error) {
      showErrorAlert("Error updating user");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Editar Usuario</h1>
        <button
          onClick={() => navigate("/admin/users/view")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver a la lista
        </button>
      </div>
      <div className="max-w-xl mx-auto bg-white p-8 border rounded">
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(
            ([key, value]) =>
              key !== "role" && (
                <div key={key} className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={key}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={key}
                    id={key}
                    value={value}
                    onChange={handleChange}
                    readOnly={key === "createdAt" || key === "email"}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ADUPDUsersPages;
