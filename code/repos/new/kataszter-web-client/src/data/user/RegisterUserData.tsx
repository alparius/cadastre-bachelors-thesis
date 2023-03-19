interface IRegisterUserData {
    name: string;
    email: string;
    message: string;
    password: string;
    password2?: string;
    recaptchaToken: string;
}

export let NewRegisterUserData: IRegisterUserData = {
    name: "",
    email: "",
    message: "",
    password: "",
    password2: "",
    recaptchaToken: ""
};

export default IRegisterUserData;
