const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "expenses.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");
}

function readExpenses() {
  ensureDataFile();
  try {
    const parsed = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeExpenses(expenses) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2), "utf8");
}

function validateExpense(body) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const amount = Number(body.amount);
  const date = typeof body.date === "string" ? body.date : "";

  if (!title) return "Please enter an expense title.";
  if (!Number.isFinite(amount) || amount <= 0) return "Amount must be a number greater than zero.";
  if (!category) return "Please select a category.";
  if (!date || Number.isNaN(Date.parse(date))) return "Please enter a valid date.";
  return null;
}

// Read all expenses
app.get("/api/expenses", (req, res) => {
  const expenses = readExpenses().sort((a, b) => b.date.localeCompare(a.date));
  res.json(expenses);
});

// Create an expense
app.post("/api/expenses", (req, res) => {
  const error = validateExpense(req.body);
  if (error) return res.status(400).json({ message: error });

  const expenses = readExpenses();
  const expense = {
    id: Date.now().toString() + Math.random().toString(16).slice(2, 8),
    title: req.body.title.trim(),
    amount: Number(req.body.amount),
    category: req.body.category.trim(),
    date: req.body.date
  };
  expenses.push(expense);
  writeExpenses(expenses);
  res.status(201).json(expense);
});

// Update an expense
app.put("/api/expenses/:id", (req, res) => {
  const error = validateExpense(req.body);
  if (error) return res.status(400).json({ message: error });

  const expenses = readExpenses();
  const index = expenses.findIndex(item => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Expense not found." });

  expenses[index] = {
    ...expenses[index],
    title: req.body.title.trim(),
    amount: Number(req.body.amount),
    category: req.body.category.trim(),
    date: req.body.date
  };
  writeExpenses(expenses);
  res.json(expenses[index]);
});

// Delete an expense
app.delete("/api/expenses/:id", (req, res) => {
  const expenses = readExpenses();
  const filtered = expenses.filter(item => item.id !== req.params.id);
  if (filtered.length === expenses.length) {
    return res.status(404).json({ message: "Expense not found." });
  }
  writeExpenses(filtered);
  res.json({ message: "Expense deleted successfully." });
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  ensureDataFile();
  console.log(`Expense Tracker is running at http://localhost:${PORT}`);
});