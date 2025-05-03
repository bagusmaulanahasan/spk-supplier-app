import listSideNav from "./ListSideNav";
import { Link, useLocation } from "react-router-dom";
import useSidebarStore from '../../store/sideBarStore';

const SideNav = (props) => {
    const { isOpen, toggleSidebar } = useSidebarStore();
    const location = useLocation();

    return (
        <div className="flex">
            <div
                className={`bg-gray-800 text-white h-screen p-5 pt-8 duration-300 ${
                    isOpen ? "w-64" : "w-20"
                } fixed`}
            >
                <div className="flex justify-between items-center">
                    <h1
                        className={`text-xl font-bold duration-300 ${
                            !isOpen && "scale-0"
                        }`}
                    >
                        SPK SAW
                    </h1>
                    <button
                        onClick={toggleSidebar}
                        className="mb-4 p-2 px-4 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
                    >
                        {isOpen ? "<" : ">"}
                    </button>
                </div>
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
            </div>
        </div>
    );
};

export default SideNav;
