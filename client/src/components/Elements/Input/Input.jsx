import { PropTypes } from 'prop-types';

const Input = (props) => {
  const { type, placeholder, name } = props;
  return <input type={type} className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50" placeholder={placeholder} name={name} id={name} />;
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
