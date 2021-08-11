import React from 'react';
import PropTypes from 'prop-types';

// Field Components
import Input from './Type/Input';
import Password from './Type/Password';
import Textarea from './Type/Textarea';

const getField = (type, props) => {
  switch (type) {
    case 'email':
      return <Input {...props} />;

    case 'password':
      return <Password {...props} />;

    case 'textarea':
      return <Textarea {...props} />;

    default:
      return <Input {...props} />;
  }
};

const Field = props => {
  const { type } = props;
  return getField(type, props);
};

Field.propTypes = {
  type: PropTypes.oneOf(['email', 'password', 'textarea', null]).isRequired
};

export default Field;
