import { useExpenses } from "./hooks/useExpenses";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilters from "./components/ExpenseFilters";
import ExpenseList from "./components/ExpenseList";
import ExpenseTotal from "./components/ExpenseTotal";
import "./App.css";

function App() {
  const {
    expenses,
    loading,
    error,
    category,
    setCategory,
    sort,
    setSort,
    total,
    refetch,
  } = useExpenses();

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your personal expenses and understand where your money goes</p>
      </header>

      <main className="app-main">
        <ExpenseForm onExpenseAdded={refetch} />

        <div className="expenses-section">
          <div className="section-header">
            <h2>Your Expenses</h2>
            <ExpenseTotal total={total} />
          </div>

          <ExpenseFilters
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />

          {error && <div className="error-message">{error}</div>}

          <ExpenseList expenses={expenses} loading={loading} />
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with MERN Stack • Production-Ready Architecture</p>
      </footer>
    </div>
  );
}

export default App;
