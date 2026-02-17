const ExpenseList = ({ expenses, loading }) => {
    if (loading) {
        return <div className="loading">Loading expenses...</div>;
    }

    if (expenses.length === 0) {
        return <div className="no-expenses">No expenses found. Add your first expense above!</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="expense-list-container">
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th className="amount-col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense._id}>
                            <td>{formatDate(expense.date)}</td>
                            <td>
                                <span className="category-badge">{expense.category}</span>
                            </td>
                            <td>{expense.description}</td>
                            <td className="amount-col">₹{expense.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
