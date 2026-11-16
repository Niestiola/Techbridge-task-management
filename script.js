// Internship roadmap content: both tracks use the same eight milestone days.
const trackTasks = {
  dataAnalytics: [
    {
      task: 1,
      title: "Data Cleaning Basics",
      day: 1,
      difficulty: "Beginner",
      description:
        "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
    },
    {
      task: 2,
      title: "Formulas & Pivot Tables",
      day: 4,
      difficulty: "Beginner",
      description:
        "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
    },
    {
      task: 3,
      title: "Data Visualization",
      day: 8,
      difficulty: "Beginner → Intermediate",
      description:
        "Create charts and a simple dashboard that communicate useful insights from a dataset.",
    },
    {
      task: 4,
      title: "Introduction to SQL",
      day: 11,
      difficulty: "Beginner → Intermediate",
      description:
        "Practice basic SQL queries and use them to answer real-world questions about data.",
    },
    {
      task: 5,
      title: "SQL Joins & Aggregations",
      day: 15,
      difficulty: "Intermediate",
      description:
        "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
    },
    {
      task: 6,
      title: "Lookup Functions & Data Wrangling",
      day: 19,
      difficulty: "Intermediate",
      description:
        "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
    },
    {
      task: 7,
      title: "Mini Analysis Project",
      day: 22,
      difficulty: "Intermediate",
      description:
        "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
    },
    {
      task: 8,
      title: "Capstone Project",
      day: 26,
      difficulty: "Intermediate",
      description:
        "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
    },
  ],
  webDevelopment: [
    {
      task: 1,
      title: "Build the TechBridge Homepage",
      day: 1,
      difficulty: "Beginner",
      description:
        "Create the first version of the TechBridge website using HTML and CSS.",
    },
    {
      task: 2,
      title: "Build the TechBridge Programs Experience",
      day: 4,
      difficulty: "Beginner",
      description:
        "Create a Programs experience presenting TechBridge's available learning programs.",
    },
    {
      task: 3,
      title: "Build the Internship Tasks Experience",
      day: 8,
      difficulty: "Beginner → Intermediate",
      description:
        "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
    },
    {
      task: 4,
      title: "Build an Interactive Internship Roadmap",
      day: 11,
      difficulty: "Beginner → Intermediate",
      description:
        "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
    },
    {
      task: 5,
      title: "Build the Intern Registration Experience",
      day: 15,
      difficulty: "Intermediate",
      description:
        "Create a professional registration and onboarding interface for TechBridge interns.",
    },
    {
      task: 6,
      title: "Build the Task Submission System",
      day: 19,
      difficulty: "Intermediate",
      description:
        "Create an interface through which interns can prepare and submit their task work.",
    },
    {
      task: 7,
      title: "Build the Intern Dashboard",
      day: 22,
      difficulty: "Intermediate",
      description:
        "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
    },
    {
      task: 8,
      title: "Build the Complete TechBridge Internship Platform",
      day: 26,
      difficulty: "Intermediate",
      description:
        "Combine the different components created during the internship into a complete TechBridge platform.",
    },
  ],
};

// Cache the roadmap controls and live content region used by the track switcher.
const trackButtons = document.querySelectorAll(".track-button");
const taskTimeline = document.querySelector("#task-timeline");
const currentTrack = document.querySelector("#current-track");

// Create one accessible task card from a track's task data.
function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "task-card";

  const metadata = document.createElement("div");
  metadata.className = "task-meta";

  const number = document.createElement("span");
  number.className = "task-id";
  number.textContent = `Task ${task.task}`;

  const day = document.createElement("span");
  day.className = "day-pill";
  day.textContent = `Day ${task.day}`;

  const difficulty = document.createElement("p");
  difficulty.className = "task-difficulty";
  difficulty.textContent = task.difficulty;

  const title = document.createElement("h3");
  title.textContent = task.title;

  const description = document.createElement("p");
  description.textContent = task.description;

  metadata.append(number, day);
  card.append(metadata, difficulty, title, description);
  return card;
}

// Render the selected roadmap and synchronize the visible and accessible selection states.
function selectTrack(trackName) {
  const tasks = trackTasks[trackName];

  if (!tasks) {
    throw new Error(`Unknown internship track: ${trackName}`);
  }

  const trackLabel = trackName === "dataAnalytics" ? "Data Analytics" : "Web Development";
  const cards = tasks.map(createTaskCard);

  taskTimeline.replaceChildren(...cards);
  taskTimeline.setAttribute("aria-label", `${trackLabel} internship task timeline`);
  currentTrack.textContent = `Currently viewing: ${trackLabel.toUpperCase()}`;

  trackButtons.forEach((button) => {
    const isSelected = button.dataset.track === trackName;
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

// Wire up each track button so switching tracks does not reload the page.
trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectTrack(button.dataset.track);
  });
});

// Start with the Web Development track to preserve the original roadmap's default view.
selectTrack("webDevelopment");
