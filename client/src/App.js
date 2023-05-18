import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Button } from "antd";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoutes from "./components/PublicRoutes";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoutes><Login/></PublicRoutes>} />
        <Route path="/register" element={<PublicRoutes><Register/></PublicRoutes>} />
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
