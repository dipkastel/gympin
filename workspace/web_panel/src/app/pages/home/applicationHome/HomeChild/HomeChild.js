import React, {useEffect, useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import {Button} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../../_metronic";
import * as HomeCollection from "../../../../api/HomeCollection.api";
import {Portlet, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import ModalDeleteChild from "./ModalDeleteChild";
import {Link} from "@mui/material";
import ModalAddChild from "./ModalAddChild";

const HomeChild = ({CollectionItem,SetSelectedItem}) => {
    const [list, SetList] = useState([]);
    const [deleteItem, SetDeleteItem] = useState(null);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const [dataChanges, SetDataChanges] = useState([]);
    useEffect(function () {
        HomeCollection._getById({id:CollectionItem.Id}).then((data) => {
            console.log(data.data.Data)
            SetList(data.data.Data)
        });
    }, [dataChanges,CollectionItem])

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
                        {data.Priority+" - "+data.Type}
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
                    title={CollectionItem.CollectionName}
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
                            {list.LayoutItemParams&&list.LayoutItemParams.sort ((a,b)=>(a.Priority>b.Priority)?1:-1).map(renderCollectionsRow)}
                        </div>
                    </div>
                </div>
            </Portlet>
            {deleteItem && <ModalDeleteChild deleteItem={deleteItem} SetDeleteItem={SetDeleteItem}/>}
            {openModalAdd&&<ModalAddChild openModalAdd={openModalAdd} SetOpenModalAdd={SetOpenModalAdd} SetDataChanges={SetDataChanges} />}
        </>
    );
};

export default HomeChild;


