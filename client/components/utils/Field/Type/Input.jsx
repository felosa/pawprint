import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field, ErrorMessage, connect } from 'formik';

const Input = props => {
  const { type, item, formik, min, max, onChange } = props;

  return (
    <div className={`fieldWrap fieldWrap__${type} fieldWrap__${item.name}`}>
      <label
        htmlFor={item.id || item.name}
        className={cx('fieldLabel', 'hideLabel')}
      >
        {item.label}
      </label>
      <Field
        id={item.id || item.name}
        name={item.name}
        className={cx('fieldInput', `fieldInput__${item.name}`, {
          fieldError__Input:
            formik.errors[item.name] && formik.touched[item.name]
        })}
        min={min}
        max={max}
        type={type}
        placeholder={item.placeholder || ''}
        onChange={onChange || formik.handleChange}
      />
      <ErrorMessage name={item.name}>
        {message => <span className="fieldError__Message">{message}</span>}
      </ErrorMessage>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  }).isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  formik: PropTypes.object.isRequired
};

Input.defaultProps = {
  type: null,
  min: null,
  max: null,
  onChange: null
};

export default connect(Input);
