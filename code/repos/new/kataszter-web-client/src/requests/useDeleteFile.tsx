import axios from "axios";
import { useState } from "react";

const useDeleteFile = (): {
    errorStatusDeleteFile: number;
    asyncDeleteFile: (url: string) => Promise<void>;
} => {
    const [errorStatusDeleteFile, setErrorStatusDeleteFile] = useState(200);

    const asyncDeleteFile = async (url: string) => {
        await axios.delete(url, { withCredentials: true }).then(
            () => {
                setErrorStatusDeleteFile(200);
            },
            (error) => {
                setErrorStatusDeleteFile(parseInt(error.response.status, 10));
            }
        );
    };

    return { errorStatusDeleteFile, asyncDeleteFile };
};

export default useDeleteFile;
