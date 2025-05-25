// import { useEffect, useState } from "react";
// import * as API from "../../api/api";

// export default function SupplierCriteriaValueForm({
//     mode = "add",
//     onSubmit,
//     initialData = {},
//     showForm,
//     setShowForm,
// }) {
//     const [form, setForm] = useState({
//         supplier_id: "",
//         values: [],
//         material_supply_type_id: "", // field baru untuk material supply
//     });

//     const [suppliers, setSuppliers] = useState([]);
//     const [criteria, setCriteria] = useState([]);
//     const [allCriteriaValues, setAllCriteriaValues] = useState({});
//     const [materialTypes, setMaterialTypes] = useState([]);

//     // Fetch suppliers, criteria, dan criteria values
//     useEffect(() => {
//         const fetchData = async () => {
//             const resSuppliers = await API.getSuppliers();
//             const resCriteria = await API.getCriteria();
//             const resCriteriaValues = await API.getCriteriaValues();

//             // Kelompokkan criteria values berdasarkan criteria_id
//             const grouped = {};
//             resCriteriaValues.data.forEach((cv) => {
//                 if (!grouped[cv.criteria_id]) grouped[cv.criteria_id] = [];
//                 grouped[cv.criteria_id].push(cv);
//             });

//             setSuppliers(resSuppliers.data);
//             setCriteria(resCriteria.data);
//             setAllCriteriaValues(grouped);
//         };
//         fetchData();
//     }, []);

//     // Fetch material supply types
//     useEffect(() => {
//         API.getMaterialTypes()
//             .then((res) => setMaterialTypes(res.data))
//             .catch((err) =>
//                 console.error("Error fetching material types:", err)
//             );
//     }, []);

//     // Inisialisasi form berdasarkan mode dan initialData
//     useEffect(() => {
//         if (mode === "edit" && initialData) {
//             setForm({
//                 supplier_id: initialData.supplier_id,
//                 values: [
//                     {
//                         criteria_id: initialData.criteria_id,
//                         value: initialData.value,
//                     },
//                 ],
//                 material_supply_type_id: initialData.material_supply_type_id,
//             });
//         } else {
//             setForm({
//                 supplier_id: "",
//                 values: [],
//                 material_supply_type_id: "",
//             });
//         }
//     }, [initialData, mode, showForm]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleValueChange = (criteriaId, selectedValue) => {
//         setForm((prevForm) => {
//             const updatedValues = [...prevForm.values];
//             const index = updatedValues.findIndex(
//                 (v) => v.criteria_id === criteriaId
//             );
//             if (index !== -1) {
//                 updatedValues[index].value = selectedValue;
//             } else {
//                 updatedValues.push({
//                     criteria_id: criteriaId,
//                     value: selectedValue,
//                 });
//             }
//             return { ...prevForm, values: updatedValues };
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (mode === "edit") {
//             onSubmit({
//                 supplier_id: form.supplier_id,
//                 criteria_id: form.values[0]?.criteria_id,
//                 value: form.values[0]?.value,
//                 material_supply_type_id: form.material_supply_type_id,
//             });
//         } else {
//             onSubmit(form);
//         }
//         setShowForm(false);
//     };

//     return (
//         <div
//             className={`${
//                 showForm ? "fixed" : "hidden"
//             } inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50`}
//         >
//             <form
//                 className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
//                 onSubmit={handleSubmit}
//             >
//                 <h2 className="text-lg font-bold mb-4">
//                     {mode === "edit"
//                         ? "Edit Penilaian Alternatif (Supplier)"
//                         : "Tambah Penilaian Alternatif (Supplier)"}
//                 </h2>

//                 {/* Material Supply Dropdown (hanya untuk mode ADD) */}
//                 <label className="block mb-4">
//                     Material Supply
//                     <select
//                         disabled={mode === "edit"}
//                         name="material_supply_type_id"
//                         value={form.material_supply_type_id}
//                         onChange={handleChange}
//                         className={`w-full border border-gray-300 rounded px-3 py-2 ${
//                             mode === "edit"
//                                 ? "bg-gray-100 cursor-not-allowed"
//                                 : ""
//                         }`}
//                         required
//                     >
//                         <option value="">Pilih Material Supply</option>
//                         {materialTypes.map((m) => (
//                             <option key={m.id} value={m.id}>
//                                 {m.type_name}
//                             </option>
//                         ))}
//                     </select>
//                 </label>

//                 {/* Supplier Dropdown */}
//                 <label className="block mb-4">
//                     Supplier
//                     <select
//                         name="supplier_id"
//                         value={form.supplier_id}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded px-3 py-2"
//                         required
//                     >
//                         <option value="">Pilih Supplier</option>
//                         {suppliers.map((s) => (
//                             <option key={s.id} value={s.id}>
//                                 {s.name}
//                             </option>
//                         ))}
//                     </select>
//                 </label>

//                 {/* Criteria + Value */}
//                 {mode === "add" ? (
//                     <div className="space-y-4">
//                         {criteria.map((c) => (
//                             <div key={c.id}>
//                                 <label className="block font-medium mb-1">
//                                     {c.name}
//                                 </label>
//                                 <select
//                                     value={
//                                         form.values.find(
//                                             (v) => v.criteria_id === c.id
//                                         )?.value || ""
//                                     }
//                                     onChange={(e) =>
//                                         handleValueChange(c.id, e.target.value)
//                                     }
//                                     className="w-full border border-gray-300 rounded px-3 py-2"
//                                     required
//                                 >
//                                     <option value="">Pilih Value</option>
//                                     {(allCriteriaValues[c.id] || []).map(
//                                         (cv) => (
//                                             <option
//                                                 key={cv.id}
//                                                 value={cv.value}
//                                             >
//                                                 {cv.value} - {cv.description}
//                                             </option>
//                                         )
//                                     )}
//                                 </select>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <>
//                         <label className="block mb-2">Criteria</label>
//                         <select
//                             name="criteria_id"
//                             value={form.values[0]?.criteria_id || ""}
//                             onChange={(e) =>
//                                 setForm((prev) => ({
//                                     ...prev,
//                                     values: [
//                                         {
//                                             ...prev.values[0],
//                                             criteria_id: parseInt(
//                                                 e.target.value
//                                             ),
//                                         },
//                                     ],
//                                 }))
//                             }
//                             className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
//                             required
//                         >
//                             <option value="">Pilih Criteria</option>
//                             {criteria.map((c) => (
//                                 <option key={c.id} value={c.id}>
//                                     {c.name}
//                                 </option>
//                             ))}
//                         </select>

//                         <label className="block mb-2">Value</label>
//                         <select
//                             name="value"
//                             value={form.values[0]?.value || ""}
//                             onChange={(e) =>
//                                 setForm((prev) => ({
//                                     ...prev,
//                                     values: [
//                                         {
//                                             ...prev.values[0],
//                                             value: e.target.value,
//                                         },
//                                     ],
//                                 }))
//                             }
//                             className="w-full border border-gray-300 rounded px-3 py-2"
//                             required
//                         >
//                             <option value="">Pilih Value</option>
//                             {(
//                                 allCriteriaValues[
//                                     form.values[0]?.criteria_id
//                                 ] || []
//                             ).map((cv) => (
//                                 <option key={cv.id} value={cv.value}>
//                                     {cv.value} - {cv.description}
//                                 </option>
//                             ))}
//                         </select>
//                     </>
//                 )}

//                 <div className="flex justify-end gap-2 mt-6">
//                     <button
//                         type="button"
//                         onClick={() => setShowForm(false)}
//                         className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                     >
//                         Batal
//                     </button>
//                     <button
//                         type="submit"
//                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                     >
//                         {mode === "edit" ? "Simpan Perubahan" : "Tambah Data"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

import { useEffect, useState, useMemo } from "react";
import * as API from "../../api/api";

export default function SupplierCriteriaValueForm({
    mode = "add",
    onSubmit,
    initialData = {},
    showForm,
    setShowForm,
}) {
    const [form, setForm] = useState({
        supplier_id: "",
        values: [],
        material_supply_type_id: "", // field untuk material supply
    });

    const [suppliers, setSuppliers] = useState([]);
    const [criteria, setCriteria] = useState([]);
    const [allCriteriaValues, setAllCriteriaValues] = useState({});
    const [materialTypes, setMaterialTypes] = useState([]);

    // Fetch suppliers, criteria, dan criteria values
    useEffect(() => {
        const fetchData = async () => {
            const resSuppliers = await API.getSuppliers();
            const resCriteria = await API.getCriteria();
            const resCriteriaValues = await API.getCriteriaValues();

            // Kelompokkan criteria values berdasarkan criteria_id
            const grouped = {};
            resCriteriaValues.data.forEach((cv) => {
                if (!grouped[cv.criteria_id]) grouped[cv.criteria_id] = [];
                grouped[cv.criteria_id].push(cv);
            });

            setSuppliers(resSuppliers.data);
            setCriteria(resCriteria.data);
            setAllCriteriaValues(grouped);
        };
        fetchData();
    }, []);

    // Fetch material supply types
    useEffect(() => {
        API.getMaterialTypes()
            .then((res) => setMaterialTypes(res.data))
            .catch((err) =>
                console.error("Error fetching material types:", err)
            );
    }, []);

    // Inisialisasi form berdasarkan mode dan initialData
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setForm({
                supplier_id: initialData.supplier_id,
                values: [
                    {
                        criteria_id: initialData.criteria_id,
                        value: initialData.value,
                    },
                ],
                material_supply_type_id: initialData.material_supply_type_id,
            });
        } else {
            setForm({
                supplier_id: "",
                values: [],
                material_supply_type_id: "",
            });
        }
    }, [initialData, mode, showForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleValueChange = (criteriaId, selectedValue) => {
        setForm((prevForm) => {
            const updatedValues = [...prevForm.values];
            const index = updatedValues.findIndex(
                (v) => v.criteria_id === criteriaId
            );
            if (index !== -1) {
                updatedValues[index].value = selectedValue;
            } else {
                updatedValues.push({
                    criteria_id: criteriaId,
                    value: selectedValue,
                });
            }
            return { ...prevForm, values: updatedValues };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "edit") {
            onSubmit({
                supplier_id: form.supplier_id,
                criteria_id: form.values[0]?.criteria_id,
                value: form.values[0]?.value,
                material_supply_type_id: form.material_supply_type_id,
            });
        } else {
            onSubmit(form);
        }
        setShowForm(false);
    };

    // Filter supplier berdasarkan nilai material_supply_type_id yang dipilih.
    const filteredSuppliers = useMemo(() => {
        if (!form.material_supply_type_id) return [];
        return suppliers.filter(
            (s) =>
                String(s.material_supply_type_id) ===
                form.material_supply_type_id
        );
    }, [suppliers, form.material_supply_type_id]);

    return (
        <div
            className={`${
                showForm ? "fixed" : "hidden"
            } inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50`}
        >
            <form
                className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-lg font-bold mb-4">
                    {mode === "edit"
                        ? "Edit Penilaian Alternatif (Supplier)"
                        : "Tambah Penilaian Alternatif (Supplier)"}
                </h2>

                {/* Material Supply Dropdown (hanya untuk mode ADD) */}
                <label className="block mb-4">
                    Material Supply
                    <select
                        disabled={mode === "edit"}
                        name="material_supply_type_id"
                        value={form.material_supply_type_id}
                        onChange={handleChange}
                        className={`w-full border border-gray-300 rounded px-3 py-2 ${
                            mode === "edit"
                                ? "bg-gray-100 cursor-not-allowed"
                                : ""
                        }`}
                        required
                    >
                        <option value="">Pilih Material Supply</option>
                        {materialTypes.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.type_name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Supplier Dropdown, isinya menyesuaikan dengan material supply yang dipilih */}
                <label className="block mb-4">
                    Supplier (Pilih Material Supply dulu)
                    <select
                        name="supplier_id"
                        value={form.supplier_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    >
                        <option value="">Pilih Supplier</option>
                        {filteredSuppliers.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Criteria + Value */}
                {mode === "add" ? (
                    <div className="space-y-4">
                        {criteria.map((c) => (
                            <div key={c.id}>
                                <label className="block font-medium mb-1">
                                    {c.name}
                                </label>
                                <select
                                    value={
                                        form.values.find(
                                            (v) => v.criteria_id === c.id
                                        )?.value || ""
                                    }
                                    onChange={(e) =>
                                        handleValueChange(c.id, e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                >
                                    <option value="">Pilih Value</option>
                                    {(allCriteriaValues[c.id] || []).map(
                                        (cv) => (
                                            <option
                                                key={cv.id}
                                                value={cv.value}
                                            >
                                                {cv.value} - {cv.description}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <label className="block mb-2">Criteria</label>
                        <select
                            name="criteria_id"
                            value={form.values[0]?.criteria_id || ""}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    values: [
                                        {
                                            ...prev.values[0],
                                            criteria_id: parseInt(
                                                e.target.value
                                            ),
                                        },
                                    ],
                                }))
                            }
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            required
                        >
                            <option value="">Pilih Criteria</option>
                            {criteria.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <label className="block mb-2">Value</label>
                        <select
                            name="value"
                            value={form.values[0]?.value || ""}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    values: [
                                        {
                                            ...prev.values[0],
                                            value: e.target.value,
                                        },
                                    ],
                                }))
                            }
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        >
                            <option value="">Pilih Value</option>
                            {(
                                allCriteriaValues[
                                    form.values[0]?.criteria_id
                                ] || []
                            ).map((cv) => (
                                <option key={cv.id} value={cv.value}>
                                    {cv.value} - {cv.description}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        {mode === "edit" ? "Simpan Perubahan" : "Tambah Data"}
                    </button>
                </div>
            </form>
        </div>
    );
}
