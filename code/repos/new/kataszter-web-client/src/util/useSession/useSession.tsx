import axios from "axios";
import { useEffect, useState } from "react";

import IUser from "../../data/user/User";
import API_URL from "../../requests/apiConfig";

const useSession = (): { user: IUser | undefined; setUser: (newUser: IUser) => void; handleLogout: () => void } => {
    const storedUser = localStorage.getItem("user");

    let initUser: IUser | undefined;
    if (storedUser) {
        initUser = JSON.parse(storedUser);
    } else {
        initUser = undefined;
    }

    const [user, setUser] = useState(initUser);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const handleLogout = () => {
        axios.post(API_URL + "/logout", {}, { withCredentials: true });
        setUser(undefined);
    };

    return { user, setUser, handleLogout };
};

export default useSession;
