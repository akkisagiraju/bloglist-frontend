import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const showWhenvisible = { display: viewDetails ? '' : 'none' };

  return (
    <>
      <div
        style={{ border: '1px solid black', paddingTop: 10, paddingLeft: 2 }}
      >
        {blog.title} {blog.author}{' '}
        <button onClick={() => setViewDetails(!viewDetails)}>View</button>
        <div style={showWhenvisible}>
          <div>likes {blog.likes}</div>
          <div>url {blog.url}</div>
          <div>By {blog.user.name}</div>
        </div>
      </div>
    </>
  );
};

export default Blog;
