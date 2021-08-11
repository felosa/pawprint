import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './PageWrap.module.scss';

const SectionWrap = props => {
  const { children } = props;

  return (
    <>
      <div className={styles.PageWrap}>{children}</div>
    </>
  );
};

SectionWrap.propTypes = {
  children: PropTypes.node
};

SectionWrap.defaultProps = {
  children: null
};

export default SectionWrap;
