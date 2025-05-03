import { useEffect, useState } from "react";
import * as API from "../../api/api";
import WeightsForm from "./WeightsForm";

export default function WeightsList() {
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(null);

    const fetchData = async () => {
        const res = await API.getWeights();
        setItems(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (form) => {
        if (editing) await API.updateWeight(editing.id, form);
        else await API.createWeight(form);
        setEditing(null);
        fetchData();
    };

    const handleDelete = async (id) => {
        await API.deleteWeight(id);
        fetchData();
    };

    return (
        <div>
            <h2>Weights</h2>
            <WeightsForm onSubmit={handleSubmit} initialData={editing} />
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        Criteria ID: {item.criteria_id}, Weight: {item.weight}
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
