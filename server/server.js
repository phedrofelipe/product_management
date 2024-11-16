const express = require("express");
const connectDB = require("./db/connection.js");

const categoryEndpoint = require("./routes/categoryEndpoint.js");
const productEndpoint = require("./routes/productEndpoint.js");
const userEndpoint = require("./routes/userEndpoint.js");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/category", categoryEndpoint);
app.use("/api/product", productEndpoint);
app.use("/api/user", userEndpoint);

const port = 3000;

app.listen(port, () => {

    console.log(`Aplicação sendo executada na porta ${port}`);
});