import React, {useContext, useEffect, useState} from 'react';
import {Button, Grid, IconButton, List} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Add, Cached} from '@mui/icons-material';
import {pages_clearCash, pages_delete, pages_getHome, pages_update} from "../../../../../network/api/pages.api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../PageEditor.css"
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import _epBaseAddOrEditItem from "./partials/_epBaseAddOrEditItem";
import _EpCarouselCore from "./epBasesElements/_EpCarouselCore";
import _EpBannerCore from "./epBasesElements/_EpBannerCore";
import _EpTextCore from "./epBasesElements/_EpTextCore";
import _EpUnknownItem from "./epBasesElements/_EpUnknownItem";

const PageEditorEngin = ({parent, elements}) => {
    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [homeItems, setHomeItems] = useState([]);
    useEffect(() => {
        getHome();
    }, [parent])

    function getHome() {
        if(parent?.Id)
        pages_getHome({PageId: parent.Id}).then(result => {
            setHomeItems(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function clearCash() {
        setHomeItems([])
        pages_clearCash().then(result => {
            error.showError({message: "کش با موفقیت تخلیه شد",});
            getHome();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function UpdateParent(item, parent) {
        parent.Items = null;
        item.Parent = parent
        pages_update(item).then(result => {
            error.showError({message: "عملیات موفق",});
            getHome();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function UpdatePriority(item, nextItem) {
        var itemp = item.Priority;
        item.Priority = nextItem.Priority
        nextItem.Priority = itemp;
        item.Items = null;
        nextItem.Items = null

        pages_update(item).then(result => {
            error.showError({message: "عملیات موفق",});
            pages_update(nextItem).then(result => {
                error.showError({message: "عملیات موفق",});
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function deleteItem(item) {
        item.Items = null;
        pages_delete(item).then(result => {
            error.showError({message: "عملیات موفق",});
            getHome();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderItem(rootItem, item, index) {
        switch (item.Type) {
            case "CAROUSEL":
                return <_EpCarouselCore elements={elements} key={index + item.Id} item={item} reloadPage={getHome}/>
            case "BANNER":
                return <_EpBannerCore elements={elements} key={index + item.Id}  item={item} reloadPage={getHome}/>
            case "TEXT":
                return <_EpTextCore elements={elements} key={index + item.Id}  item={item} reloadPage={getHome}/>
            default :
                return <_EpUnknownItem key={index + item.Id} item={item}  reloadPage={getHome}/>
        }
    }

    return (
        <>
            <div className="col-md-12">
                <Portlet>
                    <PortletHeader
                        title="ویرایش"
                        toolbar={
                            <PortletHeaderToolbar>
                                <IconButton onClick={(e) => clearCash()}>
                                    <Cached/>
                                </IconButton>
                            </PortletHeaderToolbar>}
                    />
                    <PortletBody>
                        <List>
                            <Grid container justifyContent={"center"} alignContent={"center"} sx={{m: 2}}
                                  onClick={(e) => setOpenModalAdd(true)}>
                                <Button variant={"outlined"}><Add/> </Button>
                            </Grid>
                            {homeItems && homeItems.sort((a, b) => {
                                return a.Priority - b.Priority
                            }).map((singleItem, index) => {
                                return renderItem(homeItems, singleItem, index)
                            })}
                        </List>
                    </PortletBody>
                </Portlet>
            </div>
            <_epBaseAddOrEditItem elements={elements} itemToEdit={null} parent={parent} openModal={openModalAdd} reloadPage={getHome}
                                  onClose={(e) => setOpenModalAdd(false)}/>
        </>
    );
};

export default PageEditorEngin;
