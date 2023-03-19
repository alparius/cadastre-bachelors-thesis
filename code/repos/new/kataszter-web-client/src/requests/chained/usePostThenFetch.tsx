import axios, { AxiosResponse } from "axios";
import { useState } from "react";

import API_URL from "../apiConfig";

const usePostThenFetch = <T extends {}, U extends {}, F extends {}>(
    url: string,
    data: T,
    url2: string,
    setFetchResponse: React.Dispatch<React.SetStateAction<F | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
): { postResponse: U | undefined; showError: boolean; asyncPost: () => Promise<void> } => {
    const [postResponse, setPostResponse] = useState<U | undefined>();
    const [showError, setShowError] = useState(false);

    const URL = API_URL + url;
    const URL2 = API_URL + url2;

    const asyncPost = async () => {
        await axios.post<T, AxiosResponse<U>>(URL, data, { withCredentials: true }).then(
            async (resp) => {
                setPostResponse(resp.data);
                setShowError(false);
                setLoading(true);
                try {
                    const result = await axios.request<F>({ url: URL2, withCredentials: true });
                    setFetchResponse(result.data);
                } catch (error) {
                    setShowError(true);
                }
                setLoading(false);
            },
            (error) => {
                if (error.response) {
                    setPostResponse(error.response.data);
                } else {
                    setShowError(true);
                }
            }
        );
    };

    return { postResponse, showError, asyncPost };
};

export default usePostThenFetch;
