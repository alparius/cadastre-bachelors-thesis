import axios, { AxiosResponse } from "axios";
import { useState } from "react";

import ILoginUserData from "../data/user/LoginUserData";
import IUser from "../data/user/User";
import API_URL from "./apiConfig";
import ILabelResponse from "./response/LabelResponse";

const loginURL = API_URL + "/login";
const getMeURL = API_URL + "/user/me";

const useLogin = (
    loginUserData: ILoginUserData,
    setUser: (newUser: IUser) => void
): { response: ILabelResponse | undefined; showError: boolean; postLogin: (recaptchaToken: string) => Promise<void> } => {
    const [response, setResponse] = useState<ILabelResponse | undefined>();
    const [showError, setShowError] = useState(false);

    const postLogin = async (recaptchaToken: string) => {
        loginUserData.recaptchaToken = recaptchaToken;
        await axios.post<ILoginUserData, AxiosResponse<ILabelResponse>>(loginURL, loginUserData, { withCredentials: true }).then(
            (resp1) => {
                setResponse(resp1.data);
                const getMe = async () => {
                    await axios.get<IUser>(getMeURL, { withCredentials: true }).then(
                        (resp2) => {
                            setUser(resp2.data);
                        },
                        (error2) => {
                            setShowError(true);
                        }
                    );
                };
                getMe();
            },
            (error1) => {
                if (error1.response) {
                    setResponse(error1.response.data);
                } else {
                    setShowError(true);
                }
            }
        );
    };

    return { response, showError, postLogin };
};

export default useLogin;
