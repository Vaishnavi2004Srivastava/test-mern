const { z } = require("zod");

const createExpenseSchema = z.object({
    amount: z
        .number({ required_error: "Amount is required", invalid_type_error: "Amount must be a number" })
        .positive("Amount must be positive"),
    category: z
        .string({ required_error: "Category is required" })
        .trim()
        .min(1, "Category is required")
        .max(50, "Category must be less than 50 characters"),
    description: z
        .string({ required_error: "Description is required" })
        .trim()
        .min(1, "Description is required")
        .max(500, "Description must be less than 500 characters"),
    date: z
        .string({ required_error: "Date is required" })
        .datetime({ message: "Date must be a valid ISO date" })
        .or(z.date()),
});

const getExpensesSchema = z.object({
    category: z.string().trim().max(50).optional(),
    sort: z.enum(["date_desc"]).optional(),
});

module.exports = {
    createExpenseSchema,
    getExpensesSchema,
};
