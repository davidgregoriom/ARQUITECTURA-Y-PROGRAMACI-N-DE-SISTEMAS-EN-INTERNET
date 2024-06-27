// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { Booking,User } from "../../models.ts";
import { BookingType } from "../../types.ts";

//Tengo que ver que parametro le paso del aula si el id_aula o el nombre del aula
export const postBooking = async (req: Request<{},{},{name:string,hora_inicio:Date,hora_fin:Date,fecha:Date,numero_alumnos:number,id_aula:string,id_user:number,id_subject:number}>, res: Response<BookingType | { error: unknown }>) => {
    try {
        const {name,hora_inicio,hora_fin,fecha,numero_alumnos,id_aula,id_user,id_subject} = req.body;  // Parse JSON body
        if(!id_user||!name||!hora_inicio||!hora_fin||!fecha||!numero_alumnos||!id_aula||!id_subject){
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }
        const userDB = await User.find(id_user);

        if (userDB || Object.keys(userDB).length>0) {

            const BookingsBD = await Booking.where({ id_usuario:id_user }).get();

            if(BookingsBD || Object.keys(BookingsBD).length>0){

                //Tengo que transformar la hora_inicio,hora_fin a Time, Revisar
                await Booking.create({name:name,hora_inicio:hora_inicio,hora_fin:hora_fin,fecha:fecha,numero_alumnos:numero_alumnos,id_aula:id_aula,id_usuario:id_user,id_subject:id_subject});

                res.status(200).json({ message: "User Create it" }).send();
            }else{
                res.status(201).json({ message: "Bookings doesn't exists" }).send();
            }
        } else {
            res.status(201).json({ message: "Users doesn't exists" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
