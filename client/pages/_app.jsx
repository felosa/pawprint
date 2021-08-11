import React from 'react';
import PropTypes from 'prop-types';
import { createServer } from 'miragejs';

// Components
import AppHead from '../components/organism/AppHead';
import { UserProvider } from '../components/utils/Context/User';
// Data Source
import { mockHighScores, mockUserData } from '../_data/mock-data';

// Styling
import '../global/index.scss';

createServer({
  routes() {
    this.get('/user-data', () => mockUserData);
    this.get('/high-scores', () => mockHighScores);
    this.post('/feedback', (schema, request) => {
      return JSON.parse(request.requestBody);
    });
  }
});

const TestApp = props => {
  const { Component, User } = props;

  return (
    <>
      <AppHead />
      <UserProvider User={User}>
        <Component {...props} />
      </UserProvider>
    </>
  );
};

const loadProps = async () => {
  return { User: {} };
};

TestApp.getInitialProps = async ({ ctx }) => {
  // No data should be loaded on the login screen
  if (ctx.pathname === '/login') {
    return { User: {} };
  }

  return loadProps(ctx);
};

TestApp.propTypes = {
  Component: PropTypes.func.isRequired,
  User: PropTypes.object.isRequired
};

export default TestApp;
