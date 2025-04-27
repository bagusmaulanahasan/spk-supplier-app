import { useState } from "react";
import listSideNav from "./ListSideNav";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useSidebarStore from '../../store/sideBarStore';

const SideNav = (props) => {
    const { children } = props;
    // const [open, setOpen] = useState(true);
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
                    {/* <Menu
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    /> */}
                    <button
                        // onClick={() => setOpen(!open)}
                        onClick={toggleSidebar}
                        className="mb-4 p-2 px-4 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
                    >
                        {isOpen ? "<" : ">"}
                        {/* <Menu className={`${open ? 'transform rotate-90' : ''} transition-transform`} /> */}
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
                {/* className={`${
                        !open && "hidden"
                    } origin-left duration-200 `} */}
                {/* className={`
                        ${!open ? "opacity-0 translate-x-[-10px] scale-y-0" : "opacity-100 translate-x-0 scale-y-100"}
                        origin-left duration-200 transform transition-all
                        absolute left-[40px] // Sesuaikan jarak dari ikon
                        whitespace-nowrap
                    `} */}
            </div>
            {/* <div className={`ml-${open  ? "64" : "20"} p-5 w-full bg-amber-500 ml-32`}>
                {children}
            </div> */}
            {/* <div
                className={`p-5 transition-all duration-300 ease-in-out w-screen ${
                    isOpen ? "ml-64" : "ml-20"
                }`}
            >
                <div className="px-6 mt-4.5">
                    {children}
                </div>
            </div> */}
        </div>
    );
};

export default SideNav;
