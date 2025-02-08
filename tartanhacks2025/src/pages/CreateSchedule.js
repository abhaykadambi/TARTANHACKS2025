import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const CreateSchedule = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [scheduleName, setScheduleName] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure user is authenticated
    if (!user || !user.uid) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/schedule", {
        userId: user.uid, // Use actual logged-in user ID
        name: scheduleName,
        content: "",
      });

      if (response.status === 201) {
        console.log("✅ Schedule created successfully:", response.data);
        navigate(`/scheduling/${scheduleName}`); // Redirect with schedule name
      }
    } catch (error) {
      console.error("❌ Error creating schedule:", error);
      alert("Failed to create schedule. Please try again.");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2>Create New Schedule</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
            placeholder="Schedule Name"
            style={styles.inputField}
            required
          />
          <button type="submit" style={styles.submitButton}>
            Create Schedule
          </button>
        </form>
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
