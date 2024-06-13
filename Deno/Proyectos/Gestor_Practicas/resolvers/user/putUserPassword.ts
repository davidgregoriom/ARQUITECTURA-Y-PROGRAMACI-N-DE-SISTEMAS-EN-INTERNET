import { Request, Response } from "npm:express@4.18.2";
import { User } from "../../models.ts";
import { UserType } from "../../types.ts";
import { isValidPassword } from "../../controllers/ValidPassword.ts";

export const putUserPassword = async (req: Request<{}, {}, {email: string,password: string}>, res: Response<UserType | { error: unknown }>) => {
    try {
        const {email,password} = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }

        const userDB = await User.where({email:email }).get();

        if (userDB===undefined || Object.keys(userDB).length>0) {
            res.status(201).json({ message: "User does exist" }).send();
        } else {
            if(password === userDB.map((user:UserType)=>user.password)|| isValidPassword(password)===false){
                res.status(200).json({ message: "Put another password" }).send();
            }else{
                await User.find((userDB as UserType).id).update({ destination: 'Tokyo' });
                res.status(200).json({ message: "Password updated" }).send();
            }
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
