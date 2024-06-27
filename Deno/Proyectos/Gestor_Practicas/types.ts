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
    subject: string;
};

export type BookingType = {
    id: number;
    name: string;
    hora_inicio: Date;
    hora_fin: Date;
    fecha: Date;
    numnero_alumnos: number;
    id_usuario: number;
    id_aula: number;
    id_subject: number;
};
