import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";
import HotelAtNight from "@/assets/images/hotel/hotel-at-night.jpg";
import LobbyAtLigt from "@/assets/images/hotel/lobby-light.jpg";
import LogoMultindoJayaMandiri from "@/assets/images/logo-multindo-jaya-mandiri.jpg";

const AuthLayout = (props) => {
    const { children, title } = props;

    Swal.fire({
        title: "Login hanya untuk pihak internal saja!",
        showClass: {
            popup: "animate__animated animate__lightSpeedInLeft animate__faster",
        },
        hideClass: {
            popup: "animate__animated animate__lightSpeedOutRight animate__faster",
        },
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ya, saya mengerti',
        confirmButtonColor: "#2563eb",
        icon: "warning",
        width: "45em",
    });

    return (
        <div
            className="h-screen w-screen flex justify-center items-center"
            style={{
                backgroundImage: `url(${LobbyAtLigt})`,
                backgroundSize: "cover",
            }}
        >
            <div className="absolute inset-0 w-full h-full bg-black/40"></div>
            {/* <div className="w-full max-w-xs relative bg-white/50 before:bg-white/50 backdrop-blur-sm p-8 rounded-lg"> */}
            <div className="w-full max-w-lg relative bg-white p-10 rounded">
                <div className="flex justify-center">
                    <img
                        src={LogoMultindoJayaMandiri}
                        alt="Logo CV Multindo Jaya Mandiri"
                        className="h-12"
                    />
                </div>
                <hr className="my-8"/>
                <h1 className="text-3xl font-bold mb-2 text-blue-600">
                    {title}
                </h1>
                <p className="font-medium text-slate-500 mb-8">
                    Selamat datang, silakan masukkan data Anda
                </p>
                {children}

                <p className="text-sm mt-5 text-center">
                    Bukan admin? silahkan{" "}
                    <Link to={"/"} className="font-bold text-blue-600">
                        kembali
                    </Link>
                </p>
            </div>
            {/* <img
                src={HotelAtNight}
                alt="Hotel at Night"
                className="w-96 absolute right-20 top-20"
            /> */}
        </div>
    );
};

AuthLayout.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default AuthLayout;

{
    /* <p className="text-sm mt-5 text-center">
                {type === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}

                {type === "login" && (
                    <Link to="/register" className="font-bold text-blue-600">
                        Register
                    </Link>
                )}

                {type === "register" && (
                    <Link to="/login" className="font-bold text-blue-600">
                        Login
                    </Link>
                )}
            </p> */
}
