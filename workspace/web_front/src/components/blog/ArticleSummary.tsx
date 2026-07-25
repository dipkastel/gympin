import {JSX} from "react";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";


interface ArticleSummaryProps {
    summary: string;
}
export default function ArticleSummary({summary}: ArticleSummaryProps): JSX.Element {
    return (
        <Card sx={{borderRadius: 5,mb:5}} className={"sideBox"} variant={"outlined"}>
            <CardHeader
                className={"sideBox_header"}
                title={"خلاصه مقاله :"}
            />

            <CardContent>
                {summary && (
                    <div className="article-summary" dangerouslySetInnerHTML={{__html: summary,}}/>
                )}
            </CardContent>
        </Card>
    );
}
