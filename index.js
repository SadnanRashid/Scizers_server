const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");

const app = express();
//
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

// get contacts router
const contactsRouter = require("./Routes/contacts");
app.use("/api", contactsRouter);

app.get("/", (req, res) => {
  res.send({ message: "Sadnan..." });
});
