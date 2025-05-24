import Swal from "sweetalert2";
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
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Data akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await API.deleteResult(id);
                fetchData();
                Swal.fire({
                    title: "Deleted!",
                    text: "Data berhasil dihapus.",
                    icon: "success",
                });
            }
        });
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
