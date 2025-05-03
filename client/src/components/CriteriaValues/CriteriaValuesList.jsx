import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import * as API from "../../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CriteriaValuesForm from "./CriteriaValuesForm";

export default function CriteriaValuesList() {
    const [criteriaValues, setCriteriaValues] = useState([]);
    const [criteriaList, setCriteriaList] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        try {
            const res = await API.getCriteriaValues();
            setCriteriaValues(res.data);
            setFilteredData(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    const fetchCriteriaList = async () => {
        try {
            const res = await API.getCriteria();
            setCriteriaList(res.data);
        } catch (err) {
            console.error("Fetch criteria error:", err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCriteriaList();
    }, []);

    const handleSubmit = async (form) => {
        try {
            if (editing) {
                await API.updateCriteriaValue(editing.id, form);
            } else {
                await API.createCriteriaValue(form);
            }
            setEditing(null);
            fetchData();
        } catch (err) {
            console.error("Submit error:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await API.deleteCriteriaValue(id);
            fetchData();
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);
        const filtered = criteriaValues.filter(
            (item) =>
                item.value.toLowerCase().includes(term) ||
                item.description.toLowerCase().includes(term) ||
                criteriaList
                    .find((criteria) => criteria.id === item.criteria_id)
                    ?.name.toLowerCase()
                    .includes(term)
        );
        setFilteredData(filtered);
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Criteria Values");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blob, "criteria-values.xlsx");
    };

    
    
    const columns = [
        {
            name: "Nama Kriteria",
            selector: (row) => {
                const criteria = criteriaList.find(
                    (c) => c.id === row.criteria_id
                );
                return criteria ? criteria.name : "Unknown";
            },
            sortable: true,
        },
        {
            name: "Nilai",
            selector: (row) => row.value,
            sortable: true,
            cell: (row) => row.value,
        },
        {
            name: "Deskripsi",
            selector: (row) => row.description,
            sortable: true,
        },
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
            style: { minHeight: "48px" },
            stripedStyle: { backgroundColor: "#f9fafb" },
        },
        columns: {
            value: {
                style: {
                    maxWidth: "20px", // Tentukan maxWidth kolom Nilai
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                },
            },
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
        <div className="p-6 space-y-4 bg-white rounded shadow-md max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700">
                Manajemen Nilai Kriteria
            </h2>
            <hr />

            <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    setEditing(null);
                    setShowForm(true);
                }}
            >
                Tambah Nilai Kriteria
            </button>

            <CriteriaValuesForm
                mode={editing ? "edit" : "add"}
                onSubmit={handleSubmit}
                initialData={editing}
                showForm={showForm}
                setShowForm={setShowForm}
                criteriaList={criteriaList}
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
