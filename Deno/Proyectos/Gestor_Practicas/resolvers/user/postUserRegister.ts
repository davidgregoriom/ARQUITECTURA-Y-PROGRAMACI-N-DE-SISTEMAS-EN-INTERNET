// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { User } from "../../models.ts";
import { UserType } from "../../types.ts";
import { isValidPassword } from "../../controllers/ValidPassword.ts";
import { isValidEmail } from "../../controllers/ValidEmail.ts";

export const postUserRegister = async (req: Request<{}, {}, {full_name: string,email: string,password: string}>, res: Response<UserType | { error: unknown }>) => {
    try {
        const {full_name,email,password} = req.body;  // Parse JSON body


        if (!full_name || !email || !password) {
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }

        const userDB = await User.where({email:email}).get();
        console.log(userDB);
        console.log(Object.keys(userDB));
        console.log(Object.keys(userDB).length);
        if (userDB===undefined || Object.keys(userDB).length>0) {
            res.status(201).json({ message: "User does exist" }).send();
        } else {
            if(isValidPassword(password)===false){
                res.status(200).json({ message: "Put another password" }).send();
            }else if(isValidEmail(email)===false){
                res.status(200).json({ message: "Put another email" }).send();
            }else{
                await User.create({full_name:full_name,email:email,password:password});
                res.status(200).json({ message: "create it" }).send();
            }
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
