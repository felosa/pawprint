import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './SectionWrap.module.scss';

const SectionWrap = props => {
  const { zIndex, children } = props;

  return (
    <div
      className={styles.SectionWrap}
      style={{ zIndex, position: zIndex && 'relative' }}
    >
      {children}
    </div>
  );
};

SectionWrap.propTypes = {
  zIndex: PropTypes.number,
  children: PropTypes.node
};

SectionWrap.defaultProps = {
  zIndex: null,
  children: null
};

export default SectionWrap;
