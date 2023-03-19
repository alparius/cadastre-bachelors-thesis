import UserRole from "../enums/UserRole";

interface IUserUnderDecisionData {
    ID: number;
    message: string;
    role: UserRole;
}

export let NewUserUnderDecisionData: IUserUnderDecisionData = {
    ID: 0,
    message: "",
    role: UserRole.GUEST
};

export default IUserUnderDecisionData;
