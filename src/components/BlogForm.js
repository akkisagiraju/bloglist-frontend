import React from 'react';

const BlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  onBlogAdd,
}) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onBlogAdd}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Username"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
