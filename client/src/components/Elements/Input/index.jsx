
import PropTypes from 'prop-types';
import Input from './Input';
import Label from './Label';

const InputForm = (props) => {
  const { htmlFor, name, type, placeholder } = props;
  return (
    <>
      <div className="mb-6">
        <Label htmlFor={htmlFor}>{htmlFor}</Label>
        <Input type={type} placeholder={placeholder} name={name} />
      </div>
    </>
  );
};

InputForm.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputForm;
