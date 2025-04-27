import PropTypes from 'prop-types';

const Btn = (props) => {
  const { className, children, onClick = () => {}, type = 'button' } = props;
  return (
    <>
      <button className={`h-10 px-6 font-semibold rounded-md ${className} text-white`} type={type} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

Btn.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Btn;
