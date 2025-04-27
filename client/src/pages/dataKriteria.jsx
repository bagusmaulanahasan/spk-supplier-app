import { useState } from "react";
import SideNav from "../components/Fragments/SideNav";
import ContainerPage from "@/components/Layouts/ContainerPages";

const DataKriteria = () => {
    const [kriteria, setKriteria] = useState([
        { id: "C1", nama: "Harga", bobot: 0.4, tipe: "cost" },
        { id: "C2", nama: "Kualitas", bobot: 0.3, tipe: "benefit" },
    ]);
    const [form, setForm] = useState({ nama: "", bobot: "", tipe: "benefit" });

    const handleAdd = () => {
        const newId = `C${kriteria.length + 1}`;
        setKriteria([
            ...kriteria,
            { id: newId, ...form, bobot: parseFloat(form.bobot) },
        ]);
        setForm({ nama: "", bobot: "", tipe: "benefit" });
    };

    return (
        <ContainerPage>
            <h2 className="text-xl font-bold mb-4 text-slate-800">Data Kriteria</h2>
            <input
                className="border px-3 py-2 mr-2"
                type="text"
                placeholder="Nama Kriteria"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
            <input
                className="border px-3 py-2 mr-2"
                type="number"
                placeholder="Bobot"
                value={form.bobot}
                onChange={(e) => setForm({ ...form, bobot: e.target.value })}
            />
            <select
                className="border px-3 py-2 mr-2"
                value={form.tipe}
                onChange={(e) => setForm({ ...form, tipe: e.target.value })}
            >
                <option value="benefit">Benefit</option>
                <option value="cost">Cost</option>
            </select>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAdd}
            >
                Tambah
            </button>

            <ul className="mt-4 list-disc list-inside">
                {kriteria.map((kr) => (
                    <li key={kr.id}>
                        {kr.id} - {kr.nama} (Bobot: {kr.bobot}, Tipe: {kr.tipe})
                    </li>
                ))}
            </ul>
        </ContainerPage>
    );
};

export default DataKriteria;
