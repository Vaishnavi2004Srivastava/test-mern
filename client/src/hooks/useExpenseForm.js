import { useState } from "react";
import expenseApi from "../api/expenseApi";

export const useExpenseForm = (onSuccess) => {
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0], // Today's date
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submitting) return; // Prevent double submission

        try {
            setSubmitting(true);
            setError(null);

            await expenseApi.createExpense({
                amount: parseFloat(formData.amount),
                category: formData.category,
                description: formData.description,
                date: formData.date,
            });

            // Reset form
            setFormData({
                amount: "",
                category: "",
                description: "",
                date: new Date().toISOString().split("T")[0],
            });

            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        submitting,
        error,
    };
};
