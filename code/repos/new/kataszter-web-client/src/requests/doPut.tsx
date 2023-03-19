import axios from "axios";

import API_URL from "./apiConfig";

const doPut = (url: string, data: object): boolean => {
    let showError: boolean = false;

    const URL = API_URL + url;

    const asyncPost = async () => {
        await axios.put(URL, data, { withCredentials: true }).then(
            (response) => {
                // TODO handle status/message
            },
            (error) => {
                // TODO handle status/message
                showError = true;
            }
        );
    };
    asyncPost();

    return showError;
};

export default doPut;
