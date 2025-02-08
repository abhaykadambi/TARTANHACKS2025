import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [schedules, setSchedules] = useState([
    { id: 1, name: "Project Meeting" },
    { id: 2, name: "Team Sync-up" },
    { id: 3, name: "Client Presentation" },
  ]); // Replace with actual data from your database

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
                  <div key={schedule.id} style={styles.scheduleItem}>
                    <p style={styles.scheduleName}>{schedule.name}</p>
                  </div>
                ))
              ) : (
                <p style={styles.noSchedules}>No schedules available</p>
              )}
            </div>
            <Link to="/scheduling">
              <button style={styles.createScheduleButton}>Create New Schedule</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    maxWidth: "1200px", // Limit max width of container
    width: "100%",
    padding: "50px",
  },
  leftSection: {
    flex: 1,
    marginRight: "20px", // Space between left and right sections
  },
  rightSection: {
    flex: 1,
    marginLeft: "20px", // Space between left and right sections
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
  submitButton: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s",
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
  link: {
    textDecoration: "none",
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
