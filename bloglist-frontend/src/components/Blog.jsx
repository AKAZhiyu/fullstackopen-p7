import { useState } from "react";

const Blog = ({ blog, updateBlog, displayRemove, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetails, setShowDetails] = useState(false);

  const showWhenInDetailed = {
    ...blogStyle,
    display: showDetails ? "" : "none",
  };
  const hideWhenInDetailed = {
    ...blogStyle,
    display: showDetails ? "none" : "",
  };

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const likeBlog = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const removeBlog = () => {
    deleteBlog(blog);
  };

  if (showDetails === false) {
    return (
      // <div style={blogStyle}>
      <div style={hideWhenInDetailed} className="blog">
        <div>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleShowDetails}>view</button>
        </div>
      </div>
      // </div>
    );
  }

  return (
    // <div style={blogStyle}>
    <div style={showWhenInDetailed} className="blog">
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleShowDetails}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        {blog.likes} <button onClick={likeBlog}>like</button>{" "}
      </div>
      <div>{blog.user && blog.user.name}</div>
      {displayRemove && (
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      )}
    </div>
    // </div>
  );
};

export default Blog;
