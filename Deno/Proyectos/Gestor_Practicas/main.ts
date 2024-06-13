import express from "npm:express@4.18.2";
import { db } from "./db/mysql.ts";
import { User,Booking,Classroom } from "./models.ts";
import { getUsers } from "./controllers/getUsers.ts";
import { postUserLogin } from "./controllers/postUserLogin.ts";
import { postUserRegister } from "./controllers/postUserRegister.ts";
import { deleteUser } from "./controllers/deleteUser.ts";


db.link([User,Booking,Classroom]);
db.sync();

if(db.ping()){
  console.log("Conexión exitosa");
}
const app = express();
// Body parsing middleware
app.use(express.json());
app.use(express.json({ limit: '100mb' }));
// Your route handlers
app
  .use("/getUsers", getUsers)
  .use("/postLogin", postUserLogin)
  .use("/postRegister", postUserRegister)
  .use("/deleteUser", deleteUser)







app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

