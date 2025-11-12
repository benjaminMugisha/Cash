import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

function Login() {
  const { setToken, setUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v2/auth/login", credentials);
      const { token } = response.data;
      console.log(token);

      // Store token
      localStorage.setItem("token", token);
      setToken(token);

      // Optionally fetch user info immediately
      const userRes = await axios.get("http://localhost:8080/api/v2/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userRes.data);

      setSuccess("✅ Login successful!");
      setCredentials({ email: "", password: "" });
    } catch (error) {
      console.error("Login failed:", error);
      setError("❌ Login failed. Try again.");
    }
  };

  return (
    <div>
      <h1>Login:</h1>
      {success && <p style={{ color: "green" }}>{success}</p>}
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
