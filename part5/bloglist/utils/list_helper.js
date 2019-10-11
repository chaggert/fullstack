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

const mostBlogs = blogs => {
  let blogCountArray = [];
  for (const blog of blogs) {
    if (
      blogCountArray.filter(
        blogCountObject => blogCountObject.author === blog.author
      ).length > 0
    ) {
      blogCountArray
        .filter(blogCountObject => blogCountObject.author === blog.author)
        .map(blogCountObject => {
          blogCountObject.numBlogs = blogCountObject.numBlogs + 1;
        });
    } else {
      blogCountArray.push({ author: blog.author, numBlogs: 1 });
    }
  }
  const maxNumBlogsReducer = (maxNumBlogs, item) => {
    return Math.max(maxNumBlogs, item.numBlogs);
  };

  const maxNumBlogs = blogCountArray.reduce(maxNumBlogsReducer, 0);

  return blogs.length === 0
    ? null
    : blogCountArray.filter(
        blogCountObject => blogCountObject.numBlogs === maxNumBlogs
      );
};

const mostLikedAuthor = blogs => {
  let likeCountArray = [];
  for (const blog of blogs) {
    if (
      likeCountArray.filter(
        likeCountObject => likeCountObject.author === blog.author
      ).length > 0
    ) {
      likeCountArray
        .filter(likeCountObject => likeCountObject.author === blog.author)
        .map(likeCountObject => {
          likeCountObject.likes = likeCountObject.likes + blog.likes;
        });
    } else {
      likeCountArray.push({ author: blog.author, likes: blog.likes });
    }
  }
  const maxLikesReducer = (maxLikes, item) => {
    return Math.max(maxLikes, item.likes);
  };

  const maxLikes = likeCountArray.reduce(maxLikesReducer, 0);

  return blogs.length === 0
    ? null
    : likeCountArray.filter(
        likeCountObject => likeCountObject.likes === maxLikes
      );
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikedAuthor
};
