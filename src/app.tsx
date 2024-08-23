import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import CalendarPage from "./components/Calendar/CalendarPage";
import MonthlySummaryPage from "./components/MonthlySummary/MonthlySummaryPage";
import CustomTypePage from "./components/CustomType/CustomTypePage";
import "./app.css";
export function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route index element={<CalendarPage />} />
            <Route path="Calendar" element={<CalendarPage />} />
            <Route path="Summary" element={<MonthlySummaryPage />} />
            <Route path="CustomType" element={<CustomTypePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
