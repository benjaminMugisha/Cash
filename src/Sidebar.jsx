import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ menu }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (title) => {
    setOpenSection(prev => (prev === title ? null : title));
  };

  return (
    <aside style={{
      width: "240px",
      borderRight: "1px solid #ddd",
      padding: "10px"
    }}>
      {menu.map(section => (
        <div key={section.title}>
          <button
            onClick={() => toggleSection(section.title)}
            style={{  width: "100%",textAlign: "left",padding: "10px",
              background: "#f5f5f5",border: "none",cursor: "pointer",fontWeight: "bold" }} >
            {section.title}
          </button>

          {openSection === section.title && (
            <ul style={{ listStyle: "none", paddingLeft: "15px" }}>
              {section.items.map(item => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
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
