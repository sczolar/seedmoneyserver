import express  from "express";
import mongoose  from "mongoose"
import cors  from "cors"
import { graphqlHTTP } from "express-graphql";
import Schema  from "./app.js"

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())
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
    "mongodb://127.0.0.1:27017/blockchain?directConnection=true&serverSelectionTimeoutMS=2000"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `server is running on port ${PORT}.... mongodb running on port 27017....`
      );
    });
  });
