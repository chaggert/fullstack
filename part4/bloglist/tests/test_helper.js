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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb
};
