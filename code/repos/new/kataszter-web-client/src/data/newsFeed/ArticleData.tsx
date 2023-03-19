interface IArticleData {
    ID: number;
    title: string;
    content: string;
    date: string;
}

export let NewArticleData: IArticleData = {
    ID: 0,
    title: "",
    content: "",
    date: ""
};

export default IArticleData;
