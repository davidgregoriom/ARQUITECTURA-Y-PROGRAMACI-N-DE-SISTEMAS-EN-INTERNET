// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { Classroom } from "../../models.ts";
import { ClassroomType} from "../../types.ts";

export const deleteClassroomID = async (req: Request<{id: number}, {}, {}>, res: Response<ClassroomType | { error: unknown }>) => {
    try {
        const {id} = req.params;  // Parse JSON body
        if ( !id ) {
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }
        const ClassroomBD = await Classroom.find(id);
        if (ClassroomBD===undefined || Object.keys(ClassroomBD).length>0) {
            const id= ClassroomBD.map((Classroom:ClassroomType)=>Classroom.id);
            await Classroom.deleteById(id);
            res.status(200).json({ message: "User deleted" }).send();
        } else {
            res.status(201).json({ message: "User does not exist" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
