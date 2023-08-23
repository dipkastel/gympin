import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../../partials/content/Notice";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {Article_getById, Article_update} from "../../../../network/api/article.api";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {Button, FormControl, InputLabel, LinearProgress, MenuItem, Select} from "@mui/material";
import _selectCategories from "./category/_selectCategories";
import _baseData from "./baseData/_baseData";
import _artilceText from "./text/_articleText";
import _summary from "./summary/_summary";
import {ArticleStatus} from "../../../../helper/enums/ArticleStatus";
import _image from "./image/_image";
import {Progress} from "reactstrap";

const SingleArticle = () => {

    const error = useContext(ErrorContext);
    const {articleId} = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        getArticle();
    }, []);

    function getArticle() {
        Article_getById({id: articleId}).then(result => {
            setArticle(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function updateArticle(name, data) {
        setArticle({...article, [name]: data})
    }

    function changeSelectedCategories(data, category) {
        var categoties = article.Categories;
        if (data.target.checked) {
            categoties.push({Id: category.Id})
        } else {
            categoties = categoties.filter(c => c.Id != category.Id);
        }
        setArticle({...article, Categories: categoties})
    }

    function updateArticleData() {
        setLoading(true)
        Article_update(article).then(result => {
            setLoading(false);
            error.showError({message: "با موفقیت ویرایش شد",});
            setArticle(result.data.Data);
        }).catch(e => {
            setLoading(false);
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            {article && <Notice icon="flaticon-layer kt-font-primary">{article.Title}</Notice>}

            <div className="row">
                <div className="col-md-9">
                    {article && <_baseData article={article} updateArticle={updateArticle}/>}
                    {article && <_artilceText article={article} updateArticle={updateArticle}/>}
                    {article && <_summary article={article} updateArticle={updateArticle}/>}
                </div>
                <div className="col-md-3">
                    {article && <Portlet>
                        <PortletHeader
                            title={"تغییر وضعیت"}
                        />
                        <PortletBody>
                            {loading?(<><LinearProgress /></>):
                                (<>
                                <FormControl fullWidth>
                                    <InputLabel id="status-select-label">وضعیت</InputLabel>
                                    <Select
                                        label="status"
                                        value={article.ArticleStatus || "null"}
                                        onChange={e => updateArticle("ArticleStatus", e.target.value == "null" ? null : e.target.value)}
                                    >
                                        {Object.keys(ArticleStatus).map((item, number) => (
                                            <MenuItem key={number} value={item}>{ArticleStatus[item]}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{mt: 2}} fullWidth>
                                    <Button variant={"contained"} color={"success"}
                                            onClick={() => updateArticleData()}> ثبت </Button>
                                </FormControl>
                            </>)
                            }
                        </PortletBody>
                    </Portlet>}
                    {article && <_selectCategories itemCategories={article.Categories ? article.Categories : []}
                                                   changeSelectedCategories={changeSelectedCategories}/>}
                    {/*<_tags article={article} updateArticle={updateArticle}/>*/}
                    {article && <_image article={article} updateArticle={updateArticle}/>}
                </div>
            </div>

        </>
    );
};

export default SingleArticle;
