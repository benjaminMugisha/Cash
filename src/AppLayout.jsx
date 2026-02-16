import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "./AuthContext";
import { adminMenu } from "./sidebarConfig";
import { userMenu } from "./sidebarConfig";

function AppLayout() {
  const { user } = useContext(AuthContext);

  const menu = user?.role === "ADMIN" ? adminMenu : userMenu;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar menu={menu} />

      <main style={{ padding: "20px", flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
