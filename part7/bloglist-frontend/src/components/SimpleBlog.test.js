import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "The Author",
    url: "www.google.com",
    likes: 2
  };

  const handleOnClick = event => {
    event.preventDefault();
  };

  const component = render(<SimpleBlog blog={blog} onClick={handleOnClick} />);

  expect(component.container).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
  expect(component.container).toHaveTextContent("The Author");
  expect(component.container).toHaveTextContent("blog has 2 likes");
});

test("clicking like twice calls the event handler twice", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "The Author",
    url: "www.google.com",
    likes: 2
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );
  const button = getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});

describe("Blog detail toggler works", () => {
  let component;

  const myUser = {
    username: "myusername",
    name: "My Name",
    id: "myid123"
  };

  const blogs = [
    {
      title: "Component testing is done with react-testing-library",
      author: "The Author",
      url: "www.google.com",
      likes: 2,
      user: myUser
    }
  ];

  beforeEach(() => {
    component = render(
      <Blog
        blog={blogs[0]}
        setNotification={null}
        blogs={blogs}
        setBlogs={null}
        userId={myUser.id}
      >
        <div className="detailToggler" />
      </Blog>
    );
  });

  test("renders its children", () => {
    component.container.querySelector(".detailToggler");
  });

  test("at start the children are not displayed", () => {
    const parentDiv = component.container.querySelector(".blogParent");

    expect(parentDiv).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );
    expect(parentDiv).toHaveTextContent("The Author");
    expect(parentDiv).not.toHaveTextContent("2 likes");
    expect(parentDiv).not.toHaveTextContent("www.google.com");
  });

  test("after clicking the button, children are displayed", () => {
    const div = component.container.querySelector(".detailToggler");
    fireEvent.click(div);

    const parentDiv = component.container.querySelector(".blogParent");
    expect(parentDiv).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );
    expect(parentDiv).toHaveTextContent("The Author");
    expect(parentDiv).toHaveTextContent("2 likes");
    expect(parentDiv).toHaveTextContent("www.google.com");
  });
});
