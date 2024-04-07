import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContextComponent } from './ContextComponent';

const ContextProvider = () => {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (token) {
      axios.get('https://ecoplace.3.us-1.fl0.io/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => setUserData(response.data))
      .catch(error => {
        console.error('There was an error with the request:', error);
        // Optionally, you can handle errors here or show a message to the user
      });
    }
  }, [token]);

  return (
    <ContextComponent.Provider value={{ userData }}>
      {/* You can put child components here */}
    </ContextComponent.Provider>
  );
};

export default ContextProvider;
