import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

function UserProfile() {
  const {user, loading} = useContext(AuthContext);

  if(loading) return <h1>Loading....</h1>
  if (!user) return <Navigate to="/login" replace />

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
