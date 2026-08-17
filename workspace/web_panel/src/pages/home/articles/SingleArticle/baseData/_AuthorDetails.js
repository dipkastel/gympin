import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Article_getAllArticleLinkCount} from "../../../../../network/api/article.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Typography} from "@mui/material";
import {estimateReadingMinutes, estimateWordCount} from "../Editors/Tiptop/utils";
import __SelectUser from "../../../../partials/selector/__SelectUser";
import {getUserFixedName} from "../../../../../helper";

const _AuthorDetail = ({article,updateArticle}) => {

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"اطلاعات نویسنده"}
                />
                <PortletBody>
                    <Typography variant={"subtitle1"}>
                        {"نویسنده : " + getUserFixedName(article.UpdaterUser||article.CreatorUser)}
                    </Typography>
                    <__SelectUser onChange={e=>updateArticle("UpdaterUser",{Id:e.value})} hidden={false} />
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _AuthorDetail;
