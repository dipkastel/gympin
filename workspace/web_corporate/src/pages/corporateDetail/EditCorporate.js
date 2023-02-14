import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, CardContent, CardHeader, FormControl, Grid, Input, TextField} from "@mui/material";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {connect, useSelector} from "react-redux";
import {media_AddImage} from "../../network/api/multimedia.api";
import {corporate_Update, corporate_UpdateLogo} from "../../network/api/corporate.api";
import {Form} from "react-bootstrap";

const EditCorporate = (props) => {
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [imageUrl, SetImageUrl] = useState("")
    const [inCorporate,SetInCorporate] = useState(corporate);

    useEffect(() => {
        SetImageUrl(corporate.Logo?corporate.Logo.Url:"");
        SetInCorporate(corporate);
    }, [corporate]);

    function updateCorporate(e){
        e.preventDefault()
        corporate_Update({Id:corporate.Id,Name:inCorporate.Name,Address:inCorporate.Address}).then(result=>{
            props.RequestCorporate(corporate);
        }).catch(e=>console.log(e))
    }

    function updateLogo(e) {
        if (e.type === "change") {
            const formData = new FormData();
            formData.append("MediaType", "IMAGE");
            formData.append("File", e.target.files[0]);
            formData.append("CategoryId", "5");
            formData.append("Title", corporate.Name);
            formData.append("Description", corporate.Id);
            //
            media_AddImage(formData)
                .then(data => {
                    corporate_UpdateLogo({CorporateId: corporate.Id, MultimediaId: data.data.Data.Id}).then(result => {
                        props.RequestCorporate(corporate)
                    }).catch(e => console.log(e));
                }).catch(e => console.log(e))


        }
    }

    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title="مشخصات سازمان"/>
            <CardContent>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >

                    <label htmlFor="raised-button-file">
                        <Avatar
                            sx={{width: 120, height: 120, marginTop: 3}}
                            alt="Remy Sharp"
                            src={imageUrl}
                        />
                    </label>
                    <Input
                        accept="image/*"
                        className={"input"}
                        style={{display: 'none'}}
                        id="raised-button-file"
                        onChange={updateLogo}
                        type="file"
                    />
                </Grid>
                <Form onSubmit={(e)=>updateCorporate(e)}>

                    <FormControl
                        sx={{p: 1}}
                        fullWidth>
                        <TextField
                            autoFocus
                            value={inCorporate.Name}
                            label="نام سازمان"
                            type="text"
                            onChange={(e)=>SetInCorporate({...inCorporate,Name:e.target.value})}
                            variant="standard"
                        />
                    </FormControl>
                    <FormControl
                        sx={{p: 1}}
                        fullWidth>
                        <TextField
                            label="آدرس"
                            type="text"
                            value={inCorporate.Address}
                            onChange={(e)=>SetInCorporate({...inCorporate,Address:e.target.value})}
                            multiline
                            minRows={3}
                            variant="standard"
                        />
                    </FormControl>
                    <FormControl
                        sx={{p: 1}}
                        fullWidth>
                        <Button variant={"contained"} type={"submit"}>ثبت</Button>
                    </FormControl>
                </Form>

            </CardContent>

        </Card>
    );
};

export default connect(null, sagaActions)(EditCorporate);
