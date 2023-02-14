import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import BaseItem from "./BaseItem";
import {homepage_getHome} from "../../../../network/api/homepage.api";
import HomePageEditor from "./HomePageEditor";

export default function HomePageDetail() {
    const [homeItems,setHomeItems] = useState([]);
    const [renderId,setRenderId] = useState(400);
    let {ItemId} = useParams();
    useEffect(() => {
        homepage_getHome({id:ItemId}).then(result=>{
            setHomeItems(result.data.Data)
        }).catch(e=>console.log(e))
    }, [renderId]);

    return (
        <div>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>اگر این صفحه در حال استفاده است آن را ویرایش نکنید صفحه دیگری ساخته و پس از تکمیل ویرایش برای استفاده انتخاب کنید</p>
            </Notice>
            <BaseItem itemId={ItemId}/>
            {homeItems && <div className="row">
                <HomePageEditor homeitems={homeItems} setRenderId={setRenderId} renderId={renderId}/>
            </div>}
        </div>
    );
};

