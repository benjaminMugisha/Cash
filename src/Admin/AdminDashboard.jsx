import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { adminMenu } from "../sidebarConfig";

function AdminDashboard() {
    const {user, loading} = useContext(AuthContext);

    if(loading) return <p>Loading....</p>
    if(!user) return <Navigate to="/login" replace/>
    if(user.role !== "ADMIN") return <Navigate to="/dashboard" replace/>

    return(
      <div style={{display:"flex", minHeight: "100vh"}}>
        <Sidebar menu={adminMenu} menuLabel="Admin menu"/>

        <main style={{padding:"20px", flex:1}}>
          <Outlet />
        </main>
      </div>
    )
}
export default AdminDashboard;
