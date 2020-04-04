import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const loggedUserJSON = localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(user);
      blogService.setToken(user.token);
    }
  }, []);

  const onLogin = async (event) => {
    event.preventDefault();
    const user = await loginService.login({ username, password });
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    blogService.setToken(user.token);
    setUser(user);
    setUsername('');
    setPassword('');
  };

  const logOut = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const onBlogAdd = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };

    const response = await blogService.create(newBlog);
    setBlogs([...blogs, response]);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  if (user !== null) {
    return (
      <>
        <h2>blogs</h2>
        <p>
          {user.username} is logged in <button onClick={logOut}>logout</button>
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}

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
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={onLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default App;
