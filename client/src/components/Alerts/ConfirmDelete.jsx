import Swal from "sweetalert2";

const ConfirmDeleteAlert = (api, fetchData) => {
    Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonColor: "#6b7280",
        cancelButtonText: "Batal",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            await api();
            fetchData();
            Swal.fire({
                title: "Deleted!",
                text: "Data berhasil dihapus.",
                icon: "success",
            });
        }
    });
};

export default ConfirmDeleteAlert;
