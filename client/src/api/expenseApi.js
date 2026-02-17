import { v4 as uuidv4 } from "uuid";

const API_BASE_URL = "/api";

class ExpenseAPI {
    /**
     * Create a new expense with idempotency protection
     */
    async createExpense(data) {
        const idempotencyKey = uuidv4();

        const response = await fetch(`${API_BASE_URL}/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Idempotency-Key": idempotencyKey,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to create expense");
        }

        return await response.json();
    }

    /**
     * Get all expenses with optional filters
     */
    async getExpenses({ category, sort } = {}) {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (sort) params.append("sort", sort);

        const queryString = params.toString();
        const url = `${API_BASE_URL}/expenses${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch expenses");
        }

        return await response.json();
    }
}

export default new ExpenseAPI();
