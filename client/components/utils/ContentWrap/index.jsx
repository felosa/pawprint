import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './ContentWrap.module.scss';

const ContentWrap = props => {
  const { children } = props;

  return (
    <>
      <div className={styles.contentWrap}>{children}</div>
    </>
  );
};

ContentWrap.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentWrap;
