export type DropType = {
    _id: string;
    name: string;
    description: string;
    author: UserType;
    links: LinkType[];
    tags: string[];
    image: string | null;
    upvotes: string[] | null;
    createdAt: string;
    updatedAt: string;
};

export type UserType = {
    _id: string;
    username: string;
    email: string;
    password: string;
    image: string | null;
    bookmarks: string[] | null;
    drops: DropType[] | null;
};

export type LinkType = {
    _id: string;
    url: string;
    title: string | null;
    description: string | null;
    image: string | undefined;
    createdAt: string;
    updatedAt: string;
}

export type DataType = {
    message: string;
    drops: DropType[];
};