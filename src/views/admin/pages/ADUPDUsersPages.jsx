import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import { showErrorAlert, showConfirmationAlert } from '../../../helpers/alerts';

const ADUPDUsersPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    country: '',
    zip: '',
    role: '', // Mantén esto vacío hasta obtener el valor del servidor
  });

  const token = localStorage.getItem('auth_token');
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = response.data;

      // Asigna el ID del rol y no solo el nombre
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        street: user.street,
        city: user.city,
        country: user.country,
        zip: user.zip,
        role: user.role._id, // Asegúrate de asignar el ObjectId
      }));
    } catch (error) {
      console.error('Error fetching user details', error);
      showErrorAlert('Error al obtener detalles del usuario');
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesResponse = await axios.get('http://localhost:3000/roles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(rolesResponse.data);
    } catch (error) {
      console.error('Error fetching roles', error);
      showErrorAlert('Error al obtener roles');
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
        {
          ...formData,
          role: formData.role, // Asegúrate de enviar el ID correcto
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await showConfirmationAlert('¡Éxito!', 'Usuario actualizado correctamente.', 'success', 'Aceptar');
      navigate('/admin/users/view');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      showErrorAlert('Error al actualizar el usuario');
    }
  };

  return (
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}> {/* Ajuste para el navbar */}
      <div className="d-flex min-vh-100"> {/* Estructura principal */}
        <AdminSidebar /> {/* Sidebar */}
        <div className="flex-grow-1"> {/* Contenedor principal */}
          <AdminNavComponent /> {/* Navbar */}
          <div className="container mt-4 d-flex justify-content-center"> {/* Contenedor para el contenido */}
            <div className="card p-5" style={{ maxWidth: '800px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', background: 'linear-gradient(to right, #e0eafc, #cfdef3)' }}> {/* Tarjeta para el formulario con gradiente */}
              <div className="d-flex justify-content-between align-items-center"> {/* Título y botón de regresar */}
                <h1 className="text-center text-dark">Editar Usuario</h1>
                <button
                  onClick={() => navigate('/admin/users/view')}
                  className="btn btn-secondary ml-9"
                >
                  Regresar
                </button>
              </div>
              <form onSubmit={handleSubmit}> {/* Formulario para editar el usuario */}
                {Object.entries(formData).map(
                  ([key, value]) =>
                    key !== 'role' && (
                      <div key={key} className="mb-4"> {/* Campo para cada dato del usuario */}
                        <label
                          htmlFor={key}
                          className="form-label"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalizar */}
                        </label>
                        <input
                          type="text"
                          name={key}
                          id={key}
                          value={value}
                          onChange={handleChange}
                          readOnly={key === 'createdAt' || key === 'email'} // Campos de solo lectura
                          className="form-control"
                          style={{ width: '100%', borderRadius: '10px' }} // Mayor ancho y esquinas redondeadas
                        />
                      </div>
                    )
                )}
                 <div className="mb-4"> {/* Campo para el rol */}
                  <label
                    htmlFor="role"
                    className="form-label"
                  >
                    Role
                  </label>
                  <select
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-control"
                    style={{ borderRadius: '10px' }}
                  >
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-center"> {/* Botón para actualizar */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADUPDUsersPages;
