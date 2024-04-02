import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [zip, setZip] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecoplace.3.us-1.fl0.io/users/register', {
      email,
      password,
      name,
      lastname,
      phone,
      street,
      city,
      country,
      zip
    });

    await axios.post('https://ecoplace.3.us-1.fl0.io/users/login', {
      email,
      password,
    }, { withCredentials: true });

  window.location.href = '/home';
    } catch (error) {
      console.error('Error durante el registro o el login:', error);
      setError('Error durante el registro o el login. Por favor, intenta de nuevo.');
    }
}

  return (
    <div>Register</div>
  )
}

export default Register

