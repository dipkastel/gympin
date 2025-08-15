import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {CircularProgress, Container, Grid2 as Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import TicketListItem from "./TicketListItem";
import {purchasedSubscribe_query} from "../../network/api/purchasedSubscribe.api";
import {toAbsoluteUrl} from "../../helper/utils";

const TicketsActive = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const user = useSelector(({auth: {user}}) => user);
    const [loading, setLoading] = useState(true);
    const [subscribes, setSubscribes] = useState(null);
    const userBasket = useSelector(state => state.invoice.userBasket);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        document.title = 'بلیط ها';
        getUserSubscribes()
    }, []);


    function getUserSubscribes() {
        setLoading(true);
        purchasedSubscribe_query({
            queryType: "FILTER",
            UserId: user.Id,
            paging: {Page: 0, Size: 100}
        }).then(result => {
            setSubscribes(result.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function progress() {
        return (<Grid
            container
            sx={{width: "100%", height: "80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <CircularProgress/>
        </Grid>);
    }

    function Empty() {
        return (<Grid
            container
            sx={{width: "100%", height: "80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Image src={toAbsoluteUrl("/assets/images/noTicket2.png")} width={"40%"} style={{maxWidth: "300px"}}/>
            <Typography variant={"h5"} sx={{m: 2,fontWeight:900,color:"#444444"}}>
                بلیط فعال یافت نشد
            </Typography>
            <Typography variant={"body2"} sx={{m: 2,color:"#666666"}} >
                در این بخش بلیط های خریداری شده شما نمایش داده می‌شود
            </Typography>
            <Typography component={"a"} variant={"body1"} href={"/places"} sx={{m: 2,textDecoration:"none",cursor:"pointer"}} >
                خرید بلیط
            </Typography>

        </Grid>);
    }


    function tickets() {
        return (<Container sx={{px: 2, py: 2}}>
            {getTicket().sort((a, b) => b.Id - a.Id).map(item =>
                <Grid sx={{py: 2}}>
                    <TicketListItem item={item}/>
                </Grid>
            )}
        </Container>)
    }


    function getByFilter(p) {
        if (p.Status === "READY_TO_ACTIVE" ||
            p.Status === "ACTIVE" ||
            p.Status === "PROCESSING")
            return true
        else return false;
    }

    function getTicket() {
        return subscribes.filter(p => getByFilter(p));
    }


    return (
        <>
            {!subscribes ? progress() : (getTicket().length > 0) ? tickets() : Empty()}
        </>
    );
};

export default TicketsActive;
