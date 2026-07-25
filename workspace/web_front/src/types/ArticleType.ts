export interface ArticleType {
    Id: number;
    Title: string;
    Slug: string;
    Summary?: string;
    FullText?: string;
    CreatedDate?: string;
    SeoPriority?: number;
    UpdatedDate?: string;
    Categories?: ArticleCategoryType[];
    ArticleImage?: {
        Url: string;
    };
    CreatorUser?: {
        Username: string;
    };
}

export interface ArticleCategoryType {
    Name: string;
    Slug: string;
}

