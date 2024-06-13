// @deno-types="npm:@types/express@4.17.15"
import { Context } from 'https://deno.land/x/oak/mod.ts';
import { User } from "../models.ts";
import { UserType } from "../types.ts";

export const getUsers = async (ctx:Context,) => {
    try {
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            res.status(400).json({error: "Missing fields"});
            return;
        }
        const userDB = User.where("email", email);

        if(userDB){
            res.status(200).json(userDB).send("El usuario ya existe");
        }else{
            const user = new User();
            user.name = name;
            user.email = email;
            user.password = password;
            user.role = role
            await user.save();
            res.status(201).json(user).send();
        }

        //enviar correo de verificación https://deno.land/x/smtp@v0.7.0

    } catch (error) {
      res.status(500).send(error);
    }
  };
