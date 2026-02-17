const expenseRepository = require("../repositories/ExpenseRepository");
const AppError = require("../utils/AppError");

class ExpenseService {
    /**
     * Create a new expense with idempotency check
     * @param {Object} data - Expense data
     * @param {String} idempotencyKey - Client-provided idempotency key
     * @returns {Promise<{expense: Expense, isDuplicate: boolean}>}
     */
    async createExpense(data, idempotencyKey) {
        // Check if this request was already processed
        if (idempotencyKey) {
            const existing = await expenseRepository.findByIdempotencyKey(idempotencyKey);
            if (existing) {
                return { expense: existing, isDuplicate: true };
            }
        }

        // Create new expense
        const expenseData = {
            ...data,
            idempotencyKey,
        };

        const expense = await expenseRepository.create(expenseData);
        return { expense, isDuplicate: false };
    }

    /**
     * Get all expenses with optional filters
     * @param {Object} filters - { category, sort }
     * @returns {Promise<Expense[]>}
     */
    async getExpenses(filters) {
        return await expenseRepository.findAll(filters);
    }
}

module.exports = new ExpenseService();
