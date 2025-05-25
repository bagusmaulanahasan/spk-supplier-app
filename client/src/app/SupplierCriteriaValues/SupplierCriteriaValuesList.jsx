import { useEffect, useState, useMemo } from "react";
import * as API from "../../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import SupplierCriteriaValueForm from "./SupplierCriteriaValuesForm";
import Swal from "sweetalert2";

export default function SupplierCriteriaValuesList() {
    const [data, setData] = useState([]);
    const [suppliers, setSuppliers] = useState({});
    const [criteria, setCriteria] = useState({});
    const [materialTypes, setMaterialTypes] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Fetch nilai supplier criteria, supplier, dan criteria secara bersamaan
    const fetchData = async () => {
        try {
            const [valuesRes, supplierRes, criteriaRes] = await Promise.all([
                API.getSupplierCriteriaValues(),
                API.getSuppliers(),
                API.getCriteria(),
            ]);

            // Buat mapping untuk supplier dan criteria
            const supplierMap = {};
            supplierRes.data.forEach((s) => (supplierMap[s.id] = s.name));
            const criteriaMap = {};
            criteriaRes.data.forEach((c) => (criteriaMap[c.id] = c.name));

            // Enrich data dengan properti supplierName dan criteriaName
            const enrichedData = valuesRes.data.map((item) => ({
                ...item,
                supplierName: supplierMap[item.supplier_id] || "Unknown",
                criteriaName: criteriaMap[item.criteria_id] || "Unknown",
            }));

            setData(enrichedData);
            setFilteredData(enrichedData);
            setSuppliers(supplierMap);
            setCriteria(criteriaMap);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch data material supply types
    useEffect(() => {
        API.getMaterialTypes()
            .then((res) => setMaterialTypes(res.data))
            .catch((err) =>
                console.error("Error fetching material types:", err)
            );
    }, []);

    // Mapping dari material_supply_type_id ke nama material
    const materialMap = useMemo(() => {
        return materialTypes.reduce((acc, mat) => {
            acc[mat.id] = mat.type_name;
            return acc;
        }, {});
    }, [materialTypes]);

    const handleSubmit = async (form) => {
        try {
            if (editing) {
                await API.updateSupplierCriteriaValue(editing.id, form);
            } else {
                await API.createSupplierCriteriaValue(form);
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
                await API.deleteSupplierCriteriaValue(id);
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
        const filtered = data.filter(
            (item) =>
                (item.supplierName || "").toLowerCase().includes(term) ||
                (item.criteriaName || "").toLowerCase().includes(term) ||
                String(item.value || "")
                    .toLowerCase()
                    .includes(term)
        );
        setFilteredData(filtered);
    };

    const handleExport = () => {
        const exportData = filteredData.map(
            ({ id, supplierName, criteriaName, value }) => ({
                ID: id,
                Supplier: supplierName,
                Criteria: criteriaName,
                Value: value,
            })
        );
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "SupplierCriteriaValues"
        );
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blob, "supplier_criteria_values.xlsx");
    };

    return (
        <div className="p-6 space-y-4 bg-white rounded shadow-md max-w-8xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700">
                Penilaian Alternatif (Supplier)
            </h2>
            <hr />
            <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    setEditing(null);
                    setShowForm(true);
                }}
            >
                Tambah Penilaian Alternatif
            </button>
            <SupplierCriteriaValueForm
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
                        <th className="border p-2 py-3">Material Suplai</th>
                        <th className="border p-2 py-3">
                            Alternatif (Suppliers)
                        </th>
                        <th className="border p-2 py-3">Kriteria</th>
                        <th className="border p-2 py-3">Nilai</th>
                        <th className="border p-2 py-3 w-[20%]">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {useMemo(() => {
                        const rows = [];
                        // Kelompokkan data berdasarkan material_supply_type_id
                        const groupedByMaterial = {};
                        filteredData.forEach((item) => {
                            const key = item.material_supply_type_id;
                            if (!groupedByMaterial[key])
                                groupedByMaterial[key] = [];
                            groupedByMaterial[key].push(item);
                        });
                        // Iterasi tiap kelompok material
                        Object.keys(groupedByMaterial).forEach((materialId) => {
                            const materialGroup = groupedByMaterial[materialId];
                            const totalRowsForMaterial = materialGroup.length;
                            // Kelompokkan lagi berdasarkan alternatif (supplierName) di dalam materialGroup
                            const groupedBySupplier = {};
                            materialGroup.forEach((item) => {
                                const supplierKey = item.supplierName;
                                if (!groupedBySupplier[supplierKey])
                                    groupedBySupplier[supplierKey] = [];
                                groupedBySupplier[supplierKey].push(item);
                            });
                            // Ubah groupedBySupplier ke array untuk mendapatkan index supplierGroup
                            const supplierGroupsArr =
                                Object.entries(groupedBySupplier);
                            supplierGroupsArr.forEach(
                                (
                                    [supplierName, itemsForSupplier],
                                    supplierIndex
                                ) => {
                                    itemsForSupplier.forEach((item, idx) => {
                                        rows.push(
                                            <tr
                                                key={item.id}
                                                className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                                            >
                                                {/* Sel Material Suplai hanya tampil di baris pertama dari kelompok material
                          (pada kelompok supplier pertama, baris pertama) */}
                                                {supplierIndex === 0 &&
                                                    idx === 0 && (
                                                        <td
                                                            className="border p-2"
                                                            rowSpan={
                                                                totalRowsForMaterial
                                                            }
                                                        >
                                                            {materialMap[
                                                                materialId
                                                            ] || materialId}
                                                        </td>
                                                    )}
                                                {/* Sel Alternatif (Suppliers) tampil di baris pertama masing-masing kelompok supplier */}
                                                {idx === 0 && (
                                                    <td
                                                        className="border p-2"
                                                        rowSpan={
                                                            itemsForSupplier.length
                                                        }
                                                    >
                                                        {supplierName}
                                                    </td>
                                                )}
                                                <td className="border p-2">
                                                    {item.criteriaName}
                                                </td>
                                                <td className="border p-2">
                                                    {item.value}
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
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    });
                                }
                            );
                        });
                        return rows;
                    }, [filteredData, materialMap])}
                </tbody>
            </table>
        </div>
    );
}
