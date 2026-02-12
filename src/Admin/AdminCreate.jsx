import React, { useState } from 'react'; 
import { registerAdmin } from '../apiClient';

function AdminCreate() {
    const[user, setUser] = useState({
        firstName: '',
        lastName: '',
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
            const res = await registerAdmin(user.firstName, user.lastName, 
                user.email, user.password);
            console.log(res);
            setSuccess(res.data);

        } catch (err) {
            const apiError = err.response?.data;
            const status = err.response?.status;
    
            if(status === 409) {//duplicate email 
                setFieldErrors(prev => ({
                    ...prev, email:apiError?.message || "Email already in use. pick another one"
                })); 
                setError("");
            }
            else if(apiError?.validationErrors) {
                setFieldErrors(apiError.validationErrors);
                setError("");
            } else {
                setError(apiError?.message || err.message || "Registration failed. try again");
            }
        }
      };
  return (
    <div>
        <h1>Register Admin: </h1> 
        {success && <div style={{color: "green",  backgroundColor: "#d4edda", padding: "10px", borderRadius: "5px"}}>
            {success}</div>} 
        {error && <div>{error}</div>}
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" placeholder="Enter first name" name="firstName" 
            value={user.firstName} onChange={handleChanges} required/> <br /> 
            {fieldErrors.firstName && <p style={{color: "red"}}>{fieldErrors.firstName}</p> }

            <label htmlFor="lastName">Last Name</label> 
            <input id="lastName" type="text" placeholder="Enter last name" name="lastName" value={user.lastName}
            onChange={handleChanges} required/> <br />
            {fieldErrors.lastName && <p style={{color: "red"}}>{fieldErrors.lastName}</p> }

            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter email" name="email" value={user.email}
            onChange={handleChanges} required/> <br />
            {fieldErrors.email && <p style={{color: "red"}}>{fieldErrors.email}</p> }


            <label htmlFor="password">Password</label> 
            <input id="password" type="password" placeholder="password" name="password" value={user.password}
            onChange={handleChanges} required/> <br /> 
            {fieldErrors.password && <p style={{color: "red"}}>{fieldErrors.password}</p> }

            <button type="submit">Submit</button>
        </form> 
    </div>
  )
}

export default AdminCreate;
