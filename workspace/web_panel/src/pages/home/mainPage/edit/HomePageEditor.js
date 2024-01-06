import React, {useContext, useEffect, useState} from 'react';
import {Button, Grid, IconButton, List, ListItem, ListItemText, Tooltip} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/EditSharp';
import {ExpandLess, ExpandMore, NavigateBefore, NavigateNext} from '@mui/icons-material';
import {
    homepage_delete, homepage_getAllDestinations,
    homepage_getAllTypes,
    homepage_update
} from "../../../../network/api/homepage.api";
import HomeTitle from "./resultItems/HomeTitle";
import HomeSlider from "./resultItems/HomeSlider";
import HomeUserList from "./resultItems/HomeUserList";
import HomeBanner from "./resultItems/HomeBanner";
import HomeDiscountList from "./resultItems/HomeDiscountList";
import HomeContentList from "./resultItems/HomeContentList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../homePageEditor.css"
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import HomeClickableTitle from "./resultItems/HomeClickableTitle";
import HomeClickableBanner from "./resultItems/HomeClickableBanner";
import HomeSingleUser from "./resultItems/HomeSingleUser";
import HomeSingleContent from "./resultItems/HomeSingleContent";
import HomeSingleDiscount from "./resultItems/HomeSingleDiscount";
import HomePageAddItem from "./HomePageAddItem";
import HomePageEditItem from "./HomePageEditItem";

const HomePageEditor = ({homeitems, setRenderId, renderId}) => {
    const error = useContext(ErrorContext);
    const [selectedParent, setSelectedParent] = useState(homeitems);
    const [type, setType] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [elements, setElements] = useState(null);
    const [destinations, setDestinations] = useState(null);
    useEffect(() => {
        getTypes();
        getDestinations();
        setSelectedParent(homeitems);
    }, [homeitems])


    function getDestinations() {
        homepage_getAllDestinations().then(result => {
            setDestinations(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getTypes() {
        homepage_getAllTypes().then(result => {
            setElements(result.data.Data);
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
        homepage_update(item).then(result => {
            error.showError({message: "عملیات موفق",});
            setRenderId(Math.random())
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
        item.Items=null;
        nextItem.Items=null

        homepage_update(item).then(result => {
            error.showError({message: "عملیات موفق",});
            homepage_update(nextItem).then(result => {
                error.showError({message: "عملیات موفق",});
                setRenderId(Math.random())
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
        homepage_delete(item).then(result => {
            error.showError({message: "عملیات موفق",});
            setRenderId(Math.random())
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderItem(rootItem, item, index, isRoot) {
        if(!elements) return (<></>);
        return (<div key={"index"+index}>
            <ListItem sx={{backgroundColor: "#eaeaea", borderRadius: 2}}
                      secondaryAction={(<>
                {item.Id}
                {(index !== 0) &&
                <Tooltip title="انتفال به بالا">
                    <IconButton aria-label="up"
                                onClick={() => UpdatePriority(item, rootItem.Items[index - 1])}
                    >
                        <ExpandLess/>
                    </IconButton>
                </Tooltip>
                }
                {(index !== rootItem.Items.length - 1) &&
                <Tooltip title="انتقال به پایین">
                    <IconButton aria-label="down"
                                onClick={() => UpdatePriority(item, rootItem.Items[index + 1])}>
                        <ExpandMore/>
                    </IconButton>
                </Tooltip>
                }

                {(rootItem.Items[index - 1] &&(isRoot &&(elements.find(e => e.Type === rootItem.Items[index - 1].Type).CanBeParent&&(
                            <Tooltip title="برود به زیر مجموعه ↑">
                                <IconButton aria-label="set ↑ as parent"
                                            onClick={() => UpdateParent(item, rootItem.Items[index - 1])}>

                                    <NavigateBefore/>
                                </IconButton>
                            </Tooltip>
                        ))))}
                {!isRoot &&
                <Tooltip title="از زیر مجموعه ↑ خارج شود">
                    <IconButton aria-label="set out of parent" onClick={() => UpdateParent(item, selectedParent)}>
                        <NavigateNext />
                    </IconButton>
                </Tooltip>
                }

                <IconButton aria-label="delete" onClick={() => deleteItem(item)}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton aria-label="edit" onClick={() => setItemToEdit(item)}>
                    <EditIcon/>
                </IconButton>
            </>)}
            >
                {elements&&(<ListItemText
                        primary={item.Title + " - ( " + elements.find(e => e.Type === item.Type).Name + " ) "}
                        secondary={item.Description&&item.Description.substring(0,60)}
                />)}
            </ListItem>
            <Grid sx={{paddingRight: 2}}>
                <List>
                    {item.Items && item.Items.sort((a, b) => {
                        return a.Priority - b.Priority
                    }).map((singleitem, index) => {
                        return renderItem(item, singleitem, index, false)
                    })}
                </List>
            </Grid>
        </div>);
    }

    function fillViewList(item) {
        switch (item.Type){
            case "SLIDER":return   <HomeSlider key={item.Id} item={item}/>
            case "TITLE":return   <HomeTitle key={item.Id} item={item}/>
            case "CLICKABLE_TITLE":return   <HomeClickableTitle key={item.Id} item={item}/>
            case "USER_LIST":return   <HomeUserList key={item.Id} item={item}/>
            case "SINGLE_USER":return   <HomeSingleUser key={item.Id} item={item}/>
            case "BANNER":return   <HomeBanner key={item.Id} item={item}/>
            case "CLICKABLE_BANNER":return   <HomeClickableBanner key={item.Id} item={item}/>
            case "DISCOUNT_LIST":return   <HomeDiscountList key={item.Id} item={item}/>
            case "SINGLE_DISCOUNT":return   <HomeSingleDiscount key={item.Id} item={item}/>
            case "CONTENT_LIST":return   <HomeContentList key={item.Id} item={item}/>
            case "SINGLE_CONTENT":return   <HomeSingleContent key={item.Id} item={item}/>
            default: return ( item.Type +"\n\r\n\r\t" )
        }
    }

    return (
        <>
            <div className="col-md-6"><Portlet>
                <PortletHeader
                    title="ویرایش"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setType({})}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>
                    <List>
                        {homeitems.Items && homeitems.Items.sort((a, b) => {
                            return a.Priority - b.Priority
                        }).map((singleItem, index) => {
                            return renderItem(homeitems, singleItem, index, true)
                        })}
                    </List>
                    <Button variant={"contained"} onClick={() => setRenderId(Math.random())}>random</Button>
                </PortletBody>
            </Portlet>
            </div>
            <div className="col-md-6">

                <List>
                    {homeitems.Items && homeitems.Items.sort((a, b) => {
                        return a.Priority - b.Priority
                    }).map((singleItem, index) => {
                        return fillViewList(singleItem)
                    })}
                </List>
            </div>
            {elements&&<HomePageAddItem elements={elements} selectedParent={selectedParent} type={type} setType={setType} destinations={destinations}/>}
            {itemToEdit&&elements&&<HomePageEditItem elements={elements} selectedParent={selectedParent} itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} destinations={destinations}/>}
        </>
    );
};

export default HomePageEditor;
