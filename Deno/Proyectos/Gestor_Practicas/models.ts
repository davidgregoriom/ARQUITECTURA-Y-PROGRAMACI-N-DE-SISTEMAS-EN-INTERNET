//https://eveningkid.com/denodb-docs/docs/guides/synchronize-database
//https://deno.land/x/denodb@v1.4.0
import { Model,DataTypes } from 'https://deno.land/x/denodb@v1.3.0/mod.ts';


export class User extends Model {
    static table = 'td_users';
    static timestamps = true;

    static fields = {
        id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
        full_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        administrator: DataTypes.BOOLEAN
    };
    static Booking () {
        return this.hasMany(Booking);
    }
}
export class Classroom extends Model{
    static table = 'td_classrooms';
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

export class SSP_Group extends Model{
    static table = 'td_ssp_group';
    static timestamps = true;

    static fields = {
        id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
        id_degree: DataTypes.INTEGER,
        uxxi_activity_group: DataTypes.STRING,
        morning_afternoon_group: DataTypes.STRING
    };
    static Subject (){
        return this.hasOne(Subject);
    }
    static Degree (){
        return this.hasOne(Degree);
    }
}

export class Subject extends Model{
    static table = 'td_subjects';
    static timestamps = true;

    static fields = {
        id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        course: DataTypes.INTEGER,
        id_teacher: DataTypes.INTEGER,
        id_contact: DataTypes.INTEGER,
        observations: DataTypes.STRING,
        id_required_classroom: DataTypes.INTEGER,
        id_ssp_group: DataTypes.INTEGER

    };
    static Booking (){
        return this.hasMany(Booking);
    }
    static Classroom (){
        return this.hasOne(Classroom);
    }
    static SSP_Group (){
        return this.hasOne(SSP_Group);
    }
    static Days_Subject (){
        return this.hasOne(Days_Subject);
    }
}

export class Booking extends Model{
    static table = 'th_bookings';
    static timestamps = true;

    static fields = {
        id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        start_time: DataTypes.TIME,
        end_time: DataTypes.TIME,
        date: DataTypes.DATE,
        students_number: DataTypes.INTEGER,
        id_users: DataTypes.INTEGER,
        id_classrooms: DataTypes.INTEGER,
        id_subject: DataTypes.INTEGER
    };
    static User (){
        return this.hasOne(User);
    }
    static Classroom (){
        return this.hasOne(Classroom);
    }
    static Subject (){
        return this.hasOne(Subject);
    }
}



export class Degree extends Model{
    static table = 'td_degree';
    static timestamps = true;

    static fields = {
        id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        ssp_group: DataTypes.STRING
    };
    static SSP_Group (){
        return this.hasMany(SSP_Group);
    }
}

export class Days_Subject extends Model{
    static table = 'td_days_subjects';
    static timestamps = true;

    static fields = {
        id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
        id_subject: DataTypes.INTEGER,
        days_week: DataTypes.STRING,
        start_time: DataTypes.TIME,
        end_time: DataTypes.TIME
    };
    static Subject (){
        return this.hasOne(Subject);
    }
}

export class Logs extends Model{
    static table = 'logs_table';
    static timestamps = true;

    static fields = {
        id: { type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true },
        date: DataTypes.DATE,
        context: DataTypes.STRING,
        location: DataTypes.STRING,
        json_error: DataTypes.JSON
    };
}
