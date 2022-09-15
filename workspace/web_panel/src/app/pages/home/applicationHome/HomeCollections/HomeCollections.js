import React, {useEffect, useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import {Button} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../../_metronic";
import * as HomeCollection from "../../../../api/HomeCollection.api";
import {Portlet, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import ModalDeleteCollection from "./ModalDeleteCollection";
import {Link} from "@mui/material";
import ModalAddCollection from "./ModalAddCollection";

const HomeCollections = ({SetSelectedItem}) => {
    const [list, SetList] = useState([]);
    const [dataChanges, SetDataChanges] = useState([]);
    const [deleteItem, SetDeleteItem] = useState(null);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    useEffect(function () {
        HomeCollection._getAll().then((data) => {
            SetList(data.data.Data)
        });
    }, [dataChanges])

    function renderCollectionsRow(data, index) {
        return (
            <div className="kt-widget4__item " key={index}>
                <div className="kt-widget4__pic kt-widget4__pic--pic ">
                    <img alt="" src={toAbsoluteUrl("/media/users/100_11.jpg")}/>
                </div>
                <div className="kt-widget4__info ">
                    <Link onClick={()=>SetSelectedItem(data)}
                        className="kt-widget4__title"
                    >
                        {data.CollectionName+" - "+data.Id}
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
                    title="صفحات اصلی"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={()=>SetOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />
                <div className="kt-portlet kt-portlet--height-fluid">
                    <div className="kt-portlet__body">
                        <div className="kt-widget4">
                            {list.map(renderCollectionsRow)}
                        </div>
                    </div>
                </div>
            </Portlet>
            {openModalAdd&&<ModalAddCollection openModalAdd={openModalAdd} SetOpenModalAdd={SetOpenModalAdd} SetDataChanges={SetDataChanges}/>}
            {deleteItem && <ModalDeleteCollection deleteItem={deleteItem} SetDeleteItem={SetDeleteItem} SetDataChanges={SetDataChanges}/>}
        </>
    );
};

export default HomeCollections;


