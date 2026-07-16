export interface Article {
    Id: number;
    Title: string;
    Slug: string;
    Summary?: string;
    FullText?: string;
    CreatedDate?: string;
    SeoPriority?:number;
    UpdatedDate?: string;
    Categories?: {
        Name: string;
    }[];
    ArticleImage?: {
        Url: string;
    };
    CreatorUser?: {
        Username: string;
    };
}

