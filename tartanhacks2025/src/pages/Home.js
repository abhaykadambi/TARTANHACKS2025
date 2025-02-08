import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch the user's schedules from the backend
  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`http://localhost:6000/api/schedules/${user?.uid}`);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <div style={styles.formContainer}>
            <h2 style={styles.title}>Home Page</h2>
            <p style={styles.welcomeText}>Welcome, {user?.email}</p>

            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </div>
        </div>

        <div style={styles.rightSection}>
          <div style={styles.schedulesContainer}>
            <h3 style={styles.schedulesTitle}>Your Schedules</h3>
            <div style={styles.schedulesList}>
              {schedules.length > 0 ? (
                schedules.map((schedule) => (
                  <div key={schedule._id} style={styles.scheduleItem}>
                    <p style={styles.scheduleName}>{schedule.name}</p>
                  </div>
                ))
              ) : (
                <p style={styles.noSchedules}>No schedules available</p>
              )}
            </div>

            <button 
              style={styles.createScheduleButton} 
              onClick={() => navigate("/create-schedule")}
            >
              Create New Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define styles here (same as before)
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f7fc",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "1200px",
    width: "100%",
    padding: "50px",
  },
  leftSection: {
    flex: 1,
    marginRight: "20px",
  },
  rightSection: {
    flex: 1,
    marginLeft: "20px",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  welcomeText: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#555",
  },
  logoutButton: {
    padding: "12px",
    backgroundColor: "#ff4c4c",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    marginTop: "15px",
    transition: "background-color 0.3s",
  },
  schedulesContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  schedulesTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  schedulesList: {
    marginBottom: "20px",
  },
  scheduleItem: {
    padding: "12px",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    marginBottom: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  scheduleName: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
  noSchedules: {
    fontSize: "16px",
    color: "#aaa",
  },
  createScheduleButton: {
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s",
  },
};

export default Home;
