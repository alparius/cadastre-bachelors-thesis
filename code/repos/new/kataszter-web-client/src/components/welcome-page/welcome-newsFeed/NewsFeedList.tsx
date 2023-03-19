import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Card, Header, Message } from "semantic-ui-react";

import IArticleData from "../../../data/newsFeed/ArticleData";
import IUser from "../../../data/user/User";
import CardPlaceholder from "../../CardPlaceholder";
import ErrorMsg from "../../ErrorMsg";
import ArticleCard from "./ArticleCard";

interface INewsFeedListProps {
    response: IArticleData[] | undefined;
    loading: boolean;
    showError: boolean;
    user: IUser | undefined;
    editArticle: IArticleData;
    postShowError: boolean;
    putShowError: boolean;
    deleteShowError: boolean;
    setEditArticle(article: IArticleData): void;
    asyncPut(): Promise<void>;
    asyncDelete(): Promise<void>;
}

const NewsFeedList: React.FC<INewsFeedListProps> = (props: INewsFeedListProps) => {
    const {
        response,
        loading,
        showError,
        user,
        editArticle,
        putShowError,
        deleteShowError,
        postShowError,
        setEditArticle,
        asyncPut,
        asyncDelete
    } = props;

    if (showError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading) {
        return <CardPlaceholder />;
    } else if (!response || response.length === 0) {
        return (
            <Header as="h3">
                <FM id="news.noNews" />
            </Header>
        );
    } else {
        return (
            <>
                {(postShowError || deleteShowError || putShowError) && (
                    <Message negative>
                        <FM id="error.server" />
                    </Message>
                )}
                <Card.Group>
                    {response
                        .sort((a: IArticleData, b: IArticleData) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
                        .map((_, index: number) => (
                            <ArticleCard
                                key={index}
                                article={response[index]}
                                editArticle={editArticle}
                                setEditArticle={setEditArticle}
                                user={user}
                                asyncPut={asyncPut}
                                asyncDelete={asyncDelete}
                            />
                        ))}
                </Card.Group>
            </>
        );
    }
};

export default NewsFeedList;
