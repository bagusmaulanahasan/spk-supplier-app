// Contoh untuk SupplierCriteriaValues

const Table = () => {
    <table className="w-full table-auto border border-gray-300 text-sm">
        <thead>
            <tr className="bg-gray-800 text-white">
                <th className="border p-2 py-3">Alternatif (Suppliers)</th>
                <th className="border p-2 py-3">Kriteria</th>
                <th className="border p-2 py-3">Nilai</th>
                <th className="border p-2 py-3 w-[20%]">Aksi</th>
            </tr>
        </thead>
        <tbody>
            {filteredData.map((criteriaSupplier) => (
                <tr
                    key={criteriaSupplier.id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-200 cursor-pointer"
                >
                    <td className="border p-2">
                        {criteriaSupplier.supplierName}
                    </td>
                    <td className="border p-2">
                        {criteriaSupplier.criteriaName}
                    </td>
                    <td className="border p-2">{criteriaSupplier.value}</td>
                    <td className="border p-2 flex gap-4 justify-center">
                        <button
                            onClick={() => {
                                setEditing(criteriaSupplier);
                                setShowForm(true);
                            }}
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(criteria.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>;
};

export default Table;