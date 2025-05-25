// import useSidebarStore from "../../store/sideBarStore";
// import SideNav from "../Fragments/SideNav";
// import { useNavigate } from "react-router-dom";
// import { LogOut } from "lucide-react";

// const ContainerPage = (props) => {
//     const { children } = props;
//     const { isOpen, toggleSidebar } = useSidebarStore();
//     const navigate = useNavigate();
//     return (
//         <div className="flex">
//             <SideNav></SideNav>
//             <div
//                 className={`p-5 transition-all duration-300 ease-in-out w-screen ${
//                     isOpen ? "w-20" : "w-32"
//                 }`}
//             >
//                 <div className="flex justify-end px-6">
//                     <button
//                         onClick={() => {
//                             localStorage.clear(); // atau removeItem per item seperti di atas
//                             navigate("/login");
//                         }}
//                         className=" flex items-center gap-2 py-2 px-4 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition duration-200 border border-gray-500 shadow-sm"
//                     >
//                         <LogOut size={18} />
//                         <span>Logout</span>
//                     </button>
//                 </div>
//                 <div className="px-6 mt-4.5">{children}</div>
//             </div>
//         </div>
//     );
// };

// export default ContainerPage;

import useSidebarStore from "../../store/sideBarStore";
import SideNav from "./SideNav";
import TopNavPrivate from "./TopNavPrivate";

const ContainerPage = (props) => {
    const { children } = props;
    const { isOpen, toggleSidebar } = useSidebarStore();

    return (
        <div className="flex min-h-screen">
            <SideNav />
            <div
                className={`flex flex-col  flex-1 w-96 px-5 transition-all duration-300 ease-in-out ${
                    isOpen ? "ml-64" : "ml-20"
                }`}
            >
                <TopNavPrivate></TopNavPrivate>
                <div className="px-6 mt-12">{children}</div>
            </div>
        </div>
    );
};

export default ContainerPage;
