import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Button, Checkbox, FormControlLabel, Grid, IconButton, List, ListItem, Typography} from "@mui/material";
import {Article_addPhrase, Article_deletePhrase, Article_getPhrasesByArticleId} from "../../../../../network/api/article.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import AddIcon from "@mui/icons-material/Add";
import {TicketAppointments_add} from "../../../../../network/api/TicketAppointments.api";
import {Form, Modal} from "react-bootstrap";
import {Delete} from "@mui/icons-material";

const _ArticlePhrase = ({article}) => {

    const error = useContext(ErrorContext);
    const [phrases,setPhrases] = useState([])
    const [openModalAdd,setOpenModalAdd] = useState(false)

    useEffect(() => {
        getArticlePhrases();
    }, []);

    function getArticlePhrases(){
        Article_getPhrasesByArticleId({id:article.Id}).then(result=>{
            setPhrases(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function deletePhrase(e,item){
        e.preventDefault();
        console.log("delete")
        Article_deletePhrase({Id:item.Id}).then(result=>{
            console.log("deleted")
            getArticlePhrases();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalAdd() {

        function addPhrase(e) {
            e.preventDefault()
            Article_addPhrase({ArticleId:article.Id, Name: e.target.Name.value})
                .then(data => {
                    setOpenModalAdd(false)
                    getArticlePhrases();
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
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addPhrase(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن عبارت "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formCounselingName">
                                <Form.Control
                                    name="Name"
                                    type="text"
                                    counselingholder="عبارت"
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }
    return (
        <>
            <Portlet >
                <PortletHeader
                    title={"عبارات"}

                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />
                <PortletBody>
                    <List>
                        {phrases&&phrases.map(item=>(
                            <Grid container key={"phrase-"+item.Id}  justifyContent={"space-between"} >
                                <Typography >{item.Name}</Typography>
                                <IconButton onClick={(e)=>deletePhrase(e,item)} ><Delete color={"error"} /></IconButton>
                            </Grid>
                        ))}
                    </List>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
        </>
    );
};

export default _ArticlePhrase;
