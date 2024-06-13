import { Request, Response } from "npm:express@4.18.2";
import { User } from "../../models.ts";
import { UserType } from "../../types.ts";

export const putUserAdministrator = async (req: Request<{}, {}, {email: string}>, res: Response<UserType | { error: unknown }>) => {
    try {
        const {email} = req.body;

        if (!email) {
            res.status(400).json({ error: "Missing field" }).send();
            return;
        }

        const userDB = await User.where({email:email }).get();

        if (userDB===undefined || Object.keys(userDB).length>0) {
            await User.find(userDB.map((user:UserType)=>user.id)).update({ administrator: true});
            res.status(200).json({ message: "User does exist" }).send();
        } else {
            res.status(201).json({ message: "User doesn't exist" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
