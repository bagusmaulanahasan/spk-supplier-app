import InputForm from "@/components/Elements/Input";
import { useEffect, useState } from "react";
import * as API from "../../api/api";
import { Plus, Trash2 } from "lucide-react";

export default function SupplierForm({
    onSubmit,
    showForm,
    setShowForm,
    mode = "add",
    initialData = {},
}) {
    const [forms, setForms] = useState([
        { name: "", material_supply_type_id: "" },
    ]);
    const [materialList, setMaterialList] = useState([]);

    useEffect(() => {
        if (mode === "edit" && initialData) {
            const data = Array.isArray(initialData)
                ? initialData
                : [initialData];
            setForms(data);
        } else if (mode === "add") {
            setForms([{ name: "", material_supply_type_id: "" }]);
        }
    }, [initialData, mode, showForm]);

    useEffect(() => {
        if (showForm) {
            API.getMaterialTypes()
                .then((res) => {
                    setMaterialList(res.data);
                })
                .catch((err) =>
                    console.error("Error fetching material types:", err)
                );
        }
    }, [showForm]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedForms = [...forms];
        updatedForms[index][name] = value;
        setForms(updatedForms);
    };

    const handleAddForm = () => {
        setForms([...forms, { name: "", material_supply_type_id: "" }]);
    };

    const handleRemoveForm = (index) => {
        if (forms.length === 1) return;
        const updatedForms = [...forms];
        updatedForms.splice(index, 1);
        setForms(updatedForms);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(forms); // kirim semua supplier sekaligus
        setForms([{ name: "", material_supply_type_id: "" }]);
        setShowForm(false);
    };

    const cancelButton = () => {
        setShowForm(false);
        setForms([{ name: "", material_supply_type_id: "" }]);
    };

    return (
        <div
            className={`${
                showForm ? "fixed" : "hidden"
            } inset-0 bg-black/30 h-screen backdrop-blur-sm flex items-center justify-center z-50`}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-h-[90vh] overflow-y-auto max-w-5xl px-6 rounded-lg shadow-lg relative"
            >
                <h2 className="text-lg font-bold my-6">Tambah Supplier</h2>

                <div className="flex flex-col gap-6">
                    {forms.map((form, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 border p-4 bg-slate-50 shadow"
                        >
                            <div className="w-full">
                                <InputForm
                                    id={`Supplier - ${index + 1}`}
                                    htmlFor={`Supplier - ${index + 1}`}
                                    name="name"
                                    type="text"
                                    placeholder="Nama Supplier"
                                    value={form.name}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>

                            <div className="w-full">
                                <label className="block text-slate-700 text-sm font-bold mb-2">
                                    Material Suplai
                                </label>
                                <select
                                    name="material_supply_type_id"
                                    className="text-sm border rounded w-full py-2 px-3 text-slate-700"
                                    value={form.material_supply_type_id}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                >
                                    <option value="">
                                        Pilih Material Supply
                                    </option>
                                    {materialList.map((mat) => (
                                        <option key={mat.id} value={mat.id}>
                                            {mat.type_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {forms.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveForm(index)}
                                    className="text-red-500 mt-2 border border-red-500 hover:bg-red-600/10 rounded w-24 mx-4 h-12 cursor-pointer flex items-center justify-center"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div
                    className={`flex items-center mt-6 sticky bottom-0 bg-white py-4 border-t-2 ${
                        mode === "edit" ? "justify-end" : "justify-between"
                    }`}
                >
                    <div
                        className={`flex gap-2 ${mode === "edit" && "hidden"}`}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setForms([
                                    { name: "", material_supply_type_id: "" },
                                ])
                            }
                            className={`px-4 py-2 text-red-500  rounded border border-rose-600 hover:bg-red-500/10 ${forms.length < 2 ? "hidden" : "visible"}`}
                        >
                            <span className="flex items-center gap-2">
                                <Trash2 size={18} /> Hapus Semua Form
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={handleAddForm}
                            className="px-4 py-2 text-blue-500 rounded border border-blue-600 hover:bg-blue-500/10"
                        >
                            <span className="flex items-center gap-2">
                                <Plus size={18} />
                                Tambah Form Nilai
                            </span>
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => cancelButton()}
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
                                : "Tambahkan Supplier"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

// import InputForm from "@/components/Elements/Input";
// import { useEffect, useState } from "react";
// import * as API from "../../api/api"; // Pastikan API.getMaterialTypes tersedia

// export default function SupplierForm({
//     mode = "add",
//     onSubmit,
//     initialData = {},
//     showForm,
//     setShowForm,
// }) {
//     const [form, setForm] = useState({
//         initial: "",
//         name: "",
//         material_supply_type_id: "",
//     });

//     const [materialList, setMaterialList] = useState([]);

//     useEffect(() => {
//         if (mode === "edit" && initialData) {
//             setForm(initialData);
//         } else {
//             setForm({ initial: "", name: "", material_supply_type_id: "" });
//         }
//     }, [initialData, mode, showForm]);

//     // Ambil data material supply hanya ketika mode add
//         useEffect(() => {
//             if (mode === "add") {
//                 API.getMaterialTypes()
//                     .then((res) => {
//                         setMaterialList(res.data);
//                         // // Jika ada data dan belum ada nilai default, set nilai default sebagai opsi pertama
//                         // if (res.data.length > 0 && !form.material_supply_type_id) {
//                         //     setForm((prev) => ({
//                         //         ...prev,
//                         //         // material_supply_type_id: res.data[0].id,
//                         //     }));
//                         // }
//                     })
//                     .catch((err) =>
//                         console.error("Error fetching material types:", err)
//                     );
//             }
//         }, [mode, form.material_supply_type_id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(form);
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
//                     {mode === "edit" ? "Edit Supplier" : "Tambah Supplier"}
//                 </h2>
//                 <InputForm
//                     id="Inisial"
//                     htmlFor="Inisial"
//                     name="initial"
//                     type="text"
//                     placeholder="Inisial Supplier"
//                     value={form.initial}
//                     onChange={handleChange}
//                 />
//                 <InputForm
//                     id="Nama"
//                     htmlFor="Nama"
//                     name="name"
//                     type="text"
//                     placeholder="Nama Supplier"
//                     value={form.name}
//                     onChange={handleChange}
//                 />
//                     <div className="mb-4">
//                         <label className="block text-slate-700 text-sm font-bold mb-2">
//                             Material Suplai
//                         </label>
//                         <select
//                             disabled={mode === "edit"}
//                             name="material_supply_type_id"
//                             className={`text-sm border rounded w-full py-2 px-3 text-slate-700 ${mode === "edit" ? "bg-gray-100 cursor-not-allowed" : ""}`}
//                             value={form.material_supply_type_id}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">Pilih Material Supply</option>
//                             {materialList.map((mat) => (
//                                 <option key={mat.id} value={mat.id}>
//                                     {mat.type_name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 <div className="flex justify-end gap-2 mt-4">
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
//                         {mode === "edit"
//                             ? "Simpan Perubahan"
//                             : "Tambah Supplier"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }
