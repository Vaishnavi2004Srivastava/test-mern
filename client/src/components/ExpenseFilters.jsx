const ExpenseFilters = ({ category, setCategory, sort, setSort }) => {
    return (
        <div className="expense-filters">
            <div className="filter-group">
                <label htmlFor="category-filter">Filter by Category:</label>
                <select
                    id="category-filter"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="sort-filter">Sort by:</label>
                <select
                    id="sort-filter"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="date_desc">Date (Newest First)</option>
                    <option value="">Date Created (Newest First)</option>
                </select>
            </div>
        </div>
    );
};

export default ExpenseFilters;
