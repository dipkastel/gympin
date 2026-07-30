import {JSX} from "react";
import {Card, CardHeader, Grid} from "@mui/material";


type ArticleTableProps = {
    table: { id: string; text: string; type: string;  }[],
};

export default function ArticleTableOfContent({table}:ArticleTableProps): JSX.Element|null {
    if(table.length<1) return null;
    return (

        <Card sx={{borderRadius: 5,mb:5}} className={"sideBox sidebarSticky"} variant={"outlined"}>
                <CardHeader
                    className={"sideBox_header"}
                    title={"در این مقاله خواهید خواند :"}
                />
                <nav aria-label="فهرست مطالب">
                    <ul>
                        {table.map(item=>(
                            <li className={item.type} key={item.id}><a href={`#${item.id}`}>
                                <Grid sx={{
                                    display:"flex",
                                    flexDirection:"row"
                                }}>

                                    {item.type=="h2"&&<img
                                        height={"20px"}
                                        width={"20px"}
                                        src={"/images/arrow-mag.svg"}
                                        className="goals-img"
                                    />}
                                    {item.text}
                                </Grid>

                            </a></li>
                        ))}
                    </ul>
                </nav>
            </Card>
    );
}
