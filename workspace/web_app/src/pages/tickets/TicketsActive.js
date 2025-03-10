import React, {useContext, useEffect, useState} from 'react';
import {purchased_query} from "../../network/api/purchased.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Card, CardContent, CardHeader, Chip, CircularProgress, Container, Grid2 as Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {BuyableType} from "../../helper/enums/BuyableType";
import TicketListItem from "./TicketListItem";
import {purchasedSubscribe_enterRequest, purchasedSubscribe_query} from "../../network/api/purchasedSubscribe.api";

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
            <Image src={"https://api.gympin.ir/resource/image?Id=100"} width={"40%"}/>
            <Typography variant={"body"} sx={{m: 2}}>
                بلیط فعال یافت نشد
            </Typography>

        </Grid>);
    }



    function tickets() {
        return (<Container sx={{px:2,py:2}}>
            { getTicket().sort((a, b) => b.Id - a.Id).map(item =>
                <Grid sx={{py:2}}>
                    <TicketListItem item={item} />
                </Grid>
            ) }
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
