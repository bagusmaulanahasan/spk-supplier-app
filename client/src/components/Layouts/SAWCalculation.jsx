import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    getCriteria,
    getSuppliers,
    getSupplierCriteriaValues,
} from "../../api/api";
import { Card, CardContent } from "@/components/ui/card";

const SAWCalculation = () => {
    const [criteria, setCriteria] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplierCriteriaValues, setSupplierCriteriaValues] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [criteriaRes, suppliersRes, scvRes] = await Promise.all([
                getCriteria(),
                getSuppliers(),
                getSupplierCriteriaValues(),
            ]);
            setCriteria(criteriaRes.data);
            setSuppliers(suppliersRes.data);
            setSupplierCriteriaValues(scvRes.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (
            criteria.length &&
            suppliers.length &&
            supplierCriteriaValues.length
        ) {
            calculateSAW();
        }
    }, [criteria, suppliers, supplierCriteriaValues]);

    const calculateSAW = () => {
        const normalized = {};

        criteria.forEach((crit) => {
            const critValues = suppliers.map((sup) => {
                const val = supplierCriteriaValues.find(
                    (scv) =>
                        scv.supplier_id === sup.id &&
                        scv.criteria_id === crit.id
                );
                return val ? val.value : 0;
            });

            const max = Math.max(...critValues);
            const min = Math.min(...critValues);

            suppliers.forEach((sup) => {
                const val = supplierCriteriaValues.find(
                    (scv) =>
                        scv.supplier_id === sup.id &&
                        scv.criteria_id === crit.id
                );
                const rawValue = val ? val.value : 0;

                const normalizedValue =
                    crit.type === "benefit" ? rawValue / max : min / rawValue;

                if (!normalized[sup.id]) normalized[sup.id] = {};
                normalized[sup.id][crit.id] = normalizedValue;
            });
        });

        const scored = suppliers.map((sup) => {
            let totalScore = 0;
            criteria.forEach((crit) => {
                totalScore +=
                    normalized[sup.id][crit.id] * parseFloat(crit.weight);
            });
            return { supplier: sup, score: totalScore };
        });

        scored.sort((a, b) => b.score - a.score);

        // Tambahkan peringkat dan simpan ke state
        const ranked = scored.map((item, index) => ({
            ...item,
            rank: index + 1,
        }));
        setResults(ranked);

        // Kirim ke API
        // sendResultsToAPI(ranked);
    };

    const sendResultsToAPI = async (results) => {
        try {
            const payload = results.map((item) => ({
                supplier_id: item.supplier.id,
                score: item.score,
                ranking: item.rank,
            }));

            const response = await axios.post(
                "http://localhost:3000/api/results",
                payload
            );

            console.log("Hasil berhasil dikirim ke API:", response.data);
        } catch (error) {
            console.error("Gagal mengirim hasil ke API:", error);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <button
                onClick={() => sendResultsToAPI(results)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            >
                Perbaharui Data
            </button>

            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-4">
                        Matriks Nilai Alternatif (Supplier)
                    </h2>
                    <table className="w-full table-auto border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Supplier</th>
                                {criteria.map((crit) => (
                                    <th key={crit.id} className="border p-2">
                                        {crit.name} ({crit.weight})
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((sup) => (
                                <tr
                                    key={sup.id}
                                    className="odd:bg-white even:bg-gray-50"
                                >
                                    <td className="border p-2">
                                        {sup.initial}
                                    </td>
                                    {criteria.map((crit) => {
                                        const val = supplierCriteriaValues.find(
                                            (scv) =>
                                                scv.supplier_id === sup.id &&
                                                scv.criteria_id === crit.id
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

            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-4">
                        Hasil Perhitungan SAW
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
                            {results.map((res) => (
                                <tr
                                    key={res.supplier.id}
                                    className="odd:bg-white even:bg-gray-50"
                                >
                                    <td className="border p-2">{res.rank}</td>
                                    <td className="border p-2">
                                        {res.supplier.initial}
                                    </td>
                                    <td className="border p-2">
                                        {res.score.toFixed(4)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-4">Catatan</h2>
                    <div className="mb-4">
                        <h3 className="font-semibold">Daftar Supplier:</h3>
                        <ul className="list-disc ml-6">
                            {suppliers.map((sup) => (
                                <li key={sup.id}>
                                    {sup.initial}: {sup.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Deskripsi Kriteria:</h3>
                        <ul className="list-disc ml-6">
                            {criteria.map((crit) => (
                                <li key={crit.id}>
                                    {crit.name} ({crit.weight}):{" "}
                                    {crit.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SAWCalculation;


// === TERBARU ===


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//     getCriteria,
//     getSuppliers,
//     getSupplierCriteriaValues,
// } from "../../api/api";
// import { Card, CardContent } from "@/components/ui/card";

// const SAWCalculation = () => {
//     const [criteria, setCriteria] = useState([]);
//     const [suppliers, setSuppliers] = useState([]);
//     const [supplierCriteriaValues, setSupplierCriteriaValues] = useState([]);

//     const [dates, setDates] = useState([]);
//     const [selectedDate, setSelectedDate] = useState("");
//     let [results, setResults] = useState([]);

//     // Ambil daftar kriteria, suppliers, dan nilai kriteria supplier dari API
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [criteriaRes, suppliersRes, scvRes] = await Promise.all([
//                     getCriteria(),
//                     getSuppliers(),
//                     getSupplierCriteriaValues(),
//                 ]);
//                 setCriteria(criteriaRes.data);
//                 setSuppliers(suppliersRes.data);
//                 setSupplierCriteriaValues(scvRes.data);
//             } catch (error) {
//                 console.error("Gagal fetch data kriteria/supplier:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     // Ambil daftar tanggal hasil perhitungan dari backend
//     useEffect(() => {
//         const fetchDates = async () => {
//             try {
//                 const res = await axios.get(
//                     "http://localhost:3000/api/results/dates"
//                 );
//                 setDates(res.data);
//                 if (res.data.length > 0) {
//                     setSelectedDate(res.data[0]); // default ke tanggal terbaru
//                 }
//             } catch (error) {
//                 console.error("Gagal fetch dates:", error);
//             }
//         };
//         fetchDates();
//     }, []);

//     // Fetch hasil SAW dari backend berdasarkan tanggal yang dipilih
//     useEffect(() => {
//         if (!selectedDate) return;

//         const fetchResults = async () => {
//             try {
//                 const res = await axios.get(
//                     `http://localhost:3000/api/results?date=${encodeURIComponent(
//                         selectedDate
//                     )}`
//                 );
//                 setResults(res.data);
//             } catch (error) {
//                 console.error("Gagal fetch results:", error);
//             }
//         };
//         fetchResults();
//     }, [selectedDate]);

//     // Fungsi hitung SAW dari data kriteria dan supplierCriteriaValues
//     // const calculateSAW = () => {
//     //     if (
//     //         !criteria.length ||
//     //         !suppliers.length ||
//     //         !supplierCriteriaValues.length
//     //     )
//     //         return;

//     //     const normalized = {};

//     //     criteria.forEach((crit) => {
//     //         const critValues = suppliers.map((sup) => {
//     //             const val = supplierCriteriaValues.find(
//     //                 (scv) =>
//     //                     scv.supplier_id === sup.id &&
//     //                     scv.criteria_id === crit.id
//     //             );
//     //             return val ? val.value : 0;
//     //         });

//     //         const max = Math.max(...critValues);
//     //         const min = Math.min(...critValues);

//     //         suppliers.forEach((sup) => {
//     //             const val = supplierCriteriaValues.find(
//     //                 (scv) =>
//     //                     scv.supplier_id === sup.id &&
//     //                     scv.criteria_id === crit.id
//     //             );
//     //             const rawValue = val ? val.value : 0;

//     //             const normalizedValue =
//     //                 crit.type === "benefit" ? rawValue / max : min / rawValue;

//     //             if (!normalized[sup.id]) normalized[sup.id] = {};
//     //             normalized[sup.id][crit.id] = normalizedValue;
//     //         });
//     //     });

//     //     const scored = suppliers.map((sup) => {
//     //         let totalScore = 0;
//     //         criteria.forEach((crit) => {
//     //             totalScore +=
//     //                 normalized[sup.id][crit.id] * parseFloat(crit.weight);
//     //         });
//     //         return { supplier: sup, score: totalScore };
//     //     });

//     //     scored.sort((a, b) => b.score - a.score);

//     //     // Tambahkan peringkat
//     //     const ranked = scored.map((item, index) => ({
//     //         ...item,
//     //         rank: index + 1,
//     //     }));

//     //     setResults(ranked);
//     // };

//     useEffect(() => {
//         if (
//             criteria.length &&
//             suppliers.length &&
//             supplierCriteriaValues.length
//         ) {
//             calculateSAW();
//         }
//     }, [supplierCriteriaValues]);

//     const calculateSAW = () => {
//         results = [];
//         const normalized = {};

//         criteria.forEach((crit) => {
//             const critValues = suppliers.map((sup) => {
//                 const val = supplierCriteriaValues.find(
//                     (scv) =>
//                         scv.supplier_id === sup.id &&
//                         scv.criteria_id === crit.id
//                 );
//                 return val ? val.value : 0;
//             });

//             const max = Math.max(...critValues);
//             const min = Math.min(...critValues);

//             suppliers.forEach((sup) => {
//                 const val = supplierCriteriaValues.find(
//                     (scv) =>
//                         scv.supplier_id === sup.id &&
//                         scv.criteria_id === crit.id
//                 );
//                 const rawValue = val ? val.value : 0;

//                 const normalizedValue =
//                     crit.type === "benefit" ? rawValue / max : min / rawValue;

//                 if (!normalized[sup.id]) normalized[sup.id] = {};
//                 normalized[sup.id][crit.id] = normalizedValue;
//             });
//         });

//         const scored = suppliers.map((sup) => {
//             let totalScore = 0;
//             criteria.forEach((crit) => {
//                 totalScore +=
//                     normalized[sup.id][crit.id] * parseFloat(crit.weight);
//             });
//             return { supplier: sup, score: totalScore };
//         });

//         scored.sort((a, b) => b.score - a.score);

//         // Tambahkan peringkat dan simpan ke state
//         const ranked = scored.map((item, index) => ({
//             ...item,
//             rank: index + 1,
//         }));
//         setResults(ranked);

//         // Kirim ke API
//         // sendResultsToAPI(ranked);
//     };

//     const sendResultsToAPI = async (resultsToSend) => {
//         try {
//             const payload = resultsToSend.map((item) => ({
//                 supplier_id: item.supplier_id,
//                 score: item.score,
//                 ranking: item.ranking,
//             }));

//             const response = await axios.post(
//                 "http://localhost:3000/api/results",
//                 payload
//             );

//             console.log("Hasil berhasil dikirim ke API:", response.data);
//         } catch (error) {
//             console.error("Gagal mengirim hasil ke API:", error);
//         }
//     };

//     const supplierMap = React.useMemo(() => {
//         const map = {};
//         suppliers.forEach((sup) => {
//             map[sup.id] = sup;
//         });
//         return map;
//     }, [suppliers]);

//     return (
//         <div className="p-4 space-y-4">
//             {/* Dropdown pilih tanggal hasil SAW */}
//             <div>
//                 <label htmlFor="dateSelect" className="font-semibold mr-2">
//                     Pilih Waktu Perhitungan:
//                 </label>
//                 <select
//                     id="dateSelect"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     className="border rounded px-2 py-1"
//                 >
//                     {dates.map((date) => (
//                         <option key={date} value={date}>
//                             {new Date(date).toLocaleString("id-ID", {
//                                 day: "2-digit",
//                                 month: "2-digit",
//                                 year: "numeric",
//                                 weekday: "long",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                             }) + " WIB"}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Tombol hitung ulang dan kirim hasil */}
//             <div className="space-x-4">
//                 <button
//                     onClick={calculateSAW}
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                     Hitung Ulang SAW
//                 </button>
//                 <button
//                     onClick={() => sendResultsToAPI(results)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                     disabled={results.length === 0}
//                     title={
//                         results.length === 0
//                             ? "Tidak ada hasil untuk dikirim"
//                             : ""
//                     }
//                 >
//                     Perbaharui Data ke API
//                 </button>
//             </div>

//             {/* Tabel Matriks Nilai Alternatif */}
//             <Card>
//                 <CardContent>
//                     <h2 className="text-xl font-bold mb-4">
//                         Matriks Nilai Alternatif (Supplier)
//                     </h2>
//                     <table className="w-full table-auto border border-gray-300 text-sm">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="border p-2">Supplier</th>
//                                 {criteria.map((crit) => (
//                                     <th key={crit.id} className="border p-2">
//                                         {crit.name} ({crit.weight})
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         {/* <tbody>
//                             {suppliers.map((sup) => (
//                                 <tr
//                                     key={sup.id}
//                                     className="odd:bg-white even:bg-gray-50"
//                                 >
//                                     <td className="border p-2">
//                                         {sup.initial}
//                                     </td>
//                                     {criteria.map((crit) => {
//                                         const val = supplierCriteriaValues.find(
//                                             (scv) =>
//                                                 scv.supplier_id === sup.id &&
//                                                 scv.criteria_id === crit.id
//                                         );
//                                         return (
//                                             <td
//                                                 key={crit.id}
//                                                 className="border p-2"
//                                             >
//                                                 {val ? val.value : "-"}
//                                             </td>
//                                         );
//                                     })}
//                                 </tr>
//                             ))}
//                         </tbody> */}

//                         <tbody>
//                             {results.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={3} className="text-center p-4">
//                                         Data hasil belum tersedia
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 results.map((res) => {
//                                     const supplierObj =
//                                         supplierMap[res.supplier_id] || {};
//                                     if (!supplierObj.initial) {
//                                         console.warn(
//                                             `Supplier tidak ditemukan untuk supplier_id: ${res.supplier_id}`,
//                                             res
//                                         );
//                                     }
//                                     return (
//                                         <tr key={res.id}>
//                                             <td className="border p-2">
//                                                 {res.ranking || res.rank || "-"}
//                                             </td>
//                                             <td className="border p-2">
//                                                 {supplierObj.initial || "-"}
//                                             </td>
//                                             <td className="border p-2">
//                                                 {parseFloat(res.score).toFixed(
//                                                     4
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     );
//                                 })
//                             )}
//                         </tbody>
//                     </table>
//                 </CardContent>
//             </Card>

//             {/* Tabel Hasil Perhitungan SAW */}
//             <Card>
//                 <CardContent>
//                     <h2 className="text-xl font-bold mb-4">
//                         Hasil Perhitungan SAW
//                     </h2>
//                     <table className="w-full table-auto border border-gray-300 text-sm">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="border p-2">Peringkat</th>
//                                 <th className="border p-2">Supplier</th>
//                                 <th className="border p-2">Total Score</th>
//                             </tr>
//                         </thead>
//                         {/* <tbody>
//                             {results.map((res) => (
//                                 <tr
//                                     key={res.supplier_id}
//                                     className="odd:bg-white even:bg-gray-50"
//                                 >
//                                     <td className="border p-2">{res.ranking}</td>
//                                     <td className="border p-2">
//                                         {suppliers.find(
//                                             (sup) =>
//                                                 sup.id === res.supplier_id
//                                         )}
//                                     </td>
//                                     <td className="border p-2">
//                                         {res.score}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody> */}
//                         <tbody>
//                             {results.map((res) => {
//                                 // Temukan supplier berdasarkan supplier_id
//                                 const supplier = suppliers.find(
//                                     (sup) => sup.id === res.supplier_id
//                                 );
//                                 // {console.log([... new Set(results.map(res => res.id))])}

//                                 return (
//                                     <tr
//                                         key={res.id}
//                                         className="odd:bg-white even:bg-gray-50"
//                                     >
//                                         {console.log("sup: ", supplier)}
//                                         {console.log("res: ", res.id)}

//                                         <td className="border p-2">
//                                             {res.ranking}
//                                         </td>
//                                         <td className="border p-2">
//                                             {supplier
//                                                 ? supplier.initial
//                                                 : "Initial Supplier tidak ditemukan"}
//                                             {"  "}(
//                                             {supplier
//                                                 ? supplier.name
//                                                 : "Supplier tidak ditemukan"}
//                                             )
//                                         </td>
//                                         <td className="border p-2">
//                                             {res.score}
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </CardContent>
//             </Card>

//             {/* Catatan Deskripsi Supplier & Kriteria */}
//             <Card>
//                 <CardContent>
//                     <h2 className="text-xl font-bold mb-4">Catatan</h2>
//                     <div className="mb-4">
//                         <h3 className="font-semibold">Daftar Supplier:</h3>
//                         <ul className="list-disc ml-6">
//                             {suppliers.map((sup) => (
//                                 <li key={sup.id}>
//                                     {sup.initial}: {sup.name}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div>
//                         <h3 className="font-semibold">Deskripsi Kriteria:</h3>
//                         <ul className="list-disc ml-6">
//                             {criteria.map((crit) => (
//                                 <li key={crit.id}>
//                                     {crit.name} ({crit.weight}):{" "}
//                                     {crit.description}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default SAWCalculation;
