import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ApiGet } from '../../../utils/API';

const UserContext = React.createContext(undefined, undefined);

export function UserProvider({ User, children }) {
  const [userData, setUserData] = useState(User);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await ApiGet('/user-data');
      setUserData(userResponse.data);
    };

    fetchData();
  }, [User]);

  return (
    <UserContext.Provider value={{ User: userData }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  User: PropTypes.object,
  children: PropTypes.node.isRequired
};

UserProvider.defaultProps = {
  User: {}
};

export const UserConsumer = UserContext.Consumer;

export const useUserContext = () => useContext(UserContext);
