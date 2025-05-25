// import InputForm from "@/components/Elements/Input";
// import { useEffect, useState } from "react";

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
//     });

//     useEffect(() => {
//         if (mode === "edit" && initialData) {
//             setForm(initialData);
//         } else {
//             setForm({ initial: "", name: "" });
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
//         <div className={`${showForm ? "fixed" : "hidden"} inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50`}>
//             <form className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
//                 <h2 className="text-lg font-bold mb-4">{mode === "edit" ? "Edit Supplier" : "Tambah Supplier"}</h2>
//                 <InputForm
//                     id="Initial"
//                     htmlFor="Initial"
//                     name="initial"
//                     type="text"
//                     placeholder="Inisial Supplier"
//                     value={form.initial}
//                     onChange={handleChange}
//                 />
//                 <InputForm
//                     id="Name"
//                     htmlFor="Name"
//                     name="name"
//                     type="text"
//                     placeholder="Nama Supplier"
//                     value={form.name}
//                     onChange={handleChange}
//                 />
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
//                         {mode === "edit" ? "Simpan Perubahan" : "Tambah Supplier"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

import InputForm from "@/components/Elements/Input";
import { useEffect, useState } from "react";
import * as API from "../../api/api"; // Pastikan API.getMaterialTypes tersedia

export default function SupplierForm({
    mode = "add",
    onSubmit,
    initialData = {},
    showForm,
    setShowForm,
}) {
    const [form, setForm] = useState({
        initial: "",
        name: "",
        material_supply_type_id: "", // Field untuk menyimpan id material (dropdown hanya pada mode add)
    });

    const [materialList, setMaterialList] = useState([]);

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setForm(initialData);
        } else {
            setForm({ initial: "", name: "", material_supply_type_id: "" });
        }
    }, [initialData, mode, showForm]);

    // Ambil data material supply hanya ketika mode add
        useEffect(() => {
            if (mode === "add") {
                API.getMaterialTypes()
                    .then((res) => {
                        setMaterialList(res.data);
                        // // Jika ada data dan belum ada nilai default, set nilai default sebagai opsi pertama
                        // if (res.data.length > 0 && !form.material_supply_type_id) {
                        //     setForm((prev) => ({
                        //         ...prev,
                        //         // material_supply_type_id: res.data[0].id,
                        //     }));
                        // }
                    })
                    .catch((err) =>
                        console.error("Error fetching material types:", err)
                    );
            }
        }, [mode, form.material_supply_type_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setShowForm(false);
    };

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
                    {mode === "edit" ? "Edit Supplier" : "Tambah Supplier"}
                </h2>
                <InputForm
                    id="Initial"
                    htmlFor="Initial"
                    name="initial"
                    type="text"
                    placeholder="Inisial Supplier"
                    value={form.initial}
                    onChange={handleChange}
                />
                <InputForm
                    id="Name"
                    htmlFor="Name"
                    name="name"
                    type="text"
                    placeholder="Nama Supplier"
                    value={form.name}
                    onChange={handleChange}
                />
                    <div className="mb-4">
                        <label className="block text-slate-700 text-sm font-bold mb-2">
                            Material Suplai
                        </label>
                        <select
                            disabled={mode === "edit"}
                            name="material_supply_type_id"
                            className={`text-sm border rounded w-full py-2 px-3 text-slate-700 ${mode === "edit" ? "bg-gray-100 cursor-not-allowed" : ""}`}
                            value={form.material_supply_type_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih Material Supply</option>
                            {materialList.map((mat) => (
                                <option key={mat.id} value={mat.id}>
                                    {mat.type_name}
                                </option>
                            ))}
                        </select>
                    </div>
                <div className="flex justify-end gap-2 mt-4">
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
                            : "Tambah Supplier"}
                    </button>
                </div>
            </form>
        </div>
    );
}
