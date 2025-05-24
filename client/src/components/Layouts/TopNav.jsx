import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const TopNav = () => {
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState("home");
    
    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white flex items-center justify-between z-10 px-8">
            <div className="flex justify-around gap-4">
                <Link to="/" className={`hover:underline hover:underline-offset-8 hover:text-blue-600 font-semibold ${activeLink === "home" ? "underline underline-offset-8 text-blue-600" : ""}`} onClick={() => setActiveLink("home")}>
                    Home
                </Link>
                <Link to="/about" className={`hover:underline hover:underline-offset-8 hover:text-blue-600 font-semibold ${activeLink === "about" ? "underline underline-offset-8 text-blue-600" : ""}`} onClick={() => setActiveLink("about")}>
                    About
                </Link>
                <Link to="/catalog" className={`hover:underline hover:underline-offset-8 hover:text-blue-600 font-semibold ${activeLink === "catalog" ? "underline underline-offset-8 text-blue-600" : ""}`} onClick={() => setActiveLink("catalog")}>
                    Catalog
                </Link>
                <Link to="/contact" className={`hover:underline hover:underline-offset-8 hover:text-blue-600 font-semibold ${activeLink === "contact" ? "underline underline-offset-8 text-blue-600" : ""}`} onClick={() => setActiveLink("contact")}>
                    Contact
                </Link>
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

