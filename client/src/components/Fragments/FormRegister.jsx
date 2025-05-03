import InputForm from "../Elements/Input";

const FormRegister = () => {
    return (
        <form action="">
            <InputForm
                htmlFor="Fullname"
                type="text"
                placeholder="enter your full name here..."
                name="fullname"
            />
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
            <InputForm
                htmlFor="Confirm Password"
                type="password"
                placeholder="******"
                name="confirm password"
            />
            <button className="h-10 px-6 font-semibold rounded-md text-white bg-blue-600 w-full cursor-pointer">
                Register
            </button>
        </form>
    );
};

export default FormRegister;
