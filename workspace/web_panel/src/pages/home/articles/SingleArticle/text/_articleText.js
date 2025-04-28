import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {convertToRaw, EditorState} from 'draft-js';
import {convertFromHTML} from 'draft-convert';
import draftToHtml from 'draftjs-to-html';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {getSelectedEditor} from "../../../../../helper/pocket/pocket";
import {EditorsType} from "../../../../../helper/enums/EditorsType";
import JoditEditor from "jodit-react";

const _artilceText = ({article, updateArticle}) => {
    const [defaultEditorState, setDefaultEditorState] = useState();
    const [userSelectedEditor,setUserSelectedEditor] = useState(getSelectedEditor())

    useEffect(() => {
        if(userSelectedEditor=="WYSIWYG"){
            if (article.FullText) {
                setDefaultEditorState(EditorState.createWithContent(convertFromHTML(article.FullText)))
            } else {
                setDefaultEditorState(EditorState.createEmpty());
            }
        }else{
            if (article.FullText) {
                setDefaultEditorState(article.FullText)
            } else {
                setDefaultEditorState("");
            }
        }
    }, [userSelectedEditor]);

    const onEditorStateChange = (editorState) => {
        if(userSelectedEditor=="WYSIWYG") {
            setDefaultEditorState(editorState)
            updateArticle("FullText", draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }else{
            console.log("judit text = ",editorState);
            setDefaultEditorState(editorState)
            updateArticle("FullText", editorState)
        }
    };


    const JODITconfig = {
        readonly: false,
        placeholder: "اینجا بنویسید...",
        toolbarSticky: false,
        language: "fa",
        height:"70VH"
    };
    return (
        <>


            <Portlet>
                <PortletHeader
                    title={"مطلب"}
                />
                <PortletBody>
                    {userSelectedEditor=="WYSIWYG"&&
                    <Editor
                        editorState={defaultEditorState}
                        onEditorStateChange={(e) => onEditorStateChange(e)}
                        wrapperClassName="desmo-wrapper public-DraftStyleDefault-ltr"
                        editorClassName="demo-editor public-DraftStyleDefault-rtl"
                    />
                    }
                    {userSelectedEditor=="JODIT"&&
                    <JoditEditor
                        value={defaultEditorState}
                        config={JODITconfig}
                        onBlur={(newContent) => onEditorStateChange(newContent)}
                    />
                    }
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _artilceText;
