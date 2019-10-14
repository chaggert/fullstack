import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

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
