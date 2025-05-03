import { useState, useEffect } from "react";

export default function ResultsForm({ onSubmit, initialData }) {
    const [form, setForm] = useState({ supplier_id: "", total: "" });

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
            }}
        >
            <input
                name="supplier_id"
                value={form.supplier_id}
                onChange={handleChange}
                placeholder="Supplier ID"
                required
            />
            <input
                name="total"
                value={form.total}
                onChange={handleChange}
                placeholder="Total"
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
}
