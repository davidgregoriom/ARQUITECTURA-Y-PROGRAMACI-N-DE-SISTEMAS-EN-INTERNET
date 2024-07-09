export type UserType = {
    id: number;
    full_name: string;
    email: string;
    password: string;
    administrator: boolean;
};

export type ClassroomType = {
    id: number;
    location: string;
    name: string;
    computers: boolean;
    capacity: number;
};

export type SubjectType = {
    id: number;
    name: string;
    course: number;
    id_teacher: number;
    id_contact: number;
    observations: string;
    id_required_classroom: number;
    id_ssp_group: number;
};

export type Day_SubjectType = {
    id: number;
    id_subject: number;
    days_week: string;
    start_time: string;
    end_time: string;
};

export type SSP_GroupType = {
    id: number;
    id_degree: number;
    uxxi_activity_group: string;
    morning_afternoon_group: string;
};

export type DegreeType = {
    id: number;
    name: string;
    ssp_group: string;
};


export type BookingType = {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    date: Date;
    number_students: number;
    id_user: number;
    id_classroom: number;
    id_subject: number;
};


export type LogsType = {
    id: number;
    context: string;
    locating:   string;
    json_error: JSON;
    date: Date;
};

/*
export type Time ={
    hours: number;
    minutes: number;
    seconds: number;
}
*/
