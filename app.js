const express = require("express");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500", "https://sprizzami-frontend.vercel.app"]
  })
)

const html = require('./html');
const homeRoutes = require('./home');
const emailer1 = require('./sprizzamiEmailer1');
// const products = require('./products');

app.use('/', homeRoutes(html));
app.use('/send-email', emailer1);
// app.use('/email2', products);

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;