import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Card, CardActionArea, CardContent, Dialog, DialogContent, DialogTitle, Pagination, Typography} from "@mui/material";
import {Tune} from "@mui/icons-material";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {
    corporatePersonnel_query,
    corporatePersonnel_setAllPersonelAccessToCatering,
    corporatePersonnel_setPersonelAccessToCatering
} from "../../../network/api/corporatePersonnel.api";
import Grid from "@mui/material/Grid2";

const _CateringSettings = ({catering, corporate}) => {

    const error = useContext(ErrorContext);
    const [openModalSettings, setOpenModalSettings] = useState(false);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);
    const [personnel, setPersonnel] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [sortBy, setSortBy] = useState({Name: "Id", Desc: false});

    useEffect(() => {
        getPersonnel();
    }, [page]);


    function getPersonnel() {
        if (!corporate) return;
        setPersonnel(null);
        corporatePersonnel_query({
            queryType: "FILTER",
            CorporateId: corporate?.Id,
            paging: {Page: page, Size: rowsPerPage, orderBy: sortBy.Name, Desc: !sortBy.Desc}
        }).then(result => {
            setPersonnel(result.data.Data);
            setLoading(false);
        }).catch(e => {
            setPersonnel(null);
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    function checkAll(e) {
        e.preventDefault()
        setLoading(true);
        corporatePersonnel_setAllPersonelAccessToCatering({
            CorporateId: corporate?.Id,
            CateringId: catering?.Id,
            Access: true,
        }).then(result => {
            getPersonnel();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function setPersonAccess(person, access) {
        corporatePersonnel_setPersonelAccessToCatering({
            PersonnelId: person?.Id,
            CateringId: catering?.Id,
            Access: access,
        }).then(result => {
            getPersonnel();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalSettings() {

        return (
            <Dialog open={openModalSettings} maxWidth={"xl"} onClose={() => setOpenModalSettings(false)}>
                <DialogTitle sx={{width: "80vw"}}>{"تنظیمات " + catering?.Name}</DialogTitle>
                <DialogContent sx={{width: "100%"}}>

                    <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                        <Grid container direction={"column"}>
                            <Grid container direction={"row"}>
                                <Typography sx={{px: 1}}>دسترسی کاربران برای انتخاب غذای سازمانی </Typography>
                            </Grid>

                        </Grid>
                        <Button disabled={loading} onClick={(e) => checkAll(e)} size={"small"} variant={"contained"} color={"inherit"}
                                sx={{mt: 1}}>ایجاد دسترسی برای همه</Button>
                    </Card>

                    <Grid container spacing={1} columns={20} sx={{mt: 2}}>
                        {personnel?.content?.map((row, num) => (
                            <Grid size={2} key={"user - " + num}>
                                <Card
                                    sx={{
                                        p: 1,
                                        width: "100%",
                                        minHeight: 130,
                                        bgcolor: row?.CateringsAccess?.includes(catering?.Id) ? "#33FF331F" : "#3333331F"
                                    }} variant={"elevation"}>
                                    <CardActionArea
                                        disabled={loading}
                                        onClick={(e) => setPersonAccess(row, !row?.CateringsAccess?.includes(catering?.Id))}
                                        sx={{
                                            p: 1,
                                            width: "100%",
                                            textAlign: "center",
                                            justifyItems: "center",
                                            minHeight: 130,
                                        }}>
                                        <Avatar
                                            sx={{width: 70, height: 70}}
                                            alt="userImage"
                                            src={row?.User?.Avatar?.Url}
                                        />
                                        <Typography variant={"subtitle2"}>{row.User.FullName}</Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>))}
                    </Grid>
                    <Grid container alignItems={"center"} justifyContent={"center"}>
                        <Pagination count={personnel?.totalPages} page={page} onChange={(e, n) => setPage(n-1)}/>
                    </Grid>

                </DialogContent>
            </Dialog>);
    }

    return (
        <>
            <Card sx={{m: 2}}>
                <CardActionArea sx={{p: 2, textAlign: "center"}} onClick={(e) => {
                    setOpenModalSettings(true);
                }}>
                    <CardContent>
                        <Tune sx={{fontSize: "3rem", mb: 1}}/>
                        <Typography variant={"h5"}>تنظیمات غذا</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            {renderModalSettings()}
        </>
    );
};

export default _CateringSettings;
