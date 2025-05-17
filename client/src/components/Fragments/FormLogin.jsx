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

import { useState } from "react";
import axios from "axios";
import InputForm from "../Elements/Input";

const FormLogin = () => {
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const res = await axios.post("http://localhost:3000/api/login", {
                username,
                password,
            });

            console.log("Response Login:", res.data); // tambahkan ini
            const { token, role } = res.data;

            if (role === "manager" || role === "admin") {
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                window.location.href = "/dashboard";
            } else {
                setError("Akses ditolak. Anda bukan admin atau manager.");
            }
        } catch (err) {
            console.error("Login gagal:", err);
            setError("username atau password salah.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <InputForm
                htmlFor="username"
                type="text"
                placeholder="your username here..."
                name="username"
            />
            <InputForm
                htmlFor="password"
                type="password"
                placeholder="******"
                name="password"
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
