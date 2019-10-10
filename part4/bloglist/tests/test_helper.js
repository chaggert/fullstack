const Blog = require("../models/blog");
const User = require("../models/user");

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

// const initialUsers = [
//   {
//     blogs: [],
//     username: "chaggert",
//     name: "First Last",
//     id: "5d9f48e7e4ebf7371ccd0a1f"
//   },
//   {
//     blogs: [],
//     username: "myusername",
//     name: "Person X",
//     id: "5d9f4965e4ebf7371ccd0a20"
//   }
// ];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
};
