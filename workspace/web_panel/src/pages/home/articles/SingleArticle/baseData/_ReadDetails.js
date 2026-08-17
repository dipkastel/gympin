import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Article_getAllArticleLinkCount} from "../../../../../network/api/article.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Typography} from "@mui/material";
import {estimateReadingMinutes, estimateWordCount} from "../Editors/Tiptop/utils";

const _ReadDetails = ({article}) => {
    const [fullTextWordCount, setFullTextWordCount] = useState(null);
    const [summaryWordCount, setSummaryWordCount] = useState(null);
    const [faqWordCount, setFaqWordCount] = useState(null);
    const [resourcesWordCount, setResourcesWordCount] = useState(null);

    useEffect(() => {
        getDatas();
    }, []);

    function getDatas() {
        setFullTextWordCount(estimateWordCount(article.FullText))
        setSummaryWordCount(estimateWordCount(article.Summary))
        setFaqWordCount(estimateWordCount(article.Faq))
        setResourcesWordCount(estimateWordCount(article.Reference))
    }


    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"اطلاعات متن"}
                />
                <PortletBody>
                    <Typography variant={"subtitle1"}>
                        {"تعداد کلمه در متن : "+fullTextWordCount}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {"تعداد کلمه در خلاصه : "+summaryWordCount}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {"تعداد کلمه در سوالات : "+faqWordCount}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {"تعداد کلمه در منابع : "+resourcesWordCount}
                    </Typography>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _ReadDetails;
