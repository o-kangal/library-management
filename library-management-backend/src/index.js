const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
