// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { Subject } from "../../models.ts";
import { SubjectType } from "../../types.ts";

export const getSubjects = async (_req: Request<{}, {},{}>, res: Response<SubjectType | { error: unknown }>) => {
    try {
        const SubjectDB = await Subject.all();
        if (SubjectDB!==undefined || Object.keys(SubjectDB).length>0) {
            res.status(200).json({ SubjectDB:Subject }).send();
        } else {

            res.status(201).json({ message: "Subjects doesn't exists" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
