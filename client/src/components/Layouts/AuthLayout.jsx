import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import 'animate.css';

const AuthLayout = (props) => {
    const { children, title, type } = props;

    Swal.fire({
        title: "Login hanya untuk admin saja!",
        showClass: {
            popup: 'animate__animated animate__lightSpeedInLeft animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__lightSpeedOutRight animate__faster'  
        },
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ya, saya mengerti',
        confirmButtonColor: '#2563eb',
    });

    return (
        <div className="w-full max-w-xs">
            <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
            <p className="font-medium text-slate-500 mb-8">
                Welcome, Please enter your details
            </p>
            {children}

            <p className="text-sm mt-5 text-center">
                Bukan admin? silahkan{" "}
                <Link to={"/"} className="font-bold text-blue-600">
                    kembali
                </Link>
            </p>

        </div>
    );
};

AuthLayout.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default AuthLayout;

            {/* <p className="text-sm mt-5 text-center">
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
            </p> */}