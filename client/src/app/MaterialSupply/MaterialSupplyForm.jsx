import InputForm from "@/components/Elements/Input";
import { useEffect, useState } from "react";

export default function MaterialTypeForm({
    mode = "add",
    onSubmit,
    initialData = {},
    showForm,
    setShowForm,
}) {
    const [form, setForm] = useState({
        type_name: "",
        description: "",
    });

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setForm(initialData);
        } else {
            setForm({ type_name: "", description: "" });
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
                        ? "Edit Jenis Material"
                        : "Tambah Jenis Material"}
                </h2>
                <InputForm
                    id="Jenis Material"
                    htmlFor="Jenis Material"
                    name="type_name"
                    type="text"
                    placeholder="Masukkan nama jenis material"
                    value={form.type_name}
                    onChange={handleChange}
                />
                <InputForm
                    id="Deskripsi"
                    htmlFor="Deskripsi"
                    name="description"
                    type="text"
                    placeholder="Masukkan deskripsi (opsional)"
                    value={form.description}
                    onChange={handleChange}
                />
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
                            : "Tambah Material"}
                    </button>
                </div>
            </form>
        </div>
    );
}
