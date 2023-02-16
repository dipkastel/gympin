import React, {useContext} from 'react';
import {Card, CardHeader, Switch} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {place_changeStatus} from "../../network/api/place.api";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _ListItem = (props) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)

    function changePlaceStatus(e) {
        place_changeStatus({
            Id:place.Id,
            Status:e.target.checked?"ACTIVE":"INACTIVE"
        }).then(result=>{
            props.RequestPlace(place.Id)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <Card elevation={3} sx={{margin: 1}} >
            <CardHeader
                component={"a"}
                sx={{textDecoration:"none",color:"#000000"}}
                href={props.destination}
                title={"وضعیت مرکز"}
                action={(<>
                فعال
                    <Switch onChange={(e)=>changePlaceStatus(e)} checked={place.Status=="ACTIVE"} />
                </>)}/>
        </Card>
    );
};


export default connect(null, sagaActions)(_ListItem)
