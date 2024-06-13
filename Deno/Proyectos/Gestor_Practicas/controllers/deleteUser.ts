// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { User } from "../models.ts";
import { UserType } from "../types.ts";

export const deleteUser = async (req: Request<{}, {}, {full_name: string,email: string,password: string}>, res: Response<UserType | { error: unknown }>) => {
    try {
        const {full_name,email,password} = req.body;  // Parse JSON body


        if (!full_name || !email || !password) {
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }

        const userDB = await User.where({ email:email, full_name:full_name, password:password }).get();
        if (userDB) {
            const id = (userDB as UserType).id;
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
