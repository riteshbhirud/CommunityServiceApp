const express = require('express');
const path = require('path');
const PouchDB = require('pouchdb');
const app = express();
const PORT = process.env.PORT || 3000;

const db = new PouchDB('profiles');

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes

// Create/Update Profile
app.put('/api/profile', async (req, res) => {
  const profile = req.body;
  try {
    let existingProfile = await db.get('profile').catch(() => null);

    if (existingProfile) {
      profile._id = existingProfile._id;
      profile._rev = existingProfile._rev;
    } else {
      profile._id = 'profile';
    }




    const response = await db.put(profile);
    res.status(200).json({ message: "Profile created/updated successfully", id: response.id, rev: response.rev });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile", details: error.message });
  }
});

// Read Profile
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await db.get('profile').catch(() => null);
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve profile", details: error.message });
  }
});

// Delete Profile
app.delete('/api/profile', async (req, res) => {
  try {
    const profile = await db.get('profile').catch(() => null);
    if (profile) {
      await db.remove(profile);
      res.status(200).json({ message: "Profile deleted successfully" });
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete profile", details: error.message });
  }
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});