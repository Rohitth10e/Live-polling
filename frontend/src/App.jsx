import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import StudentPage from "./pages/StudentPage";
import { TeacherDashboard } from "./pages/TeacherDashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        theme="light"
      />
    </>
  );
}

export default App;