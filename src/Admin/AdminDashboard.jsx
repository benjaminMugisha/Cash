import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, Link, Outlet } from "react-router-dom";

function AdminDashboard() {
    const {user, loading} = useContext(AuthContext);

    if(loading) return <p>Loading....</p>
    if(!user) return <Navigate to="/login" replace/>
    
    // AdminDashboard must check user.role: 
    if(user.role !== "ADMIN") return <Navigate to="/dashboard" replace/>

    return (
      <>
        <h1>Welcome Admin {user.firstname}</h1>

        {/* Admin sidebar */}
      <aside style={{ width: "200px", borderRight: "1px solid #ccc" }}>
        <ul>
          <li><Link to="users">Users</Link></li>
          <li><Link to="accounts">Accounts</Link></li>
        </ul>
      </aside>

      {/* Main content of Nested Admin pages render here: */}
      <main style={{padding:"20px", flex:1}}>
        <Outlet /> {/* render the child route here */}
        {/* without <Outlet /> react wouldn't know where to render Users and Accounts. 
         */}
      </main>
      </>
    );
}
  
export default AdminDashboard;
