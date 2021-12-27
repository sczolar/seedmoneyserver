import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import Schema from "./app.js";
import { userprivi } from "./middleware/userprivi.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(userprivi);
app.get("/", (req, res) => {
  res.json({ message: "welcome to the blockchain server" });
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
  })
);
mongoose
  .connect(
    `mongodb+srv://seedmoney:seed123@cluster0.1qfy5.mongodb.net/seedmoney?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `server is running on port ${PORT}.... mongodb connected to server....`
      );
    });
  });
