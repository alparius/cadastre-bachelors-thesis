import React from "react";

import NewsFeed from "../components/welcome-page/NewsFeed";
import WelcomeInformation from "../components/welcome-page/WelcomeInformation";
import IUser from "../data/user/User";
import PageWrapperTwoColumns from "./PageWrapperTwoColumns";

interface IHomePageProps {
    user: IUser | undefined;
}

const HomePage: React.FC<IHomePageProps> = (props: IHomePageProps) => {
    const { user } = props;

    return (
        <PageWrapperTwoColumns>
            <WelcomeInformation />
            <NewsFeed user={user} />
        </PageWrapperTwoColumns>
    );
};

export default HomePage;
