import InputForm from '../Elements/Input';
import Btn from '../Elements/Buttons';

const FormRegister = () => {
  return (
    <form action="">
      <InputForm htmlFor="Fullname" type="text" placeholder="enter your full name here..." name="fullname" />
      <InputForm htmlFor="Email" type="email" placeholder="example@mail.com" name="email" />
      <InputForm htmlFor="Password" type="password" placeholder="******" name="password" />
      <InputForm htmlFor="Confirm Password" type="password" placeholder="******" name="confirm password" />
      <Btn className="bg-blue-600 w-full">Register</Btn>
    </form>
  );
};

export default FormRegister;
