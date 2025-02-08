import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (user) {
      // Fetch the schedules from the backend
      const fetchSchedules = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/schedules/${user.uid}`);
          const data = await response.json();

          if (response.ok) {
            setSchedules(data); // Set schedules from response
          } else {
            console.error(data.error); // Handle any errors from the server
            setSchedules([]);
          }
        } catch (err) {
          console.error("❌ Error fetching schedules:", err);
          setSchedules([]);
        } finally {
          setLoading(false); // Stop loading once the request is done
        }
      };

      fetchSchedules();
    }
  }, [user]); // Trigger when the user context changes

  const handleLogout = async () => {
    await auth.signOut();
  };

  const handleCreateSchedule = () => {
    navigate("/create-schedule"); // Navigate directly to the Scheduling page
  };

  // Handle clicking a schedule to open it
  const handleOpenSchedule = (scheduleName) => {
    navigate(`/scheduling/${scheduleName}`); // Navigate to the selected schedule
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
            {loading ? (
              <p>Loading...</p> // Display loading state while fetching
            ) : (
              <div style={styles.schedulesList}>
                {schedules.length > 0 ? (
                  schedules.map((schedule) => (
                    <div 
                      key={schedule._id} 
                      style={styles.scheduleItem}
                      onClick={() => handleOpenSchedule(schedule.name)} // Open schedule on click
                    >
                      <p style={styles.scheduleName}>{schedule.name}</p>
                    </div>
                  ))
                ) : (
                  <p style={styles.noSchedules}>No schedules available</p>
                )}
              </div>
            )}
            <button onClick={handleCreateSchedule} style={styles.createScheduleButton}>
              Create New Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
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
    cursor: "pointer", // ✅ Make it clickable
    transition: "background-color 0.2s ease-in-out",
  },
  scheduleItemHover: {
    backgroundColor: "#e0e0e0",
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
