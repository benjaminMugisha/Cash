import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, Link, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { adminMenu } from "../sidebarConfig";

function AdminDashboard() {
    const {user, loading} = useContext(AuthContext);

    if(loading) return <p>Loading....</p>
    if(!user) return <Navigate to="/login" replace/>
    if(user.role !== "ADMIN") return <Navigate to="/dashboard" replace/>

    // return ( 
    //   <>
    //     <h1>Welcome Admin {user.firstname}</h1>

    //   <aside style={{ width: "200px", borderRight: "1px solid #ccc" }}>
    //     <ul>
    //       <li><Link to="users">Users</Link></li>
    //       <li><Link to="accounts">Accounts</Link></li>

    //       <li><Link to="dd">all direct debits</Link></li> 
    //        <li><Link to="loans">Loans</Link></li>
    //       <li><Link to="tx">all transactions</Link></li>
    //     </ul>
    //   </aside>

    //   <main style={{padding:"20px", flex:1}}>
    //     <Outlet />
    //   </main>
    //   </>
    // );

    return(
      <div style={{display:"flex", minHeight: "100vh"}}>
        <Sidebar menu={adminMenu}/>

        <main style={{padding:"20px", flex:1}}>
          <Outlet />
        </main>
      </div>
    )
}
export default AdminDashboard;
