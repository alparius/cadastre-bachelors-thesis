import axios, { AxiosResponse } from "axios";
import { useState } from "react";

import API_URL from "../apiConfig";

const usePutThenFetch = <T extends {}, U extends {}, F extends {}>(
    url: string,
    data: T,
    url2: string,
    setFetchResponse: React.Dispatch<React.SetStateAction<F | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
): { putResponse: U | undefined; showError: boolean; asyncPut: () => Promise<void> } => {
    const [putResponse, setPutResponse] = useState<U | undefined>();
    const [showError, setShowError] = useState(false);

    const URL = API_URL + url;
    const URL2 = API_URL + url2;

    const asyncPut = async () => {
        await axios.put<T, AxiosResponse<U>>(URL, data, { withCredentials: true }).then(
            async (resp) => {
                setPutResponse(resp.data);
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
                    setPutResponse(error.response.data);
                } else {
                    setShowError(true);
                }
            }
        );
    };

    return { putResponse, showError, asyncPut };
};

export default usePutThenFetch;
