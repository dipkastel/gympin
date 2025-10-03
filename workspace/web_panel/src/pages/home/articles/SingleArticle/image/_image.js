import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Image} from "react-bootstrap";
import ImagePicker from "../../../media/Pickers/ImagePicker";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Article_updateArticleImage} from "../../../../../network/api/article.api";

const _image = ({article,updateArticle}) => {
    const error = useContext(ErrorContext);
    const [openModalSelectAvatar,setOpenModalSelectAvatar] = useState(false)
    const [ArticleImage,setArticleImage] = useState(article.ArticleImage||{Url:""})

    function openModalChangeImage() {
        return setOpenModalSelectAvatar(true);
    }

    function selectImage(image) {
        Article_updateArticleImage({ArticleId:article.Id,MultimediaId:image.Id}).then(result=>{
            setArticleImage(result.data.Data.ArticleImage||{Url:""});
            error.showError({message: "با موفقیت ثبت شد",});
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
            <Portlet >
                <PortletHeader
                    title={"تصویر مطلب"}
                />
                <PortletBody>
                    <Image  onClick={()=>openModalChangeImage()} width={"100%"} src={ArticleImage.Url?ArticleImage.Url:"https://api.gympin.ir/resource/image?Id=11"} />

                </PortletBody>
            </Portlet>

            {openModalSelectAvatar&&<ImagePicker
                setClose={()=>setOpenModalSelectAvatar(false)}
                onSelect={selectImage}
                options={{rowCount: 8,isSingle:true,filters:{CategoryId:7}}} />}
        </>
    );
};

export default _image;
