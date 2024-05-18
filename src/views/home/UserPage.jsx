import { useEffect, useState } from "react";
import axios from "axios";
import LayoutComponent from "../../layout/LayoutMain";
import UserComponent from "../../components/UserComponent";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setAuthenticated(false);
      navigate('/login');
    } else {
      setAuthenticated(true);

      axios
        .get("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => {
          console.error("There was an error with the request:", error);
        });
    }
  }, [token, navigate]);

  const handleLogoutAllSessions = async () => {
    try {
      await axios.post(
        'http://localhost:3000/users/logout-all',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userRole');
      navigate('/login');
    } catch (error) {
      console.error('Error cerrando todas las sesiones:', error);
    }
  };

  return (
    <LayoutComponent>
      <main className="my-10">
        <UserComponent
          name={userData?.name}
          lastname={userData?.lastname}
          phone={userData?.phone}
          email={userData?.email}
          zip={userData?.zip}
          city={userData?.city}
          street={userData?.street}
          onEditProfile={() => navigate('/account-settings')}
          onLogoutAll={handleLogoutAllSessions}
        />
      </main>
    </LayoutComponent>
  );
};

export default UserPage;
