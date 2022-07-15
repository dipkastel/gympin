import React, {useEffect, useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import {Button} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../../_metronic";
import * as collection from "../../../../api/collection.api";
import {Portlet, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import ModalDelete from "./ModalDelete";

const AndroidClientHomeCollection = () => {
    const [list, SetList] = useState([]);
    const [deleteItem, SetDeleteItem] = useState(null)
    useEffect(function () {
        collection._getAll().then((data) => {
            SetList(data.data.Data)
        });
    }, [])

    function renderCollectionsRow(data, index) {
        return (
            <div className="kt-widget4__item " key={index}>
                <div className="kt-widget4__pic kt-widget4__pic--pic ">
                    <img alt="" src={toAbsoluteUrl("/media/users/100_11.jpg")}/>
                </div>
                <div className="kt-widget4__info ">
                    <a
                        className="kt-widget4__title"
                        href="https://keenthemes.com.my/metronic"
                    >
                        {data.CollectionName}
                    </a>
                </div>

                <span className="pr-1">
          <Button variant="danger" onClick={(e) => SetDeleteItem(data.Id)}>
            {" "}
              حذف{" "}
          </Button>
        </span>
            </div>
        );
    };

    const onDelete = ()=> {
        // SetDeleteItem(null)
    }
    return (
        <>
            <Portlet>
                <PortletHeader
                    title="صفحه اصلی اپلیکیشن موبایل"
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
                            {list.map(renderCollectionsRow)}
                        </div>
                    </div>
                </div>
            </Portlet>
            {/*<ModalAdd/>*/}
            <ModalDelete deleteItem={deleteItem} />
        </>
    );
};

export default AndroidClientHomeCollection;


