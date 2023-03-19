interface INewPasswordData {
    id: string;
    password: string;
    confirmPassword?: string;
}

export let NewPasswordData: INewPasswordData = {
    id: "",
    password: "",
    confirmPassword: ""
};

export default INewPasswordData;
