import {Fragment, JSX} from "react";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import {ArticleCategoryType, ArticleType} from "@/types/ArticleType";
import {getArticleCategories} from "@/lib/network/api";

interface ArticleCategoriesProps {
    categories: ArticleCategoryType[] | undefined;
}
export default async function ArticleCategories({categories}: ArticleCategoriesProps): Promise<JSX.Element|null> {

    const AllCategories : ArticleCategoryType[] | null = await getArticleCategories();
    if(!AllCategories) return null;
    return (
        <Card sx={{borderRadius: 5, mb: 5}} className={"sideBox"} variant={"outlined"}>
            <CardHeader
                className={"sideBox_header"}
                title={"دسته بندی ها"}
            />
            <nav>
                <ul>
                    {AllCategories.map(cat => (
                        <li key={"cat"+cat.Slug}>
                            {categories?.map(aCat=>(
                                <Fragment key={"acat"+aCat.Slug}>
                                    {
                                        aCat.Slug == cat.Slug && <img
                                            height={"20px"}
                                            width={"20px"}
                                            src={"/images/arrow-mag.svg"}
                                            className="goals-img"
                                        />
                                    }
                                </Fragment>
                            ))}
                            <a href={"/blog?category="+cat.Slug}>
                                {cat.Name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </Card>
    );
}
