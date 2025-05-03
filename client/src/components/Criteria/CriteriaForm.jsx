import { useEffect, useState } from "react";
import InputForm from "../Elements/Input";

export default function CriteriaForm({
    mode = "add",
    onSubmit,
    initialData = {},
    showForm,
    setShowForm,
}) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        type: "cost",
        weight: 0.0,
    });

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setForm(initialData);
        } else {
            setForm({ name: "", description: "", type: "cost", weight: 0.0 });
        }
    }, [initialData, mode, showForm]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        let newValue = value;
        if (type === "number") {
            newValue = value === "" ? "" : parseFloat(value);
        }

        setForm({ ...form, [name]: newValue });
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
                    {mode === "edit" ? "Edit Kriteria" : "Tambah Kriteria"}
                </h2>
                <InputForm
                    id="Nama"
                    htmlFor="Nama"
                    name="name"
                    type="text"
                    placeholder="Nama Kriteria"
                    value={form.name}
                    onChange={handleChange}
                />
                <InputForm
                    id="Deskripsi"
                    htmlFor="Deskripsi"
                    name="description"
                    as="textarea"
                    placeholder="Deskripsi Kriteria"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                />
                <InputForm
                    id="Bobot"
                    htmlFor="Bobot"
                    name="weight"
                    type="number"
                    placeholder="Bobot Kriteria"
                    value={form.weight}
                    onChange={handleChange}
                />
                <div className="mb-4">
                    <label className="block text-slate-700 text-sm font-bold mb-2">
                        Kategori
                    </label>
                    <select
                        name="type"
                        className="text-sm border rounded w-full py-2 px-3 text-slate-700"
                        value={form.type}
                        onChange={handleChange}
                    >
                        <option value="cost">Cost</option>
                        <option value="benefit">Benefit</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2">
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
                            : "Tambah Kriteria"}
                    </button>
                </div>
            </form>
        </div>
    );
}
