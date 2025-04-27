import { useState } from "react";
import SideNav from "../components/Fragments/SideNav";
import ContainerPage from "@/components/Layouts/ContainerPages";
import DataSupplier from '../data/dataSuppplier.json'

const DataAlternatif = () => {
    // const [alternatif, setAlternatif] = useState([
    //     { id: "A1", nama: "Supplier A" },
    //     { id: "A2", nama: "Supplier B" },
    // ]);
    const [alternatif, setAlternatif] = useState(DataSupplier.alternatif);
    const [newNama, setNewNama] = useState("");

    const handleAdd = () => {
        const newId = `A${alternatif.length + 1}`;
        setAlternatif([...alternatif, { id: newId, nama: newNama }]);
        setNewNama("");
    };

    return (
        <ContainerPage>
            <h2 className="text-xl font-bold mb-4 text-slate-800">Data Alternatif</h2>
            <input
                className="border px-3 py-2 mr-2"
                type="text"
                value={newNama}
                onChange={(e) => setNewNama(e.target.value)}
                placeholder="Nama Supplier"
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAdd}
            >
                Tambah
            </button>
            <ul className="mt-4 list-disc list-inside">
                {alternatif.map((alt) => (
                    <li key={alt.id}>
                        {alt.id} - {alt.nama}
                    </li>
                ))}
            </ul>
        </ContainerPage>
    );
};

export default DataAlternatif;
