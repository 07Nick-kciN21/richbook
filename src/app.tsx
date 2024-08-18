import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import CalendarView from "./components/CalendarView/CalendarView";
import MonthlySummaryPage from "./components/MonthlySummary/MonthlySummaryPage";
import "./app.css";
export function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route index element={<CalendarView />} />
            <Route path="Calendar" element={<CalendarView />} />
            <Route path="Summary" element={<MonthlySummaryPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
