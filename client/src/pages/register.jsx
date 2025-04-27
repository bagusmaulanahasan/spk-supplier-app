import AuthLayout from '../components/Layouts/AuthLayout';
import FormRegister from '../components/Fragments/FormRegister';

const RegisterPage = () => {
  return (
    <div className="flex justify-center min-h-screen items-center gap-4">
      <AuthLayout title="Register" type="register">
        <FormRegister />
      </AuthLayout>
    </div>
  );
};

export default RegisterPage;
