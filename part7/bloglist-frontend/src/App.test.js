import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  test("if no user is logged in, login screen shows", async () => {
    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() => component.getByText("login"));

    const blogs = component.container.querySelectorAll(".blog");
    expect(blogs.length).toBe(0);
  });
  test("if user is logged in 3 blogs are generated", async () => {
    const user = {
      username: "chaggert",
      token: "3819ru8913ur",
      name: "First Last"
    };
    localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() =>
      component.container.querySelector(".blogParent")
    );

    const blogs = component.container.querySelectorAll(".blogParent");
    expect(blogs.length).toBe(3);
  });
});
