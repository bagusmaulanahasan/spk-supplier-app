import { useEffect, useState, useMemo } from "react";
import * as API from "../../api/api";
import SupplierCriteriaValueForm from "./SupplierCriteriaValuesForm";
import SubmitAlert from "@/components/Alerts/Submit";
import Swal from "sweetalert2";
import axios from "axios";

export default function SupplierCriteriaValuesList() {
    const [data, setData] = useState([]);
    const [criteria, setCriteria] = useState({});
    const [materialTypes, setMaterialTypes] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        try {
            const [valuesRes, criteriaRes, materialRes, suppliersRes] =
                await Promise.all([
                    API.getSupplierCriteriaValues(),
                    API.getCriteria(),
                    API.getMaterialTypes(),
                    API.getSuppliers(), // ambil list suppliers dari API
                ]);

            // Map criteria id => name
            const criteriaMap = {};
            criteriaRes.data.forEach((c) => (criteriaMap[c.id] = c.name));

            // Map material id => type_name
            setMaterialTypes(materialRes.data);

            // Map supplier id => name
            const suppliersMap = {};
            suppliersRes.data.forEach((s) => (suppliersMap[s.id] = s.name));

            // Enrich values with criteriaName & supplierName
            const enrichedData = valuesRes.data.map((item) => ({
                ...item,
                criteriaName: criteriaMap[item.criteria_id] || "Unknown",
                supplierName: suppliersMap[item.supplier_id] || "Unknown",
            }));

            setData(enrichedData);
            setFilteredData(enrichedData);
            setCriteria(criteriaMap);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchData();

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                fetchData();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);

    const materialMap = useMemo(() => {
        return materialTypes.reduce((acc, mat) => {
            acc[mat.id] = mat.type_name;
            return acc;
        }, {});
    }, [materialTypes]);

    // Search handler optimized
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);
        if (!term) {
            setFilteredData(data);
            return;
        }

        const filtered = data.filter((item) => {
            const supplierName = (item.supplierName || "").toLowerCase();
            const criteriaName = (item.criteriaName || "").toLowerCase();
            const valueStr = String(item.value || "").toLowerCase();

            return (
                supplierName.includes(term) ||
                criteriaName.includes(term) ||
                valueStr.includes(term)
            );
        });
        setFilteredData(filtered);
    };

    // Submit handler for add/edit
    const handleSubmit = async (form) => {
        try {
            if (editing) {
                await API.updateSupplierCriteriaValue(editing.id, form);
            } else {
                await API.createSupplierCriteriaValue(form);
            }
            SubmitAlert("success", "Data berhasil disimpan");
            setEditing(null);
            setShowForm(false);
            await fetchData();
        } catch (err) {
            console.error("Submit error:", err);
            SubmitAlert("error", "Data gagal disimpan");
        }
    };

    const groupedRows = useMemo(() => {
        const groupedByMaterial = {};

        filteredData.forEach((item) => {
            const matId = item.material_supply_type_id;
            if (!groupedByMaterial[matId]) {
                groupedByMaterial[matId] = {
                    materialName: materialMap[matId] || matId,
                    suppliers: {},
                };
            }

            const suppliers = groupedByMaterial[matId].suppliers;

            if (!suppliers[item.supplier_id]) {
                suppliers[item.supplier_id] = {
                    supplierName: item.supplierName,
                    supplier_id: item.supplier_id,
                    values: {},
                };
            }

            suppliers[item.supplier_id].values[item.criteria_id] = item.value;
        });

        const rows = [];

        Object.entries(groupedByMaterial).forEach(([matId, matData]) => {
            const supplierEntries = Object.entries(matData.suppliers);
            const rowspan = supplierEntries.length;

            supplierEntries.forEach(([_, supplierData], idx) => {
                rows.push(
                    <tr
                        key={`${matId}-${supplierData.supplier_id}`}
                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                    >
                        {idx === 0 && (
                            <td
                                rowSpan={rowspan}
                                className="border p-2 text-lg"
                            >
                                {matData.materialName}
                            </td>
                        )}
                        <td className="border p-2 text-center">
                            {supplierData.supplierName}
                        </td>

                        {Object.keys(criteria).map((cid) => (
                            <td key={cid} className="border p-2 text-center">
                                {supplierData.values[cid] ?? "-"}
                            </td>
                        ))}

                        <td className=" border p-2 flex gap-2 justify-center">
                            <button
                                onClick={() => {
                                    const relatedItems = data.filter(
                                        (d) =>
                                            d.supplier_id ===
                                                supplierData.supplier_id &&
                                            d.material_supply_type_id ===
                                                Number(matId)
                                    );
                                    const editData = {
                                        material_supply_type_id: Number(matId),
                                        supplier_id: supplierData.supplier_id,
                                        values: relatedItems.map((d) => ({
                                            criteria_id: d.criteria_id,
                                            value: d.value,
                                        })),
                                    };
                                    setEditing(editData);
                                    setShowForm(true);
                                }}
                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={async () => {
                                    const confirm = await Swal.fire({
                                        title: "Hapus semua data kriteria supplier ini?",
                                        text: "Seluruh nilai untuk supplier ini akan dihapus!",
                                        icon: "warning",
                                        reverseButtons: true,
                                        showCancelButton: true,
                                        confirmButtonColor: "#ef4444",
                                        cancelButtonText: "Batal",
                                        confirmButtonText: "Ya, hapus!",
                                    });

                                    if (confirm.isConfirmed) {
                                        // filter data berdasarkan supplier dan material saat ini
                                        const toDelete = data.filter(
                                            (d) =>
                                                d.supplier_id ===
                                                    supplierData.supplier_id &&
                                                d.material_supply_type_id ===
                                                    Number(matId)
                                        );

                                        for (let val of toDelete) {
                                            await API.deleteSupplierCriteriaValue(
                                                val.id
                                            );
                                        }

                                        Swal.fire(
                                            "Deleted!",
                                            "Data berhasil dihapus.",
                                            "success"
                                        );
                                        fetchData(); // refresh data setelah hapus
                                    }
                                }}
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                );
            });
        });

        return rows;
    }, [filteredData, materialMap, criteria, data]);

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
                {/* <button
                    onClick={handleExport}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Download Excel
                </button> */}
            </div>

            <table className="w-full table-auto border border-gray-300 text-sm">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="border p-2 py-3">Material Supply</th>
                        <th className="border p-2 py-3">Supplier</th>
                        {Object.entries(criteria).map(([id, name]) => (
                            <th key={id} className="border p-2 py-3">
                                {name}
                            </th>
                        ))}
                        <th className="border p-2 py-3 w-[15%]">Aksi</th>
                    </tr>
                </thead>
                <tbody>{groupedRows}</tbody>
            </table>
        </div>
    );
}
