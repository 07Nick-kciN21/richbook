import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = ["帳本", "帳戶", "記一筆", "圖表分析", "設定"];

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index} className="sidebar-menu-item">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
