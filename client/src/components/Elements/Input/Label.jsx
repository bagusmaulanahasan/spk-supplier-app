import { PropTypes } from 'prop-types';

const Label = (props) => {
  const { htmlFor } = props;
  return (
    <>
      <label htmlFor={htmlFor} className="block text-slate-700 text-sm font-bold mb-2">
        {htmlFor}
      </label>
    </>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
};

export default Label;
