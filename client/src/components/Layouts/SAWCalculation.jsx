import React, { useEffect, useState } from 'react';
import { getCriteria, getSuppliers, getSupplierCriteriaValues } from '../../api/api';
import { Card, CardContent } from '@/components/ui/card';

const SAWCalculation = () => {
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
        if (criteria.length && suppliers.length && supplierCriteriaValues.length) {
            calculateSAW();
        }
    }, [criteria, suppliers, supplierCriteriaValues]);

    const calculateSAW = () => {
        const normalized = {};
        criteria.forEach((crit) => {
            const critValues = suppliers.map((sup) => {
                const val = supplierCriteriaValues.find(
                    (scv) => scv.supplier_id === sup.id && scv.criteria_id === crit.id
                );
                return val ? val.value : 0;
            });
            const max = Math.max(...critValues);
            const min = Math.min(...critValues);

            suppliers.forEach((sup) => {
                const val = supplierCriteriaValues.find(
                    (scv) => scv.supplier_id === sup.id && scv.criteria_id === crit.id
                );
                const rawValue = val ? val.value : 0;
                const normalizedValue =
                    crit.type === 'benefit'
                        ? rawValue / max
                        : min / rawValue;
                if (!normalized[sup.id]) normalized[sup.id] = {};
                normalized[sup.id][crit.id] = normalizedValue;
            });
        });

        const scored = suppliers.map((sup) => {
            let totalScore = 0;
            criteria.forEach((crit) => {
                totalScore += normalized[sup.id][crit.id] * parseFloat(crit.weight);
            });
            return { supplier: sup, score: totalScore };
        });

        scored.sort((a, b) => b.score - a.score);
        setResults(scored);
    };

    return (
        <div className="p-4 space-y-4">
            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-4">Matriks Nilai Alternatif (Supplier)</h2>
                    <table className="w-full table-auto border">
                        <thead>
                            <tr>
                                <th className="border p-2">Supplier</th>
                                {criteria.map((crit) => (
                                    <th key={crit.id} className="border p-2">
                                        {crit.name} ({crit.weight})
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((sup) => (
                                <tr key={sup.id}>
                                    <td className="border p-2">{sup.initial}</td>
                                    {criteria.map((crit) => {
                                        const val = supplierCriteriaValues.find(
                                            (scv) => scv.supplier_id === sup.id && scv.criteria_id === crit.id
                                        );
                                        return <td key={crit.id} className="border p-2">{val ? val.value : '-'}</td>;
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-4">Hasil Perhitungan SAW</h2>
                    <table className="w-full table-auto border">
                        <thead>
                            <tr>
                                <th className="border p-2">Peringkat</th>
                                <th className="border p-2">Supplier</th>
                                <th className="border p-2">Total Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((res, index) => (
                                <tr key={res.supplier.id}>
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{res.supplier.initial}</td>
                                    <td className="border p-2">{res.score.toFixed(4)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-4">Catatan</h2>
                    <div className="mb-4">
                        <h3 className="font-semibold">Daftar Supplier:</h3>
                        <ul className="list-disc ml-6">
                            {suppliers.map((sup) => (
                                <li key={sup.id}>
                                    {sup.initial}: {sup.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Deskripsi Kriteria:</h3>
                        <ul className="list-disc ml-6">
                            {criteria.map((crit) => (
                                <li key={crit.id}>
                                    {crit.name} ({crit.weight}): {crit.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SAWCalculation;
