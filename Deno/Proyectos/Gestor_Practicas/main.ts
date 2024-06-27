import express from "npm:express@4.18.2";
import { db } from "./db/mysql.ts";
import { User,Booking,Classroom } from "./models.ts";
import { getUsers } from "./resolvers/user/getUsers.ts";
import { postUserLogin } from "./resolvers/user/postUserLogin.ts";
import { postUserRegister } from "./resolvers/user/postUserRegister.ts";
import { deleteUser } from "./resolvers/user/deleteUser.ts";
import { putUserPassword } from "./resolvers/user/putUserPassword.ts";
import { putUserAdministrator } from "./resolvers/user/putUserAdministrator.ts";
import { putBooking } from "./resolvers/bookings/putBooking.ts";
import { deleteBookingID } from "./resolvers/bookings/deleteBookingID.ts";
import { getBookings } from "./resolvers/bookings/getBookings.ts";
import { postBooking } from "./resolvers/bookings/postBooking.ts";
import { deleteClassroomID } from "./resolvers/classrooms/deleteClassroomID.ts";
import { getClassrooms } from "./resolvers/classrooms/getClassrooms.ts";
import { postClassroom } from "./resolvers/classrooms/postClassroom.ts";
import { getClassroom } from "./resolvers/classrooms/getClassroom.ts";
import { getSubject } from "./resolvers/subjects/getSubject.ts";
import { getSubjects } from "./resolvers/subjects/getSubjects.ts";
import https from "https";
import fs from "fs";
import path from "path";

db.link([User,Booking,Classroom]);
db.sync();

if(db.ping()){
  console.log("Conexión exitosa");
}
const app = express();
// Body parsing middleware
app.use(express.json());
// Your route handlers
app
  .use("/getUsers", getUsers)
  .use("/postLogin", postUserLogin)
  .use("/postRegister", postUserRegister)
  .use("/deleteUser", deleteUser)
  .use("/putPassword", putUserPassword)
  .use("/putAdministrator", putUserAdministrator)
  .use("/putBooking", putBooking)
  .use("/deleteBooking", deleteBookingID)
  .use("/getBookings", getBookings)
  .use("/postBooking", postBooking)
  .use("/getClassroom", getClassroom)
  .use("/deleteClassroom", deleteClassroomID)
  .use("/getClassrooms", getClassrooms)
  .use("/postClassroom", postClassroom)
  .use("/getSubject", getSubject)
  .use("/getSubjects", getSubjects);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

