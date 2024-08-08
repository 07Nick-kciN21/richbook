import Sidebar from "./components/Sidebar/Sidebar";
import CalendarView from "./components/CalendarView/CalendarView";
import "./app.css";
export function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <CalendarView />
      </div>
    </div>
  );
}
