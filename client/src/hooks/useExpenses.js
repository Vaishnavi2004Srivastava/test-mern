import { useState, useEffect } from "react";
import expenseApi from "../api/expenseApi";

export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("date_desc");

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await expenseApi.getExpenses({ category, sort });
            setExpenses(response.data.expenses);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [category, sort]);

    // Calculate total of visible expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return {
        expenses,
        loading,
        error,
        category,
        setCategory,
        sort,
        setSort,
        total,
        refetch: fetchExpenses,
    };
};
