import { Role } from "./role";

export class User {
    id!: number;
    userName?: string;
    email?: string;
    matricule?:string;
    nom?:string;
    prenom?:string;
    password?: string;
    role?: Role;
}