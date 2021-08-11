import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Styling
import styles from './ButtonSubmit.module.scss';

const ButtonSubmit = props => {
  const { className, id, children, disabled } = props;
  return (
    <button
      id={id}
      className={cx(styles.ButtonSubmit, className)}
      type="submit"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;

ButtonSubmit.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

ButtonSubmit.defaultProps = {
  className: '',
  id: '',
  children: null,
  disabled: false
};
