import InputForm from "../Elements/Input";

const FormLogin = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.setItem("email", e.target.email.value);
        localStorage.setItem("password", e.target.password.value);
        window.location.href = "/dashboard";
    };

    return (
        <form onSubmit={handleLogin}>
            <InputForm
                htmlFor="Email"
                type="email"
                placeholder="example@mail.com"
                name="email"
            />
            <InputForm
                htmlFor="Password"
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
        </form>
    );
};

export default FormLogin;
