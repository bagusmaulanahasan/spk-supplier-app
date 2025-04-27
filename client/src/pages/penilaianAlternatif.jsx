import { useState } from "react";
import SideNav from "../components/Fragments/SideNav";
import ContainerPage from "@/components/Layouts/ContainerPages";

const PenilaianAlternatif = () => {
    const [alternatif] = useState([
        { id: "A1", nama: "Supplier A" },
        { id: "A2", nama: "Supplier B" },
    ]);

    const [kriteria] = useState([
        { id: "C1", nama: "Harga" },
        { id: "C2", nama: "Kualitas" },
    ]);

    const [nilai, setNilai] = useState({
        A1: { C1: 70, C2: 80 },
        A2: { C1: 90, C2: 60 },
    });

    const handleChange = (altId, kritId, val) => {
        setNilai((prev) => ({
            ...prev,
            [altId]: {
                ...prev[altId],
                [kritId]: parseFloat(val),
            },
        }));
    };

    return (
        <ContainerPage>
            <h2 className="text-xl font-bold mb-4 text-slate-800">Penilaian Alternatif</h2>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Alternatif</th>
                        {kriteria.map((k) => (
                            <th key={k.id} className="border px-4 py-2">
                                {k.nama}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {alternatif.map((alt) => (
                        <tr key={alt.id}>
                            <td className="border px-4 py-2">{alt.nama}</td>
                            {kriteria.map((k) => (
                                <td key={k.id} className="border px-4 py-2">
                                    <input
                                        type="number"
                                        className="border px-2 py-1 w-full"
                                        value={nilai[alt.id]?.[k.id] || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                alt.id,
                                                k.id,
                                                e.target.value
                                            )
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </ContainerPage>
    );
};

export default PenilaianAlternatif;
