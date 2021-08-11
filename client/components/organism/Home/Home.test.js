import React from 'react';
import { mount } from 'enzyme';
import Home from './index';
import { UserProvider } from '../../utils/Context/User';

const defaultUser = {
  userId: 52,
  userName: 'TestUser',
  score: 6323
};

const highScores = [
  {
    userName: 'user0',
    score: 8000
  },
  {
    userName: 'user1',
    score: 7500
  },
  {
    userName: 'user2',
    score: 7000
  },
  {
    userName: 'user3',
    score: 6500
  },
  {
    userName: defaultUser.userName,
    score: defaultUser.score
  },
  {
    userName: 'user5',
    score: 6000
  }
];

const renderHome = (User, props) => {
  return mount(
    <UserProvider User={User}>
      <Home {...props} />
    </UserProvider>
  );
};

describe('Home', () => {
  it(`Should say hello to ${defaultUser.userName}`, () => {
    const props = { HighScores: highScores };
    const wrapper = renderHome(defaultUser, props);
    expect(wrapper.text()).toContain(`Hello ${defaultUser.userName}`);
  });

  it(`Should display the user's score`, () => {
    const props = { HighScores: highScores };
    const wrapper = renderHome(defaultUser, props);
    expect(wrapper.text()).toContain(`Your score is ${defaultUser.score}`);
  });

  it('Should render the correct number of <li> elements', () => {
    const props = { HighScores: highScores };
    const wrapper = renderHome(defaultUser, props);
    expect(wrapper.find('li').length).toEqual(highScores.length);
  });

  it(`${defaultUser.userName} should be in scoreboard`, () => {
    const props = { HighScores: highScores };
    const wrapper = renderHome(defaultUser, props);
    // Searching for an element like this results in the containing element
    // and the textnode being found, so the length will equal '2'
    const userEntry = wrapper
      .find('li')
      .findWhere(n => n.text() === defaultUser.userName).length;
    expect(userEntry).toEqual(2);
  });

  it(`Should contain a form with a textarea`, () => {
    const props = { HighScores: highScores };
    const wrapper = renderHome(defaultUser, props);
    expect(wrapper.find('form').find('textarea').length).toEqual(1);
  });

  it(`Form textarea should have "Feedback" as a placeholder`, () => {
    const props = { HighScores: highScores };
    const wrapper = renderHome(defaultUser, props);
    expect(
      wrapper
        .find('form')
        .find('textarea')
        .at(0)
        .getDOMNode()
        .getAttribute('placeholder')
    ).toEqual('Feedback');
  });

  it(`Should contain a form with a submit button`, () => {
    const props = { HighScores: highScores };
    const wrapper = renderHome(defaultUser, props);
    expect(
      wrapper
        .find('form')
        .find('button')
        .at(0)
        .getDOMNode()
        .getAttribute('type')
    ).toEqual('submit');
  });
});
