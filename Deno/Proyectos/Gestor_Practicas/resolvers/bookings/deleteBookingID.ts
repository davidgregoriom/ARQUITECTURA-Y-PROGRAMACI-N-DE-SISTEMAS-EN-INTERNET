// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { Booking } from "../../models.ts";
import { BookingType} from "../../types.ts";

export const deleteBookingID = async (req: Request<{id: number}, {}, {}>, res: Response<BookingType | { error: unknown }>) => {
    try {
        const {id} = req.params;  // Parse JSON body
        if ( !id ) {
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }
        const BookingBD = await Booking.find(id);
        if (BookingBD===undefined || Object.keys(BookingBD).length>0) {
            const id= BookingBD.map((Booking:BookingType)=>Booking.id);
            await Booking.deleteById(id);
            res.status(200).json({ message: "User deleted" }).send();
        } else {
            res.status(201).json({ message: "User does not exist" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
