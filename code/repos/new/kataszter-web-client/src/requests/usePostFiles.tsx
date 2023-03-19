import axios, { AxiosResponse } from "axios";
import { useState } from "react";

import API_URL from "./apiConfig";

const usePostFiles = <T extends FileList, U extends {}>(
    url: string,
    type: string,
    data: T
): { responsePostFile: U | undefined; errorStatusPostFile: number; asyncPostFile: () => Promise<void> } => {
    const [responsePostFile, setResponsePostFile] = useState<U | undefined>();
    const [errorStatusPostFile, setErrorStatusPostFile] = useState(200);

    const URL = API_URL + url;

    const asyncPostFile = async () => {
        const formData = new FormData();
        Array.from(data).forEach((file) => {
            formData.append(type, file);
        });
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            },
            withCredentials: true
        };
        await axios.post<T, AxiosResponse<U>>(URL, formData, config).then(
            (resp) => {
                setResponsePostFile(resp.data);
                setErrorStatusPostFile(200);
            },
            (error) => {
                setErrorStatusPostFile(parseInt(error.response.status, 10));
            }
        );
    };

    return { responsePostFile, errorStatusPostFile, asyncPostFile };
};

export default usePostFiles;
