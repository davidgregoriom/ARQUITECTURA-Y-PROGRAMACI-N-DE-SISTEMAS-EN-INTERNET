export type UserType = {
    id: number;
    full_name: string;
    email: string;
    password: string;
};

export type ClassroomType = {
    id: number;
    location: string;
    name: string;
    computers: boolean;
    capacity: number;
};

export type BookingType = {
    id: number;
    asignaturas: string;
    hora_inicio: string;
    hora_fin: string;
    fecha: string;
    numnero_alumnos: number;
    id_usuario: number;
    id_aula: number;
};
