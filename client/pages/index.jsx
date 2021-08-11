import React from 'react';

// Components
import SectionWrap from '../components/utils/SectionWrap';
import PageWrap from '../components/utils/PageWrap';
import Header from '../components/organism/Header';
import Home from '../components/organism/Home';

// Styling
import '../global/index.scss';

const HomePage = props => {
  return (
    <>
      <PageWrap>
        <Header />
        <SectionWrap>
          <Home {...props} />
        </SectionWrap>
      </PageWrap>
    </>
  );
};

export default HomePage;
