import { useExpenseForm } from "../hooks/useExpenseForm";

const ExpenseForm = ({ onExpenseAdded }) => {
    const { formData, handleChange, handleSubmit, submitting, error } =
        useExpenseForm(onExpenseAdded);

    return (
        <div className="expense-form-container">
            <h2>Add New Expense</h2>
            <form onSubmit={handleSubmit} className="expense-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="amount">Amount (₹)</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                            disabled={submitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., Food, Transport"
                            required
                            disabled={submitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            disabled={submitting}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brief description of the expense"
                        required
                        disabled={submitting}
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? "Adding..." : "Add Expense"}
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
