const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
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
  monday: { type: String, default: '' },
  tuesday: { type: String, default: '' },
  wednesday: { type: String, default: '' },
  thursday: { type: String, default: '' },
  friday: { type: String, default: '' },
  saturday: { type: String, default: '' },
  sunday: { type: String, default: '' },
});

// Create the Schedule model
const Schedule = mongoose.model('Schedule', scheduleSchema);

// Route to create a new schedule
app.post('/api/schedule', async (req, res) => {
  const { userId, name, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

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
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });

    await schedule.save();
    res.status(201).json({ message: 'Schedule created successfully' });
  } catch (err) {
    console.error('Error saving schedule:', err);
    res.status(500).json({ error: 'Failed to save schedule' });
  }
});

// Route to update a schedule by ID
app.put('/api/schedule/:scheduleId', async (req, res) => {
  const { scheduleId } = req.params;
  const { name, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

  try {
    const schedule = await Schedule.findById(scheduleId);

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    // Update the schedule fields
    schedule.name = name;
    schedule.monday = monday;
    schedule.tuesday = tuesday;
    schedule.wednesday = wednesday;
    schedule.thursday = thursday;
    schedule.friday = friday;
    schedule.saturday = saturday;
    schedule.sunday = sunday;

    // Save the updated schedule
    await schedule.save();
    res.status(200).json({ message: 'Schedule updated successfully', schedule });
  } catch (err) {
    console.error('Error updating schedule:', err);
    res.status(500).json({ error: 'Failed to update schedule' });
  }
});

// Route to get a user's schedule by schedule name
app.get('/api/schedule/:userId/:scheduleName', async (req, res) => {
  const { userId, scheduleName } = req.params;

  try {
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
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
