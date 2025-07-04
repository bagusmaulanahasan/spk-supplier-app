import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import * as API from "../../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import UserForm from "./UserForm";
import Swal from "sweetalert2";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        try {
            const res = await API.getUsers();
            setUsers(res.data);
            setFilteredData(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (form) => {
        try {
            if (editing) {
                await API.updateUser(editing.id, form);
            } else {
                await API.createUser(form);
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
                await API.deleteUser(id);
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
        const filtered = users.filter(
            (item) =>
                item.username.toLowerCase().includes(term) ||
                item.role.toLowerCase().includes(term)
        );
        setFilteredData(filtered);
    };

    const handleExport = () => {
        const exportData = filteredData.map(({ id, username, role }) => ({
            ID: id,
            Username: username,
            Role: role,
        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blob, "users.xlsx");
    };

    const columns = [
        { name: "Username", selector: (row) => row.username, sortable: true },
        { name: "Nama", selector: (row) => row.name, sortable: true },
        { name: "Role", selector: (row) => row.role, sortable: true },
        {
            name: "Actions",
            cell: (row) => (
                <div className="space-x-2">
                    <button
                        onClick={() => {
                            setEditing(row);
                            setShowForm(true);
                        }}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    // const customStyles = {
    //     rows: {
    //         style: { minHeight: "48px" },
    //         stripedStyle: { backgroundColor: "#f9fafb" },
    //     },
    //     headCells: {
    //         style: {
    //             backgroundColor: "#1f2937",
    //             color: "white",
    //             fontWeight: "bold",
    //         },
    //     },
    // };

    return (
        <div className="p-6 space-y-4 bg-white rounded shadow-md max-w-8xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700">
                Data Pengguna
            </h2>
            <hr />

            <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    setEditing(null);
                    setShowForm(true);
                }}
            >
                Tambah Pengguna
            </button>

            <UserForm
                mode={editing ? "edit" : "add"}
                onSubmit={handleSubmit}
                initialData={editing}
                showForm={showForm}
                setShowForm={setShowForm}
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
                        <th className="border p-2 py-3">Username</th>
                        <th className="border p-2 py-3">Nama</th>
                        <th className="border p-2 py-3">Role</th>
                        <th className="border p-2 py-3 w-[20%]">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((user) => (
                        <tr
                            key={user.id}
                            className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                        >
                            <td className="border p-2">{user.username}</td>
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2 flex gap-4 justify-center">
                                    <button
                                        onClick={() => {
                                            setEditing(user);
                                            setShowForm(true);
                                        }}
                                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles}
            /> */}
        </div>
    );
}
