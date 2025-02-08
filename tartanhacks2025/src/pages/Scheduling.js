import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Scheduling = () => {
  const [scheduleName, setScheduleName] = useState("Untitled Schedule");
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // Helper function to convert time to a row index (starting at 8 AM)
  const getTimeRow = (time) => {
    const hours = parseInt(time.split(":")[0]);
    const minutes = parseInt(time.split(":")[1]);

    const startHour = 8; // Starting from 8 AM
    const row = (hours - startHour) * 2 + (minutes === "30" ? 1 : 0);
    return row;
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Function to save the schedule to the database
  const saveSchedule = async () => {
    const scheduleData = {
      userId: "currentUserId", // Replace with actual user ID from authentication
      name: scheduleName,
      monday: "", // Add logic to collect events for Monday
      tuesday: "", // Add logic to collect events for Tuesday
      wednesday: "", // Add logic to collect events for Wednesday
      thursday: "", // Add logic to collect events for Thursday
      friday: "", // Add logic to collect events for Friday
      saturday: "",
      sunday: "",
    };
  
    try {
      // First, check if the schedule already exists
      const response = await fetch(`http://localhost:6000/api/schedule/${scheduleData.userId}/${scheduleData.name}`);
      const data = await response.json();
  
      if (response.ok) {
        // If the schedule exists, update it
        const updateResponse = await fetch(`http://localhost:6000/api/schedule/${data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scheduleData),
        });
  
        const updateData = await updateResponse.json();
        if (updateResponse.ok) {
          console.log("Schedule updated successfully:", updateData);
        } else {
          console.error("Error updating schedule:", updateData.error);
        }
      } else {
        // If the schedule doesn't exist, create a new one
        const createResponse = await fetch("http://localhost:6000/api/schedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scheduleData),
        });
  
        const createData = await createResponse.json();
        if (createResponse.ok) {
          console.log("Schedule created successfully:", createData);
        } else {
          console.error("Error creating schedule:", createData.error);
        }
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  // Handle exit by saving the schedule before navigating away
  const handleExit = () => {
    saveSchedule(); // Save the schedule when the page is closed
    navigate("/"); // Navigate to the home page
  };

  // Handle the click event to start editing the schedule name
  const handleScheduleNameClick = () => {
    setIsEditing(true); // Enable editing mode when clicked
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false); // Disable editing when pressing Enter
    }
  };

  // Handle the change of the schedule name during editing
  const handleNameChange = (e) => {
    setScheduleName(e.target.value);
  };

  // Filtering events based on search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Schedule Name - Editable on click */}
      {isEditing ? (
        <input
          type="text"
          value={scheduleName}
          onChange={handleNameChange}
          onBlur={() => setIsEditing(false)} // Switch to regular text when focus is lost
          onKeyPress={handleKeyPress} // Switch to regular text on Enter
          style={styles.scheduleNameInput}
        />
      ) : (
        <div
          onClick={handleScheduleNameClick} // Switch to editable input when clicked
          style={styles.scheduleNameText}
        >
          {scheduleName} {/* Display the schedule name */}
        </div>
      )}

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBar}
      />

      <div style={styles.calendarContainer}>
        {days.map((day) => (
          <div key={day} style={styles.dayColumn}>
            <div style={styles.dayTitle}>{day}</div>
            {filteredEvents
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

      {/* Exit button */}
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
    padding: "10px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  scheduleNameInput: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    marginBottom: "10px", // Adjust spacing
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  scheduleNameText: {
    padding: "10px",
    fontSize: "16px",
    color: "#333",
    fontWeight: "bold",
    marginBottom: "10px", // Adjust spacing
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    cursor: "pointer", // Indicating that it's clickable
  },
  searchBar: {
    width: "100%",
    padding: "8px", // Smaller padding for the search bar
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "15px", // Space between search bar and event form
    fontSize: "14px",
  },
  calendarContainer: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    flex: 1,
  },
  dayColumn: {
    flex: 1,
    padding: "5px",
    position: "relative",
    borderRight: "2px solid #ccc",
  },
  dayTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "16px",
  },
  event: {
    position: "absolute",
    width: "85%",
    backgroundColor: "#007bff",
    color: "white",
    padding: "6px",
    borderRadius: "4px",
    fontSize: "12px",
  },
  eventTitle: {
    margin: 0,
    fontSize: "12px",
  },
  exitContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  exitButton: {
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Scheduling;
