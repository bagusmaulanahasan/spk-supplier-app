import InputForm from '../Elements/Input';
import Btn from '../Elements/Buttons';

const FormLogin = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('email', e.target.email.value);
    localStorage.setItem('password', e.target.password.value);
    window.location.href = '/products';
  };

  return (
    <form onSubmit={handleLogin}>
      <InputForm htmlFor="Email" type="email" placeholder="example@mail.com" name="email" />
      <InputForm htmlFor="Password" type="password" placeholder="******" name="password" />
      <Btn className="bg-blue-600 w-full" type="submit">
        Login
      </Btn>
    </form>
  );
};

export default FormLogin;
