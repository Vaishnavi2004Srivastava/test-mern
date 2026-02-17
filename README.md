# Expense Tracker - Production-Ready Full-Stack Application

A personal finance tool built with the MERN stack, following SOLID principles and design patterns for production-grade quality.

## Features

✅ **Create expenses** with amount, category, description, and date  
✅ **View expenses** in a sortable, filterable table  
✅ **Filter by category** to analyze spending patterns  
✅ **Sort by date** (newest first)  
✅ **Real-time total** calculation for visible expenses  
✅ **Idempotency protection** against duplicate submissions (network retries, double-clicks)  
✅ **Production-ready** error handling, validation, and UX

---

## Architecture

### Design Patterns

| Pattern | Implementation | Purpose |
|---|---|---|
| **Repository** | `ExpenseRepository` | Abstracts MongoDB queries, enables easy DB swapping |
| **Service Layer** | `ExpenseService` | Separates business logic from HTTP layer |
| **Strategy** | Dynamic query building | Supports extensible filtering/sorting |
| **Middleware Chain** | Validation → Idempotency → Controller | Modular request processing |
| **DTO Validation** | Joi schemas | Type-safe request validation |

### SOLID Principles

- **Single Responsibility**: Each layer (repository, service, controller) has one job
- **Open/Closed**: New filters/sorts can be added without modifying existing code
- **Liskov Substitution**: Repository can be swapped (e.g., PostgreSQL) without breaking service layer
- **Interface Segregation**: Thin, focused interfaces (e.g., `ExpenseRepository` only has data methods)
- **Dependency Inversion**: Controller depends on `ExpenseService` abstraction, not MongoDB directly

---

## Tech Stack

### Backend
- **Node.js** + **Express** - REST API
- **MongoDB** + **Mongoose** - Data persistence
- **Joi** - Request validation
- **UUID** - Idempotency key generation

### Frontend
- **React** + **Vite** - UI framework
- **Custom Hooks** - State management (`useExpenses`, `useExpenseForm`)
- **Fetch API** - HTTP client with idempotency headers

---

## Project Structure

```
server/
├── config/
│   └── db.js                    # MongoDB connection
├── models/
│   └── Expense.js               # Mongoose schema (Decimal128 for money)
├── repositories/
│   └── ExpenseRepository.js     # Data access layer
├── services/
│   └── ExpenseService.js        # Business logic
├── controllers/
│   └── ExpenseController.js     # HTTP request handling
├── middleware/
│   ├── errorHandler.js          # Centralized error handling
│   ├── validate.js              # Joi validation middleware
│   └── idempotency.js           # Duplicate request protection
├── routes/
│   └── expenseRoutes.js         # Route definitions
├── validators/
│   └── expenseValidator.js      # Joi schemas
├── utils/
│   └── AppError.js              # Custom error class
└── index.js                     # App entry point

client/src/
├── api/
│   └── expenseApi.js            # API service layer
├── hooks/
│   ├── useExpenses.js           # Expense list state
│   └── useExpenseForm.js        # Form state + submission
├── components/
│   ├── ExpenseForm.jsx
│   ├── ExpenseList.jsx
│   ├── ExpenseFilters.jsx
│   └── ExpenseTotal.jsx
├── App.jsx
└── App.css
```

---

## API Endpoints

### `POST /api/expenses`
Create a new expense.

**Headers:**
- `X-Idempotency-Key` (optional) - Client-provided UUID for deduplication

**Request Body:**
```json
{
  "amount": 250.50,
  "category": "Food",
  "description": "Lunch at restaurant",
  "date": "2026-02-18"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "expense": {
      "_id": "...",
      "amount": 250.50,
      "category": "Food",
      "description": "Lunch at restaurant",
      "date": "2026-02-18T00:00:00.000Z",
      "createdAt": "2026-02-18T00:30:00.000Z",
      "updatedAt": "2026-02-18T00:30:00.000Z"
    }
  }
}
```

**Idempotency Behavior:**
- If the same `X-Idempotency-Key` is sent again, returns `200 OK` with the original expense (no duplicate created)

---

### `GET /api/expenses`
Retrieve all expenses with optional filters.

**Query Parameters:**
- `category` (optional) - Filter by category (e.g., `?category=Food`)
- `sort` (optional) - Sort order (`date_desc` for newest first)

**Response (200 OK):**
```json
{
  "status": "success",
  "results": 5,
  "data": {
    "expenses": [
      {
        "_id": "...",
        "amount": 250.50,
        "category": "Food",
        "description": "Lunch",
        "date": "2026-02-18T00:00:00.000Z",
        "createdAt": "2026-02-18T00:30:00.000Z"
      }
    ]
  }
}
```

---

## Persistence Choice: MongoDB

**Why MongoDB?**
- ✅ Already configured via Atlas
- ✅ `Decimal128` type for accurate money storage (avoids floating-point errors)
- ✅ Flexible schema for iterating on expense fields
- ✅ Horizontal scalability if needed
- ✅ Idempotency key indexing for fast duplicate checks

**Data Model:**
```javascript
{
  amount: Decimal128,        // Precise money storage
  category: String,
  description: String,
  date: Date,
  idempotencyKey: String,    // Unique index for deduplication
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

---

## Running Locally

### Prerequisites
- Node.js 20+
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Configure environment:**
   Update `server/.env`:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/expense_tracker
   ```

3. **Run development servers:**
   ```bash
   npm run dev
   ```
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## Deployment (Render)

The app is configured for single-service deployment on Render.

1. Push to GitHub
2. In Render Dashboard → **New** → **Web Service**
3. Connect your repo
4. Use these settings:
   - **Build Command**: `npm run install-all && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV=production`
     - `MONGO_URI=<your-atlas-uri>`
     - `NODE_VERSION=20.10.0`

Render builds the React app and serves it via Express in production mode.

---

## Production Features

### Robustness
- **Idempotency**: Duplicate requests (retries, double-clicks) are safely deduplicated
- **Validation**: Joi schemas validate all inputs before processing
- **Error Handling**: Centralized error middleware with dev/prod modes
- **Money Precision**: `Decimal128` prevents floating-point rounding errors

### UX
- **Submit Protection**: Form disables during submission
- **Loading States**: Clear feedback during API calls
- **Error Messages**: User-friendly error display
- **Responsive Design**: Works on mobile and desktop

### Code Quality
- **SOLID Principles**: Maintainable, testable architecture
- **Separation of Concerns**: Clear layer boundaries (model → repository → service → controller)
- **Extensibility**: Easy to add new features (e.g., expense editing, categories, budgets)

---

## Future Enhancements

- [ ] User authentication (JWT)
- [ ] Expense editing/deletion
- [ ] Budget tracking
- [ ] Data visualization (charts)
- [ ] Export to CSV
- [ ] Recurring expenses

---

## License

MIT
