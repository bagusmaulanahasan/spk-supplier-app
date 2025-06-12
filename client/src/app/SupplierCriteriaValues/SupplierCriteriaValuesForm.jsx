import { useEffect, useState } from "react";
import * as API from "../../api/api";
import InputForm from "@/components/Elements/Input";
import { Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function SupplierCriteriaValueForm({
    onSubmit,
    showForm,
    setShowForm,
    mode = "add",
    initialData = {},
}) {
    const [form, setForm] = useState({
        material_supply_type_id: "",
        suppliers: [{ supplier_id: "", values: [] }],
    });

    const [materialTypes, setMaterialTypes] = useState([]);
    const [suppliersData, setSuppliersData] = useState([]);
    const [criteria, setCriteria] = useState([]);
    const [criteriaValues, setCriteriaValues] = useState({});

    useEffect(() => {
        const fetchAll = async () => {
            const [resMaterial, resSuppliers, resCriteria, resCValues] =
                await Promise.all([
                    API.getMaterialTypes(),
                    API.getSuppliers(),
                    API.getCriteria(),
                    API.getCriteriaValues(),
                ]);

            setMaterialTypes(resMaterial.data);
            setSuppliersData(resSuppliers.data);
            setCriteria(resCriteria.data);

            const groupedValues = {};
            resCValues.data.forEach((item) => {
                if (!groupedValues[item.criteria_id])
                    groupedValues[item.criteria_id] = [];
                groupedValues[item.criteria_id].push(item);
            });
            setCriteriaValues(groupedValues);
        };

        fetchAll();
    }, []);

    useEffect(() => {
        if (
            mode === "edit" &&
            initialData?.supplier_id &&
            initialData?.material_supply_type_id &&
            Array.isArray(initialData?.values)
        ) {
            setForm({
                material_supply_type_id: String(
                    initialData.material_supply_type_id
                ),
                suppliers: [
                    {
                        supplier_id: String(initialData.supplier_id),
                        values: initialData.values.map((v) => ({
                            criteria_id: v.criteria_id,
                            value: v.value,
                        })),
                    },
                ],
            });
        }
    }, [mode, initialData]);

    const handleChange = (e) => {
        console.log(initialData);
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSupplierChange = (index, value) => {
        setForm((prev) => {
            const updated = [...prev.suppliers];
            updated[index].supplier_id = value;
            return { ...prev, suppliers: updated };
        });
    };

    const handleCriteriaChange = (sIndex, criteriaId, value) => {
        setForm((prev) => {
            const updated = [...prev.suppliers];
            const existing = updated[sIndex].values || [];
            const idx = existing.findIndex((v) => v.criteria_id === criteriaId);

            if (idx !== -1) {
                existing[idx].value = value;
            } else {
                existing.push({ criteria_id: criteriaId, value });
            }

            updated[sIndex].values = existing;
            return { ...prev, suppliers: updated };
        });
    };

    const addSupplierBlock = () => {
        setForm((prev) => ({
            ...prev,
            suppliers: [...prev.suppliers, { supplier_id: "", values: [] }],
        }));
    };

    const handleRemoveForm = (index) => {
        setForm((prev) => {
            const updated = [...prev.suppliers];
            updated.splice(index, 1);
            return { ...prev, suppliers: updated };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({
          material_supply_type_id: "",
          suppliers: [{ supplier_id: "", values: [] }],
      });
        setShowForm(false);
    };

    const filteredSuppliers = suppliersData.filter(
        (s) =>
            String(s.material_supply_type_id) === form.material_supply_type_id
    );

    const handleDeleteForm = (type, message, index) => {
        Swal.fire({
            title: "Apakah anda yakin?",
            text: message,
            icon: "warning",
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonColor: "#6b7280",
            cancelButtonText: "Batal",
            confirmButtonColor: "#ef4444",
            confirmButtonText: `${type === "cancel" ? "Ya, saya yakin" : "Ya, hapus!"}`,
        }).then((result) => {
            if (result.isConfirmed) {
                {
                    if (type === "allForm") {
                        setForm({
                            material_supply_type_id: "",
                            suppliers: [{ supplier_id: "", values: [] }],
                        });
                    } else if (type === "cancel") {
                        setShowForm(false);
                        setForm({
                            material_supply_type_id: "",
                            suppliers: [{ supplier_id: "", values: [] }],
                        });
                    } else {
                        handleRemoveForm(index);
                    }
                }
            }
        });
    };

    return (
        <div
            className={`${
                showForm ? "fixed" : "hidden"
            } inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50`}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-6xl px-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto relative"
            >
                <h2 className="text-xl font-bold my-6 flex flex-col gap-2">
                    Form Penilaian Alternatif (Supplier)
                    <span className="text-sm font-normal text-slate-600">
                        <span className="text-red-600">* </span>Pilih Material
                        Supply terlebih dahulu
                    </span>
                </h2>

                {/* MATERIAL SUPPLY TYPE - HANYA SEKALI */}
                <InputForm
                    name="material_supply_type_id"
                    label="Material Supply Type"
                    as="select"
                    value={form.material_supply_type_id}
                    onChange={handleChange}
                    disabled={mode === "edit"}
                    required
                >
                    <option value="">Pilih Material Supply</option>
                    {materialTypes.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.type_name}
                        </option>
                    ))}
                </InputForm>

                {/* TABEL HEADER */}
                {form.material_supply_type_id && (
                    <div className="mt-6 border-t pt-4 space-y-4">
                        <div className="flex gap-4 font-semibold text-sm text-gray-700">
                            <div className="w-48">Supplier</div>
                            {criteria.map((c) => (
                                <div
                                    key={c.id}
                                    className="flex-1 min-w-[140px]"
                                >
                                    {c.name}
                                </div>
                            ))}
                            <div className="w-10"></div>
                        </div>

                        {/* FORM SUPPLIER */}
                        {form.suppliers.map((supplier, sIndex) => (
                            <div
                                key={sIndex}
                                className="flex gap-4 items-start"
                            >
                                {/* SUPPLIER DROPDOWN */}
                                <div className="w-48">
                                    <InputForm
                                        as="select"
                                        value={supplier.supplier_id}
                                        onChange={(e) =>
                                            handleSupplierChange(
                                                sIndex,
                                                e.target.value
                                            )
                                        }
                                        disabled={mode === "edit"}
                                        required
                                    >
                                        <option value="">Pilih Supplier</option>
                                        {filteredSuppliers.map((sup) => (
                                            <option key={sup.id} value={sup.id}>
                                                {sup.name}
                                            </option>
                                        ))}
                                    </InputForm>
                                </div>

                                {/* CRITERIA VALUES */}
                                {criteria.map((c) => (
                                    <div
                                        key={c.id}
                                        className="flex-1 min-w-[140px]"
                                    >
                                        <InputForm
                                            as="select"
                                            value={
                                                supplier.values?.find(
                                                    (v) =>
                                                        v.criteria_id === c.id
                                                )?.value || ""
                                            }
                                            onChange={(e) =>
                                                handleCriteriaChange(
                                                    sIndex,
                                                    c.id,
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="">Pilih</option>
                                            {(criteriaValues[c.id] || []).map(
                                                (cv) => (
                                                    <option
                                                        key={cv.id}
                                                        value={cv.value}
                                                    >
                                                        {cv.value} -{" "}
                                                        {cv.description}
                                                    </option>
                                                )
                                            )}
                                        </InputForm>
                                    </div>
                                ))}

                                {/* DELETE BUTTON */}
                                <div className="w-10 pt-2">
                                    {form.suppliers.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteForm(
                                                    "singleForm",
                                                    "Form ini akan dihapus!",
                                                    sIndex
                                                )
                                            }
                                            className="text-red-500 hover:text-red-700"
                                            title="Hapus"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div
                    className={`flex items-center sticky bottom-0 bg-white py-4 border-t-2 ${
                        mode === "edit" ? "justify-end" : "justify-between"
                    }`}
                >
                    <div
                        className={`flex gap-2 ${
                            (mode === "edit" ||
                            form.suppliers.length < 1) && "hidden"
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                handleDeleteForm(
                                    "allForm",
                                    "Semua form akan dihapus!"
                                )
                            }
                            className={`px-4 py-2 text-red-500  rounded border border-rose-600 hover:bg-red-500/10 ${
                                form.suppliers.length < 2 ? "hidden" : "visible"
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <Trash2 size={18} /> Hapus Semua Form
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={addSupplierBlock}
                            className={`px-4 py-2 text-blue-500 rounded border border-blue-600 hover:bg-blue-500/10`}
                        >
                            <span className="flex items-center gap-2">
                                <Plus size={18} />
                                Tambahkan Form
                            </span>
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                handleDeleteForm(
                                    "cancel",
                                    "Semua perubahan akan dihapus!"
                                )
                            }
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            {mode === "edit"
                                ? "Simpan Perubahan"
                                : "Simpan Semua Nilai"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

// import { useEffect, useState, useMemo } from "react";
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
//         material_supply_type_id: "", // field untuk material supply
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

//     // Filter supplier berdasarkan nilai material_supply_type_id yang dipilih.
//     const filteredSuppliers = useMemo(() => {
//         if (!form.material_supply_type_id) return [];
//         return suppliers.filter(
//             (s) =>
//                 String(s.material_supply_type_id) ===
//                 form.material_supply_type_id
//         );
//     }, [suppliers, form.material_supply_type_id]);

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

//                 {/* Supplier Dropdown, isinya menyesuaikan dengan material supply yang dipilih */}
//                 <label className="block mb-4">
//                     Supplier (Pilih Material Supply dulu)
//                     <select
//                         name="supplier_id"
//                         value={form.supplier_id}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded px-3 py-2"
//                         required = {mode === "add"}
//                     >
//                         <option value="">Pilih Supplier</option>
//                         {filteredSuppliers.map((s) => (
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
