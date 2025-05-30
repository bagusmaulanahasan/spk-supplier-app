import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoMultindoJayaMandiri from "../../assets/images/logo-multindo-jaya-mandiri.jpg";
import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as API from "../../api/api";

const TopNavPrivate = () => {
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const res = await API.getUsers();
                const name = res.data.find((user) => user.username === username);
                setName(name.name);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchUserName();
    }, [name]);

    return (
        <nav className="h-20 w-full items-center justify-between px-16 flex sticky top-0 bg-white">
            <img
                src={LogoMultindoJayaMandiri}
                alt="Logo Multindo Jaya Mandiri"
                className="h-16"
            />
            {/* Wrap user section in group */}
            <div className="relative group flex items-center gap-4 cursor-pointer">
                <div className="flex items-center justify-center gap-4">
                    <p className="text-slate-600 font-semibold text-xl">
                        {name}
                    </p>
                    <FontAwesomeIcon
                        icon={faUser}
                        size=""
                        className="text-slate-600 border-2 p-2 rounded-full"
                    />
                </div>

                {/* Dropdown on hover */}
                <div className="h-fit w-44 gap-2 rounded absolute right-0 top-8 hidden group-hover:flex flex-col items-end p-4 z-50 ">
                    <button className="flex justify-start gap-2 items-center py-2 w-full text-end px-4 cursor-pointer rounded-md border-2 border-green-600 hover:bg-green-600/10">
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Edit Profile</span>
                    </button>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            navigate("/login");
                        }}
                        className="flex justify-start items-end gap-2 rounded-md cursor-pointer px-4 w-full py-2 border-2 border-red-600 hover:bg-red-600/10"
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


{/* <button className="flex justify-center gap-2 items-center py-2 w-full text-end px-2 cursor-pointer hover:bg-green-700 bg-green-600 rounded text-white">
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
                    </button> */}