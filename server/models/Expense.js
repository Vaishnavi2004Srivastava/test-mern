const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        amount: {
            type: mongoose.Schema.Types.Decimal128,
            required: [true, "Amount is required"],
            min: [0, "Amount must be positive"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            maxlength: [50, "Category must be less than 50 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [500, "Description must be less than 500 characters"],
        },
        date: {
            type: Date,
            required: [true, "Date is required"],
        },
        idempotencyKey: {
            type: String,
            unique: true,
            sparse: true,
            index: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);

// Index for efficient querying
expenseSchema.index({ category: 1, date: -1 });

// Virtual to convert Decimal128 to number for JSON responses
expenseSchema.set("toJSON", {
    transform: (doc, ret) => {
        if (ret.amount) {
            ret.amount = parseFloat(ret.amount.toString());
        }
        delete ret.idempotencyKey; // Don't expose internal key
        return ret;
    },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
