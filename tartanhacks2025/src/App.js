import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Scheduling from "./pages/Scheduling";
import CreateSchedule from "./pages/CreateSchedule"; // New import for CreateSchedule

// PrivateRoute to ensure user is authenticated
const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h2>Loading...</h2>;

  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/scheduling/:scheduleName" element={<PrivateRoute element={<Scheduling />} />} />
          
          {/* New Route for creating a schedule */}
          <Route path="/create-schedule" element={<PrivateRoute element={<CreateSchedule />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
