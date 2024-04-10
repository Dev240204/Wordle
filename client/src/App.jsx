import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Routes/HomePage"
import Authentication from "./Components/auth/Authentication";
import useAuthStore from "./Context/AuthStore";
import ProfilePage from "./Routes/ProfilePage";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/auth" replace />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
