import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Scheduling = () => {
  const { user } = useContext(AuthContext);
  const { scheduleName } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = Array.from({ length: 15 }, (_, i) => 6 + i); // 6 AM to 8 PM
  const rowHeight = 40; // Height per half-hour block

  // Convert time (e.g., "6:30") to pixel position on the grid
  const getTimePosition = (time) => {
    const [hour, minutes] = time.split(":").map(Number);
    return (hour - 6) * 2 * rowHeight + (minutes / 30) * rowHeight + 5;
  };

  // Calculate height of class block based on duration
  const getClassHeight = (startTime, endTime) => {
    const start = getTimePosition(startTime);
    const end = getTimePosition(endTime);
    return end - start;
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!user || !user.uid || !scheduleName) return;

      try {
        const response = await fetch(
          `http://localhost:8080/api/schedule/${user.uid}/${scheduleName}`
        );
        if (!response.ok) throw new Error("Schedule not found");

        const data = await response.json();
        setSchedule(data);

        if (data.content) {
          const parsedEvents = parseScheduleContent(data.content);
          setEvents(parsedEvents);
          setFilteredEvents(parsedEvents);
        }
      } catch (error) {
        console.error("❌ Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, [user, scheduleName]);

  // 🔥 Function to parse schedule content correctly
  const parseScheduleContent = (content) => {
    let parsedEvents = [];

    // Separate days by ";"
    const dayEntries = content.split(";").map((entry) => entry.trim());

    dayEntries.forEach((dayEntry) => {
      if (!dayEntry) return;

      const parts = dayEntry.split(",");
      const day = parts.shift().trim(); // ✅ Extract day name

      parts.forEach((classEntry) => {
        const classParts = classEntry.trim().split(" ");

        if (classParts.length >= 3) {
          const classCode = classParts[0]; // Class ID
          const startTime = classParts[1]; // Start Time
          const endTime = classParts[2]; // End Time

          parsedEvents.push({
            day,
            title: classCode,
            startTime,
            endTime,
            topPosition: getTimePosition(startTime), // ✅ Correct Y position
            height: getClassHeight(startTime, endTime), // ✅ Class block height is proportional
          });
        }
      });
    });

    return parsedEvents;
  };

  const handleExit = () => {
    navigate("/");
  };

  // ✅ Search Filtering
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered.length > 0 ? filtered : events);
    }
  }, [searchQuery, events]);

  // ✅ Send Search Query to Backend on Submit
  const handleSearchSubmit = async () => {
    if (!searchQuery.trim() || !schedule) return;

    try {
      const response = await axios.post("http://localhost:8080/api/schedulechange", {
        user:user.uid,
        name:schedule.name,
        schedule: schedule.content,
        query: searchQuery,
      });

      console.log("✅ Schedule Change Response:", response.data);
    } catch (error) {
      console.error("❌ Error sending schedule change request:", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* ✅ FIXED: Schedule Name Now Displays Correctly */}
      <h2 style={styles.scheduleNameText}>
        {schedule ? schedule.name : "Loading..."}
      </h2>

      {/* Search Bar with Submit Button */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search classes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
        <button onClick={handleSearchSubmit} style={styles.searchSubmitButton}>
          Submit
        </button>
      </div>

      {/* Calendar Display */}
      <div style={styles.calendarWrapper}>
        {/* ✅ Time Labels Column */}
        <div style={styles.timeColumn}>
          {hours.map((hour) => (
            <div key={hour} style={styles.timeLabel}>
              {hour}:00
            </div>
          ))}
        </div>

        {/* ✅ FIXED: Grid height matches time labels */}
        <div style={styles.calendarContainer}>
          {days.map((day) => (
            <div key={day} style={styles.dayColumn}>
              <div style={styles.dayTitle}>{day}</div>
              {filteredEvents
                .filter((event) => event.day === day)
                .map((event, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.event,
                      top: `${event.topPosition}px`, // ✅ ALIGNED PERFECTLY WITH TIME
                      height: `${event.height}px`, // ✅ PROPORTIONAL CLASS BLOCK HEIGHT
                    }}
                  >
                    <p style={styles.eventTitle}>
                      {event.title} ({event.startTime} - {event.endTime})
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.exitContainer}>
        <button onClick={handleExit} style={styles.exitButton}>
          Exit
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "10px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  scheduleNameText: {
    padding: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
  },
  searchBar: {
    width: "80%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  searchSubmitButton: {
    marginLeft: "10px",
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  calendarWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timeColumn: {
    width: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: "10px",
    borderRight: "2px solid #ddd",
  },
  timeLabel: {
    height: "80px",
    lineHeight: "80px",
    fontSize: "14px",
    color: "#555",
  },
  calendarContainer: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    border: "2px solid #ddd",
    padding: "10px",
    backgroundColor: "#fff",
    minHeight: "1200px",
  },
  exitContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  exitButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Scheduling;
