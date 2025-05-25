import Swal from "sweetalert2";
import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import * as API from "../../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CriteriaValuesForm from "./CriteriaValuesForm";

import { useMemo } from "react";

export default function CriteriaValuesList() {
    const [criteriaValues, setCriteriaValues] = useState([]);
    const [criteriaList, setCriteriaList] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        try {
            const res = await API.getCriteriaValues();
            setCriteriaValues(res.data);
            setFilteredData(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    const fetchCriteriaList = async () => {
        try {
            const res = await API.getCriteria();
            setCriteriaList(res.data);
        } catch (err) {
            console.error("Fetch criteria error:", err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCriteriaList();
    }, []);

    const handleSubmit = async (form) => {
        try {
            if (editing) {
                await API.updateCriteriaValue(editing.id, form);
            } else {
                await API.createCriteriaValue(form);
            }
            setEditing(null);
            fetchData();
        } catch (err) {
            console.error("Submit error:", err);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Data akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonColor: "#6b7280",
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Ya, hapus!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await API.deleteCriteriaValue(id);
                fetchData();
                Swal.fire({
                    title: "Deleted!",
                    text: "Data berhasil dihapus.",
                    icon: "success",
                });
            }
        });
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);

        const filtered = criteriaValues.filter((item) => {
            const valueFiltered = String(item.value || "").toLowerCase();
            const descriptionFiltered = (item.description || "").toLowerCase();
            const criteriaNameFiltered = (
                criteriaList.find(
                    (criteria) => criteria.id === item.criteria_id
                )?.name || ""
            ).toLowerCase();

            return (
                valueFiltered.includes(term) ||
                descriptionFiltered.includes(term) ||
                criteriaNameFiltered.includes(term)
            );
        });

        setFilteredData(filtered);
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Criteria Values");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blob, "criteria-values.xlsx");
    };

    // const columns = [
    //     {
    //         name: "Nama Kriteria",
    //         selector: (row) => {
    //             const criteria = criteriaList.find(
    //                 (c) => c.id === row.criteria_id
    //             );
    //             return criteria ? criteria.name : "Unknown";
    //         },
    //         sortable: true,
    //         maxWidth: "22em",
    //     },
    //     {
    //         name: "Nilai",
    //         selector: (row) => row.value,
    //         sortable: true,
    //         cell: (row) => row.value,
    //         maxWidth: "10em",
    //     },
    //     {
    //         name: "Deskripsi",
    //         selector: (row) => row.description,
    //         sortable: true,
    //     },
    //     {
    //         name: "Actions",
    //         cell: (row) => (
    //             <div className="space-x-2">
    //                 <button
    //                     onClick={() => {
    //                         setEditing(row);
    //                         setShowForm(true);
    //                     }}
    //                     className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
    //                 >
    //                     Edit
    //                 </button>
    //                 <button
    //                     onClick={() => handleDelete(row.id)}
    //                     className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
    //                 >
    //                     Delete
    //                 </button>
    //             </div>
    //         ),
    //         maxWidth: "15em",
    //     },
    // ];

    // const customStyles = {
    //     rows: {
    //         stripedStyle: { backgroundColor: "#f9fafb" },
    //     },
    //     columns: {
    //         value: {
    //             style: {
    //                 overflow: "hidden",
    //                 textOverflow: "ellipsis",
    //                 whiteSpace: "nowrap",
    //             },
    //         },
    //     },
    //     headCells: {
    //         style: {
    //             backgroundColor: "#1f2937",
    //             color: "white",
    //             fontWeight: "bold",
    //         },
    //     },
    // };

    console.log("criteria list : ", criteriaList);

    return (
        <div className="p-6 space-y-4 bg-white rounded shadow-md max-w-8xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700">
                Penilaian Kriteria
            </h2>
            <hr />

            <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    setEditing(null);
                    setShowForm(true);
                }}
            >
                Tambah Penilaian Kriteria
            </button>

            <CriteriaValuesForm
                mode={editing ? "edit" : "add"}
                onSubmit={handleSubmit}
                initialData={editing}
                showForm={showForm}
                setShowForm={setShowForm}
                criteriaList={criteriaList}
            />

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="border border-gray-300 rounded px-3 py-1 w-1/3"
                />
                <button
                    onClick={handleExport}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Download Excel
                </button>
            </div>

            <table className="w-full table-auto border border-gray-300 text-sm">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="border p-2 py-3">Nama</th>
                        <th className="border p-2 py-3">Nilai</th>
                        <th className="border p-2 py-3">Deskripsi</th>
                        <th className="border p-2 py-3 w-[20%]">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {useMemo(() => {
                        const grouped = {};

                        // Kelompokkan data berdasarkan criteria_id
                        for (const item of filteredData) {
                            if (!grouped[item.criteria_id]) {
                                grouped[item.criteria_id] = [];
                            }
                            grouped[item.criteria_id].push(item);
                        }

                        // Ubah menjadi array baris JSX dengan rowSpan
                        const rows = [];
                        for (const criteria_id in grouped) {
                            const group = grouped[criteria_id];
                            const criteriaName =
                                criteriaList.find(
                                    (c) => c.id === parseInt(criteria_id)
                                )?.name || "Unknown";

                            group.forEach((item, index) => {
                                rows.push(
                                    <tr
                                        key={item.id}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                                    >
                                        {index === 0 && (
                                            <td
                                                className="border p-2 align-top"
                                                rowSpan={group.length}
                                            >
                                                {criteriaName}
                                            </td>
                                        )}
                                        <td className="border p-2">
                                            {item.value}
                                        </td>
                                        <td className="border p-2">
                                            {item.description}
                                        </td>
                                        <td className="border p-2 flex gap-4 justify-center">
                                            <button
                                                onClick={() => {
                                                    setEditing(item);
                                                    setShowForm(true);
                                                }}
                                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            });
                        }

                        return rows;
                    }, [filteredData, criteriaList])}
                </tbody>
            </table>

            {/* <table className="w-full table-auto border border-gray-300 text-sm">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="border p-2 py-3">Nama</th>
                        <th className="border p-2 py-3">Nilai</th>
                        <th className="border p-2 py-3">Deskripsi</th>
                        <th className="border p-2 py-3 w-[20%]">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((criteriaValues) => (
                        <tr
                            key={criteriaValues.id}
                            className="odd:bg-white even:bg-gray-50 hover:bg-gray-200 cursor-pointer"
                        >
                            <td className="border p-2">
                                {
                                    criteriaList.find(
                                        (c) =>
                                            c.id === criteriaValues.criteria_id
                                    ).name
                                }
                            </td>
                            <td className="border p-2">
                                {criteriaValues.value}
                            </td>
                            <td className="border p-2">
                                {criteriaValues.description}
                            </td>
                            <td className="border p-2 flex gap-4 justify-center">
                                <button
                                    onClick={() => {
                                        setEditing(criteriaValues);
                                        setShowForm(true);
                                    }}
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(criteriaValues.id)
                                    }
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            {/* 
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles}
                defaultSortField="Nama Kriteria"
                defaultSortAsc={false}
            /> */}
        </div>
    );
}
