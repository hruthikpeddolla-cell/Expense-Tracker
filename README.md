# Expense Tracker — End-to-End Web Application

A beginner-friendly full-stack mini project for recording and managing personal expenses.

## Features

- Add an expense with a title, amount, category, and date.
- View all saved expenses.
- Edit an existing expense.
- Delete an expense after confirmation.
- Search expenses by title, category, or date.
- Summary cards show total spending, number of expenses, and the highest-spending category.
- Responsive layout for desktop and mobile.
- Data is stored in a local JSON file, so expenses remain after restarting the server.

## Technology stack

- **Frontend:** HTML, CSS, vanilla JavaScript
- **Backend:** Node.js and Express
- **Data storage:** `data/expenses.json` (JSON file)
- **API testing:** Browser or Postman

## Requirements

Install **Node.js LTS** from https://nodejs.org/. npm is included with Node.js.

Check your installation in a terminal:

```bash
node --version
npm --version
```

## Run the project

1. Extract `expense-tracker-mini-project.zip`.
2. Open the extracted `expense-tracker-mini-project` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. Open this URL in your browser:

   http://localhost:3000

Keep the terminal running while using the application. Press `Ctrl + C` in the terminal to stop the server.

## Project folder structure

```text
expense-tracker-mini-project/
├── data/
│   └── expenses.json
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## API endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Create an expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/health` | Check whether the API is running |

### Example POST request

In Postman, choose `POST`, enter `http://localhost:3000/api/expenses`, select **Body → raw → JSON**, and send:

```json
{
  "title": "Lunch",
  "amount": 150,
  "category": "Food",
  "date": "2026-10-26"
}
```

A successful creation returns status `201` and the saved expense, including its generated `id`.

## How the frontend and backend work together

1. The browser loads `public/index.html`, `public/styles.css`, and `public/app.js`.
2. `app.js` sends HTTP requests using `fetch()` to `/api/expenses`.
3. Express in `server.js` validates the data and performs the requested CRUD operation.
4. The backend reads or writes `data/expenses.json`.
5. The API returns JSON, and the frontend refreshes the list and summary cards.

## Troubleshooting

- **`npm` is not recognized:** Install Node.js LTS, close and reopen VS Code, then try again.
- **Port 3000 is already in use:** Stop the other application using port 3000, or run PowerShell with `$env:PORT=3001; npm start` and visit `http://localhost:3001`.
- **Page cannot load expenses:** Make sure `npm start` is still running and reload the page.
- **Data reset:** Expenses are stored in `data/expenses.json`. Do not replace that file if you want to keep your records.

## Notes

This project uses JSON-file storage to keep setup simple for a mini project. It is suitable for local demonstration and learning, not for simultaneous multi-user or production use.
