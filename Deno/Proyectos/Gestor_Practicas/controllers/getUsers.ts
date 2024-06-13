// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { User } from "../models.ts";
import { UserType } from "../types.ts";

export const getUsers = async (req: Request<{}, {}, User>, res: Response<UserType | { error: unknown }>) => {
    try {
        const response = req.body;  // Parse JSON body
        console.log(response);
        /*
        if (!full_name || !email || !password) {
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }

        const userDB = await User.where("email", email).first();
        if (userDB) {
            res.status(200).json({ message: "User already exists", user: userDB }).send();
        } else {
            const user = new User();
            user.full_name = full_name;
            user.email = email;
            user.password = password;
            await user.save();

            res.status(201).json(user).send();
        }
        */
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
