import axios, { AxiosResponse } from "axios";
import { useState } from "react";

import IRegisterUserData from "../data/user/RegisterUserData";
import API_URL from "./apiConfig";
import ILabelResponse from "./response/LabelResponse";

const registerURL = API_URL + "/register";

const useRegister = (
    registerUserData: IRegisterUserData
): {
    response: ILabelResponse | undefined;
    showError: boolean;
    postRegister: (recaptchaToken: string) => Promise<void>;
    setResponse(resp: ILabelResponse | undefined): void;
} => {
    const [response, setResponse] = useState<ILabelResponse | undefined>();
    const [showError, setShowError] = useState(false);

    const postRegister = async (recaptchaToken: string) => {
        registerUserData.recaptchaToken = recaptchaToken;
        await axios.post<IRegisterUserData, AxiosResponse<ILabelResponse>>(registerURL, registerUserData).then(
            (resp) => {
                setResponse(resp.data);
            },
            (error) => {
                if (error.response) {
                    setResponse(error.response.data);
                } else {
                    setShowError(true);
                }
            }
        );
    };

    return { response, showError, postRegister, setResponse };
};

export default useRegister;
