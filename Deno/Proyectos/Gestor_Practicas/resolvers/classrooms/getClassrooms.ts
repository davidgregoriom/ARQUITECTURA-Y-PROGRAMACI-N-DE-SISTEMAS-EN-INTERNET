// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { Classroom } from "../../models.ts";
import { ClassroomType } from "../../types.ts";

export const getClassrooms = async (_req: Request<{}, {},{}>, res: Response<ClassroomType | { error: unknown }>) => {
    try {
        const ClassroomDB = await Classroom.all();
        if (ClassroomDB!==undefined || Object.keys(ClassroomDB).length>0) {
            res.status(200).json({ ClassroomDB:Classroom }).send();
        } else {

            res.status(201).json({ message: "Classrooms doesn't exists" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
