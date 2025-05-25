import Swal from "sweetalert2";
import * as API from "../../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import MaterialSupplyForm from "./MaterialSupplyForm";
import { useEffect, useState } from "react";

export default function MaterialTypeList() {
    const [materialTypes, setMaterialTypes] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        try {
            const res = await API.getMaterialTypes();
            setMaterialTypes(res.data);
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
                await API.updateMaterialTypes(editing.id, form);
            } else {
                await API.createMaterialTypes(form);
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
                await API.deleteMaterialTypes(id);
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
        const filtered = materialTypes.filter(
            (item) =>
                item.type_name.toLowerCase().includes(term) ||
                (item.description &&
                    item.description.toLowerCase().includes(term))
        );
        setFilteredData(filtered);
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "MaterialTypes");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blob, "material-types.xlsx");
    };

    return (
        <div className="p-6 space-y-4 bg-white rounded shadow-md max-w-8xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700">
                Data Material Supply Types
            </h2>
            <hr />

            <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    setEditing(null);
                    setShowForm(true);
                }}
            >
                Tambah Material Suplai
            </button>

            <MaterialSupplyForm
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

            <table className="w-full table-auto border border-gray-300 text-sm">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="border p-2 py-3">Tipe Material</th>
                        <th className="border p-2 py-3">Deskripsi</th>
                        <th className="border p-2 py-3 w-[20%]">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr
                            key={item.id}
                            className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                        >
                            <td className="border p-2">{item.type_name}</td>
                            <td className="border p-2">{item.description}</td>
                            <td className="border p-2 flex gap-4 justify-center">
                                <button
                                    onClick={() => {
                                        setEditing(item);
                                        setShowForm(true);
                                    }}
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Jika ingin menggunakan DataTable, cukup aktifkan bagian ini */}
            {/*
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    striped
                    customStyles={customStyles}
                />
            */}
        </div>
    );
}
