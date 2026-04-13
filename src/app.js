const path = require("path");
const express = require("express");
const { loadData } = require("./services/dataLoader");
const { RecommendationEngine } = require("./services/recommendationEngine");

const app = express();
const port = Number(process.env.PORT) || 3000;

const data = loadData(path.join(process.cwd(), "data"));
const engine = new RecommendationEngine(data);

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
  const users = engine.getUserList();
  const requestedUserId = Number.parseInt(req.query.userId, 10);
  const selectedUserId = Number.isInteger(requestedUserId)
    ? requestedUserId
    : users[0]?.user_id;

  let result = null;
  let error = null;
  if (selectedUserId !== undefined) {
    try {
      result = engine.getRecommendationsForUser(selectedUserId, 8);
    } catch (err) {
      error = err instanceof Error ? err.message : "Unknown error";
    }
  }

  res.render("index", {
    users,
    selectedUserId,
    result,
    error,
    datasetSummary: engine.getDatasetSummary(),
    behaviorFile: data.behaviorFile,
    paper: {
      title:
        "Helping university students to choose elective courses by using a hybrid multi-criteria recommendation system with genetic optimization",
      authors: "A. Esteban, A. Zafra, C. Romero",
      journal: "arXiv preprint, 2024",
      doi: "10.48550/arXiv.2402.08371",
      url: "https://doi.org/10.48550/arXiv.2402.08371",
    },
  });
});

app.get("/api/recommendations/:userId", (req, res) => {
  const userId = Number.parseInt(req.params.userId, 10);
  if (!Number.isInteger(userId)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  try {
    const result = engine.getRecommendationsForUser(userId, 10);
    return res.json(result);
  } catch (err) {
    return res.status(404).json({
      error: err instanceof Error ? err.message : "Recommendation not available",
    });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, service: "bia601homeword" });
});

app.use((req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`);
});

