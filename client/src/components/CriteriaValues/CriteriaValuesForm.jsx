import { useEffect, useState } from "react";
import InputForm from "../Elements/Input";

export default function CriteriaValuesForm({
    mode = "add",
    onSubmit,
    initialData = {},
    showForm,
    setShowForm,
    criteriaList, // daftar kriteria yang akan dipilih
}) {
    const [form, setForm] = useState({
        criteria_id: "",
        value: "",
        description: "",
    });

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setForm(initialData);
        } else {
            setForm({ criteria_id: "", value: "", description: "" });
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
                    {mode === "edit" ? "Edit Penilaian Kriteria" : "Tambah Penilaian Kriteria"}
                </h2>
                <div className="mb-4">
                    <label className="block text-slate-700 text-sm font-bold mb-2">
                        Nama Kriteria
                    </label>
                    <select
                        name="criteria_id"
                        className="text-sm border rounded w-full py-2 px-3 text-slate-700"
                        value={form.criteria_id}
                        onChange={handleChange}
                    >
                        <option value="">Pilih Kriteria</option>
                        {criteriaList.map((criteria) => (
                            <option key={criteria.id} value={criteria.id}>
                                {criteria.name}
                            </option>
                        ))}
                    </select>
                </div>

                <InputForm
                    id="Value"
                    htmlFor="Value"
                    name="value"
                    type="text"
                    placeholder="Nilai"
                    value={form.value}
                    onChange={handleChange}
                />
                <InputForm
                    id="Deskripsi"
                    htmlFor="Deskripsi"
                    name="description"
                    as="textarea"
                    placeholder="Deskripsi Nilai"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                />

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
                            : "Tambah Nilai Kriteria"}
                    </button>
                </div>
            </form>
        </div>
    );
}
