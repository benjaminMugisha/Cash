import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ menu, menuLabel }) {
  const [openSection, setOpenSection] = useState(null);
  const location = useLocation();

  const toggleSection = (title) => {
    setOpenSection(prev => (prev === title ? null : title));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside style={{
      width: "240px",borderRight: "1px solid #ddd",
      padding: "10px"
    }}>
      {menuLabel && (
      <div style={{padding:"10px", color:"#888"}}>
        {menuLabel}
      </div>
      )} 
      {menu.map(section => (
        <div key={section.title}>
          <button
            onClick={() => toggleSection(section.title)}
            style={{  width: "100%",textAlign: "left",padding: "10px",
              background: "#f5f5f5",border: "none",cursor: "pointer",fontWeight: "bold" }} 
          >
            {section.title}
          </button>

          {openSection === section.title && (
            <ul style={{ listStyle: "none", paddingLeft: "15px" }}>
              {section.items.map(item => (
                <li key={item.path}>
                  <Link to={item.path}
                  style={{display: "block", padding:"6px 0", 
                color: isActive(item.path) ? "blue" : "black", 
              fontWeight: isActive(item.path) ? "bold" : "normal"
            }}
                >
                  {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
