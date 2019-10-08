const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favouriteBlog = blogs => {
  const maxLikesReducer = (maxLikes, item) => {
    return Math.max(maxLikes, item.likes);
  };
  const maxLikes = blogs.reduce(maxLikesReducer, 0);
  return blogs.length === 0
    ? null
    : blogs.filter(blog => blog.likes === maxLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
};
