import listSideNav from "../Fragments/ListSideNav";
import { Link, useLocation } from "react-router-dom";
import useSidebarStore from "../../store/sideBarStore";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const SideNav = (props) => {
    const { isOpen, toggleSidebar } = useSidebarStore();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="flex">
            <div
                className={`bg-gray-800 text-white h-screen p-5 pt-8 duration-300 ${
                    isOpen ? "w-64" : "w-20"
                } fixed`}
            >
                <div className="flex justify-between items-center">
                    <h1
                        className={`text-xl font-bold duration-300 w-36 text-center ${
                            !isOpen && "scale-0"
                        }`}
                    >
                        Menu SPK
                    </h1>
                    <button
                        onClick={toggleSidebar}
                        className="mb-4 p-2 px-4 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
                    >
                        {isOpen ? "<" : ">"}
                    </button>
                </div>
                <hr />
                <ul className="pt-8 flex flex-col gap-2">
                    {listSideNav.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className={`flex items-center gap-4 p-2 pl-2.5 h-16 rounded-md hover:bg-gray-700 duration-200 ${
                                    location.pathname === item.path
                                        ? "bg-gray-700"
                                        : ""
                                }`}
                            >
                                {item.icon}
                                <span
                                    className={`
                                        ${
                                            !isOpen
                                                ? "opacity-0 translate-x-[-10px] scale-y-0"
                                                : "opacity-100 translate-x-0 scale-y-100"
                                        }
                                        origin-left duration-200 transform transition-all
                                        absolute left-[64px] // Sesuaikan jarak dari ikon
                                        whitespace-nowrap
                                    `}
                                >
                                    {item.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                    }}
                    className={`flex items-center gap-2 py-2 rounded-md bg-red-500/50 text-white hover:bg-red-600/70 transition duration-200 border border-red-600/50 shadow-sm cursor-pointer mt-12 ${
                        isOpen
                            ? "px-4 w-full py-4"
                            : "px-2"}`}
                >
                    <LogOut size={18} />
                    <span
                        className={`
                            ${
                                !isOpen
                                    ? "opacity-0 translate-x-[-10px] scale-y-0"
                                    : "opacity-100 translate-x-0 scale-y-100"
                            }
                            origin-left duration-200 transform transition-all
                            absolute left-[64px]
                            whitespace-nowrap
                        `}
                    >
                        logout
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SideNav;
