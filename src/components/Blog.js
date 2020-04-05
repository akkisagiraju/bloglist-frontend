import React, { useState } from 'react';

const Blog = ({ blog, likeHandler, deleteBlog }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const showWhenvisible = { display: viewDetails ? '' : 'none' };

  const clickLike = (event) => {
    event.persist();
    likeHandler();
  };

  return (
    <>
      <div
        style={{ border: '1px solid black', paddingTop: 10, paddingLeft: 2 }}
      >
        <span className="info">
          {blog.title} {blog.author}{' '}
        </span>
        <button onClick={() => setViewDetails(!viewDetails)}>View</button>
        <button onClick={() => deleteBlog(blog.id)}>Delete</button>
        <div className="details" style={showWhenvisible}>
          <div>
            likes {blog.likes}
            <button onClick={clickLike}>like</button>
          </div>
          <div>url {blog.url}</div>
          <div>By {blog.user.name}</div>
        </div>
      </div>
    </>
  );
};

export default Blog;
