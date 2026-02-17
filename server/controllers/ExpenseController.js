const expenseService = require("../services/ExpenseService");
const AppError = require("../utils/AppError");
const { invalidateCache } = require("../middleware/cache");

class ExpenseController {
    /**
     * Create a new expense
     * POST /api/expenses
     */
    async createExpense(req, res, next) {
        try {
            const { amount, category, description, date } = req.body;
            const idempotencyKey = req.idempotencyKey;

            const { expense, isDuplicate } = await expenseService.createExpense(
                { amount, category, description, date },
                idempotencyKey
            );

            // Return 200 for duplicate requests, 201 for new
            const statusCode = isDuplicate ? 200 : 201;

            // Invalidate cache after successful creation
            if (!isDuplicate) {
                invalidateCache();
            }

            res.status(statusCode).json({
                status: "success",
                data: { expense },
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all expenses with optional filters
     * GET /api/expenses?category=Food&sort=date_desc
     */
    async getExpenses(req, res, next) {
        try {
            const { category, sort } = req.query;

            const expenses = await expenseService.getExpenses({ category, sort });

            res.status(200).json({
                status: "success",
                results: expenses.length,
                data: { expenses },
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ExpenseController();
