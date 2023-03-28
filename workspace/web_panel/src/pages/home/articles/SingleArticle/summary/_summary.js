import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Editor} from "react-draft-wysiwyg";
import {convertFromHTML} from 'draft-convert';
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState} from "draft-js";

const _summary = ({article,updateArticle}) => {
    const [defaultEditorState, setDefaultEditorState] = useState();
    useEffect(() => {
            if (article.Summary) {
                setDefaultEditorState(EditorState.createWithContent(convertFromHTML(article.Summary)))
            } else {
                setDefaultEditorState(EditorState.createEmpty());
            }
    }, []);

    const onEditorStateChange = (editorState) => {
        setDefaultEditorState(editorState)
        updateArticle("Summary", draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };

    return (
        <>
            <Portlet >
                <PortletHeader
                    title={"خلاصه مطلب"}
                />
                <PortletBody>
                    <Editor
                        editorState={defaultEditorState}
                        onEditorStateChange={(e) => onEditorStateChange(e)}
                        wrapperClassName="desmo-wrapper public-DraftStyleDefault-ltr"
                        editorClassName="demo-editor public-DraftStyleDefault-rtl"
                    />
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _summary;
