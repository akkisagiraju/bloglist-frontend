import React, { useState, useImperativeHandle } from 'react';

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
          <div key={item.id}>
            {item.title} {item.author}
          </div>
        ))}
      </div>
      <div style={showWhenVisible}>
        {props.children} <button onClick={toggleVisiblity}>Cancel</button>
      </div>
    </>
  );
});

export default Togglable;
