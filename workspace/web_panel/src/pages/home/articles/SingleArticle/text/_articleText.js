import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {convertToRaw, EditorState} from 'draft-js';
import {convertFromHTML} from 'draft-convert';
import draftToHtml from 'draftjs-to-html';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const _artilceText = ({article, updateArticle}) => {
    const [defaultEditorState, setDefaultEditorState] = useState();
    useEffect(() => {
        if (article.FullText) {
            setDefaultEditorState(EditorState.createWithContent(convertFromHTML(article.FullText)))
        } else {
            setDefaultEditorState(EditorState.createEmpty());
        }
    }, []);

    const onEditorStateChange = (editorState) => {
        setDefaultEditorState(editorState)
        updateArticle("FullText", draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };
    return (
        <>


            <Portlet>
                <PortletHeader
                    title={"مطلب"}
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

export default _artilceText;
