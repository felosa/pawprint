import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect, ErrorMessage, Field } from 'formik';
// Assets
import { ReactComponent as EyeClosed } from '../../../../assets/icon/icon_visibility_off.svg';
import { ReactComponent as EyeOpen } from '../../../../assets/icon/icon_visibility_on.svg';

const Input = props => {
  const { type, item, formik } = props;
  const [showing, setShowing] = useState(false);

  const toggleShowing = () => {
    setShowing(!showing);
  };

  const EyeStyles = {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    padding: '0 20px'
  };

  return (
    <div className={`fieldWrap fieldWrap__${type} fieldWrap__${item.name}`}>
      <label
        htmlFor={item.id || item.name}
        className={cx('fieldLabel', 'hideLabel')}
      >
        {item.label}
      </label>

      <div style={{ position: 'relative' }}>
        <Field
          id={item.id || item.name}
          name={item.name}
          className={cx('fieldInput', `fieldInput__${item.name}`, {
            fieldError__Input:
              formik.errors[item.name] && formik.touched[item.name]
          })}
          type={showing ? 'text' : 'password'}
          placeholder={item.placeholder || ''}
        />

        <button type="button" onClick={toggleShowing} style={EyeStyles}>
          {showing ? <EyeClosed /> : <EyeOpen />}
        </button>
      </div>

      <ErrorMessage name={item.name}>
        {message => (
          <span
            className="fieldError__Message"
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </ErrorMessage>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  }).isRequired,
  formik: PropTypes.object.isRequired
};

export default connect(Input);
