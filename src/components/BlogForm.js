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
            id="title"
            value={title}
            name="Username"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id="url"
            value={url}
            name="Url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id="create" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
