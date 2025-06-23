    import {
        Home,
        Users,
        ListOrdered,
        Sliders,
        FileBarChart2,
        Calculator,
        CheckCircle,
    } from "lucide-react";

    const role = localStorage.getItem("role");

    const listSideNav = [
        // Dashboard tersedia untuk admin, kepala bagian
        ...(role === "admin" || role === "kepala bagian"
            ? [
                {
                    title: "Dashboard",
                    icon: <Home size={18} />,
                    path: "/dashboard",
                },
            ]
            : []),

        // Menu khusus untuk admin
        ...(role === "admin"
            ? [
                {
                    title: "Data Material Supply",
                    icon: <FileBarChart2 size={18} />,
                    path: "/material-supply",
                },
                {
                    title: "Data Alternatif",
                    icon: <ListOrdered size={18} />,
                    path: "/alternatif",
                },
                {
                    title: "Data Kriteria",
                    icon: <Sliders size={18} />,
                    path: "/kriteria",
                },
                {
                    title: "Penilaian Kriteria",
                    icon: <Calculator size={18} />,
                    path: "/penilaian-kriteria",
                },
                {
                    title: "Penilaian Alternatif",
                    icon: <FileBarChart2 size={18} />,
                    path: "/penilaian-alternatif",
                },
            ]
            : []),

        // Menu khusus untuk kepala bagian
        ...(role === "kepala bagian"
            ? [
                {
                    title: "Data Pengguna",
                    icon: <Users size={18} />,
                    path: "/pengguna",
                },
            ]
            : []),

        // Data Hasil Keputusan untuk semua role kecuali yang tidak disebut
        ...(role === "admin" || role === "kepala bagian"
            ? [
                {
                    title: "Data Hasil Keputusan",
                    icon: <CheckCircle size={18} />,
                    path: "/hasil-perhitungan",
                },
            ]
            : []),
    ];

    export default listSideNav;

    // import {
    //     Home,
    //     Users,
    //     ListOrdered,
    //     Sliders,
    //     FileBarChart2,
    //     Calculator,
    //     CheckCircle,
    // } from "lucide-react";

    // const menuKepalaBagian = {
    //     title: "Data Pengguna",
    //     icon: <Users size={18} />,
    //     path: "/pengguna"
    // }

    // const listSideNav = [
    //     {
    //         title: "Dashboard",
    //         icon: <Home size={18} />,
    //         path: "/dashboard",
    //     },
    //     ...(localStorage.getItem("role") === "kepala bagian" ? [menuKepalaBagian] : []),
    //     {
    //         title: "Data Material Supply",
    //         icon: <FileBarChart2 size={18} />,
    //         path: "/material-supply",
    //     },
    //     {
    //         title: "Data Alternatif",
    //         icon: <ListOrdered size={18} />,
    //         path: "/alternatif",
    //     },
    //     {
    //         title: "Data Kriteria",
    //         icon: <Sliders size={18} />,
    //         path: "/kriteria"
    //     },
    //     {
    //         title: "Penilaian Kriteria",
    //         icon: <Calculator size={18} />,
    //         path: "/penilaian-kriteria",
    //     },
    //     {
    //         title: "Penilaian Alternatif",
    //         icon: <FileBarChart2 size={18} />,
    //         path: "/penilaian-alternatif",
    //     },
    //     {
    //         title: "Data Hasil Keputusan",
    //         icon: <CheckCircle size={18} />,
    //         path: "/hasil-perhitungan",
    //     },
    // ];

    // export default listSideNav;
