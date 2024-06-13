// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { User } from "../../models.ts";
import { UserType } from "../../types.ts";

export const deleteUser = async (req: Request<{}, {}, {email: string}>, res: Response<UserType | { error: unknown }>) => {
    try {
        const {email} = req.body;  // Parse JSON body


        if ( !email ) {
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }
        console.log(email);
        const userDB = await User.where({ email:email}).get();
        console.log(Object.keys(userDB));
        console.log(userDB);
        if (userDB===undefined || Object.keys(userDB).length>0) {
            const id= userDB.map((user:UserType)=>user.id);
            console.log(id);
            await User.deleteById(id);
            res.status(200).json({ message: "User deleted" }).send();
        } else {
            res.status(201).json({ message: "User does not exist" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
