// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { Classroom,User } from "../../models.ts";
import { ClassroomType } from "../../types.ts";

//Tengo que ver que parametro le paso del aula si el id_aula o el nombre del aula
export const postClassroom = async (req: Request<{},{},{nombre:string,capacidad:number,localización:string,ordenadores:boolean}>, res: Response<ClassroomType | { error: unknown }>) => {
    try {
        const {nombre,capacidad,localización,ordenadores} = req.body;  // Parse JSON body
        if(!nombre||!capacidad||!localización||!ordenadores){
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }

        const ClassroomsBD = await Classroom.where({ name:nombre,location:localización }).get();

        if(ClassroomsBD || Object.keys(ClassroomsBD).length>0){

            //Tengo que transformar la hora_inicio,hora_fin a Time, Revisar
            await Classroom.create({name:nombre,capacity:capacidad,location:localización,computers:ordenadores});

            res.status(200).json({ message: "Classrooms Create it" }).send();
        }else{
            res.status(201).json({ message: "Classrooms doesn't exists" }).send();
        }

        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
