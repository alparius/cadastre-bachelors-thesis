import axios, { AxiosResponse } from "axios";
import { useState } from "react";

import API_URL from "./apiConfig";

const usePost = <T extends {}, U extends {}>(
    url: string,
    data: T
): { response: U | undefined; showError: boolean; asyncPost: () => Promise<void>; setResponse(resp: U | undefined): void } => {
    const [response, setResponse] = useState<U | undefined>();
    const [showError, setShowError] = useState(false);

    const URL = API_URL + url;

    const asyncPost = async () => {
        await axios.post<T, AxiosResponse<U>>(URL, data, { withCredentials: true }).then(
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

    return { response, showError, asyncPost, setResponse };
};

export default usePost;
