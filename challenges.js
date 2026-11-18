// Challenge data: each object contains the content needed for a card and its detail dialog.
const challenges = [
  {
    challengeName: "Sales Performance Analysis",
    track: "Data Analytics",
    difficulty: "Beginner",
    shortDescription: "Analyze monthly sales data to identify top products, regions, and trends.",
    expectedOutcome: "A clear sales report with recommendations for improving revenue.",
    objective: "Turn a raw sales dataset into understandable findings that support business decisions.",
    requiredSkills: ["Spreadsheet analysis", "Basic formulas", "Chart creation"],
    recommendedTools: ["Google Sheets", "Microsoft Excel"],
    deliverables: ["Cleaned dataset", "Sales summary", "Charts and recommendations"],
    estimatedTime: "4–6 hours",
    expectedResult: "A concise analysis showing sales trends and two practical recommendations.",
  },
  {
    challengeName: "Customer Insights Report",
    track: "Data Analytics",
    difficulty: "Intermediate",
    shortDescription: "Explore customer behavior to find patterns in purchases and engagement.",
    expectedOutcome: "Customer segments and evidence-based actions for a marketing team.",
    objective: "Group customer records and explain which segments have the strongest opportunity.",
    requiredSkills: ["Data cleaning", "Pivot Tables", "Data interpretation"],
    recommendedTools: ["Excel", "Google Sheets", "SQL"],
    deliverables: ["Cleaned customer table", "Summary report", "Customer segment charts"],
    estimatedTime: "1–2 days",
    expectedResult: "At least three useful customer segments supported by a short insight report.",
  },
  {
    challengeName: "Business Dashboard",
    track: "Data Analytics",
    difficulty: "Advanced",
    shortDescription: "Combine related tables into a dashboard that tracks key business measures.",
    expectedOutcome: "An interactive dashboard for monitoring orders, revenue, and growth.",
    objective: "Build an end-to-end dashboard using spreadsheet queries or SQL outputs.",
    requiredSkills: ["SQL joins", "Aggregation", "Dashboard design"],
    recommendedTools: ["SQL", "Excel", "Google Looker Studio"],
    deliverables: ["Data source", "Dashboard", "Metrics summary"],
    estimatedTime: "3–4 days",
    expectedResult: "A reusable dashboard with filters, trends, and management-ready conclusions.",
  },
  {
    challengeName: "Responsive Landing Page",
    track: "Web Development",
    difficulty: "Beginner",
    shortDescription: "Create a polished landing page that adapts to desktop, tablet, and mobile screens.",
    expectedOutcome: "A reusable responsive page with clear branding and calls to action.",
    objective: "Practice semantic HTML, CSS layout, and mobile-first responsiveness.",
    requiredSkills: ["HTML5", "CSS3", "Flexbox", "Responsive design"],
    recommendedTools: ["Visual Studio Code", "Browser developer tools"],
    deliverables: ["index.html", "style.css", "Responsive screenshots"],
    estimatedTime: "1–2 days",
    expectedResult: "A page that remains readable and usable across common screen sizes.",
  },
  {
    challengeName: "Interactive Dashboard",
    track: "Web Development",
    difficulty: "Intermediate",
    shortDescription: "Build a dashboard interface with navigation, cards, filters, and dynamic updates.",
    expectedOutcome: "A realistic dashboard that responds to user interaction.",
    objective: "Combine structured layouts with JavaScript-driven user controls.",
    requiredSkills: ["CSS Grid", "JavaScript", "DOM manipulation", "Accessibility"],
    recommendedTools: ["Visual Studio Code", "Chrome or Edge", "GitHub"],
    deliverables: ["Dashboard page", "Filter behavior", "Responsive layout"],
    estimatedTime: "3–4 days",
    expectedResult: "A polished dashboard where controls update visible information without reloading.",
  },
  {
    challengeName: "E-Commerce Homepage",
    track: "Web Development",
    difficulty: "Advanced",
    shortDescription: "Create a complete product storefront homepage with filtering and shopping interactions.",
    expectedOutcome: "A production-style storefront prototype with engaging product discovery.",
    objective: "Design a complete shopping experience and manage dynamic user interface states.",
    requiredSkills: ["Advanced CSS", "JavaScript", "Data arrays", "State handling"],
    recommendedTools: ["Visual Studio Code", "Browser developer tools", "GitHub"],
    deliverables: ["Responsive storefront", "Category and search filters", "Product detail interactions"],
    estimatedTime: "5–7 days",
    expectedResult: "A complete prototype that feels clear, accessible, and ready for further integration.",
  },
];

// Cache page elements so JavaScript updates remain focused and easy to debug.
const challengeGrid = document.querySelector("#challenge-grid");
const trackFilter = document.querySelector("#track-filter");
const difficultyFilter = document.querySelector("#difficulty-filter");
const resetFilters = document.querySelector("#reset-filters");
const resultsStatus = document.querySelector("#results-status");
const challengeCount = document.querySelector("#challenge-count");
const noResults = document.querySelector("#no-results");
const challengeDialog = document.querySelector("#challenge-dialog");
const dialogClose = document.querySelector("#dialog-close");
const dialogTitle = document.querySelector("#dialog-title");
const dialogTrack = document.querySelector("#dialog-track");
const dialogBody = document.querySelector("#dialog-body");

// Create a card element for a challenge object.
function createChallengeCard(challenge) {
  const card = document.createElement("article");
  const trackClass = challenge.track === "Data Analytics" ? "track-data" : "track-web";
  card.className = `challenge-card ${trackClass}`;

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const track = document.createElement("span");
  track.className = "track-label";
  track.textContent = challenge.track;

  const difficulty = document.createElement("span");
  difficulty.className = "difficulty-label";
  difficulty.textContent = challenge.difficulty;

  const title = document.createElement("h3");
  title.textContent = challenge.challengeName;

  const description = document.createElement("p");
  description.textContent = challenge.shortDescription;

  const button = document.createElement("button");
  button.className = "view-challenge";
  button.type = "button";
  button.textContent = "View challenge";
  button.addEventListener("click", () => openChallenge(challenge));

  meta.append(track, difficulty);
  card.append(meta, title, description, button);
  return card;
}

// Add a labeled detail block to the challenge dialog.
function createDialogDetail(title, content, fullWidth = false) {
  const detail = document.createElement("section");
  detail.className = fullWidth ? "dialog-detail full-width" : "dialog-detail";

  const heading = document.createElement("h3");
  heading.textContent = title;

  if (Array.isArray(content)) {
    const list = document.createElement("ul");
    content.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.append(listItem);
    });
    detail.append(heading, list);
  } else {
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    detail.append(heading, paragraph);
  }

  return detail;
}

// Open and populate the native dialog with the selected challenge's details.
function openChallenge(challenge) {
  dialogTitle.textContent = challenge.challengeName;
  dialogTrack.textContent = `${challenge.track} · ${challenge.difficulty}`;
  dialogBody.replaceChildren(
    createDialogDetail("Objective", challenge.objective, true),
    createDialogDetail("Required skills", challenge.requiredSkills),
    createDialogDetail("Recommended tools", challenge.recommendedTools),
    createDialogDetail("Deliverables", challenge.deliverables),
    createDialogDetail("Estimated time", challenge.estimatedTime),
    createDialogDetail("Expected result", challenge.expectedResult, true)
  );

  if (typeof challengeDialog.showModal === "function") {
    challengeDialog.showModal();
  }
}

// Filter by both selected controls and update the cards and status in real time.
function renderChallenges() {
  const selectedTrack = trackFilter.value;
  const selectedDifficulty = difficultyFilter.value;

  const filteredChallenges = challenges.filter((challenge) => {
    const trackMatches = selectedTrack === "All" || challenge.track === selectedTrack;
    const difficultyMatches = selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty;
    return trackMatches && difficultyMatches;
  });

  const cards = filteredChallenges.map(createChallengeCard);
  challengeGrid.replaceChildren(...cards);

  const challengeWord = filteredChallenges.length === 1 ? "challenge" : "challenges";
  resultsStatus.textContent = `Showing ${filteredChallenges.length} ${challengeWord}`;
  challengeCount.textContent = String(filteredChallenges.length);
  noResults.hidden = filteredChallenges.length !== 0;
  challengeGrid.hidden = filteredChallenges.length === 0;
}

// Reset both filters and return to the complete challenge list.
function resetChallengeFilters() {
  trackFilter.value = "All";
  difficultyFilter.value = "All";
  renderChallenges();
  trackFilter.focus();
}

// Select controls trigger live filtering while reset returns the full list.
trackFilter.addEventListener("change", renderChallenges);
difficultyFilter.addEventListener("change", renderChallenges);
resetFilters.addEventListener("click", resetChallengeFilters);

// Close the dialog using the dedicated button or a click on the backdrop.
dialogClose.addEventListener("click", () => challengeDialog.close());
challengeDialog.addEventListener("click", (event) => {
  if (event.target === challengeDialog) {
    challengeDialog.close();
  }
});

// Initial render displays all challenges before a visitor changes a filter.
renderChallenges();
