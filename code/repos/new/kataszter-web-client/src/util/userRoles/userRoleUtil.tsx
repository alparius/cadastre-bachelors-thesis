import UserRole from "../../data/enums/UserRole";

const isAdmin = (userRole: UserRole | undefined) => {
    if (userRole) {
        return [UserRole.EDITOR, UserRole.ADMIN, UserRole.OWNER].includes(userRole);
    } else {
        return false;
    }
};

export default isAdmin;
