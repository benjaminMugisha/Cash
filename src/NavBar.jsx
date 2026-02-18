import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css"; 
import { useContext } from "react";
import { AuthContext } from "./AuthContext"; 

function Navbar() {
  const location = useLocation();  
  const navigate = useNavigate();
  const {token, user, logout} = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const isAdmin = user?.role==="ADMIN"; 
  const isUser = user?.role==="USER"; 

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  }
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          MyBank
        </Link>
      </div>
      <div className="nav-links">
        {/* NOT LOGGED IN */}
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
        
        {/* LOGGED IN */}
        {token && (
          <>
            <span style={{marginRight: "20px"}}>
              {user?.firstname} - {user?.accountBalance}€
            </span>
            
            {/* USER LINKS: */}
            {isUser && (
              <>
                <Link className={isActive("/dashboard") ? "active" : ""} to="/dashboard">
                  Dashboard
                </Link>
                <Link className={isActive("/loans") ? "active" : ""} to="/loans">
                  Loans
                </Link>
                <Link className={isActive("/direct-debits") ? "active" : ""} to="/direct-debits">
                  Direct Debits 
                </Link>
                <Link className={isActive("/transactions") ? "active" : ""} to="/transactions">
                  Transactions
                </Link> 
              </>
            )}
            
            {/* ADMIN LINKS */} 
            {isAdmin && (
              <>
                <Link className={isActive("/admin") ? "active" : ""} to="/admin">
                  Admin Dashboard
                </Link>
                <Link className={isActive("/loans") ? "active" : ""} to="/loans">
                  Loans
                </Link>
                <Link className={isActive("/direct-debits") ? "active" : ""} to="/direct-debits">
                  Direct Debits 
                </Link>
                <Link className={isActive("/transactions") ? "active" : ""} to="/transactions">
                  Transactions
                </Link> 
              </>
            )}
            
            <button style={{color: "red"}} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
  }
  
export default Navbar;
