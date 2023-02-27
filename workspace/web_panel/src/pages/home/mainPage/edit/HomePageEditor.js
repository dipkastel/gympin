import React, {useContext, useEffect, useState} from 'react';
import {Button, Grid, IconButton, List, ListItem, ListItemText, Tooltip} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {Form, Modal} from "react-bootstrap";
import Select from "react-select";
import {widgetDestination} from "../../unuse/applicationHome/widgetDestination";
import DeleteIcon from '@mui/icons-material/Delete';
import {ExpandLess, ExpandMore, NavigateBefore, NavigateNext} from '@mui/icons-material';
import {homepage_add, homepage_delete, homepage_getAllTypes, homepage_update} from "../../../../network/api/homepage.api";
import HomeTitle from "./resultItems/HomeTitle";
import HomeSlider from "./resultItems/HomeSlider";
import HomeUserList from "./resultItems/HomeUserList";
import HomeBanner from "./resultItems/HomeBanner";
import HomeDiscountList from "./resultItems/HomeDiscountList";
import HomeContentList from "./resultItems/HomeContentList";
import ImagePicker from "../../media/Pickers/ImagePicker";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../homePageEditor.css"
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import HomeClickableTitle from "./resultItems/HomeClickableTitle";
import HomeClickableBanner from "./resultItems/HomeClickableBanner";
import HomeSingleUser from "./resultItems/HomeSingleUser";
import HomeSingleContent from "./resultItems/HomeSingleContent";
import HomeSingleDiscount from "./resultItems/HomeSingleDiscount";

const HomePageEditor = ({homeitems, setRenderId, renderId}) => {
    const error = useContext(ErrorContext);
    const [openModalSelectImage, setOpenModalSelectImage] = useState(false)
    const [selectedParent, setSelectedParent] = useState(homeitems)
    const [formVisibleElements, setFormVisibleElements] = useState({Title: false, Description: false})
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [destination, setDestination] = useState(null)
    const [formData, setFormData] = useState("")
    const [image, setImage] = useState(null)
    const [elements, setElements] = useState(null);
    const [type, setType] = useState(null);
    useEffect(() => {
        setSelectedParent(homeitems);
    }, [homeitems])

    useEffect(() => {
        homepage_getAllTypes().then(result => {
            setElements(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [homeitems])


    function RenderModalAdd() {

        function addItem(e) {
            e.preventDefault()
            var maxPriority = selectedParent.Items ? Math.max(...selectedParent.Items.map(o => o.Priority)) : -1;
            var data = {
                Type: type.value,
                Title: title,
                Description: description,
                Destination: (destination) ? destination.value : destination,
                Data: formData,
                ImageId: image?image.Id:null,
                parent: selectedParent,
                Priority: (maxPriority + 1)
            }
            data.parent.Items = null;
            homepage_add(data).then(result => {
                error.showError({message: "عملیات موفق",});
                setType(null)
                onTypeChange(null)
                setRenderId(Math.random())
            }).catch(e => {
                console.log(e);
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });

        }

        function onTypeChange(value) {
            setType(value)
            setDescription("")
            setDestination(null)
            setFormData("")
            setTitle("")
            setImage(null)
            var items = {};
            value&&elements.find(e => e.Type === value.value).Elements.forEach(item => {
                items = {...items, [item]: true}
            })
            setFormVisibleElements(items);

        }

        function ImageSelect(image) {
            setImage(image)
        }

        return (
            <>
                <Modal aria-labelledby="parent-modal-editor"
                       aria-describedby="parent-description-editor" show={type !== null} onHide={() => setType(null)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addItem(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن المنت به " + selectedParent.Title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formType">
                                <Form.Label>نوع آیتم مورد نظر را انتخاب کنید</Form.Label>
                                <Select
                                    className={"dropdown"}
                                    inputId="select-type"
                                    options={elements&&elements.map(item => {
                                        return {label: item.Name, value: item.Type}
                                    })}
                                    onChange={(e) => onTypeChange({label: e.value, value: e.value})}
                                    defaultValue={type}
                                />

                                <Form.Text className="text-muted">
                                    {(type && elements && elements.find(e => e.Type === type.value)) && elements.find(e => e.Type === type.value).Description}
                                </Form.Text>
                            </Form.Group>

                            {formVisibleElements["Title"] && <Form.Group>
                                <Form.Label>عنوان</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                />
                            </Form.Group>}
                            {formVisibleElements["Multimedia"] && (
                                (image) ? (<>
                                    <img className={"home-add-form-image"} src={image.Url}/>
                                </>) : (<>
                                    <Form.Group>
                                        <Form.Label>تصویر</Form.Label>
                                        <Button
                                            fullWidth
                                            variant={"outlined"}
                                            onClick={() => setOpenModalSelectImage(true)}
                                        >انتخاب تصویر</Button>
                                    </Form.Group>
                                </>)
                            )
                            }
                            {formVisibleElements["Description"] && <Form.Group>
                                <Form.Label>توضیح :</Form.Label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                />
                            </Form.Group>}
                            {formVisibleElements["Destination"] && <Form.Group controlId="formAddSport">
                                <Form.Label>مقصد را انتخاب کنید</Form.Label>
                                <Select
                                    className={"dropdown"}
                                    inputId="select-Destination"
                                    options={widgetDestination.map(item => {
                                        return {label: item, value: item}
                                    })}
                                    onChange={(e) => setDestination({label: e.value, value: e.value})}
                                    value={destination}
                                />
                            </Form.Group>}
                            {destination && <Form.Group>
                                <Form.Label>مقادیر به مقصد</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData}
                                    onChange={(e) => {
                                        setFormData(e.target.value)
                                    }}
                                />
                            </Form.Group>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setType(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {openModalSelectImage&&<ImagePicker setClose={()=>setOpenModalSelectImage(false)} onSelect={ImageSelect} options={{rowCount: 4,isSingle:true}} />}
            </>
        );
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
            </>)}
            >
                {elements&&<ListItemText
                    primary={item.Title + " - ( " + elements.find(e => e.Type === item.Type).Name + " ) "}
                    secondary={item.Description.substring(0,60)}
                />}
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
            {RenderModalAdd()}
        </>
    );
};

export default HomePageEditor;
