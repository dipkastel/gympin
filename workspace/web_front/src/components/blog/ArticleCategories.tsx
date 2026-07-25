import {JSX} from "react";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import {ArticleCategoryType, ArticleType} from "@/types/ArticleType";
import {getArticleCategories} from "@/lib/network/api";


export default async function ArticleCategories({categories}: ArticleCategoryType[]): Promise<JSX.Element> {

    const AllCategories : ArticleCategoryType[] | null = await getArticleCategories();
    if(!AllCategories) return ;
    return (
        <Card sx={{borderRadius: 5, mb: 5}} className={"sideBox"} variant={"outlined"}>
            <CardHeader
                className={"sideBox_header"}
                title={"دسته بندی ها"}
            />
            <nav>
                <ul>
                    {AllCategories.map(cat => (
                        <li>
                            {categories.map(aCat=>(
                                aCat.Slug==cat.Slug&&<img
                                    height={"20px"}
                                    width={"20px"}
                                    src={"/images/arrow-mag.svg"}
                                    className="goals-img"
                                />
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
