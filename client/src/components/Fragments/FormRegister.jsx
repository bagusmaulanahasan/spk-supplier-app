// import InputForm from "../Elements/Input";

// const FormRegister = () => {
//     return (
//         <form action="">
//             <InputForm
//                 htmlFor="Fullname"
//                 type="text"
//                 placeholder="enter your full name here..."
//                 name="fullname"
//             />
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
//             <InputForm
//                 htmlFor="Confirm Password"
//                 type="password"
//                 placeholder="******"
//                 name="confirm password"
//             />
//             <button className="h-10 px-6 font-semibold rounded-md text-white bg-blue-600 w-full cursor-pointer">
//                 Register
//             </button>
//         </form>
//     );
// };

// export default FormRegister;

import { useState } from "react";
import axios from "axios";
import InputForm from "../Elements/Input";

const FormRegister = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target["confirm password"].value;

        if (password !== confirmPassword) {
            setError("Konfirmasi password tidak sesuai.");
            return;
        }

        try {
            const res = await register({
                username: username,
                password: password,
                role: "admin", // default role
            });

            setSuccess("Registrasi berhasil! Silakan login.");
            e.target.reset();
        } catch (err) {
            console.error("Registrasi gagal:", err);
            setError(err.response?.data?.error || "Registrasi gagal.");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <InputForm
                htmlFor="Username"
                type="username"
                placeholder="your username here..."
                name="username"
            />
            <InputForm
                htmlFor="Password"
                type="password"
                placeholder="******"
                name="password"
            />
            <InputForm
                htmlFor="Confirm Password"
                type="password"
                placeholder="******"
                name="confirm password"
            />
            <button className="h-10 px-6 font-semibold rounded-md text-white bg-blue-600 w-full cursor-pointer">
                Register
            </button>

            {error && (
                <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
            )}
            {success && (
                <p className="text-green-600 mt-2 text-sm text-center">
                    {success}
                </p>
            )}
        </form>
    );
};

export default FormRegister;
