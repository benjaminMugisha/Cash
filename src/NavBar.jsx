import { Link, Navigate, useLocation } from "react-router-dom";
import "./Navbar.css"; 
import { useContext } from "react";
import { AuthContext } from "./AuthContext"; 

function Navbar() {
  const location = useLocation();  
  const {token, user, logout} = useContext(AuthContext);

  const isActive = (path) => location.pathname === path; 

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          MyBank
        </Link>
      </div>

      <div className="nav-links">

      {/* <button style={{ color: "red" }}
      onClick={() => {logout();
        alert("you have logged out");
        // Link("/login")
        Navigate("/login")
       }} > Logout </button>   */}

        {token && (  
          <>
          <span style={{ marginRight: "20px", border:"5px solid"}}>
            {user?.firstname} - {user?.accountBalance}€
          </span>
            <Link className={isActive("/dashboard") ? "active" : ""} to="/dashboard">
              Dashboard
            </Link>

            <Link className={isActive("/loans") ? "active" : ""} to="/loans">
              Loans
            </Link>

            <Link className={isActive("/dd") ? "active" : ""} to="/dd">
              Direct Debits 
            </Link>

            <Link className={isActive("/transactions") ? "active" : ""} to="/transactions">
              Transactions
            </Link> 
          </>
        )}

        {!token && (  
          <>
            <Link className={isActive("/login") ? "active" : ""} to="/login">
              Login
            </Link>
            <Link className={isActive("/register") ? "active" : ""} to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
