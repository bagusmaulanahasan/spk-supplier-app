// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import InputForm from "@/components/Elements/Input";

// export default function UserForm({
//     mode = "add",
//     onSubmit,
//     initialData = {},
//     showForm,
//     setShowForm,
// }) {
//     const [form, setForm] = useState({
//         username: "",
//         name: "",
//         password: "",
//         confirmPassword: "",
//         role: "admin",
//     });

//     useEffect(() => {
//         if (mode === "edit" && initialData) {
//             setForm({
//                 username: initialData.username || "",
//                 name: initialData.name || "",
//                 password: "",
//                 confirmPassword: "",
//                 role: initialData.role || "admin",
//             });
//         } else {
//             setForm({
//                 username: "",
//                 name: "",
//                 password: "",
//                 confirmPassword: "",
//                 role: "admin",
//             });
//         }
//     }, [initialData, mode, showForm]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validasi: password dan confirmPassword harus cocok
//         if (form.password !== form.confirmPassword) {
//             await Swal.fire({
//                 icon: "error",
//                 title: "Password tidak cocok!",
//                 text: "Mohon pastikan password dan konfirmasi password sama.",
//             });
//             return;
//         }

//         // Hapus confirmPassword sebelum submit ke API
//         const { confirmPassword, ...dataToSubmit } = form;

//         // Kirim data ke parent component
//         onSubmit(dataToSubmit);

//         // Tutup form
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
//                     {mode === "edit" ? "Edit Pengguna" : "Tambah Pengguna"}
//                 </h2>

//                 <InputForm
//                     id="Username"
//                     htmlFor="Username"
//                     name="username"
//                     type="text"
//                     placeholder="Username"
//                     value={form.username}
//                     onChange={handleChange}
//                 />
//                 <InputForm
//                     id="Name"
//                     htmlFor="Name"
//                     name="name"
//                     type="text"
//                     placeholder="Name"
//                     value={form.name}
//                     onChange={handleChange}
//                 />

//                 <InputForm
//                     id="Password"
//                     htmlFor="Password"
//                     name="password"
//                     type="password"
//                     placeholder={
//                         mode === "edit"
//                             ? "Kosongkan jika tidak diubah"
//                             : "Password"
//                     }
//                     value={form.password}
//                     onChange={handleChange}
//                 />

//                 <InputForm
//                     id="ConfirmPassword"
//                     htmlFor="Konfirmasi Password"
//                     name="confirmPassword"
//                     type="password"
//                     placeholder={
//                         mode === "edit"
//                             ? "Kosongkan jika tidak diubah"
//                             : "Konfirmasi Password"
//                     }
//                     value={form.confirmPassword}
//                     onChange={handleChange}
//                 />

//                 <InputForm
//                     id="Role"
//                     htmlFor="Role"
//                     name="role"
//                     as="select"
//                     value={form.role}
//                     onChange={handleChange}
//                 >
//                     <option value="admin">Admin</option>
//                     <option value="kepala bagian">Kepala Bagian</option>
//                 </InputForm>

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
//                         {mode === "edit" ? "Simpan Perubahan" : "Tambah User"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }


// ============ change version ============

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import InputForm from "@/components/Elements/Input";

export default function UserForm({
    mode = "add",
    onSubmit,
    initialData = {},
    showForm,
    setShowForm,
}) {
    const [form, setForm] = useState({
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        role: "admin",
    });

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setForm({
                username: initialData.username || "",
                name: initialData.name || "",
                password: "",
                confirmPassword: "",
                role: initialData.role || "admin",
            });
        } else {
            setForm({
                username: "",
                name: "",
                password: "",
                confirmPassword: "",
                role: "admin",
            });
        }
    }, [initialData, mode, showForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi: password wajib saat tambah user
        if (mode === "add" && !form.password) {
            await Swal.fire({
                icon: "error",
                title: "Password wajib diisi!",
                text: "Password tidak boleh kosong saat menambah pengguna.",
            });
            return;
        }

        // Validasi: jika salah satu dari password atau confirmPassword diisi, maka harus cocok
        if ((form.password || form.confirmPassword) && form.password !== form.confirmPassword) {
            await Swal.fire({
                icon: "error",
                title: "Password tidak cocok!",
                text: "Mohon pastikan password dan konfirmasi password sama.",
            });
            return;
        }

        // Hapus confirmPassword sebelum submit
        let { confirmPassword, ...dataToSubmit } = form;

        // Jika sedang edit dan password kosong, hapus password agar tidak dikirim
        if (mode === "edit" && !form.password) {
            const { password, ...rest } = dataToSubmit;
            dataToSubmit = rest;
        }

        onSubmit(dataToSubmit);
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
                    {mode === "edit" ? "Edit Pengguna" : "Tambah Pengguna"}
                </h2>

                <InputForm
                    id="Username"
                    htmlFor="Username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <InputForm
                    id="Name"
                    htmlFor="Name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <InputForm
                    id="Password"
                    htmlFor="Password"
                    name="password"
                    type="password"
                    placeholder={
                        mode === "edit"
                            ? "Kosongkan jika tidak diubah"
                            : "Password"
                    }
                    value={form.password}
                    onChange={handleChange}
                    required={mode === "add"}
                />

                <InputForm
                    id="ConfirmPassword"
                    htmlFor="Konfirmasi Password"
                    name="confirmPassword"
                    type="password"
                    placeholder={
                        mode === "edit"
                            ? "Kosongkan jika tidak diubah"
                            : "Konfirmasi Password"
                    }
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required={mode === "add"}
                />

                <InputForm
                    id="Role"
                    htmlFor="Role"
                    name="role"
                    as="select"
                    value={form.role}
                    onChange={handleChange}
                    required
                >
                    <option value="admin">Admin</option>
                    <option value="kepala bagian">Kepala Bagian</option>
                </InputForm>

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
                        {mode === "edit" ? "Simpan Perubahan" : "Tambah User"}
                    </button>
                </div>
            </form>
        </div>
    );
}
