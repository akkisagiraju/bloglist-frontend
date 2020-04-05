import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisiblity = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisiblity,
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity}>{props.label}</button>
        {props.items.map((item) => (
          <Blog key={item.id} blog={item} />
        ))}
      </div>
      <div style={showWhenVisible}>
        {props.children} <button onClick={toggleVisiblity}>Cancel</button>
      </div>
    </>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Togglable;
