// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { User } from "../../models.ts";
import { UserType } from "../../types.ts";

export const postUserLogin = async (req: Request<{}, {}, {email: string,password: string}>, res: Response<UserType | { error: unknown }>) => {
    try {
        const {email,password} = req.body;  // Parse JSON body

        if ( !email || !password) {
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }

        const userDB = await User.where({ email:email, password:password }).get();
        if (userDB===undefined || Object.keys(userDB).length>0) {
            const user:UserType = userDB as UserType;
            res.status(200).json({ user }).send();
        } else {
            res.status(201).json({ message: "User does not exist" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
