import React from 'react';
// Styles
import styles from './Header.module.scss';
// Assets
import { ReactComponent as Logo } from '../../../assets/pp_logo.svg';
import ContentWrap from '../../utils/ContentWrap';

const Header = () => {
  return (
    <header className={styles.Header}>
      <ContentWrap>
        <div className={styles.LogoWrap}>
          <Logo />
        </div>
      </ContentWrap>
    </header>
  );
};

export default Header;
