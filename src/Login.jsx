import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v2/auth/login", credentials);

      const { token } = response.data;
      login(token);
      navigate("/");

    } catch (error) {
      const errorMessage = error.response?.data.message;
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Login:</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" 
        value={credentials.email} 
        onChange={handleChanges} required />

        <label>Password</label>
        <input type="password" name="password" 
        value={credentials.password} 
        onChange={handleChanges} required />

        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
