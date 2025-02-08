import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios to handle API requests

const CreateSchedule = () => {
  const [newSchedule, setNewSchedule] = useState({
    name: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });
  
  const navigate = useNavigate("/scheduling"); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = "your-user-id"; // Replace with the actual logged-in user ID
      const response = await axios.post("http://localhost:6000/api/schedule", {
        userId,
        name: newSchedule.name,
        monday: newSchedule.monday,
        tuesday: newSchedule.tuesday,
        wednesday: newSchedule.wednesday,
        thursday: newSchedule.thursday,
        friday: newSchedule.friday,
        saturday: newSchedule.saturday,
        sunday: newSchedule.sunday,
      });

      if (response.status === 201) {
        // Navigate to the newly created schedule's page (or home page)
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2>Create New Schedule</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newSchedule.name}
            onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
            placeholder="Schedule Name"
            style={styles.inputField}
          />
          {/* Add inputs for each day */}
          {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
            <input
              key={day}
              type="text"
              value={newSchedule[day]}
              onChange={(e) => setNewSchedule({ ...newSchedule, [day]: e.target.value })}
              placeholder={`${day.charAt(0).toUpperCase() + day.slice(1)} events`}
              style={styles.inputField}
            />
          ))}
          <button type="submit" style={styles.submitButton}>Create Schedule</button>
        </form>
      </div>
    </div>
  );
};

// Define styles here
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f7fc",
  },
  container: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  inputField: {
    padding: "10px",
    width: "100%",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  submitButton: {
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

export default CreateSchedule;
