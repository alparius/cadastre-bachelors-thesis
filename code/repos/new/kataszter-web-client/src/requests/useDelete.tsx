import axios, { AxiosResponse } from "axios";
import { useState } from "react";

import API_URL from "./apiConfig";

const useDelete = <T extends {}>(): { response: T | undefined; showError: boolean; asyncDelete: (url: string) => Promise<void> } => {
    const [response, setResponse] = useState<T | undefined>();
    const [showError, setShowError] = useState(false);

    const asyncDelete = async (url: string) => {
        const URL = API_URL + url;
        await axios.delete<T, AxiosResponse<T>>(URL, { withCredentials: true }).then(
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

    return { response, showError, asyncDelete };
};

export default useDelete;
