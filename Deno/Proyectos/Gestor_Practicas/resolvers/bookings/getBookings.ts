// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { Booking,User } from "../../models.ts";
import { BookingType } from "../../types.ts";

//Modificar para añadir el id del usuario en la reserva
export const getBookings = async (req: Request<{id_user:number},{},{}>, res: Response<BookingType | { error: unknown }>) => {
    try {
        const {id_user}= req.params;
        if(!id_user){
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }
        const userDB = await User.find(id_user);

        if (userDB || Object.keys(userDB).length>0) {

            const BookingsBD = await Booking.where({ id_usuario:id_user }).get();

            if(BookingsBD || Object.keys(BookingsBD).length>0){
                res.status(200).json({ BookingsBD:Booking }).send();
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
