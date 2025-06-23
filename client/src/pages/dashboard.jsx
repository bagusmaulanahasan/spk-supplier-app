import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card"; // pakai shadcn/ui
import { Card, CardContent } from "../components/ui/card"; // pakai shadcn/ui
import { Package, Users2, FileText, Trophy } from "lucide-react";
import ContainerPage from "@/components/Layouts/ContainerPages";
import { Link } from "react-router-dom";

import {
    getCriteria,
    getSuppliers,
    getSupplierCriteriaValues,
    getMaterialTypes,
} from "../api/api";
import BarChart from "@/components/BarChart";
// import SupplierList from "@/components/Suppliers/SupplierList";

const Dashboard = () => {

    const [criteria, setCriteria] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplierCriteriaValues, setSupplierCriteriaValues] = useState([]);
    const [materialTypes, setMaterialTypes] = useState([])
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [criteriaRes, suppliersRes, scvRes, materialTypesRes] = await Promise.all([
                getCriteria(),
                getSuppliers(),
                getSupplierCriteriaValues(),
                getMaterialTypes(),
            ]);
            setCriteria(criteriaRes.data);
            setSuppliers(suppliersRes.data);
            setSupplierCriteriaValues(scvRes.data);
            setMaterialTypes(materialTypesRes.data)
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

    console.log('material-type : ',materialTypes)

    return (
        <ContainerPage>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4 text-slate-800">
                    Dashboard
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* <Link to="/alternatif"> */}
                    <div>
                        <Card className="bg-blue-100 shadow-md h-full">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm text-gray-600">
                                        Total Supplier (Alternatif)
                                    </h2>
                                    <p className="text-2xl font-bold">
                                        {
                                            suppliers.map(
                                                (supplier) => supplier.name
                                            ).length
                                        }
                                    </p>
                                </div>
                                <Users2 className="text-blue-500 w-8 h-8" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* <Link to="/kriteria"> */}
                    <div>
                        <Card className="bg-green-100 shadow-md h-full">
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
                    </div>

                    {/* <Link to="/material-supply"> */}
                    <div>
                        <Card className="bg-yellow-100 shadow-md h-full">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm text-gray-600">
                                        Total Material Supply
                                    </h2>
                                    <p className="text-2xl font-bold">
                                        {materialTypes.length}
                                    </p>
                                </div>
                                <Package className="text-yellow-500 w-8 h-8" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* <Link to="/hasil-perhitungan"> */}
                    <div>
                        <Card className="bg-purple-100 shadow-md h-full">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm text-gray-600">
                                        Supplier Terbaik dari berbagai Material
                                    </h2>
                                    <p className="text-xl font-bold">
                                        {results.length > 0
                                            ? results[0].supplier.name
                                            : ""}
                                    </p>
                                </div>
                                <Trophy className="text-purple-500 w-8 h-8" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <BarChart></BarChart>
            </div>
        </ContainerPage>
    );
};

export default Dashboard;
