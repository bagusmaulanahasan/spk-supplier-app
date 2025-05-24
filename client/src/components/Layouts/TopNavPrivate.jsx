import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoMultindoJayaMandiri from "../../assets/images/logo-multindo-jaya-mandiri.jpg";
import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopNavPrivate = () => {
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    return (
        <nav className="h-12 w-full justify-between px-12 flex my-4 relative">
            <img
                src={LogoMultindoJayaMandiri}
                alt="Logo Multindo Jaya Mandiri"
                className="h-12"
            />
            {/* Wrap user section in group */}
            <div className="relative group flex items-center gap-4 cursor-pointer">
                <div className="flex items-center gap-4">
                    <FontAwesomeIcon
                        icon={faUser}
                        size="l"
                        className="text-slate-600"
                    />
                    <p className="text-slate-600">{username}</p>
                </div>

                {/* Dropdown on hover */}
                <div className="h-fit w-44 bg-gray-800 gap-2 rounded absolute right-0 top-10 hidden group-hover:flex flex-col items-end p-4 z-50">
                    <button className="flex justify-center gap-2 items-center py-2 w-full text-end px-2 cursor-pointer hover:bg-green-700 bg-green-600 rounded text-white">
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Edit Profile</span>
                    </button>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            navigate("/login");
                        }}
                        className="flex justify-center items-end gap-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-200 border border-red-600/50 shadow-sm cursor-pointer px-4 w-full py-2"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default TopNavPrivate;
