import { useEffect, useState } from "react";
import apiClient from "./apiClient";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "❌ Failed to load user info");
      }
    };
    fetchUser();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Profile</h2>
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
