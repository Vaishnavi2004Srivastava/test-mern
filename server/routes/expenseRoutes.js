const express = require("express");
const expenseController = require("../controllers/ExpenseController");
const validate = require("../middleware/validate");
const idempotency = require("../middleware/idempotency");
const { cacheMiddleware } = require("../middleware/cache");
const { strictLimiter } = require("../middleware/rateLimiter");
const {
    createExpenseSchema,
    getExpensesSchema,
} = require("../validators/expenseValidator");

const router = express.Router();

// POST /api/expenses - Create expense
router.post(
    "/",
    strictLimiter, // Rate limit: 10 requests per minute
    idempotency,
    validate(createExpenseSchema, "body"),
    expenseController.createExpense
);

// GET /api/expenses - Get all expenses (with optional filters)
router.get(
    "/",
    cacheMiddleware, // Cache responses for 30 seconds
    validate(getExpensesSchema, "query"),
    expenseController.getExpenses
);

module.exports = router;
