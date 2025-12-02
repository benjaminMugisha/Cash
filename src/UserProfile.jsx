import { useEffect, useState } from "react";
import { userInfo } from "./apiClient"; 

function UserProfile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
      const res = await userInfo(); 
      setUser(res.data);
    }
    finally {
      setLoading(false); 
    } 
  }
    loadUser();
  }, []);

  if(loading) return <p>Loading....</p>
  if (!user) return <p>No user found ....</p>
  

  return (
    <div>
      <h2>Your Profile:</h2>
      <p><strong>Username:</strong> {user.accountUsername}</p>
      <p><strong>Balance:</strong> €{user.accountBalance}</p>
      <p><strong>First Name:</strong> {user.firstname}</p>
      <p><strong>Last Name:</strong> {user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>IBAN:</strong> {user.iban}</p>
    </div>
  );
}

export default UserProfile;
