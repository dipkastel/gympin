import React, {useEffect, useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import {Button} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../../_metronic";
import * as collection from "../../../../api/HomeCollection.api";
import {Portlet, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import ModalDeleteItem from "./ModalDeleteItem";
import {Link} from "@mui/material";

const HomeItem = ({selectedHomeItem,selectedHomeChild}) => {
    const [list, SetList] = useState([]);
    const [deleteItem, SetDeleteItem] = useState(null);
    useEffect(function () {
        collection._getAll().then((data) => {
            SetList(data.data.Data)
        });
    }, [])
    console.log(selectedHomeItem)

    function renderCollectionsRow(data, index) {
        return (
            <div className="kt-widget4__item " key={index}>
                <div className="kt-widget4__pic kt-widget4__pic--pic ">
                    <img alt="" src={toAbsoluteUrl("/media/users/100_11.jpg")}/>
                </div>
                <div className="kt-widget4__info ">
                    <Link onClick={()=>selectedHomeChild(data)}
                        className="kt-widget4__title"
                    >
                        {data.Priority+" - "+data.Title}
                    </Link>
                </div>
                <span className="pr-1">
          <Button variant="danger" onClick={(e) => SetDeleteItem(data)}>حذف</Button>
        </span>
            </div>
        );
    };

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={selectedHomeItem.Type+" - "+selectedHomeItem.Priority}
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />
                <div className="kt-portlet kt-portlet--height-fluid">
                    <div className="kt-portlet__body">
                        <div className="kt-widget4">
                            {selectedHomeItem.Items.map(renderCollectionsRow)}
                        </div>
                    </div>
                </div>
            </Portlet>
            {deleteItem && <ModalDeleteItem deleteItem={deleteItem} SetDeleteItem={SetDeleteItem}/>}
        </>
    );
};

export default HomeItem;


