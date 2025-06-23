// import InputForm from "../Elements/Input";

// const FormLogin = () => {
//     const handleLogin = (e) => {
//         e.preventDefault();
//         localStorage.setItem("email", e.target.email.value);
//         localStorage.setItem("password", e.target.password.value);
//         window.location.href = "/dashboard";
//     };

//     return (
//         <form onSubmit={handleLogin}>
//             <InputForm
//                 htmlFor="Email"
//                 type="email"
//                 placeholder="example@mail.com"
//                 name="email"
//             />
//             <InputForm
//                 htmlFor="Password"
//                 type="password"
//                 placeholder="******"
//                 name="password"
//             />
//             <button
//                 className="h-10 px-6 font-semibold rounded-md text-white bg-blue-600 w-full cursor-pointer"
//                 type="submit"
//             >
//                 Login
//             </button>
//         </form>
//     );
// };

// export default FormLogin;

import InputForm from "../Elements/Input";
import { useState } from "react";
import { login } from "@/api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const FormLogin = () => {
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const res = await login({
                username,
                password,
            });

            console.log("Response Login:", res.data); // Cek bug
            const { token, role } = res.data;

            if (role === "admin" || role === "kepala bagian") {
                localStorage.setItem("username", username);
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                window.location.href = "/dashboard";
            } else {
                setError("Akses ditolak. Anda bukan admin atau kepala bagian.");
            }
        } catch (err) {
            console.error("Login gagal:", err);
            setError("username atau password salah.");
        }
    };

    return (
        <form onSubmit={handleLogin} className="relative">
            <div className="absolute">
                <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-3 top-[2.6em] transform -translate-y-1/2 text-gray-200 text-lg"
                />
            </div>
            <InputForm
                htmlFor="Username"
                type="text"
                placeholder="Masukkan username"
                name="username"
                className="pl-10"
            />
            <div className="absolute">
                <FontAwesomeIcon
                    icon={faUser}
                    className="absolute left-3 top-[2.6em] transform -translate-y-1/2 text-gray-200 text-lg"
                />
            </div>
            <InputForm
                htmlFor="Password"
                type="password"
                placeholder="Masukkan password"
                name="password"
                className="pl-10" 
            />
            <button
                className="h-10 px-6 font-semibold rounded-md text-white bg-blue-600 w-full cursor-pointer"
                type="submit"
            >
                Login
            </button>
            {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
        </form>
    );
};

export default FormLogin;
