// Import the libraries we installed, plus two built-in Node modules.
const express = require("express");
const cors = require("cors");
const fs = require("fs/promises"); // built in: read/write files
const path = require("path");      // built in: build safe file paths

const app = express();
const PORT = 3000;

// __dirname = the folder this file lives in, so the path works from anywhere.
const DATA_FILE = path.join(__dirname, "data", "tasks.json");

// The only statuses the dashboard understands.
const VALID_STATUSES = ["Completed", "In Progress", "Not Started"];

// Middleware: code that runs on EVERY request before your routes.
app.use(cors());          // allow the frontend to call us
app.use(express.json());  // parse JSON bodies into req.body

// Read tasks.json and turn the text into a JavaScript array.
async function readTasks() {
  const fileText = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(fileText);
}

// GET /api/tasks/:id -> return a single task
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id); // URL values are always strings

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Task id must be a number" });
    }

    const tasks = await readTasks();
    const task = tasks.find((item) => item.id === id);

    if (!task) {
      return res.status(404).json({ error: `Task ${id} not found` });
    }

    res.json(task);
  } catch (error) {
    console.error("Failed to read task:", error);
    res.status(500).json({ error: "Could not read task" });
  }
});

// Turn the array back into text and save it. (null, 2 = pretty-print)
async function writeTasks(tasks) {
  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// GET /api/tasks -> return every task
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks); // sends the array as JSON with status 200
  } catch (error) {
    console.error("Failed to read tasks:", error);
    res.status(500).json({ error: "Could not read tasks" });
  }
});

// PUT /api/tasks/:id -> update a task's status
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body || {}; // pull "status" out of the JSON body

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Task id must be a number" });
    }

    // Never trust the client: validate before saving.
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const tasks = await readTasks();
    const task = tasks.find((item) => item.id === id);

    if (!task) {
      return res.status(404).json({ error: `Task ${id} not found` });
    }

    task.status = status;      // change it in the array
    await writeTasks(tasks);   // save the array to the file

    res.json(task);            // send the updated task back
  } catch (error) {
    console.error("Failed to update task:", error);
    res.status(500).json({ error: "Could not update task" });
  }
});

// If no route above matched, answer with JSON (not an HTML error page).
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`TechBridge API running at http://localhost:${PORT}`);
});