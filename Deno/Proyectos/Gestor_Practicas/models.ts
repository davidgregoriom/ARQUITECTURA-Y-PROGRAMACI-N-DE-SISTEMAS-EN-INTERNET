//https://eveningkid.com/denodb-docs/docs/guides/synchronize-database
//https://deno.land/x/denodb@v1.4.0
import { Model,DataTypes } from 'https://deno.land/x/denodb@v1.3.0/mod.ts';


export class User extends Model {
    static table = 'users';
    static timestamps = true;

    static fields = {
        id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
        full_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    };
    static Booking () {
        return this.hasMany(Booking);
    }
}
export class Classroom extends Model{
    static table = 'classrooms';
    static timestamps = true;

    static fields = {
        id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
        location: DataTypes.STRING,
        name: DataTypes.STRING,
        computers: DataTypes.BOOLEAN,
        capacity: DataTypes.INTEGER

    };
    static Booking () {
        return this.hasMany(Booking);
    }
}


export class Booking extends Model{
    static table = 'bookings';
    static timestamps = true;

    static fields = {
        id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
        asignaturas: DataTypes.STRING,
        hora_inicio: DataTypes.TIME,
        hora_fin: DataTypes.TIME,
        fecha: DataTypes.DATE,
        numnero_alumnos: DataTypes.INTEGER,
        id_usuario: DataTypes.INTEGER,
        id_aula: DataTypes.INTEGER
    };
    static User (){
        return this.hasOne(User);
    }
    static Classroom (){
        return this.hasOne(Classroom);
    }
}
