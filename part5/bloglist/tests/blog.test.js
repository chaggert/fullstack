const {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikedAuthor
} = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
];
const listWithMultipleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

test("dummy returns one", () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("when the list has multiple blogs", () => {
    const result = totalLikes(listWithMultipleBlogs);
    expect(result).toBe(36);
  });
  test("when the list has 0 blogs", () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });
});

describe("favourite blog", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = favouriteBlog(listWithOneBlog);
    expect(result).toEqual([
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      }
    ]);
  });
  test("when the list has multiple blogs", () => {
    const result = favouriteBlog(listWithMultipleBlogs);
    expect(result).toEqual([
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
    ]);
  });
  test("when the list has 0 blogs", () => {
    const result = favouriteBlog([]);
    expect(result).toEqual(null);
  });
});

describe("most blogs", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = mostBlogs(listWithOneBlog);
    expect(result).toEqual([
      {
        author: "Edsger W. Dijkstra",
        numBlogs: 1
      }
    ]);
  });
  test("when the list has multiple blogs", () => {
    const result = mostBlogs(listWithMultipleBlogs);
    expect(result).toEqual([
      {
        author: "Robert C. Martin",
        numBlogs: 3
      }
    ]);
  });
  test("when the list has 0 blogs", () => {
    const result = mostBlogs([]);
    expect(result).toEqual(null);
  });
});

describe("most liked author", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = mostLikedAuthor(listWithOneBlog);
    expect(result).toEqual([
      {
        author: "Edsger W. Dijkstra",
        likes: 5
      }
    ]);
  });
  test("when the list has multiple blogs", () => {
    const result = mostLikedAuthor(listWithMultipleBlogs);
    expect(result).toEqual([
      {
        author: "Edsger W. Dijkstra",
        likes: 17
      }
    ]);
  });
  test("when the list has 0 blogs", () => {
    const result = mostLikedAuthor([]);
    expect(result).toEqual(null);
  });
});