import UserRole from "../enums/UserRole";

interface IUser {
    ID: number;
    name: string;
    email: string;
    role: UserRole;
}

export let NewUser: IUser = {
    ID: 0,
    name: "",
    email: "",
    role: UserRole.GUEST
};

export default IUser;
