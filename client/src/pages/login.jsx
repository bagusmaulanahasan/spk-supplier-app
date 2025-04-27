import AuthLayout from "../components/Layouts/AuthLayout";
import FormLogin from "../components/Fragments/FormLogin";

const LoginPage = () => {
    return (
        <div className="flex justify-center min-h-screen items-center">
            <AuthLayout title="Login" type="login">
                <FormLogin />
            </AuthLayout>
        </div>
    );
};

export default LoginPage;
