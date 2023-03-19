import axios, { AxiosResponse } from "axios";
import { useState } from "react";

import API_URL from "../apiConfig";

const useDeleteThenFetch = <T extends {}, F extends {}>(
    url: string,
    url2: string,
    setFetchResponse: React.Dispatch<React.SetStateAction<F | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
): { deleteResponse: T | undefined; showError: boolean; asyncDelete: () => Promise<void> } => {
    const [deleteResponse, setDeleteResponse] = useState<T | undefined>();
    const [showError, setShowError] = useState(false);

    const URL = API_URL + url;
    const URL2 = API_URL + url2;

    const asyncDelete = async () => {
        await axios.delete<T, AxiosResponse<T>>(URL, { withCredentials: true }).then(
            async (resp) => {
                setDeleteResponse(resp.data);
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
                    setDeleteResponse(error.response.data);
                } else {
                    setShowError(true);
                }
            }
        );
    };

    return { deleteResponse, showError, asyncDelete };
};

export default useDeleteThenFetch;
