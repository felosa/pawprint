import React from 'react';

// Components
import Login from '../components/organism/Login';
import PageWrap from '../components/utils/PageWrap';

// Styling
import '../global/index.scss';
import Header from '../components/organism/Header';
import SectionWrap from '../components/utils/SectionWrap';

const LoginPage = () => (
  <>
    <PageWrap hideNav>
      <Header />
      <SectionWrap>
        <Login />
      </SectionWrap>
    </PageWrap>
  </>
);

export default LoginPage;
