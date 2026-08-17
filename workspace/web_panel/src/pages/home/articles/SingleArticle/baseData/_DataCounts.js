import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Article_getAllArticleLinkCount} from "../../../../../network/api/article.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Typography} from "@mui/material";

const _DataCounts = ({article}) => {


    const error = useContext(ErrorContext);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        Article_getAllArticleLinkCount({ArticleId: article?.Id})
            .then(result => {
                setDetails(result.data.Data);
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    return (
        <>
            {details && <Portlet>
                <PortletHeader
                    title={"لینک ها"}
                />
                <PortletBody>
                    <Typography variant={"subtitle1"}>
                        {"تعداد لینک در مقالات دیگر : "+details.WordCount}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {"تعداد مقالاتی که به این مقاله لینک داده اند : "+details.ArticleCount}
                    </Typography>
                </PortletBody>
            </Portlet>}
        </>
    );
};

export default _DataCounts;
