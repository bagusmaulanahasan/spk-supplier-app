import Swal from "sweetalert2";
import * as API from "../../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import SupplierForm from "./SupplierForm";
import { useEffect, useState, useMemo } from "react";
import ConfirmDeleteAlert from "@/components/Alerts/ConfirmDelete";
import SubmitAlert from "@/components/Alerts/Submit";

export default function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [materialTypes, setMaterialTypes] = useState([]);

    // Fetch data suppliers
    const fetchData = async () => {
        try {
            const res = await API.getSuppliers();
            setSuppliers(res.data);
            setFilteredData(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch material types dan buat mapping dari id ke nama material
    useEffect(() => {
        API.getMaterialTypes()
            .then((res) => setMaterialTypes(res.data))
            .catch((err) =>
                console.error("Error fetching material types:", err)
            );
    }, []);

    const materialMap = useMemo(() => {
        return materialTypes.reduce((acc, material) => {
            acc[material.id] = material.type_name;
            return acc;
        }, {});
    }, [materialTypes]);

    const handleSubmit = async (form) => {
        try {
            if (editing) {
                await API.updateSupplier(editing.id, form);
            } else {
                await API.createSupplier(form);
            }
            SubmitAlert("success", "Data berhasil disimpan");
            setEditing(null);
            fetchData();
        } catch (err) {
            console.error("Submit error:", err);
            SubmitAlert("error", "Data gagal disimpan");
        }
    };

    const handleDelete = async (id) => {
        ConfirmDeleteAlert(() => API.deleteSupplier(id), fetchData);
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);
        const filtered = suppliers.filter(
            (item) =>
                item.initial.toLowerCase().includes(term) ||
                item.name.toLowerCase().includes(term)
        );
        setFilteredData(filtered);
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blob, "suppliers.xlsx");
    };

    return (
        <div className="p-6 space-y-4 bg-white rounded shadow-md max-w-8xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700">
                Data Alternatif (Supplier)
            </h2>
            <hr />

            <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    setEditing(null);
                    setShowForm(true);
                }}
            >
                Tambah Supplier
            </button>

            <SupplierForm
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
                        <th className="border p-2 py-3 w-[30%]">Material Suplai</th>
                        <th className="border p-2 py-3">Nama</th>
                        <th className="border p-2 py-3 w-[20%]">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {useMemo(() => {
                        const rows = [];
                        // Kelompokkan data berdasarkan material_supply_type_id
                        const grouped = {};
                        filteredData.forEach((item) => {
                            const key = item.material_supply_type_id;
                            if (!grouped[key]) {
                                grouped[key] = [];
                            }
                            grouped[key].push(item);
                        });
                        // Iterasi tiap kelompok material
                        Object.keys(grouped).forEach((materialId) => {
                            const group = grouped[materialId];
                            group.forEach((item, index) => {
                                rows.push(
                                    <tr
                                        key={item.id}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                                    >
                                        {index === 0 && (
                                            <td
                                                className="border p-2 text-center text-lg"
                                                rowSpan={group.length}
                                            >
                                                {materialMap[materialId] ||
                                                    materialId}
                                            </td>
                                        )}
                                        <td className="border p-2">
                                            {item.name}
                                        </td>
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
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            });
                        });
                        return rows;
                    }, [filteredData, materialMap])}
                </tbody>
            </table>
        </div>
    );
}
