import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import loginService from './services/login';
import blogService from './services/blogs';
import Togglable from './components/Togglable';

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
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = React.createRef();

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
    blogFormRef.current.toggleVisiblity();
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

  // 5.3

  if (user !== null) {
    return (
      <>
        <h2>blogs</h2>
        <p>
          {user.username} is logged in <button onClick={logOut}>logout</button>
        </p>
        <Togglable label="new blog" items={blogs} ref={blogFormRef}>
          <BlogForm
            blogs={blogs}
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            onBlogAdd={onBlogAdd}
          />
        </Togglable>
      </>
    );
  }

  return (
    <LoginForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      onLogin={onLogin}
    />
  );
};

export default App;
