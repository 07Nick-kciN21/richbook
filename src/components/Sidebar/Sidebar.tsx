import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    {
      label: "帳本",
      subItems: [
        ["月行事曆", "Calendar"],
        ["記錄表單", "Summary"],
      ],
    },
    {
      label: "帳戶",
      subItems: [
        ["帳戶清單", "AccountList"],
        ["淨資產", "1"],
      ],
    },
    {
      label: "圖表分析",
      subItems: [
        ["圓餅圖", "2"],
        ["折線圖", "3"],
      ],
    },
    {
      label: "設定",
      subItems: [
        ["固定收支", "4"],
        ["自訂義類", "5"],
        ["資料匯出", "6"],
      ],
    },
  ];
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index} className="sidebar-menu-item">
            {item.label}
            {item.subItems && item.subItems.length > 0 && (
              <ul className="submenu">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="sidebar-menu-item">
                    <Link to={subItem[1]} className="dropdown-item">
                      {subItem[0]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
