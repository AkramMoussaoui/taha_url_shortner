const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const Url = require("./models/url");
const { nanoid } = require("nanoid");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to database !!");
});

app.post("/url", async (req, res, next) => {
  const { url } = req.body;
  let { slug } = req.body;

  if (!slug) {
    slug = nanoid(10);
  }
  console.log(slug);
  try {
    const newUrl = new Url({
      url: url,
      slug: slug,
    });
    await newUrl.save();
    res.status(200);
    res.send(newUrl);
  } catch (error) {
    res.status();
    next(error);
  }
});

app.get("/url/:slug", async (req, res, next) => {
  const { slug } = req.params;
  const search = await Url.findOne({ slug: slug });
  res.redirect(search.url);
});

app.listen(PORT, () => {
  console.log(`listening on https:localhost:${PORT}`);
});
