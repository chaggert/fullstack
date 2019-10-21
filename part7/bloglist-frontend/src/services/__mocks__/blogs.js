const blogs = [
  {
    likes: 2,
    title: "my new blog",
    author: "some blogger",
    url: "www.google.com",
    user: {
      username: "chaggert",
      name: "First Last",
      id: "5d9f48e7e4ebf7371ccd0a1f"
    },
    id: "5d9f9159fe8eb22f2854135a"
  },
  {
    likes: 6,
    title: "My NEw Blog",
    author: "ejfhwehfo",
    url: "qioheowihd",
    user: {
      username: "chaggert",
      name: "First Last",
      id: "5d9f48e7e4ebf7371ccd0a1f"
    },
    id: "5da1030754019e3abc824362"
  },
  {
    likes: 3,
    title: "another blog",
    author: "another author",
    url: "anotherurl.com",
    user: {
      username: "chaggert",
      name: "First Last",
      id: "5d9f48e7e4ebf7371ccd0a1f"
    },
    id: "5da1057254019e3abc824363"
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

let token;
const setToken = value => {
  token = value;
};

export default { getAll, setToken };
