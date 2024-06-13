// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { User } from "../models.ts";
import { UserType } from "../types.ts";

export const getUsers = async (req: Request<{}, {}, User>, res: Response<UserType | { error: unknown }>) => {
    try {

        const userDB = await User.all();
        if (userDB) {
            res.status(200).json({ user: userDB }).send();
        } else {

            res.status(201).json({ message: "Users doesn't exists" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
