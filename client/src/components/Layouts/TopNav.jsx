import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import useScrollSpy from "@/hooks/useScrollSpy";

const TopNav = () => {
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState("home");
    // const activeLink = useScrollSpy(["home", "about", "catalog", "contact"]);
    
    
    console.log("active link:", activeLink);
    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white flex items-center justify-between z-10 px-8">
            <div className="flex justify-around gap-4">
                <a href="/" className={`hover:underline hover:underline-offset-8 hover:text-blue-600 font-semibold underline underline-offset-8`}>
                    Home
                </a>
                <a href="#about" className={`hover:underline hover:underline-offset-8 hover:text-blue-600 font-semibold underline underline-offset-8`}>
                    About
                </a>
                <a href="#catalog" className={`hover:underline hover:underline-offset-8 hover:text-blue-600 font-semibold underline underline-offset-8`}>
                    Catalog
                </a>
                <a href="#contact" className={`hover:underline hover:underline-offset-8 hover:text-blue-600 font-semibold underline underline-offset-8`}>
                    Contact
                </a>
            </div>
            <button
                className="bg-blue-500 text-white font-semibold rounded px-4 py-1 cursor-pointer hover:bg-blue-600"
                onClick={() => navigate("/login")}
            >
                Login
            </button>
        </nav>
    );
};

export default TopNav;

