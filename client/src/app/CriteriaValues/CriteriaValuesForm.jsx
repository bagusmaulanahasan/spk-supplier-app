import { useEffect, useState } from "react";
import InputForm from "@/components/Elements/Input";
import { Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import SubmitAlert from "@/components/Alerts/Submit";
import ConfirmDeleteAlert from "@/components/Alerts/ConfirmDelete";

export default function CriteriaValuesForm({
    mode = "add",
    onSubmit,
    initialData = {},
    showForm,
    setShowForm,
    criteriaList,
}) {
    const [forms, setForms] = useState([
        { criteria_id: "", value: "", description: "" },
    ]);

    useEffect(() => {
        if (mode === "edit") {
            if (
                initialData &&
                (Array.isArray(initialData)
                    ? initialData.length > 0
                    : Object.keys(initialData).length > 0)
            ) {
                const data = Array.isArray(initialData)
                    ? initialData
                    : [initialData];
                setForms(data);
            } else {
                setForms([{ criteria_id: "", value: "", description: "" }]);
            }
        } else if (mode === "add") {
            setForms([{ criteria_id: "", value: "", description: "" }]);
        }
    }, [initialData, mode, showForm]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedForms = [...forms];
        updatedForms[index][name] = value;
        setForms(updatedForms);
    };

    const handleAddForm = () => {
        setForms([...forms, { criteria_id: "", value: "", description: "" }]);
    };

    const handleRemoveForm = (index) => {
        if (forms.length === 1) return;
        const updatedForms = [...forms];
        updatedForms.splice(index, 1);
        setForms(updatedForms);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(forms);
        setShowForm(false);
        setForms([{ criteria_id: "", value: "", description: "" }]);
    };
    
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
            confirmButtonText: "Ya, hapus!",
        }).then((result) => {
            if (result.isConfirmed) {
                {
                    if (type === "allForm") {
                        setForms([
                            {
                                criteria_id: "",
                                value: "",
                                description: "",
                            },
                        ]);
                    } else if (type === "cancel") {
                        setShowForm(false);
                        setForms([
                            {
                                criteria_id: "",
                                value: "",
                                description: "",
                            },
                        ]);
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
            } inset-0 bg-black/30 backdrop-blur-sm flex h-screen items-center justify-center z-50`}
        >
            <form
                className="bg-white w-full max-h-[90vh] overflow-y-auto max-w-5xl px-6 rounded-lg shadow-lg relative"
                onSubmit={handleSubmit}
            >
                <h2 className="text-lg font-bold my-6">
                    {mode === "edit"
                        ? "Edit Penilaian Kriteria"
                        : "Tambah Penilaian Kriteria"}
                </h2>

                <div className="flex flex-col gap-6">
                    {forms.map((form, index) => (
                        <div
                            key={index}
                            className="flex gap-4 border p-4 bg-slate-50 shadow"
                        >
                            <div className="w-[40%]">
                                <InputForm
                                    id={`Kriteria - ${index + 1}`}
                                    htmlFor={`Kriteria - ${index + 1}`}
                                    name="criteria_id"
                                    as="select"
                                    value={form.criteria_id}
                                    onChange={(e) => handleChange(index, e)}
                                >
                                    <option value="">Pilih Kriteria</option>
                                    {criteriaList.map((criteria) => (
                                        <option
                                            key={criteria.id}
                                            value={criteria.id}
                                        >
                                            {criteria.name} -{" "}
                                            {criteria.description}
                                        </option>
                                    ))}
                                </InputForm>
                            </div>

                            <div className="w-30%">
                                <InputForm
                                    id="Nilai"
                                    htmlFor="Nilai"
                                    name="value"
                                    type="text"
                                    placeholder="Nilai"
                                    value={form.value}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="w-full">
                                <InputForm
                                    id="Deskripsi"
                                    htmlFor="Deskripsi"
                                    name="description"
                                    as="textarea"
                                    placeholder="Deskripsi Nilai"
                                    value={form.description}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>

                            {forms.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDeleteForm("singleForm", "Form ini akan dihapus!", index)
                                    }
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
                            onClick={() => handleDeleteForm("allForm", "Semua form akan dihapus!")}
                            className={`px-4 py-2 text-red-500  rounded border border-rose-600 hover:bg-red-500/10 ${
                                forms.length < 2 ? "hidden" : "visible"
                            }`}
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
                                Tambahkan Form
                            </span>
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => handleDeleteForm("cancel", "Semua perubahan akan dihapus!")}
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

// import { useEffect, useState } from "react";
// import InputForm from "@/components/Elements/Input";

// export default function CriteriaValuesForm({
//     mode = "add",
//     onSubmit,
//     initialData = {},
//     showForm,
//     setShowForm,
//     criteriaList, // daftar kriteria yang akan dipilih
// }) {
//     const [form, setForm] = useState({
//         criteria_id: "",
//         value: "",
//         description: "",
//     });

//     useEffect(() => {
//         if (mode === "edit" && initialData) {
//             setForm(initialData);
//         } else {
//             setForm({ criteria_id: "", value: "", description: "" });
//         }
//     }, [initialData, mode, showForm]);

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
//                     {mode === "edit" ? "Edit Penilaian Kriteria" : "Tambah Penilaian Kriteria"}
//                 </h2>
//                 <div className="mb-4">
//                     <label className="block text-slate-700 text-sm font-bold mb-2">
//                         Nama Kriteria
//                     </label>
//                     <select
//                         name="criteria_id"
//                         className="text-sm border rounded w-full py-2 px-3 text-slate-700"
//                         value={form.criteria_id}
//                         onChange={handleChange}
//                     >
//                         <option value="">Pilih Kriteria</option>
//                         {criteriaList.map((criteria) => (
//                             <option key={criteria.id} value={criteria.id}>
//                                 {criteria.name} - {criteria.description}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <InputForm
//                     id="Value"
//                     htmlFor="Value"
//                     name="value"
//                     type="text"
//                     placeholder="Nilai"
//                     value={form.value}
//                     onChange={handleChange}
//                 />
//                 <InputForm
//                     id="Deskripsi"
//                     htmlFor="Deskripsi"
//                     name="description"
//                     as="textarea"
//                     placeholder="Deskripsi Nilai"
//                     rows="4"
//                     value={form.description}
//                     onChange={handleChange}
//                 />

//                 <div className="flex justify-end gap-2">
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
//                             : "Tambah Nilai Kriteria"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }
