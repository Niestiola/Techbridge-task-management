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
if (taskTimeline) {
  selectTrack("webDevelopment");
}

// Dashboard interactivity
(function initializeDashboard() {
  if (!document.body.classList.contains('page-dashboard')) return;

const tasks = [
  {
    number: 1,
    title: "Build the TechBridge Homepage",
    description: "Create the first version of the TechBridge website using HTML and CSS.",
    day: 1,
    status: "Completed",
  },
  {
    number: 2,
    title: "Build the TechBridge Programs Experience",
    description: "Create a Programs experience presenting TechBridge's available learning programs.",
    day: 4,
    status: "Completed",
  },
  {
    number: 3,
    title: "Build the Internship Tasks Experience",
    description:
      "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
    day: 8,
    status: "In Progress",
  },
  {
    number: 4,
    title: "Build an Interactive Internship Roadmap",
    description:
      "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
    day: 11,
    status: "Not Started",
  },
  {
    number: 5,
    title: "Build the Intern Registration Experience",
    description: "Create a professional registration and onboarding interface for TechBridge interns.",
    day: 15,
    status: "Not Started",
  },
  {
    number: 6,
    title: "Build the Task Submission System",
    description: "Create an interface through which interns can prepare and submit their task work.",
    day: 19,
    status: "Not Started",
  },
  {
    number: 7,
    title: "Build the Intern Dashboard",
    description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
    day: 22,
    status: "Not Started",
  },
  {
    number: 8,
    title: "Build the Complete TechBridge Internship Platform",
    description: "Combine the different components created during the internship into a complete TechBridge platform.",
    day: 26,
    status: "Not Started",
  },
];

const technologyData = {
  "Next.js": {
    category: "Frontend framework",
    description: "Build full-stack React experiences with routing, server rendering, and an optimized production setup.",
    focus: "React, file-based routing, server components, and deployment",
  },
  "Vue.js": {
    category: "Frontend framework",
    description: "Create approachable, component-based interfaces with a flexible and progressive JavaScript framework.",
    focus: "Single-file components, reactivity, and Vue Router",
  },
  Angular: {
    category: "Frontend framework",
    description: "Develop structured, feature-rich applications using a complete TypeScript-based framework.",
    focus: "TypeScript, components, services, and dependency injection",
  },
  "Node.js": {
    category: "Backend technology",
    description: "Run JavaScript on the server to build APIs, services, and data-driven applications.",
    focus: "Asynchronous JavaScript, modules, and REST APIs",
  },
  "Express.js": {
    category: "Backend technology",
    description: "Create lightweight web servers and APIs with clear routing and middleware.",
    focus: "Routes, middleware, request handling, and API design",
  },
  Django: {
    category: "Backend technology",
    description: "Build secure, database-backed web applications with Python and Django's batteries-included toolkit.",
    focus: "Python, models, views, templates, and the admin",
  },
};

const taskList = document.querySelector("#task-list");
const taskResults = document.querySelector("#task-results");
const emptyTasks = document.querySelector("#empty-tasks");
const progressTrack = document.querySelector("#progress-track");
const progressFill = document.querySelector("#progress-fill");
const progressPercentage = document.querySelector("#progress-percentage");
const completedCount = document.querySelector("#completed-count");
const remainingCount = document.querySelector("#remaining-count");
const totalCount = document.querySelector("#total-count");
const filterButtons = document.querySelectorAll(".filter-button");
const taskDialog = document.querySelector("#task-dialog");
const dialogTaskNumber = document.querySelector("#dialog-task-number");
const dialogTitle = document.querySelector("#dialog-title");
const dialogStatus = document.querySelector("#dialog-status");
const dialogDescription = document.querySelector("#dialog-description");
const dialogDay = document.querySelector("#dialog-day");
const dialogAction = document.querySelector("#dialog-action");
const dialogClose = document.querySelector("#dialog-close");
const techOptions = document.querySelector("#tech-options");
const backendOptions = document.querySelector("#backend-options");
const techKicker = document.querySelector("#tech-kicker");
const techName = document.querySelector("#tech-name");
const techDescription = document.querySelector("#tech-description");
const techFocus = document.querySelector("#tech-focus");

let activeFilter = "All";
let activeTask = null;
let activeTechnology = "Next.js";

function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "task-card";
  card.dataset.status = task.status;

  const number = document.createElement("span");
  number.className = "task-number";
  number.textContent = String(task.number).padStart(2, "0");
  number.setAttribute("aria-label", `Task ${task.number}`);

  const copy = document.createElement("div");
  copy.className = "task-copy";
  const meta = document.createElement("div");
  meta.className = "task-meta";
  const day = document.createElement("span");
  day.textContent = `Day ${task.day}`;
  const status = document.createElement("span");
  status.className = "task-status";
  status.textContent = task.status;
  meta.append(day, status);
  const title = document.createElement("h3");
  title.textContent = task.title;
  const description = document.createElement("p");
  description.textContent = task.description;
  copy.append(meta, title, description);

  const actions = document.createElement("div");
  actions.className = "task-actions";
  const viewButton = document.createElement("button");
  viewButton.type = "button";
  viewButton.className = "view-task";
  viewButton.textContent = "View Task";
  viewButton.addEventListener("click", () => openTask(task));
  const completeButton = document.createElement("button");
  completeButton.type = "button";
  completeButton.className = "complete-task";
  completeButton.textContent = task.status === "Completed" ? "Completed" : "Mark As Completed";
  completeButton.disabled = task.status === "Completed";
  completeButton.addEventListener("click", () => completeTask(task));
  actions.append(viewButton, completeButton);

  card.append(number, copy, actions);
  return card;
}

function renderTasks() {
  const filteredTasks = tasks.filter((task) => activeFilter === "All" || task.status === activeFilter);
  taskList.replaceChildren(...filteredTasks.map(createTaskCard));
  taskResults.textContent = `Showing ${filteredTasks.length} ${filteredTasks.length === 1 ? "task" : "tasks"}`;
  emptyTasks.hidden = filteredTasks.length !== 0;

  document.querySelectorAll("[data-filter-count]").forEach((count) => {
    const status = count.dataset.filterCount;
    const matching = status === "All" ? tasks : tasks.filter((task) => task.status === status);
    count.textContent = String(matching.length);
  });
}

function updateProgress() {
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const percentage = Math.round((completed / tasks.length) * 100);

  completedCount.textContent = String(completed);
  remainingCount.textContent = String(tasks.length - completed);
  totalCount.textContent = String(tasks.length);
  progressPercentage.textContent = `${percentage}%`;
  progressFill.style.width = `${percentage}%`;
  progressTrack.setAttribute("aria-valuemax", String(tasks.length));
  progressTrack.setAttribute("aria-valuenow", String(completed));
  progressTrack.setAttribute("aria-valuetext", `${completed} of ${tasks.length} tasks completed`);

  if (completed === tasks.length) {
    document.querySelector("#intern-status").textContent = "Internship complete";
  } else {
    document.querySelector("#intern-status").textContent = "Active intern";
  }
}

function openTask(task) {
  activeTask = task;
  dialogTaskNumber.textContent = `Task ${task.number} · Day ${task.day}`;
  dialogTitle.textContent = task.title;
  dialogStatus.textContent = task.status;
  dialogDescription.textContent = task.description;
  dialogDay.textContent = `Suggested milestone: Day ${task.day} of your 30-day internship`;
  dialogAction.textContent = task.status === "Completed" ? "Completed" : "Mark As Completed";
  dialogAction.disabled = task.status === "Completed";
  if (!taskDialog.open) {
    taskDialog.showModal();
  }
}

function completeTask(task) {
  if (task.status === "Completed") {
    return;
  }

  task.status = "Completed";
  updateProgress();
  renderTasks();

  if (activeTask === task && taskDialog.open) {
    openTask(task);
  }
}

function createTechnologyButton(name, className, parent) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = name;
  button.setAttribute("aria-pressed", String(name === activeTechnology));
  button.addEventListener("click", () => {
    if (className === "tech-option") {
      selectTechnologyGroup(name);
    } else {
      selectTechnology(name);
    }
  });
  parent.append(button);
}

function selectTechnology(name) {
  activeTechnology = name;
  const details = technologyData[name];
  if (!details) {
    throw new Error(`Unknown technology: ${name}`);
  }

  techKicker.textContent = details.category;
  techName.textContent = name;
  techDescription.textContent = details.description;
  techFocus.textContent = details.focus;

  document.querySelectorAll(".tech-option").forEach((button) => {
    const isBackendGroup = button.textContent === "Backend Development";
    button.setAttribute(
      "aria-pressed",
      String(isBackendGroup ? !backendOptions.hidden : button.textContent === name)
    );
  });
  document.querySelectorAll(".backend-option").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.textContent === name));
  });
}

function selectTechnologyGroup(name) {
  if (name === "Backend Development") {
    backendOptions.hidden = false;
    backendOptions.replaceChildren();
    ["Node.js", "Express.js", "Django"].forEach((technology) => {
      createTechnologyButton(technology, "backend-option", backendOptions);
    });
    selectTechnology("Node.js");
    return;
  }

  backendOptions.hidden = true;
  selectTechnology(name);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.status;
    filterButtons.forEach((filter) => {
      filter.setAttribute("aria-pressed", String(filter === button));
    });
    renderTasks();
  });
});

["Next.js", "Vue.js", "Angular", "Backend Development"].forEach((technology) => {
  createTechnologyButton(technology, "tech-option", techOptions);
});

dialogAction.addEventListener("click", () => {
  if (activeTask) {
    completeTask(activeTask);
  }
});

dialogClose.addEventListener("click", () => taskDialog.close());
taskDialog.addEventListener("click", (event) => {
  if (event.target === taskDialog) {
    taskDialog.close();
  }
});

updateProgress();
renderTasks();
selectTechnology("Next.js");
})();
