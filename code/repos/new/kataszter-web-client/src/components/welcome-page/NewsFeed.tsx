import React, { useState } from "react";
import { FormattedMessage as FM } from "react-intl";
import { Divider, Grid, Header } from "semantic-ui-react";

import UserRole from "../../data/enums/UserRole";
import IArticleData, { NewArticleData } from "../../data/newsFeed/ArticleData";
import ICreateArticleData, { NewCreateArticleData } from "../../data/newsFeed/CreateArticleData";
import IUser from "../../data/user/User";
import useDeleteThenFetch from "../../requests/chained/useDeleteThenFetch";
import useFetchToo from "../../requests/chained/useFetchToo";
import usePostThenFetch from "../../requests/chained/usePostThenFetch";
import usePutThenFetch from "../../requests/chained/usePutThenFetch";
import ILabelResponse from "../../requests/response/LabelResponse";
import ItalicFM from "../../util/styledMessages/ItalicFM";
import CreateArticle from "./welcome-newsFeed/CreateArticle";
import NewsFeedList from "./welcome-newsFeed/NewsFeedList";

interface INewsFeedProps {
    user: IUser | undefined;
}

const NewsFeed: React.FC<INewsFeedProps> = (props: INewsFeedProps) => {
    const { user } = props;

    const [fetchResponse, setFetchResponse] = useState<IArticleData[] | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const { showError } = useFetchToo<IArticleData[]>("/articles", setFetchResponse, setLoading);
    const [editArticle, setEditArticle] = useState(NewArticleData);
    const [newArticle, setNewArticle] = useState(NewCreateArticleData);
    const { showError: postShowError, asyncPost } = usePostThenFetch<ICreateArticleData, ILabelResponse, IArticleData[]>(
        "/article",
        newArticle,
        "/articles",
        setFetchResponse,
        setLoading
    );

    const { showError: putShowError, asyncPut } = usePutThenFetch<IArticleData, ILabelResponse, IArticleData[]>(
        "/article",
        editArticle,
        "/articles",
        setFetchResponse,
        setLoading
    );

    const { showError: deleteShowError, asyncDelete } = useDeleteThenFetch<ILabelResponse, IArticleData[]>(
        "/article/" + editArticle.ID,
        "/articles",
        setFetchResponse,
        setLoading
    );

    return (
        <>
            {user && (
                <>
                    <Header as="h2">
                        <FM id="home.welcome" />, {user.name}!
                    </Header>
                    <Header as="h5">
                        <FM id="home.clearance" /> <ItalicFM id={`auth.roles.${user.role}`} />.
                    </Header>
                    <Divider style={{ marginBottom: "3em" }} />
                </>
            )}
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2">
                            <FM id="news.articles" />
                        </Header>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        {user && [UserRole.OWNER, UserRole.ADMIN].includes(user.role) && (
                            <CreateArticle article={newArticle} setArticle={setNewArticle} asyncPost={asyncPost} />
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <NewsFeedList
                response={fetchResponse}
                loading={loading}
                showError={showError}
                user={user}
                postShowError={postShowError}
                putShowError={putShowError}
                deleteShowError={deleteShowError}
                asyncPut={asyncPut}
                asyncDelete={asyncDelete}
                editArticle={editArticle}
                setEditArticle={setEditArticle}
            />
        </>
    );
};

export default NewsFeed;
