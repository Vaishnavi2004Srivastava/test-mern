const ExpenseTotal = ({ total }) => {
    return (
        <div className="expense-total">
            <span className="total-label">Total:</span>
            <span className="total-amount">₹{total.toFixed(2)}</span>
        </div>
    );
};

export default ExpenseTotal;
