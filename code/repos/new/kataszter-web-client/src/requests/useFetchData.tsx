import axios from "axios";
import { useEffect, useState } from "react";

import API_URL from "./apiConfig";

const useFetchData = <T extends {}>(
    url: string
): { response: T | undefined; loading: boolean; showError: boolean; responseStatus: number | undefined } => {
    const [response, setResponse] = useState<T | undefined>();
    const [responseStatus, setResponseStatus] = useState<number | undefined>();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const URL = API_URL + url;

    useEffect(() => {
        const fetchData = async () => {
            setShowError(false);
            setLoading(true);
            try {
                const result = await axios.request<T>({ url: URL, withCredentials: true });
                setResponseStatus(result.status);
                setResponse(result.data);
            } catch (error) {
                setShowError(true);
            }
            setLoading(false);
        };
        fetchData();
    }, [URL]);

    return { response, loading, showError, responseStatus };
};

export default useFetchData;
