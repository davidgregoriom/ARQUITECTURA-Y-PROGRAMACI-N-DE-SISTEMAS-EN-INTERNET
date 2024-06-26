import { Request, Response } from "npm:express@4.18.2";
import { User } from "../../models.ts";
import { UserType } from "../../types.ts";

//Cambiar para poder actualizar el registro de la practica
export const putBooking = async (req: Request<{}, {}, {asignatura:string,hora_inicio:Date,hora_fin:Date,fecha:Date,numero_alumnos:number,id_aula:string,id_user:number}>, res: Response<UserType | { error: unknown }>) => {
    try {
        const {asignatura,hora_inicio,hora_fin,fecha,numero_alumnos,id_aula,id_user} = req.body;

        if (!asignatura) {
            res.status(400).json({ error: "Missing field" }).send();
            return;
        }

        const userDB = await User.where({asignaturas:asignatura }).update({hora_inicio:hora_inicio,hora_fin:hora_fin,fecha:fecha,numnero_alumnos:numero_alumnos,id_usuario:id_user,id_aula:id_aula});

        if (userDB===undefined || Object.keys(userDB).length>0) {
            await User.find(userDB.map((user:UserType)=>user.id)).update({ administrator: true});
            res.status(200).json({ message: "User does exist" }).send();
        } else {
            res.status(201).json({ message: "User doesn't exist" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
