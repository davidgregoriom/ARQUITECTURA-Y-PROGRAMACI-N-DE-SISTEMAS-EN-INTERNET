import { Router } from "oak";
import { getUsers } from "../controllers/getUsers.ts";

const router = new Router();

router
  .get("/get", getUsers)
  //.post("/post", postHandler);
  //.put("/put", putHandler)
  //.delete("/delete", deleteHandler);

export default router;
