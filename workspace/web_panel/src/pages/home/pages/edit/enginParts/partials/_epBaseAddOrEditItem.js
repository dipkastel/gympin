import React, {useContext, useEffect, useState} from 'react';
import {Form, Modal, Table} from "react-bootstrap";
import Select from "react-select";
import {Button, Collapse, Grid, IconButton, Typography} from "@mui/material";
import ImagePicker from "../../../../media/Pickers/ImagePicker";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {pages_add, pages_update} from "../../../../../../network/api/pages.api";
import {getViewTypesByItemType} from "../../../../../../helper";
import {Delete} from "@mui/icons-material";
import {PagesDestinationsEnum} from "../../../../../../helper/enums/PagesDestinationsEnum";
import {TicketSubscribes_query} from "../../../../../../network/api/ticketSubscribes.api";
import {PlaceGym_query} from "../../../../../../network/api/placeGym.api";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const _epBaseAddOrEditItem = ({elements, itemToEdit, openModal, onClose, parent, reloadPage}) => {
    const error = useContext(ErrorContext);
    const [inItem, setInItem] = useState(itemToEdit);
    const [formVisibleElements, setFormVisibleElements] = useState(null)
    const [testQueryItems, setTestQueryItems] = useState(null);
    const [openModalSelectImage, setOpenModalSelectImage] = useState(false)
    const [openTestQuery, setOpenTestQuery] = useState(false)
    const [image, setImage] = useState(inItem?.multimedia)


    useEffect(() => {
        onTypeChange(itemToEdit?.Type)
    }, []);

    function updateItem(e) {
        e.preventDefault()
        var data = {
            Id: inItem?.Id,
            Type: inItem?.Type,
            ViewType: inItem?.ViewType,
            Url: inItem?.Url,
            Title: inItem?.Title,
            Description: inItem?.Description,
            Destination: inItem?.Destination,
            Data: inItem?.Data,
            ImageId: image ? image.Id : null,
        }
        pages_update(data).then(result => {
            error.showError({message: "عملیات موفق",});
            setInItem(result.data.Data)
            onClose();
            reloadPage()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    function addItem(e) {
        e.preventDefault()
        var data = {
            Id: inItem?.Id,
            Type: inItem?.Type,
            ViewType: inItem?.ViewType,
            Parent: {Id: parent?.Id},
            Url: inItem?.Url,
            Title: inItem?.Title,
            Description: inItem?.Description,
            Destination: inItem?.Destination,
            Data: inItem?.Data,
            ImageId: image ? image.Id : null,
        }
        pages_add(data).then(result => {
            error.showError({message: "عملیات موفق",});
            setInItem(null);
            onClose();
            setImage(null);
            reloadPage()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    function onTypeChange(value) {
        var items = {};
        value && elements.find(e => e.Type === value).Elements.forEach(item => {
            items = {...items, [item]: true}
        })
        setFormVisibleElements(items);
        setInItem({...inItem, Type: value});
    }

    function ImageSelect(image) {
        setImage(image)
    }

    function deleteImage() {
        setImage(null);
    }

    function getElementTypeByParentType(type) {
        return elements.filter(e => e.Parent == (elements?.find(o => o?.Type == type)?.Id || null)).map(item => {
            return {label: item?.Name, value: item?.Type}
        })
    }

    function testQuery() {
        setTestQueryItems(null);
        if (inItem.Type == "QUERY_SUBSCRIBE") {
            TicketSubscribes_query({...JSON.parse(inItem?.Data)}).then(result => {
                console.log("result1",result);
                setTestQueryItems(result?.data?.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        if (inItem.Type == "QUERY_GYM") {
            PlaceGym_query({...JSON.parse(inItem?.Data)}).then(result => {
                console.log("result2",result);
                setTestQueryItems(result?.data?.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

    }

    function getTableTestResult() {
        return (
            <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                    size="medium"
                >

                    <TableHead>
                        <TableRow>
                            {testQueryItems?.content.length>0&&Object?.keys(testQueryItems?.content?.[0])?.map(key=><TableCell key={key+"-5"} align="right" padding="normal" sortDirection={false}>{key}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testQueryItems?.content.length>0&&testQueryItems.content?.map((row, index) => (
                            <TableRow hover tabIndex={-1} key={"hash=-"+row?.Id}>
                                {Object?.keys(testQueryItems?.content?.[0])?.map(key=>
                                    <TableCell component="th" scope="row" key={"asdasd"+key+row.Id} padding="normal"
                                               align="right">{JSON.stringify(row?.[key]).substring(0,10)}</TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <>
            <Modal aria-labelledby="parent-modal-editor"
                   aria-describedby="parent-description-editor" show={openModal} onHide={() => onClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>{inItem?.Id ? "ویرایش " : ("افزودن به " + (parent?.Title || parent.Type))}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formType">
                        <Form.Label>نوع آیتم مورد نظر را انتخاب کنید</Form.Label>
                        <Select
                            className={"dropdown"}
                            inputId="select-type"
                            options={getElementTypeByParentType(parent?.Type)}
                            onChange={(e) => onTypeChange(e.value)}
                            defaultValue={{label: elements?.find(e => e.Type === inItem?.Type)?.Name, value: inItem?.Type}}
                        />
                    </Form.Group>

                    {formVisibleElements?.ViewType && <Form.Group controlId="formAddSport">
                        <Form.Label>نوع نمایش :</Form.Label>
                        <Select
                            className={"dropdown"}
                            inputId="select-ViewType"
                            options={getViewTypesByItemType(inItem?.Type)?.map(type => {
                                return {label: type, value: type}
                            })}
                            onChange={(e) => setInItem({...inItem, ViewType: e.value})}
                            value={{label: inItem?.ViewType, value: inItem?.ViewType}}
                        />
                    </Form.Group>}

                    {formVisibleElements?.Title && <Form.Group>
                        <Form.Label>عنوان</Form.Label>
                        <Form.Control
                            type="text"
                            value={inItem?.Title}
                            onChange={(e) => {
                                setInItem({...inItem, Title: e.target.value})
                            }}
                        />
                    </Form.Group>}
                    {formVisibleElements?.Multimedia && (
                        (image) ? (<>
                            <IconButton sx={{mx: 2, mt: 2, mb: -7}} onClick={(e) => deleteImage()}><Delete color={"error"}/> </IconButton>
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
                    {formVisibleElements?.Description && <Form.Group>
                        <Form.Label>توضیح :</Form.Label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={inItem?.Description}
                            onChange={(e) => {
                                setInItem({...inItem, Description: e.target.value})
                            }}
                        />
                    </Form.Group>}
                    {formVisibleElements?.Destination && <Form.Group controlId="formAddSport">
                        <Form.Label>مقصد را انتخاب کنید</Form.Label>
                        <Select
                            className={"dropdown"}
                            inputId="select-Destination"
                            options={Object.keys(PagesDestinationsEnum).map(item => {
                                return {label: PagesDestinationsEnum[item], value: item}
                            })}
                            onChange={(e) => setInItem({...inItem, Destination: e.value})}
                            value={{label: PagesDestinationsEnum[inItem?.Destination], value: inItem?.Destination}}
                        />
                    </Form.Group>}
                    {formVisibleElements?.Url && <Form.Group>
                        <Form.Label>لینک</Form.Label>
                        <textarea
                            className="form-control"
                            rows="2"
                            value={inItem?.Url}
                            onChange={(e) => {
                                setInItem({...inItem, Url: e.target.value})
                            }}
                        />
                    </Form.Group>}
                    {formVisibleElements?.Data && <Form.Group>
                        <Grid container justifyContent={"space-between"}>
                            <Form.Label>مقادیر به مقصد</Form.Label>
                            {inItem?.Type?.startsWith("QUERY") && <Button onClick={(e) => testQuery()}>تست کوئری</Button>}
                        </Grid>

                        <textarea
                            className="form-control"
                            rows="3"
                            value={inItem?.Data}
                            onChange={(e) => {
                                setInItem({...inItem, Data: e.target.value})
                            }}
                        />
                        {!!testQueryItems && <>
                            <Typography
                                onClick={(e) => setOpenTestQuery(!openTestQuery)}>{"تعداد آیتم های جواب : " + testQueryItems?.totalElements}</Typography>
                            <Collapse in={openTestQuery} timeout="auto" unmountOnExit>
                                {getTableTestResult()}
                            </Collapse>
                        </>}
                    </Form.Group>}
                </Modal.Body>
                <Modal.Footer>
                    {inItem?.Id && <Button
                        fullWidth
                        variant={"contained"}
                        className={"button_danger"}
                        onClick={(e) => updateItem(e)}
                    >
                        ویرایش
                    </Button>}
                    {!inItem?.Id && <Button
                        fullWidth
                        variant={"contained"}
                        className={"button_danger"}
                        onClick={(e) => addItem(e)}
                    >
                        افزودن
                    </Button>}
                </Modal.Footer>
            </Modal>


            {openModalSelectImage &&
            <ImagePicker setClose={() => setOpenModalSelectImage(false)} onSelect={ImageSelect} options={{rowCount: 4, isSingle: true}}/>}
        </>
    );
};

export default _epBaseAddOrEditItem;
