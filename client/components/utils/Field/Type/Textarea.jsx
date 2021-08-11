import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field, ErrorMessage, connect } from 'formik';

const Textarea = props => {
  const { item, type, formik } = props;

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
        placeholder={item.placeholder || ''}
        component="textarea"
        rows="4"
        onChange={formik.handleChange}
      />

      <ErrorMessage name={item.name}>
        {message => <span className="fieldError__Message">{message}</span>}
      </ErrorMessage>
    </div>
  );
};

Textarea.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  }).isRequired,
  formik: PropTypes.object.isRequired
};

export default connect(Textarea);
