import { useEffect, useState } from "react";
import ContainerPage from "@/components/Layouts/ContainerPages";
import DataSupplier from '../data/dataSuppplier.json'


const DataHasilKeputusan = () => {
    // Dummy hasil perhitungan (bisa nanti ambil dari context atau props kalau sudah dinamis)
    const [hasil, setHasil] = useState([]);

    useEffect(() => {
        // Hasil ini bisa dari proses perhitungan atau file json
        // const hasilPerhitungan = [
        //     { nama: "Supplier A", nilaiAkhir: 0.8 },
        //     { nama: "Supplier B", nilaiAkhir: 0.6 },
        // ];
        const hasilPerhitungan = [
            { nama: "Supplier A", nilaiAkhir: 0.8 },
            { nama: "Supplier B", nilaiAkhir: 0.6 },
        ];

        // Urutkan berdasarkan nilai tertinggi
        hasilPerhitungan.sort((a, b) => b.nilaiAkhir - a.nilaiAkhir);

        // Tambahkan ranking
        const hasilDenganRanking = hasilPerhitungan.map((item, index) => ({
            ...item,
            ranking: index + 1,
        }));

        setHasil(hasilDenganRanking);
    }, []);

    return (
        <ContainerPage>
            <h2 className="text-xl font-bold mb-4t ext-slate-800">Hasil Keputusan Akhir</h2>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Ranking</th>
                        <th className="border px-4 py-2">Alternatif</th>
                        <th className="border px-4 py-2">Nilai Akhir</th>
                    </tr>
                </thead>
                <tbody>
                    {hasil.map((item, index) => (
                        <tr
                            key={index}
                            className={item.ranking === 1 ? "bg-green-100" : ""}
                        >
                            <td className="border px-4 py-2 text-center">
                                {item.ranking}
                            </td>
                            <td className="border px-4 py-2">{item.nama}</td>
                            <td className="border px-4 py-2 text-center">
                                {item.nilaiAkhir}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ContainerPage>
    );
};

export default DataHasilKeputusan;
