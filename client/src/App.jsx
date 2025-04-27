import "./App.css";
import AuthLayout from "./components/Layouts/AuthLayout.jsx";

function app() {
    return (
        <>
            <div className="flex flex-col items-center h-screen">
                <h1 className="text-3xl font-bold underline underline-offset-8">
                    HELLO WORLD
                </h1>
                <form action="">
                    <label htmlFor="">Nih input dibawah</label>
                    <AuthLayout></AuthLayout>

                </form>
            </div>
        </>
    );
}

export default app;
