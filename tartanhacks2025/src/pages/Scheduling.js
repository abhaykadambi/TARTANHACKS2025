import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Scheduling = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder for scheduling data (You can replace this with your actual data)
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const events = [
    { day: "Mon", time: "9:00 AM", title: "Meeting with Client" },
    { day: "Wed", time: "11:00 AM", title: "Team Stand-up" },
    { day: "Fri", time: "1:00 PM", title: "Project Review" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.searchBarContainer}>
        <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
      </div>

      <div style={styles.calendarContainer}>
        <div style={styles.weekDaysContainer}>
          {weekDays.map((day) => (
            <div key={day} style={styles.dayHeader}>
              <p style={styles.dayText}>{day}</p>
            </div>
          ))}
        </div>
        <div style={styles.eventsContainer}>
          {weekDays.map((day) => (
            <div key={day} style={styles.dayColumn}>
              <div style={styles.eventsList}>
                {events
                  .filter((event) => event.day === day)
                  .map((event, index) => (
                    <div key={index} style={styles.eventCard}>
                      <p style={styles.eventTime}>{event.time}</p>
                      <p style={styles.eventTitle}>{event.title}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link to="/" style={styles.homeLink}>
        <button style={styles.backButton}>Back to Home</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100vh",
    backgroundColor: "#f4f7fc",
    paddingTop: "50px",
  },
  searchBarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchIcon: {
    position: "absolute",
    left: "20px",
    color: "#555",
  },
  searchBar: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "25px",
    border: "1px solid #ddd",
    outline: "none",
    width: "80%",
    maxWidth: "500px",
    paddingLeft: "40px", // for search icon spacing
  },
  calendarContainer: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  weekDaysContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "10px",
  },
  dayHeader: {
    width: "calc(100% / 7)",
    textAlign: "center",
  },
  dayText: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#333",
  },
  eventsContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  dayColumn: {
    width: "calc(100% / 7)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  eventsList: {
    width: "100%",
    marginTop: "10px",
  },
  eventCard: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
    width: "80%",
    textAlign: "center",
  },
  eventTime: {
    fontSize: "14px",
    color: "#007bff",
  },
  eventTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  homeLink: {
    marginTop: "20px",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Scheduling;
