// import React, { useEffect, useState, useMemo, useRef } from "react";
// import Chart from "chart.js/auto";
// import { getResults, getSuppliers, getMaterialTypes } from "@/api/api";
// import { Card, CardContent } from "@/components/ui/card";
// import Swal from "sweetalert2";

// // Komponen Bar Chart per Material
// const MaterialBarChart = ({ materialName, groupResults, suppliers }) => {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         if (!canvasRef.current || groupResults.length === 0) return;

//         const ctx = canvasRef.current.getContext("2d");

//         // Kita anggap bahwa nilai "ranking" yang lebih kecil adalah yang terbaik.
//         // Untuk visualisasi, kita "inversi" ranking:
//         // (maxRank - ranking + 1) sehingga supplier terbaik (ranking=1) akan tampil dengan nilai bar tertinggi.
//         const ranks = groupResults.map((r) => r.ranking);
//         const maxRank = Math.max(...ranks);
//         const chartValues = groupResults.map((r) => maxRank - r.ranking + 1);
//         const labels = groupResults.map((r) => {
//             // Cari supplier berdasarkan supplier_id
//             const sup = suppliers.find((s) => s.id === r.supplier_id);
//             return sup ? sup.name : `Supplier ${r.supplier_id}`;
//         });

//         const backgroundColors = [
//             "rgba(255, 99, 132, 0.5)",
//             "rgba(75, 192, 192, 0.5)",
//             "rgba(54, 162, 235, 0.5)",
//             "rgba(255, 159, 64, 0.5)",
//             "rgba(100, 255, 218, 0.5)",
//             "rgba(255, 120, 220, 0.5)",
//             "rgba(255, 206, 86, 0.5)",
//             "rgba(153, 102, 255, 0.5)",
//         ];
//         const borderColors = backgroundColors.map((color) =>
//             color.replace("0.5", "1")
//         );

//         const myChart = new Chart(ctx, {
//             type: "bar",
//             data: {
//                 labels: labels,
//                 datasets: [
//                     {
//                         label: `Ranking Supplier (diinversi) untuk ${materialName}`,
//                         data: chartValues,
//                         backgroundColor: backgroundColors.slice(
//                             0,
//                             labels.length
//                         ),
//                         borderColor: borderColors.slice(0, labels.length),
//                         borderWidth: 1,
//                     },
//                 ],
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         ticks: { stepSize: 1 },
//                     },
//                 },
//             },
//         });

//         return () => {
//             myChart.destroy();
//         };
//     }, [groupResults, materialName, suppliers]);

//     return <canvas ref={canvasRef} />;
// };

// const BarChartResponsive = () => {
//     const [results, setResults] = useState([]);
//     const [suppliers, setSuppliers] = useState([]);
//     const [materialTypes, setMaterialTypes] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [resultsRes, suppliersRes, materialTypesRes] =
//                     await Promise.all([
//                         getResults(),
//                         getSuppliers(),
//                         getMaterialTypes(),
//                     ]);
//                 setResults(resultsRes.data);
//                 setSuppliers(suppliersRes.data);
//                 setMaterialTypes(materialTypesRes.data);
//             } catch (error) {
//                 console.error("Gagal mengambil data chart:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     // Kelompokkan hasil berdasarkan material_supply_type_id
//     // Hasil yang dikembalikan dari API mungkin mengandung duplikasi untuk supplier yang sama.
//     // Kita akan mengelompokkan per material, lalu dalam setiap material kita grup berdasarkan supplier
//     // dan memilih hasil dengan ranking terbaik (nilai ranking terkecil).
//     const resultsByMaterial = useMemo(() => {
//         const groups = {};
//         results.forEach((res) => {
//             const matId = res.material_supply_type_id.toString();
//             if (!groups[matId]) groups[matId] = [];
//             groups[matId].push(res);
//         });

//         // Untuk setiap kelompok material, grupkan lagi berdasarkan supplier_id
//         const bestPerSupplierByMaterial = {};
//         Object.keys(groups).forEach((matId) => {
//             const group = groups[matId];
//             const bestForSupplier = {};
//             group.forEach((res) => {
//                 const supId = res.supplier_id;
//                 if (
//                     !bestForSupplier[supId] ||
//                     res.ranking < bestForSupplier[supId].ranking
//                 ) {
//                     bestForSupplier[supId] = res;
//                 }
//             });
//             // Ubah hasil pengelompokan ke array dan urutkan berdasarkan ranking (ascending)
//             bestPerSupplierByMaterial[matId] = Object.values(
//                 bestForSupplier
//             ).sort((a, b) => a.ranking - b.ranking);
//         });
//         return bestPerSupplierByMaterial;
//     }, [results]);

//     // Buat mapping dari material_supply_type_id ke nama material
//     const materialMapping = useMemo(() => {
//         const mapping = {};
//         materialTypes.forEach((mat) => {
//             mapping[mat.id.toString()] = mat.type_name;
//         });
//         return mapping;
//     }, [materialTypes]);

//     return (
//         <div className="p-6 space-y-6 flex flex-col bg-white rounded shadow-md max-w-8xl mx-auto my-20">
//             <h2 className="text-2xl font-semibold text-gray-700">
//                 Ranking Supplier Per Material (Berdasarkan API Results)
//             </h2>
//             {Object.keys(resultsByMaterial).length === 0 && (
//                 <p>Tidak ada data hasil.</p>
//             )}
//             {Object.keys(resultsByMaterial).map((matId) => (
//                 <Card key={matId}>
//                     <CardContent>
//                         <div className="flex flex-col gap-10">
//                             <h2 className="text-xl font-bold mb-4">
//                                 Material: {materialMapping[matId] || matId}
//                             </h2>
//                             {/* Tampilkan Bar Chart untuk ranking per material */}
//                             <div className="h-72">
//                                 <MaterialBarChart
//                                     materialName={
//                                         materialMapping[matId] || matId
//                                     }
//                                     groupResults={resultsByMaterial[matId]}
//                                     suppliers={suppliers}
//                                 />
//                             </div>
//                             {/* Tampilkan tabel ranking per material */}
//                             <table className="w-full table-auto border border-gray-300 text-sm mb-6">
//                                 <thead className="bg-gray-100">
//                                     <tr>
//                                         <th className="border p-2">
//                                             Peringkat
//                                         </th>
//                                         <th className="border p-2">Supplier</th>
//                                         <th className="border p-2">Score</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {resultsByMaterial[matId].map((res) => {
//                                         const sup = suppliers.find(
//                                             (s) => s.id === res.supplier_id
//                                         );
//                                         return (
//                                             <tr
//                                                 key={res.id}
//                                                 className="odd:bg-white even:bg-gray-50"
//                                             >
//                                                 <td className="border p-2">
//                                                     {res.ranking}
//                                                 </td>
//                                                 <td className="border p-2">
//                                                     {sup
//                                                         ? sup.name
//                                                         : `Supplier ${res.supplier_id}`}
//                                                 </td>
//                                                 <td className="border p-2">
//                                                     {parseFloat(
//                                                         res.score
//                                                     ).toFixed(2)}
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </CardContent>
//                 </Card>
//             ))}
//         </div>
//     );
// };

// export default BarChartResponsive;

import React, { useEffect, useState, useMemo, useRef } from "react";
import Chart from "chart.js/auto";
import { getResults, getSuppliers, getMaterialTypes } from "@/api/api";
import { Card, CardContent } from "@/components/ui/card";
import Swal from "sweetalert2";

// Komponen Bar Chart per Material
const MaterialBarChart = ({ materialName, groupResults, suppliers }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || groupResults.length === 0) return;

        const ctx = canvasRef.current.getContext("2d");

        // Gunakan nilai score (dari API) secara langsung untuk chart
        const chartValues = groupResults.map((r) => parseFloat(r.score));
        const labels = groupResults.map((r) => {
            const sup = suppliers.find((s) => s.id === r.supplier_id);
            return sup ? sup.name : `Supplier ${r.supplier_id}`;
        });

        const backgroundColors = [
            "rgba(255, 99, 132, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(100, 255, 218, 0.5)",
            "rgba(255, 120, 220, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(153, 102, 255, 0.5)",
        ];
        const borderColors = backgroundColors.map((color) =>
            color.replace("0.5", "1")
        );

        const myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Score Supplier untuk ${materialName}`,
                        data: chartValues,
                        backgroundColor: backgroundColors.slice(
                            0,
                            labels.length
                        ),
                        borderColor: borderColors.slice(0, labels.length),
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        // Tampilkan tick dengan dua angka desimal
                        ticks: {
                            callback: (value) => parseFloat(value).toFixed(2),
                        },
                    },
                },
            },
        });

        return () => {
            myChart.destroy();
        };
    }, [groupResults, materialName, suppliers]);

    return <canvas ref={canvasRef} />;
};

const BarChartResponsive = () => {
    const [results, setResults] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [materialTypes, setMaterialTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resultsRes, suppliersRes, materialTypesRes] =
                    await Promise.all([
                        getResults(),
                        getSuppliers(),
                        getMaterialTypes(),
                    ]);
                setResults(resultsRes.data);
                setSuppliers(suppliersRes.data);
                setMaterialTypes(materialTypesRes.data);
            } catch (error) {
                console.error("Gagal mengambil data chart:", error);
            }
        };

        fetchData();
    }, []);

    // Kelompokkan hasil berdasarkan material_supply_type_id
    // Hasil API mungkin mengandung duplikasi untuk supplier yang sama.
    // Kita kelompokkan per material, lalu dalam tiap material pilih hasil terbaik per supplier (dengan ranking terkecil).
    const resultsByMaterial = useMemo(() => {
        const groups = {};
        results.forEach((res) => {
            const matId = res.material_supply_type_id.toString();
            if (!groups[matId]) groups[matId] = [];
            groups[matId].push(res);
        });

        const bestPerSupplierByMaterial = {};
        Object.keys(groups).forEach((matId) => {
            const group = groups[matId];
            const bestForSupplier = {};
            group.forEach((res) => {
                const supId = res.supplier_id;
                if (
                    !bestForSupplier[supId] ||
                    res.ranking < bestForSupplier[supId].ranking
                ) {
                    bestForSupplier[supId] = res;
                }
            });
            bestPerSupplierByMaterial[matId] = Object.values(
                bestForSupplier
            ).sort((a, b) => a.ranking - b.ranking);
        });
        return bestPerSupplierByMaterial;
    }, [results]);

    // Mapping material_supply_type_id ke nama material
    const materialMapping = useMemo(() => {
        const mapping = {};
        materialTypes.forEach((mat) => {
            mapping[mat.id.toString()] = mat.type_name;
        });
        return mapping;
    }, [materialTypes]);

    return (
        <div className="p-6 space-y-6 flex flex-col bg-white rounded shadow-md max-w-8xl mx-auto my-20">
            <h2 className="text-2xl font-semibold text-gray-700">
                Ranking Supplier Per Material
            </h2>
            {Object.keys(resultsByMaterial).length === 0 && (
                <p>Tidak ada data hasil.</p>
            )}
            {Object.keys(resultsByMaterial).map((matId) => (
                <Card key={matId}>
                    <CardContent>
                        <div className="flex flex-col gap-10">
                            <h2 className="text-xl font-bold mb-4">
                                Material: {materialMapping[matId] || matId}
                            </h2>
                            {/* Tampilkan Bar Chart untuk ranking per material (nilai score) */}
                            <div className="h-72">
                                <MaterialBarChart
                                    materialName={
                                        materialMapping[matId] || matId
                                    }
                                    groupResults={resultsByMaterial[matId]}
                                    suppliers={suppliers}
                                />
                            </div>
                            {/* Tampilkan tabel ranking per material */}
                            <table className="w-full table-auto border border-gray-300 text-sm mb-6">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border p-2">
                                            Peringkat
                                        </th>
                                        <th className="border p-2">Supplier</th>
                                        <th className="border p-2">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultsByMaterial[matId].map((res) => {
                                        const sup = suppliers.find(
                                            (s) => s.id === res.supplier_id
                                        );
                                        return (
                                            <tr
                                                key={res.id}
                                                className="odd:bg-white even:bg-gray-50"
                                            >
                                                <td className="border p-2">
                                                    {res.ranking}
                                                </td>
                                                <td className="border p-2">
                                                    {sup
                                                        ? sup.name
                                                        : `Supplier ${res.supplier_id}`}
                                                </td>
                                                <td className="border p-2">
                                                    {parseFloat(
                                                        res.score
                                                    ).toFixed(2)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default BarChartResponsive;
