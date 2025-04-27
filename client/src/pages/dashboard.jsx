import SideNav from "../components/Fragments/SideNav";
import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card"; // pakai shadcn/ui
import { Card, CardContent } from "../components/ui/card"; // pakai shadcn/ui
import { BarChart3, Users2, FileText, Trophy } from "lucide-react";
import ContainerPage from "@/components/Layouts/ContainerPages";

const Dashboard = () => {
    const [data, setData] = useState({
        totalAlternatif: 2,
        totalKriteria: 3,
        totalPenilaian: 6,
        hasilTerbaik: "Supplier A",
    });

    return (
        <ContainerPage>
                <h1 className="text-2xl font-bold mb-4 text-slate-800">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-blue-100 shadow-md">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-sm text-gray-600">
                                    Total Alternatif
                                </h2>
                                <p className="text-2xl font-bold">
                                    {data.totalAlternatif}
                                </p>
                            </div>
                            <Users2 className="text-blue-500 w-8 h-8" />
                        </CardContent>
                    </Card>

                    <Card className="bg-green-100 shadow-md">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-sm text-gray-600">
                                    Total Kriteria
                                </h2>
                                <p className="text-2xl font-bold">
                                    {data.totalKriteria}
                                </p>
                            </div>
                            <FileText className="text-green-500 w-8 h-8" />
                        </CardContent>
                    </Card>

                    <Card className="bg-yellow-100 shadow-md">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-sm text-gray-600">
                                    Total Penilaian
                                </h2>
                                <p className="text-2xl font-bold">
                                    {data.totalPenilaian}
                                </p>
                            </div>
                            <BarChart3 className="text-yellow-500 w-8 h-8" />
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-100 shadow-md">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-sm text-gray-600">
                                    Hasil Terbaik
                                </h2>
                                <p className="text-xl font-bold">
                                    {data.hasilTerbaik}
                                </p>
                            </div>
                            <Trophy className="text-purple-500 w-8 h-8" />
                        </CardContent>
                    </Card>
                </div>
        </ContainerPage>
    );
};

export default Dashboard;

{
    /* <h1 className="text-xl font-bold text-slate-800 mt-4.5 underline underline-offset-8">Welcome, Bagus Maulana</h1> */
}
