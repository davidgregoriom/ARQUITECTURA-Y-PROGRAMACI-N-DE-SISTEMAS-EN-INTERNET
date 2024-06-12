import express from "express";
import { db } from "./db/mysql.ts";
import { User,Booking,Classroom } from "./models.ts";
import { getUsers } from "./resolvers.ts/getUsers.ts";


db.link([User,Booking,Classroom]);
db.sync();

const app = express();
app.use(express.json());

app
    .get("/subjects", getUsers)


app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
