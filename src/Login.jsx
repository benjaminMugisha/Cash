import { useState, useContext, useEffect } from "react"; 
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { loginEndpoint } from "./apiClient";

function Login() {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const { sessionMessage, setSessionMessage } = useContext(AuthContext);
  const [error, setError] = useState("");

  useEffect(() => {
    const msg = localStorage.getItem("sessionMessage");

    if (msg) {
      setSessionMessage(msg); 
      localStorage.removeItem("sessionMessage");
    }
  }, []);

  const handleChanges = (e) => {
    setCredentials({ 
      ...credentials,
       [e.target.name]: e.target.value
       });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginEndpoint(credentials.email, credentials.password); 
      const { token } = response.data;
      login(token); 
      navigate("/");

    } catch (error) {
      const errorMessage = error.response?.data.message;
      console.log(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Login:</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {sessionMessage &&<p style={{ color: "red", fontWeight: "bold"}}>
        {sessionMessage}
      </p> }

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
        <button type="submit" style={{color: "green"}}>Login</button>
      </form>
    </div>
  );
}

export default Login;
