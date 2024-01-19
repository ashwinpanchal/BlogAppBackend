const express = require("express");
const { parse } = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

let blogs = [];

app.get("/blogs", (req, res) => {
  return res.status(200).json({
    data: blogs,
    success: true,
  });
});

app.post("/blogs", (req, res) => {
  const blog = req.body;
  blog.id = Date.now();
  blogs.push(blog);
  return res.status(201).json({
    message: "Succesfully Created a blog",
    id: blog.id,
  });
});

app.get("/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingBlog = blogs.find((item) => item.id === id);
  if (existingBlog) {
    return res.json({
      data: existingBlog,
      success: true,
    });
  } else {
    return res.status(404).json({
      message: "No blog found",
    });
  }
});

app.put("/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const existingIndex = blogs.findIndex((item) => item.id === id);
  if (existingIndex > -1) {
    blogs[existingIndex] = {
      id,
      title,
      description,
    };
    return res.status(200).json({
      message: "Sucessfully Updated the blog",
      success: true,
    });
  } else {
    return res.status(400).json({
      message: "Bad request",
    });
  }
});

app.delete("/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingIndex = blogs.findIndex((item) => item.id === id);
  if (existingIndex > -1) {
    blogs.splice(existingIndex, 1);
    return res.status(200).json({
      message: "Sucessfully Deleted the blog",
      success: true,
    });
  } else {
    return res.status(400).json({
      message: "Bad request",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is listening to port", PORT);
});
