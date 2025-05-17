import {
    Home,
    Users,
    ListOrdered,
    Sliders,
    FileBarChart2,
    Calculator,
    CheckCircle,
} from "lucide-react";

const menuManagerOnly = {
    title: "Data Users", 
    icon: <Users size={18} />, 
    path: "/pengguna" 
}

const listSideNav = [
    {
        title: "Dashboard",
        icon: <Home size={18} />,
        path: "/dashboard",
    },
    ...(localStorage.getItem("role") === "manager" ? [menuManagerOnly] : []),
    {
        title: "Data Alternatif",
        icon: <ListOrdered size={18} />,
        path: "/alternatif",
    },
    { 
        title: "Data Kriteria", 
        icon: <Sliders size={18} />, 
        path: "/kriteria" 
    },
    {
        title: "Penilaian Alternatif",
        icon: <FileBarChart2 size={18} />,
        path: "/penilaian-alternatif",
    },
    {
        title: "Penilaian Kriteria",
        icon: <Calculator size={18} />,
        path: "/penilaian-kriteria",
    },
    //     title: "Proses Perhitungan",
    //     icon: <Calculator size={18} />,
    //     path: "/proses-perhitungan",
    // },
    {
        title: "Data Hasil Keputusan",
        icon: <CheckCircle size={18} />,
        path: "/hasil-perhitungan",
    },
];

export default listSideNav;
