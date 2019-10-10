const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Hello blog",
    author: "Chris H",
    url: "www.abc.com",
    likes: 5
  },
  {
    title: "Another one",
    author: "Dr Blog",
    url: "www.qowow.com",
    likes: 2
  },
  {
    title: "Bloggy blog",
    author: "Chris H",
    url: "www.abcd.com",
    likes: 0
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map(r => r.title);
  expect(titles).toContain("Bloggy blog");
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "newly added blog",
    author: "Alpaca Lamb",
    url: "www.url-here.com",
    likes: 2
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map(r => r.title);

  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(titles).toContain("newly added blog");
});

afterAll(() => {
  mongoose.connection.close();
});
