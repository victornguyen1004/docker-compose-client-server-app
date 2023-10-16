const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use("/images", express.static(path.join(__dirname, "public", "img")));

app.use("/styles", express.static(path.join(__dirname, "public")));

app.use("/js", express.static(path.join(__dirname, "public", "js")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "register.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "profile.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
