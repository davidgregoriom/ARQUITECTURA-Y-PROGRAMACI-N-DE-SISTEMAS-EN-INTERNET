import { Application, Router } from "oak";

import { removeSlot } from "./resolvers/delete.ts";
import { availableSlots,doctorAppointments,patientAppointments } from "./resolvers/get.ts";
import { addSlot } from "./resolvers/post.ts";
import { bookSlot } from "./resolvers/put.ts";

const router = new Router();

router
  .post("/addSlot", addSlot)
  .delete("/removeSlot", removeSlot)
  .get("/availableSlots", availableSlots)
  .put("/bookSlot", bookSlot)
  .get("/doctorAppointments/:id_doctor",doctorAppointments)
  .get("/patientAppointments/:dni",patientAppointments)

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8888 });