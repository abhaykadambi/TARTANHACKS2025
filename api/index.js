const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//import OpenAI from 'openai/index.mjs';
const openai = require('openai');
const axios = require('axios'); // Import axios




// const openai = new OpenAI({
//     organization: "",
//     project:"$"  
// })

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Allow frontend
    methods: ["GET", "POST", "DELETE"], // Restrict methods
    allowedHeaders: ["Content-Type"],
  }));
  
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://abhaykadambi:1234@cluster0.5dbcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the Schedule schema
const scheduleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true }, // Added schedule name
  content: { type: String, default: '' },
});

// Create the Schedule model
const Schedule = mongoose.model('Schedule', scheduleSchema);

const openaiApiKey = "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";
const organizationId = "org-Mv6xslHuct6SiWKeN7Rkf8Ry";

// Initialize schedule as an object with predefined class times
let schedule = {
    Monday: {
        "15-112": ["08:00-08:50", "13:00-13:50", "14:00-14:50", "15:00-15:50"],
        "21-127": ["08:00-08:50", "13:00-13:50", "14:00-14:50", "15:00-15:50"],
        "21-241": ["08:00-08:50", "13:00-13:50", "14:00-14:50", "15:00-15:50", "17:00-17:50"],
        "76-101": ["13:00-13:50", "14:00-14:50", "15:00-15:50", "17:00-17:50"]
    },
};

// Copy Monday's schedule to other weekdays
["Tuesday", "Wednesday", "Thursday", "Friday"].forEach(day => {
    schedule[day] = JSON.parse(JSON.stringify(schedule["Monday"]));
});

function formatSchedule() {
    let formatted = "";
    for (let day in schedule) {
        let classes = [];
        let occupiedTimes = new Set();
        for (let [course, times] of Object.entries(schedule[day])) {
            for (let time of times) {
                let [start, end] = time.split("-");
                if (!occupiedTimes.has(start)) { // Ensure no overlapping classes
                    classes.push(`${course} ${start.trim()} ${end.trim()}`);
                    occupiedTimes.add(start);
                    break; // Only assign the first available non-overlapping slot
                }
            }
        }
        formatted += `${day}, ${classes.join(", ")}; `;
    }
    return formatted.trim();
}

async function getChatGPTResponse(userRequest, scheduleOutput) {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",  // ✅ Correct endpoint
            {
                model: "gpt-4",  // ✅ Correct model name
                messages: [
                    { role: "system", content: "You are an AI assistant that modifies class schedules." },
                    { role: "user", content: `Modify the following schedule based on this user request: "${userRequest}". Ensure no overlapping classes. Return the modified schedule in the same format: ${scheduleOutput}` }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    "Authorization": `Bearer ${openaiApiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content.trim(); // ✅ Extract correct response
    } catch (error) {
        console.error("❌ Error calling OpenAI API:", error.response ? error.response.data : error);
        return "Error fetching response from OpenAI.";
    }
}



// Route to create a new schedule
app.post('/api/schedule', async (req, res) => {
  const { userId, name, content } = req.body;

  try {
    // Check if the schedule already exists
    const existingSchedule = await Schedule.findOne({ userId, name });

    if (existingSchedule) {
      return res.status(400).json({ error: 'Schedule with this name already exists for this user' });
    }

    // If not, create a new schedule
    const schedule = new Schedule({
      userId,
      name,
      content
    });

    await schedule.save();
    res.status(201).json({ message: 'Schedule created successfully' });
  } catch (err) {
    console.error('Error saving schedule:', err);
    res.status(500).json({ error: 'Failed to save schedule' });
  }
});
// Route to get a user's schedule by schedule name
app.get('/api/schedule/:userId/:scheduleName', async (req, res) => {
  const { userId, scheduleName } = req.params;

  try {
    //const schedule = await Schedule.findOne({ userId, name: scheduleName });
    const schedule = await Schedule.findOne({ userId, name: scheduleName });
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found for this user' });
    }   
    
    res.status(200).json(schedule);
  } catch (err) {
    console.error('Error retrieving schedule:', err);
    res.status(500).json({ error: 'Failed to retrieve schedule' });
  }
});


//this one talks to chat gpt to change a schedule
app.post('/api/schedulechange', async (req, res) => {
    const { user, name, query } = req.body; // ✅ Use req.body for incoming data
    
    try {
        // Find the user's schedule in MongoDB
        const existingSchedule = await Schedule.findOne({ userId: user, name });

        if (!existingSchedule) {
            return res.status(404).json({ error: 'Schedule not found for this user' });
        }

        // Call OpenAI to modify the schedule
        const result = await getChatGPTResponse(query, existingSchedule.content);

        // ✅ Update MongoDB with the new schedule
        existingSchedule.content = result;
        await existingSchedule.save();

        res.status(200).json({ message: "Schedule updated successfully", updatedContent: result });
    } catch (err) {
        console.error('❌ Error updating schedule:', err);
        res.status(500).json({ error: 'Failed to update schedule' });
    }
});


// Route to get all schedules for a given user
app.get('/api/schedules/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const schedules = await Schedule.find({ userId });

    if (schedules.length === 0) {
      return res.status(404).json({ error: 'No schedules found for this user' });
    }

    res.status(200).json(schedules);
  } catch (err) {
    console.error('Error retrieving schedules:', err);
    res.status(500).json({ error: 'Failed to retrieve schedules' });
  }
});

// Route to delete a schedule by ID
app.delete('/api/schedule/:scheduleId', async (req, res) => {
  const { scheduleId } = req.params;

  try {
    const result = await Schedule.findByIdAndDelete(scheduleId);

    if (!result) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (err) {
    console.error('Error deleting schedule:', err);
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
