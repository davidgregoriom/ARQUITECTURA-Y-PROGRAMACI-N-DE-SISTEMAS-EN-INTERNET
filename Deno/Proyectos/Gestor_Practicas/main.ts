import express from "npm:express@4.18.2";
import { db } from "./db/mysql.ts";
import { User,Booking,Classroom } from "./models.ts";
import { getUsers } from "./resolvers/user/getUsers.ts";
import { postUserLogin } from "./resolvers/user/postUserLogin.ts";
import { postUserRegister } from "./resolvers/user/postUserRegister.ts";
import { deleteUser } from "./resolvers/user/deleteUser.ts";
import { putUserPassword } from "./resolvers/user/putUserPassword.ts";
import { putUserAdministrator } from "./resolvers/user/putUserAdministrator.ts";

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
  .use("/putPassword", putUserPassword)
  .use("/putAdministrator", putUserAdministrator);







app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

