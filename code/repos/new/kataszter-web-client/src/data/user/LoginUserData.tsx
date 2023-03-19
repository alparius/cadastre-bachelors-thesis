interface ILoginUserData {
    email: string;
    password: string;
    recaptchaToken: string;
}

export let NewLoginUserData: ILoginUserData = {
    email: "",
    password: "",
    recaptchaToken: ""
};

export default ILoginUserData;
