import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import * as API from "../../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CriteriaForm from "./CriteriaForm";
import { max } from "date-fns";

export default function CriteriaList() {
    const [criteria, setCriteria] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        try {
            const res = await API.getCriteria();
            setCriteria(res.data);
            setFilteredData(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (form) => {
        try {
            if (editing) {
                await API.updateCriteria(editing.id, form);
            } else {
                await API.createCriteria(form);
            }
            setEditing(null);
            fetchData();
        } catch (err) {
            console.error("Submit error:", err);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Data akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonColor: "#6b7280",
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Ya, hapus!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await API.deleteCriteria(id);
                fetchData();
                Swal.fire({
                    title: "Deleted!",
                    text: "Data berhasil dihapus.",
                    icon: "success",
                });
            }
        });
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);
        const filtered = criteria.filter(
            (item) =>
                item.name.toLowerCase().includes(term) ||
                item.type.toLowerCase().includes(term)
        );
        setFilteredData(filtered);
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Criteria");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blob, "criteria.xlsx");
    };

    const columns = [
        { name: "Nama", selector: (row) => row.name, sortable: true },
        { name: "Type", selector: (row) => row.type, sortable: true },
        { name: "Weight", selector: (row) => row.weight, sortable: true },
        {
            name: "Actions",
            cell: (row) => (
                <div className="space-x-2">
                    <button
                        onClick={() => {
                            setEditing(row);
                            setShowForm(true);
                        }}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const customStyles = {
        rows: {
            stripedStyle: { backgroundColor: "#f9fafb" },
        },
        headCells: {
            style: {
                backgroundColor: "#1f2937",
                color: "white",
                fontWeight: "bold",
            },
        },
    };

    return (
        <div className="p-6 space-y-4 bg-white rounded shadow-md max-w-8xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700">
                Data Kriteria
            </h2>
            <hr />

            <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    setEditing(null);
                    setShowForm(true);
                }}
            >
                Tambah Kriteria
            </button>

            <CriteriaForm
                mode={editing ? "edit" : "add"}
                onSubmit={handleSubmit}
                initialData={editing}
                showForm={showForm}
                setShowForm={setShowForm}
            />

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="border border-gray-300 rounded px-3 py-1 w-1/3"
                />
                <button
                    onClick={handleExport}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Download Excel
                </button>
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles}
            />
        </div>
    );
}