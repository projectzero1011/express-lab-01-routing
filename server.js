const express = require("express");
const app = express();
const PORT = 3000;

// Middleware: Enable JSON request body parsing
app.use(express.json());

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Existing demonstration route (DO NOT MODIFY)
app.get("/", (req, res) => {
  res.send("Express Routing Lab - Home Page");
});

// ------------------------------------------------

// Task 1: Health Check Endpoint
app.get("/health", (req, res) => {
  res.send({
    status: "ok"
  });
});

// TASK 2: User Routes
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(({id}) => id === userId);
  if(!user) {
    return res.status(404).send({
      error: "User not found"
    });
  }
  res.send(user);
});

// TASK 3: Message Submission
app.post("/messages", (req, res) => {
  if(!req.body.text) {
    return res.status(400).send({
      error: "Text is required"
    });
  }
  res.status(201).send({
    id: Math.floor(Math.random()) + 1,
    text: req.body.text,
    status: "received"
  })
});

// ------------------------------------------------

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app };
