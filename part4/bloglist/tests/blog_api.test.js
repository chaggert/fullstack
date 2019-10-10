const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();
});

describe("when there are initially blogs defined", () => {
  describe("tests on parameter names", () => {
    test("id property is named id", async () => {
      const response = await helper.blogsInDb();
      expect(response[0].id).toBeDefined();
    });
  });
  describe("tests on retriving blogs", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("all blogs are returned", async () => {
      const response = await helper.blogsInDb();
      expect(response.length).toBe(helper.initialBlogs.length);
    });
  });
  describe("tests on creating blogs", () => {
    test("a valid blog can be added ", async () => {
      const newBlog = {
        title: "newly added blog",
        author: "Writy Writerson",
        url: "www.url-here.com",
        likes: 2
      };
      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map(b => b.title);
      expect(titles).toContain("newly added blog");
    });

    test("a new blog post defaults to 0 likes", async () => {
      const newBlog = {
        title: "newly added blog",
        author: "Writy Writerson",
        url: "www.url-here.com"
      };
      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      expect(response.body.likes).toEqual(0);
    });

    test("a new blog cannot be created without a title or url", async () => {
      const newBlogNoTitle = {
        author: "Writy Writerson",
        url: "www.url-here.com"
      };
      await api
        .post("/api/blogs")
        .send(newBlogNoTitle)
        .expect(400);
      const newBlogNoUrl = {
        title: "Writy Writersons Blog",
        author: "Writy Writerson"
      };
      await api
        .post("/api/blogs")
        .send(newBlogNoUrl)
        .expect(400);
    });
  });
  describe("tests on updating blogs", () => {
    test("a blog can be updated", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const updatedBlog = {
        title: "Hello blog",
        author: "Chris H",
        url: "www.abc.com",
        likes: 6
      };
      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
      expect(response.body.likes).toEqual(6);
    });
  });
  describe("tests on deleting blogs", () => {
    test("a blog can be deleted", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];
      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);
      const titles = blogsAtEnd.map(b => b.title);
      expect(titles).not.toContain(blogToDelete);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
