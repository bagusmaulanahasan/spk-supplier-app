import { useEffect, useState } from "react";
import InputForm from "../Elements/Input";

export default function UserForm({
    mode = "add",
    onSubmit,
    initialData = {},
    showForm,
    setShowForm,
}) {
    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "admin",
    });

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setForm({
                username: initialData.username || "",
                password: "", // kosongkan agar tidak menampilkan password lama
                role: initialData.role || "admin",
            });
        } else {
            setForm({ username: "", password: "", role: "admin" });
        }
    }, [initialData, mode, showForm]);

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
        <div className={`${showForm ? "fixed" : "hidden"} inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50`}>
            <form className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold mb-4">
                    {mode === "edit" ? "Edit User" : "Tambah User"}
                </h2>

                <InputForm
                    id="Username"
                    htmlFor="Username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />

                <InputForm
                    id="Password"
                    htmlFor="Password"
                    name="password"
                    type="password"
                    placeholder={mode === "edit" ? "Kosongkan jika tidak diubah" : "Password"}
                    value={form.password}
                    onChange={handleChange}
                />

                <InputForm
                    id="Role"
                    htmlFor="Role"
                    name="role"
                    as="select"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="manager">Manager</option>
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
