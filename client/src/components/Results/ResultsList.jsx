import { useEffect, useState } from "react";
import * as API from "../../api/api";
import ResultsForm from "./ResultsForm";

export default function ResultsList() {
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(null);

    const fetchData = async () => {
        const res = await API.getResults();
        setItems(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (form) => {
        if (editing) await API.updateResult(editing.id, form);
        else await API.createResult(form);
        setEditing(null);
        fetchData();
    };

    const handleDelete = async (id) => {
        await API.deleteResult(id);
        fetchData();
    };

    return (
        <div>
            <h2>Results</h2>
            <ResultsForm onSubmit={handleSubmit} initialData={editing} />
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        Supplier #{item.supplier_id} - Total: {item.total}
                        <button onClick={() => setEditing(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
