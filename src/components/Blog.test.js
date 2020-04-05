import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const blog = {
    title: 'Blog Title',
    author: 'Akhil',
    likes: 4,
    url: 'www.google.com',
    user: {
      name: 'Akhil',
      username: 'Akki',
    },
  };

  test('blog renders only title and author by default but not likes and url', () => {
    component = render(<Blog blog={blog} />);
    const details = component.container.querySelector('.details');
    const info = component.container.querySelector('.info');

    expect(details).toHaveStyle('display: none');
    expect(info).toBeDefined();
  });

  test('likes and url are displayed after clicking View button', () => {
    component = render(<Blog blog={blog} />);
    const button = component.getByText('View');
    fireEvent.click(button);

    const details = component.container.querySelector('.details');
    expect(details).not.toHaveStyle('display: none');
  });

  test('likeHandler is fired twice after clicking the like button twice', () => {
    const mockHandler = jest.fn();
    component = render(<Blog blog={blog} likeHandler={mockHandler} />);
    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
