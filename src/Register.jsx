import { useState } from "react"; 
import axios from "axios";

function Register() {
  const[user, setUser] = useState({
    firstName: '',
    lastName: '',
    accountUsername: '',
    balance: '',
    email: '',
    password: ''
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChanges = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
        });
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();
    
    try {
        const res = await axios.post("http://localhost:8080/api/v2/auth/register", user);
        setSuccess("✅Registration successful!");
        console.log(res.data) 
        setUser({
            firstName: '', lastName: '', accountUsername: '', balance: '', email: '', password: ''
        });

        setError(""); 
        setFieldErrors({});
    } catch (err) {
        const apiError = err.response?.data;

        if(apiError?.validationErrors) {
            setFieldErrors(apiError.validationErrors);
        } else {
            setError(apiError?.message || err.message || "Registration failed. try again");
        }
    }
  };

  return(
    <div>
        <h1>Register User</h1> 
        {success && <div>{success}</div>}
        {error && <div>{error}</div>}
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" placeholder="Enter your first name" name="firstName" 
            value={user.firstName} onChange={handleChanges} required/> <br /> 
            {fieldErrors.firstName && <p style={{color: "red"}}>{fieldErrors.firstName}</p> }

            <label htmlFor="lastName">Last Name</label> 
            <input id="lastName" type="text" placeholder="Enter your last name" name="lastName" value={user.lastName}
            onChange={handleChanges} required/> <br />
            {fieldErrors.lastName && <p style={{color: "red"}}>{fieldErrors.lastName}</p> }

            <label htmlFor="accountUsername">your account username</label> 
            <input id="accountUsername" type="text" placeholder="Enter your unique username" name="accountUsername" value={user.accountUsername} 
            onChange={handleChanges} required/> <br />
            {fieldErrors.accountUsername && <p style={{color: "red"}}>{fieldErrors.accountUsername}</p>}

            <label htmlFor="balance">Balance</label> 
            <input id="balance" type="number" placeholder="Balance" name="balance" value={user.balance}
            onChange={handleChanges} required/> <br />
            {fieldErrors.balance && <p style={{color: "red"}}>{fieldErrors.balance}</p> }

            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" name="email" value={user.email}
            onChange={handleChanges} required/> <br />
            {fieldErrors.email && <p style={{color: "red"}}>{fieldErrors.email}</p> }


            <label htmlFor="password">Password</label> 
            <input id="password" type="password" placeholder="password" name="password" value={user.password}
            onChange={handleChanges} required/> <br /> 
            {fieldErrors.password && <p style={{color: "red"}}>{fieldErrors.password}</p> }

            <button type="submit">Submit</button>
        </form> 
    </div>
  );
 }
export default Register;
