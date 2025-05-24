const InputForm = (props) => {
  const {
    mode,
    onChange,
    value,
    htmlFor,
    name,
    type = 'text',
    placeholder,
    className = '',
    as = 'input', // 'input', 'textarea', or 'select'
    children,     // for select options
    ...rest
  } = props;

  const commonClasses =
    `text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50 ${className}`;

  // Hanya input selain password yang required secara default
  const isRequired = type !== 'password';

  return (
    <div className="mb-6">
      <label
        htmlFor={htmlFor}
        className="block text-slate-700 text-sm font-bold mb-2"
      >
        {htmlFor}
      </label>

      {as === 'textarea' ? (
        <textarea
          onChange={onChange}
          value={value}
          id={htmlFor}
          name={name}
          placeholder={placeholder}
          className={commonClasses}
          {...rest}
          required={isRequired}
        />
      ) : as === 'select' ? (
        <select
          onChange={onChange}
          value={value}
          id={htmlFor}
          name={name}
          className={commonClasses}
          {...rest}
          required={isRequired}
        >
          {children}
        </select>
      ) : (
        <input
          onChange={onChange}
          value={value}
          id={htmlFor}
          type={type}
          name={name}
          placeholder={placeholder}
          className={commonClasses}
          {...rest}
          required={isRequired}
        />
      )}
    </div>
  );
};

export default InputForm;
