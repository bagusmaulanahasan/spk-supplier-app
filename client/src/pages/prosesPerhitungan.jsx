import { useEffect, useState } from "react";
import SideNav from "../components/Fragments/SideNav";
import ContainerPage from "@/components/Layouts/ContainerPages";

const ProsesPerhitungan = () => {
    // Dummy data
    const kriteria = [
        { id: "C1", nama: "Harga", bobot: 0.4, sifat: "cost" },
        { id: "C2", nama: "Kualitas", bobot: 0.6, sifat: "benefit" },
    ];

    const alternatif = [
        { id: "A1", nama: "Supplier A" },
        { id: "A2", nama: "Supplier B" },
    ];

    const penilaian = {
        A1: { C1: 70, C2: 80 },
        A2: { C1: 90, C2: 60 },
    };

    const [hasil, setHasil] = useState([]);

    useEffect(() => {
        const normalisasi = {};
        const hasilAkhir = [];

        // 1. Normalisasi
        kriteria.forEach((krit) => {
            const nilaiKriteria = alternatif.map(
                (alt) => penilaian[alt.id][krit.id]
            );
            const max = Math.max(...nilaiKriteria);
            const min = Math.min(...nilaiKriteria);

            alternatif.forEach((alt) => {
                const nilai = penilaian[alt.id][krit.id];
                const norm =
                    krit.sifat === "benefit" ? nilai / max : min / nilai;

                if (!normalisasi[alt.id]) normalisasi[alt.id] = {};
                normalisasi[alt.id][krit.id] = norm;
            });
        });

        // 2. Menghitung nilai akhir
        alternatif.forEach((alt) => {
            let total = 0;
            kriteria.forEach((krit) => {
                total += normalisasi[alt.id][krit.id] * krit.bobot;
            });
            hasilAkhir.push({ nama: alt.nama, nilaiAkhir: total.toFixed(4) });
        });

        // 3. Sorting
        hasilAkhir.sort((a, b) => b.nilaiAkhir - a.nilaiAkhir);

        setHasil(hasilAkhir);
    }, []);

    return (
        <ContainerPage>
            <h2 className="text-xl font-bold mb-4 text-slate-800">Proses Perhitungan</h2>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Alternatif</th>
                        <th className="border px-4 py-2">Nilai Akhir</th>
                    </tr>
                </thead>
                <tbody>
                    {hasil.map((h, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{h.nama}</td>
                            <td className="border px-4 py-2">{h.nilaiAkhir}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ContainerPage>
    );
};

export default ProsesPerhitungan;
