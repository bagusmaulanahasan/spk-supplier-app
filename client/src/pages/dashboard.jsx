import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card"; // pakai shadcn/ui
import { Card, CardContent } from "../components/ui/card"; // pakai shadcn/ui
import { BarChart3, Users2, FileText, Trophy } from "lucide-react";
import ContainerPage from "@/components/Layouts/ContainerPages";

import {
    getCriteria,
    getSuppliers,
    getSupplierCriteriaValues,
} from "../api/api";

const Dashboard = () => {
    const [data, setData] = useState({
        totalAlternatif: 2,
        totalKriteria: 3,
        totalPenilaian: 6,
        hasilTerbaik: "Supplier A",
    });

    const [criteria, setCriteria] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplierCriteriaValues, setSupplierCriteriaValues] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [criteriaRes, suppliersRes, scvRes] = await Promise.all([
                getCriteria(),
                getSuppliers(),
                getSupplierCriteriaValues(),
            ]);
            setCriteria(criteriaRes.data);
            setSuppliers(suppliersRes.data);
            setSupplierCriteriaValues(scvRes.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (
            criteria.length &&
            suppliers.length &&
            supplierCriteriaValues.length
        ) {
            calculateSAW();
        }
    }, [criteria, suppliers, supplierCriteriaValues]);

    const calculateSAW = () => {
        const normalized = {};
        criteria.forEach((crit) => {
            const critValues = suppliers.map((sup) => {
                const val = supplierCriteriaValues.find(
                    (scv) =>
                        scv.supplier_id === sup.id &&
                        scv.criteria_id === crit.id
                );
                return val ? val.value : 0;
            });
            const max = Math.max(...critValues);
            const min = Math.min(...critValues);

            suppliers.forEach((sup) => {
                const val = supplierCriteriaValues.find(
                    (scv) =>
                        scv.supplier_id === sup.id &&
                        scv.criteria_id === crit.id
                );
                const rawValue = val ? val.value : 0;
                const normalizedValue =
                    crit.type === "benefit" ? rawValue / max : min / rawValue;
                if (!normalized[sup.id]) normalized[sup.id] = {};
                normalized[sup.id][crit.id] = normalizedValue;
            });
        });

        const scored = suppliers.map((sup) => {
            let totalScore = 0;
            criteria.forEach((crit) => {
                totalScore +=
                    normalized[sup.id][crit.id] * parseFloat(crit.weight);
            });
            return { supplier: sup, score: totalScore };
        });

        scored.sort((a, b) => b.score - a.score);
        setResults(scored);
    };

    return (
        <ContainerPage>
            <h1 className="text-2xl font-bold mb-4 text-slate-800">
                Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-blue-100 shadow-md">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm text-gray-600">
                                Total Alternatif
                            </h2>
                            <p className="text-2xl font-bold">
                                {
                                    suppliers.map((supplier) => supplier.name)
                                        .length
                                }
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
                                {criteria.map((c) => c.name).length}
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
                                {supplierCriteriaValues.length}
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
                                {results.length > 0
                                    ? results[0].supplier.name
                                    : ""}
                            </p>{" "}
                            <p className="text-slate-600">
                                (
                                {results.length > 0
                                    ? results[0].supplier.initial
                                    : ""}
                                )
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
