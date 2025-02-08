import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Using useNavigate from React Router v6

const Scheduling = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Project Meeting", day: "Monday", time: "09:00" },
    { id: 2, title: "Team Sync-up", day: "Tuesday", time: "13:00" },
    { id: 3, title: "Client Presentation", day: "Monday", time: "14:00" },
    { id: 4, title: "Interview", day: "Wednesday", time: "10:00" },
  ]);

  const navigate = useNavigate(); // Use useNavigate from React Router v6

  // Helper function to convert time to a row index (starting at 8 AM)
  const getTimeRow = (time) => {
    const hours = parseInt(time.split(":")[0]);
    const minutes = parseInt(time.split(":")[1]);

    const startHour = 8; // Starting from 8 AM
    const row = (hours - startHour) * 2 + (minutes === "30" ? 1 : 0);
    return row;
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleExit = () => {
    // Navigate to the home page or any other page you need
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search events..."
        style={styles.searchBar}
      />
      <div style={styles.calendarContainer}>
        {days.map((day) => (
          <div key={day} style={styles.dayColumn}>
            <div style={styles.dayTitle}>{day}</div>
            {events
              .filter((event) => event.day === day)
              .map((event) => (
                <div
                  key={event.id}
                  style={{
                    ...styles.event,
                    top: `${getTimeRow(event.time) * 30}px`, // Adjust based on time
                  }}
                >
                  <p style={styles.eventTitle}>{event.title}</p>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Exit button moved to the bottom */}
      <div style={styles.exitContainer}>
        <button onClick={handleExit} style={styles.exitButton}>
          Exit
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "10px", // Reduced padding for more space
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column", // Column layout to stack items vertically
    justifyContent: "space-between", // Space out the content (calendar and button)
  },
  searchBar: {
    width: "100%",
    padding: "8px", // Smaller padding for the search bar
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "15px", // Less margin to make everything more compact
    fontSize: "14px", // Smaller text size
  },
  calendarContainer: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    flex: 1, // Allow the calendar to take the majority of the space
  },
  dayColumn: {
    flex: 1,
    padding: "5px", // Reduced padding for the day columns
    position: "relative",
    borderRight: "2px solid #ccc", // Divider between days
  },
  dayTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "16px", // Smaller font size for day titles
  },
  event: {
    position: "absolute",
    width: "85%", // Smaller width for events
    backgroundColor: "#007bff",
    color: "white",
    padding: "6px", // Smaller padding for events
    borderRadius: "4px",
    fontSize: "12px", // Smaller font size for event titles
    zIndex: 10,
  },
  eventTitle: {
    margin: 0,
    fontSize: "12px", // Smaller text size for event title
  },
  exitContainer: {
    textAlign: "center", // Center the button horizontally
    marginTop: "20px", // Space between the calendar and button
  },
  exitButton: {
    padding: "8px 15px", // Smaller button
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px", // Smaller font size for the button
  },
};

export default Scheduling;
