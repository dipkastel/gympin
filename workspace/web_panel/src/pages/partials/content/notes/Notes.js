import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../Portlet";
import {AppBar, Button, Checkbox, FormControlLabel, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
import {Alert, Form} from "react-bootstrap";
import {note_add, note_getByParam, note_update} from "../../../../network/api/note.api";
import {Row} from "reactstrap";
import {getUserFixedName} from "../../../../helper";

const Notes = ({source}) => {
    const [selectedTab,setSelectedTab] = useState("NOTE")
    const [notes,setNotes] = useState([])

    useEffect(() => {
        getData()
    }, [source]);

    function getData(){
        note_getByParam(source).then(result=>{
            setNotes(result.data.Data)
        }).then(e=>console.log(e))
    }


    function addNote(e) {
        e.preventDefault()
        var data ;
        if (selectedTab==="NOTE"){
            data = {...source,
                Text: e.target.Text.value,
                Type: selectedTab,
                IsToDo: e.target.IsToDo.checked}
        }
        if(selectedTab==="CONTACT"){
            data = {...source,
                Text: e.target.Name.value+" : "+e.target.Number.value,
                Type: selectedTab,
                IsToDo:false}
        }
        note_add(data).then(result=>{
            getData()
            e.target.Name.value = "";
            e.target.Number.value="";
            e.target.Text.value ="";
        }).catch(e=>console.log(e))
    }
    function doneItem(e,item){
        e.preventDefault();
        note_update({...item,IsToDo:false}).then(result=>{
            getData();
        }).catch(e=>console.log(e))
    }

    return (
        <>
            {notes.some(n=>n.Type==="NOTE")&&<Portlet>
                <PortletHeader
                    title="یادداشت جیم پین"
                />
                <PortletBody className={"p-1"}>
                    {notes&&notes.filter(n=>n.Type==="NOTE").reverse().map(item=>(
                        <><Alert key={item.Id} variant={item.IsToDo?"warning":"info"} className={"m-0 px-2  d-block"}>
                            <Typography variant={"body2"} >{item.Text}</Typography>
                            {item.IsToDo&&<Button  color={"error"} onClick={(e)=>doneItem(e,item)} fullWidth variant={"contained"} > انجام شد </Button>}
                        </Alert>
                            <Typography
                                sx={{m:0,lineHeight:"inherit"}}
                                variant={"overline"}  component={"p"}>
                                {getUserFixedName(item.CreatorUser)}</Typography>
                            <Typography
                                sx={{m:0,lineHeight:"inherit"}}
                                variant={"overline"}  component={"p"}>
                                {new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}</Typography>
                        </>
                    ))}
                </PortletBody>
            </Portlet>}

            {notes.some(n=>n.Type==="CONTACT")&&<Portlet>
                <PortletHeader
                    title="دفترچه تلفن"
                />
                <PortletBody className={"p-1"}>
                    {notes.filter(n=>n.Type==="CONTACT").reverse().map(item=>(
                        <><Alert key={item.Id} variant={"dark"} className={"m-0 px-2  d-block"}>
                            <Typography variant={"body2"} >{item.Text}</Typography>
                        </Alert>
                            <Typography
                                sx={{m:0,lineHeight:"inherit"}}
                                variant={"overline"}  component={"p"}>
                                {getUserFixedName(item.CreatorUser)}</Typography>
                            <Typography
                                sx={{m:0,lineHeight:"inherit"}}
                                variant={"overline"}  component={"p"}>
                                {new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}</Typography>
                        </>
                    ))}
                </PortletBody>
            </Portlet>}

            <AppBar position="static">
                <Tabs
                    value={selectedTab}
                    onChange={(e,n)=>setSelectedTab(n)}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="یادداشت" value={"NOTE"} />
                    <Tab label="تلفن" value={"CONTACT"}/>
                </Tabs>
            </AppBar>
            <Paper sx={{padding:1}}>

                <div hidden={selectedTab !== "NOTE"} >
                    <Form onSubmit={(e)=>addNote(e)}>

                        <TextField
                            label="متن"
                            className="textField"
                            name={"Text"}
                            margin="normal"
                            variant="outlined"
                            multiline
                            minRows={3}
                        />

                        <FormControlLabel name={"IsToDo"} control={<Checkbox  />} label="باید بعدا انجام شود؟" />

                        <Button type={"submit"} color={"primary"} fullWidth variant={"contained"} > افزودن </Button>
                    </Form>

                </div>
                <div hidden={selectedTab !== "CONTACT"} >
                    <Form onSubmit={(e)=>addNote(e)}>
                        <TextField
                            label="نام"
                            className="textField"
                            name={"Name"}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="تلفن"
                            className="textField"
                            name={"Number"}
                            margin="normal"
                            type={"number"}
                            variant="outlined"
                        />
                        <Button type={"submit"} color={"primary"} fullWidth variant={"contained"} > ثبت </Button>
                    </Form>
                </div>
            </Paper>
        </>
    );
};

export default Notes;