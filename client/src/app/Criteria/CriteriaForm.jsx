import InputForm from "@/components/Elements/Input";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function MultipleCriteriaForm({
    showForm,
    setShowForm,
    onSubmit,
    mode = "add",
    initialData = {},
}) {
    const [forms, setForms] = useState([
        { name: "", description: "", type: "cost", weight: 0.0 },
    ]);

    useEffect(() => {
        if (mode === "edit" && initialData) {
            const data = Array.isArray(initialData)
                ? initialData
                : [initialData];
            setForms(data);
        } else {
            setForms([
                {
                    name: "",
                    description: "",
                    type: "cost",
                    weight: 0.0,
                },
            ]);
        }
    }, [initialData, mode, showForm]);

    const handleChange = (index, e) => {
        const { name, value, type } = e.target;
        const updatedForms = [...forms];
        updatedForms[index][name] =
            type === "number" ? parseFloat(value) || 0 : value;
        setForms(updatedForms);
    };

    const addForm = () => {
        setForms([
            ...forms,
            { name: "", description: "", type: "cost", weight: 0.0 },
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(forms);
        setShowForm(false);
        setForms([{ name: "", description: "", type: "cost", weight: 0.0 }]); // reset
    };

    const handleRemove = (index) => {
        if (forms.length === 1) return;
        setForms(forms.filter((_, i) => i !== index));
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
                <h2 className="text-lg font-bold my-6">
                    {mode === "edit" ? "Edit Kriteria" : "Tambah Kriteria"}
                </h2>
                <div className="flex flex-col gap-6 ">
                    {forms.map((form, index) => (
                        <div
                            key={index}
                            className="flex items-start justify-between border gap-4 p-4 bg-slate-50 shadow w-full"
                        >
                            <div className="w-[50%]">
                                <InputForm
                                    id={`Kriteria - ${index + 1}`}
                                    htmlFor={`Kriteria - ${index + 1}`}
                                    name="name"
                                    type="text"
                                    placeholder="Nama Kriteria"
                                    value={form.name}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="w-[80%]">
                                <InputForm
                                    id={`Deskripsi`}
                                    htmlFor={`Deskripsi`}
                                    name="description"
                                    as="textarea"
                                    placeholder="Deskripsi"
                                    value={form.description}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="w-[30%]">
                                <InputForm
                                    id={`Bobot`}
                                    htmlFor={`Bobot`}
                                    name="weight"
                                    type="number"
                                    placeholder="Bobot"
                                    value={form.weight}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="w-[40%]">
                                <InputForm
                                    id={`Kategori`}
                                    htmlFor={`Kategori`}
                                    name="type"
                                    as="select"
                                    value={form.type}
                                    onChange={(e) => handleChange(index, e)}
                                >
                                    <option value="cost">Cost</option>
                                    <option value="benefit">Benefit</option>
                                </InputForm>
                            </div>
                            {forms.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
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
                                    {
                                        name: "",
                                        description: "",
                                        type: "cost",
                                        weight: 0.0,
                                    },
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
                            onClick={addForm}
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
                            onClick={() => setShowForm(false)}
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
                                : "Tambahkan Kriteria"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

// import InputForm from "@/components/Elements/Input";
// import { useEffect, useState } from "react";

// export default function CriteriaForm({
//     mode = "add",
//     onSubmit,
//     initialData = {},
//     showForm,
//     setShowForm,
// }) {
//     const [form, setForm] = useState({
//         name: "",
//         description: "",
//         type: "cost",
//         weight: 0.0,
//     });

//     // Inisialisasi form, terutama untuk mode edit
//     useEffect(() => {
//         if (mode === "edit" && initialData) {
//             setForm(initialData);
//         } else {
//             setForm({
//                 name: "",
//                 description: "",
//                 type: "cost",
//                 weight: 0.0,
//             });
//         }
//     }, [initialData, mode, showForm]);

//     const handleChange = (e) => {
//         const { name, value, type } = e.target;
//         let newValue = value;
//         if (type === "number") {
//             newValue = value === "" ? "" : parseFloat(value);
//         }
//         setForm({ ...form, [name]: newValue });
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
//                     {mode === "edit" ? "Edit Kriteria" : "Tambah Kriteria"}
//                 </h2>
//                 <InputForm
//                     id="Nama"
//                     htmlFor="Nama"
//                     name="name"
//                     type="text"
//                     placeholder="Nama Kriteria"
//                     value={form.name}
//                     onChange={handleChange}
//                 />
//                 <InputForm
//                     id="Deskripsi"
//                     htmlFor="Deskripsi"
//                     name="description"
//                     as="textarea"
//                     placeholder="Deskripsi Kriteria"
//                     rows="4"
//                     value={form.description}
//                     onChange={handleChange}
//                 />
//                 <InputForm
//                     id="Bobot"
//                     htmlFor="Bobot"
//                     name="weight"
//                     type="number"
//                     placeholder="Bobot Kriteria"
//                     value={form.weight}
//                     onChange={handleChange}
//                 />
//                 <div className="mb-4">
//                     <label className="block text-slate-700 text-sm font-bold mb-2">
//                         Kategori
//                     </label>
//                     <select
//                         name="type"
//                         className="text-sm border rounded w-full py-2 px-3 text-slate-700"
//                         value={form.type}
//                         onChange={handleChange}
//                     >
//                         <option value="cost">Cost</option>
//                         <option value="benefit">Benefit</option>
//                     </select>
//                 </div>

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
//                             : "Tambah Kriteria"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }
