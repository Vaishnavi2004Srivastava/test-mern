const Expense = require("../models/Expense");

class ExpenseRepository {
    /**
     * Create a new expense
     * @param {Object} data - Expense data
     * @returns {Promise<Expense>}
     */
    async create(data) {
        const expense = new Expense(data);
        return await expense.save();
    }

    /**
     * Find all expenses with optional filters
     * @param {Object} filters - { category, sort }
     * @returns {Promise<Expense[]>}
     */
    async findAll(filters = {}) {
        const query = {};

        // Filter by category if provided
        if (filters.category) {
            query.category = filters.category;
        }

        let queryBuilder = Expense.find(query);

        // Sort by date if requested
        if (filters.sort === "date_desc") {
            queryBuilder = queryBuilder.sort({ date: -1 });
        } else {
            queryBuilder = queryBuilder.sort({ createdAt: -1 }); // Default: newest created first
        }

        return await queryBuilder.exec();
    }

    /**
     * Find expense by idempotency key
     * @param {String} key - Idempotency key
     * @returns {Promise<Expense|null>}
     */
    async findByIdempotencyKey(key) {
        return await Expense.findOne({ idempotencyKey: key });
    }
}

module.exports = new ExpenseRepository();
