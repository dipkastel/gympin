import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Editor} from "react-draft-wysiwyg";
import {convertFromHTML} from 'draft-convert';
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState} from "draft-js";
import {getSelectedEditor} from "../../../../../helper/pocket/pocket";
import JoditEditor from "jodit-react";
import {Button} from "@mui/material";

const _summary = ({article,updateArticle}) => {
    const [defaultEditorState, setDefaultEditorState] = useState();
    const [userSelectedEditor,setUserSelectedEditor] = useState(getSelectedEditor())
    useEffect(() => {
        if(userSelectedEditor=="WYSIWYG"){
            if (article.Summary) {
                setDefaultEditorState(EditorState.createWithContent(convertFromHTML(article.Summary)))
            } else {
                setDefaultEditorState(EditorState.createEmpty());
            }
        }else{
            if (article.Summary) {
                setDefaultEditorState(article.Summary)
            } else {
                setDefaultEditorState("");

            }
        }
    }, [userSelectedEditor]);

    const onEditorStateChange = (editorState) => {
        if(userSelectedEditor=="WYSIWYG") {
            setDefaultEditorState(editorState)
            updateArticle("Summary", draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }else{
            setDefaultEditorState(editorState)
            updateArticle("Summary", editorState)
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
            <Portlet >
                <PortletHeader
                    title={"خلاصه مطلب"}
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

export default _summary;
