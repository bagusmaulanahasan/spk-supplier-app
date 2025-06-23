import React, { useEffect, useState, useMemo } from "react";
import {
    getCriteria,
    getSuppliers,
    getSupplierCriteriaValues,
    createResult,
    deleteAllResults,
    getResultByDate,
    getMaterialTypes,
} from "../../api/api";
import { Card, CardContent } from "@/components/ui/card";
import Swal from "sweetalert2";

const SAWCalculation = () => {
    const [criteria, setCriteria] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplierCriteriaValues, setSupplierCriteriaValues] = useState([]);
    const [results, setResults] = useState({});
    const [lastUpdate, setLastUpdate] = useState();
    const [materialTypes, setMaterialTypes] = useState([]);

    // Ambil data dari API
    useEffect(() => {
        const fetchData = async () => {
            const [
                criteriaRes,
                lastUpdateRes,
                suppliersRes,
                scvRes,
                materialTypesRes,
            ] = await Promise.all([
                getCriteria(),
                getResultByDate(),
                getSuppliers(),
                getSupplierCriteriaValues(),
                getMaterialTypes(),
            ]);
            setCriteria(criteriaRes.data);
            setLastUpdate(lastUpdateRes.data[0]);
            setSuppliers(suppliersRes.data);
            setSupplierCriteriaValues(scvRes.data);
            setMaterialTypes(materialTypesRes.data);
        };
        fetchData();
    }, []);

    // Lakukan perhitungan SAW jika data sudah lengkap
    useEffect(() => {
        if (
            criteria.length &&
            suppliers.length &&
            supplierCriteriaValues.length
        ) {
            calculateSAW();
        }
    }, [criteria, suppliers, supplierCriteriaValues]);

    // Kelompokan supplier berdasarkan material_supply_type_id dan hitung perhitungan SAW tiap kelompok
    const calculateSAW = () => {
        // Grouping suppliers per material type
        const supplierGroups = {};
        suppliers.forEach((sup) => {
            const matId = sup.material_supply_type_id;
            if (!supplierGroups[matId]) {
                supplierGroups[matId] = [];
            }
            supplierGroups[matId].push(sup);
        });

        const resultsByMaterial = {};

        Object.keys(supplierGroups).forEach((matId) => {
            const groupSuppliers = supplierGroups[matId];
            const normalized = {};

            criteria.forEach((crit) => {
                // Ambil nilai kriteria untuk supplier dalam kelompok ini
                const critValues = groupSuppliers.map((sup) => {
                    const valObj = supplierCriteriaValues.find(
                        (scv) =>
                            scv.supplier_id === sup.id &&
                            scv.criteria_id === crit.id
                    );
                    return valObj ? valObj.value : 0;
                });
                const max = Math.max(...critValues);
                const min = Math.min(...critValues);

                groupSuppliers.forEach((sup) => {
                    const valObj = supplierCriteriaValues.find(
                        (scv) =>
                            scv.supplier_id === sup.id &&
                            scv.criteria_id === crit.id
                    );
                    const rawValue = valObj ? valObj.value : 0;
                    let normalizedValue = 0;
                    if (crit.type === "benefit") {
                        normalizedValue = max > 0 ? rawValue / max : 0;
                    } else {
                        normalizedValue = rawValue > 0 ? min / rawValue : 0;
                    }
                    if (!normalized[sup.id]) normalized[sup.id] = {};
                    normalized[sup.id][crit.id] = normalizedValue;
                });
            });

            const scored = groupSuppliers.map((sup) => {
                let totalScore = 0;
                criteria.forEach((crit) => {
                    totalScore +=
                        normalized[sup.id][crit.id] * parseFloat(crit.weight);
                });
                return { supplier: sup, score: totalScore };
            });

            scored.sort((a, b) => b.score - a.score);
            const ranked = scored.map((item, index) => ({
                ...item,
                rank: index + 1,
            }));
            resultsByMaterial[matId] = ranked;
        });

        setResults(resultsByMaterial);
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    // const sendResultsToAPI = async (resultsByMaterial) => {
    //     try {
    //         Toast.fire({
    //             icon: "success",
    //             title: "Update data successfully",
    //         });
    //         // Flatten hasil per material untuk payload ke API
    //         const payload = [];
    //         Object.keys(resultsByMaterial).forEach((matId) => {
    //             resultsByMaterial[matId].forEach((item) => {
    //                 payload.push({
    //                     supplier_id: item.supplier.id,
    //                     material_supply_type_id:
    //                         item.supplier.material_supply_type_id,
    //                     score: item.score,
    //                     ranking: item.rank,
    //                 });
    //             });
    //         });
    //         const response = await createResult(payload);
    //         console.log(payload);
    //     } catch (error) {
    //         Toast.fire({
    //             icon: "error",
    //             title: "Update data failed",
    //         });
    //         console.error("Gagal mengirim hasil ke API:", error);
    //     }
    // };

    const sendResultsToAPI = async (resultsByMaterial) => {
        try {
            // Hapus semua data results terlebih dahulu
            await deleteAllResults();

            // Flatten hasil per material untuk payload ke API
            const payload = [];
            Object.keys(resultsByMaterial).forEach((matId) => {
                resultsByMaterial[matId].forEach((item) => {
                    payload.push({
                        supplier_id: item.supplier.id,
                        material_supply_type_id:
                            item.supplier.material_supply_type_id,
                        score: item.score,
                        ranking: item.rank,
                    });
                });
            });

            // Kirim data baru ke API
            const response = await createResult(payload);

            Toast.fire({
                icon: "success",
                title: "Update data berhasil",
            });

            console.log(payload);
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Update data gagal",
            });
            console.error("Gagal mengirim hasil ke API:", error);
        }
    };

    // Mapping material_supply_type_id ke nama material
    const materialMapping = {};
    materialTypes.forEach((mat) => {
        materialMapping[mat.id] = mat.type_name;
    });

    // --- BAGIAN MATRIKS NILAI KESELURUHAN DIBAGI PER MATERIAL ---
    // Kelompokkan supplier berdasarkan material_supply_type_id untuk matriks nilai
    const groupedSuppliers = useMemo(() => {
        const groups = {};
        suppliers.forEach((sup) => {
            const matId = sup.material_supply_type_id;
            if (!groups[matId]) groups[matId] = [];
            groups[matId].push(sup);
        });
        return groups;
    }, [suppliers]);

    return (
        <div className="p-6 space-y-4 flex flex-col bg-white rounded shadow-md max-w-8xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700">
                Data Hasil Keputusan (Metode SAW)
            </h2>
            <hr />
            <button
                onClick={() => sendResultsToAPI(results)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-fit"
            >
                Update Data
            </button>
            <span className="text-sm">Update terakhir : {lastUpdate}</span>

            <hr />
            <h2 className="text-2xl font-semibold text-blue-700/80">
                Matriks Nilai
            </h2>
            <hr />

            {/* Matriks Nilai Keseluruhan Per Material */}
            {Object.keys(groupedSuppliers).map((matId) => (
                <Card key={matId}>
                    <CardContent>
                        <h2 className="text-xl font-bold mb-4">
                            Matriks Nilai Keseluruhan untuk Material:{" "}
                            {materialMapping[matId] || matId}
                        </h2>
                        <table className="w-full table-auto border border-gray-300 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">Supplier</th>
                                    {criteria.map((crit) => (
                                        <th
                                            key={crit.id}
                                            className="border p-2"
                                        >
                                            {crit.name} ({crit.weight})
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {groupedSuppliers[matId].map((sup) => (
                                    <tr
                                        key={sup.id}
                                        className="odd:bg-white even:bg-gray-50"
                                    >
                                        <td className="border p-2">
                                            {sup.name}
                                        </td>
                                        {criteria.map((crit) => {
                                            const val =
                                                supplierCriteriaValues.find(
                                                    (scv) =>
                                                        scv.supplier_id ===
                                                            sup.id &&
                                                        scv.criteria_id ===
                                                            crit.id
                                                );
                                            return (
                                                <td
                                                    key={crit.id}
                                                    className="border p-2"
                                                >
                                                    {val ? val.value : "-"}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            ))}

            <hr />
            <h2 className="text-2xl font-semibold text-blue-700/80">
                Hasil Perhitungan
            </h2>
            <hr />
            {/* Hasil Perhitungan SAW Per Material */}
            {Object.keys(results).map((matId) => (
                <Card key={matId}>
                    <CardContent>
                        <h2 className="text-xl font-bold mb-4">
                            Hasil Perhitungan SAW untuk Material:{" "}
                            {materialMapping[matId] || matId}
                        </h2>
                        <table className="w-full table-auto border border-gray-300 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">Peringkat</th>
                                    <th className="border p-2">Supplier</th>
                                    <th className="border p-2">Total Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results[matId].map((res) => (
                                    <tr
                                        key={res.supplier.id}
                                        className="odd:bg-white even:bg-gray-50"
                                    >
                                        <td className="border p-2">
                                            {res.rank}
                                        </td>
                                        <td className="border p-2">
                                            {res.supplier.name}
                                        </td>
                                        <td className="border p-2">
                                            {res.score.toFixed(3)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            ))}

            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-4">Catatan</h2>
                    <hr className="my-4" />
                    <div className="flex flex-wrap gap-8">
                        <div className="mb-4">
                            <h3 className="font-semibold my-2">
                                Daftar Supplier:
                            </h3>
                            <ol className="list-decimal ml-6">
                                {suppliers.map((sup) => (
                                    <li key={sup.id}>{sup.name}</li>
                                ))}
                            </ol>
                        </div>
                        <div>
                            <h3 className="font-semibold my-2">
                                Deskripsi Kriteria:
                            </h3>
                            <ol className=" list-decimal ml-6">
                                {criteria.map((crit) => (
                                    <li key={crit.id}>
                                        {crit.name} ({crit.weight}):{" "}
                                        {crit.description}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SAWCalculation;
