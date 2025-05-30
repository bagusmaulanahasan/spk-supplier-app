import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
// import axios from "axios";
import { getResults, getSuppliers } from "@/api/api";

const BarChartResponsive = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchDataAndRenderChart = async () => {
            try {
                const [resultsRes, suppliersRes] = await Promise.all([
                    getResults(),
                    getSuppliers(),
                ]);

                const results = resultsRes.data;
                const suppliers = suppliersRes.data;

                // Ambil result terbaru (filter by created_at jika perlu, atau by id terbanyak)
                const uniqueMap = new Map();
                results
                    .sort((a, b) => b.id - a.id) // Ambil yang terbaru
                    .forEach((res) => {
                        if (!uniqueMap.has(res.supplier_id)) {
                            uniqueMap.set(res.supplier_id, res);
                        }
                    });

                const latestResults = Array.from(uniqueMap.values());

                // Gabungkan dengan nama supplier
                const labeledResults = latestResults.map((res) => {
                    const supplier = suppliers.find((s) => s.id === res.supplier_id);
                    return {
                        label: supplier ? supplier.name : `Supplier ${res.supplier_id}`,
                        score: parseFloat(res.score),
                    };
                });

                const labels = labeledResults.map((r) => r.label);
                const scores = labeledResults.map((r) => r.score);

                const ctx = chartRef.current.getContext("2d");

                const backgroundColors = [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(75, 192, 192, 0.5)",  
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                    "rgba(100, 255, 218, 0.5)",
                    "rgba(255, 120, 220, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                ];
                
                const borderColors = backgroundColors.map((color) =>
                    color.replace("0.5", "1")
                );
                
                const myChart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Total Skor Supplier",
                                data: scores,
                                // backgroundColor: "rgba(75, 192, 192, 0.5)",
                                backgroundColor: backgroundColors.slice(0, scores.length),
                                borderColor: "rgba(75, 192, 192, 1)",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });

                return () => {
                    myChart.destroy();
                };
            } catch (error) {
                console.error("Gagal mengambil data chart:", error);
            }
        };

        fetchDataAndRenderChart();
    }, []);

    return (
        <div className="h-96 mt-12">
            <canvas ref={chartRef} />
        </div>
    );
};

export default BarChartResponsive;

