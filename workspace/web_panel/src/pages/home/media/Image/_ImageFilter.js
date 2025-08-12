import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Form} from "reactstrap";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {PlaceGym_query} from "../../../../network/api/placeGym.api";
import {multimediacategory_getAll} from "../../../../network/api/mediaCategories.api";
import {TransactionStatus} from "../../../../helper/enums/TransactionStatus";
import AsyncSelect from "react-select/async";
import {defaultFilterFinance} from "../../finance/_financeFilter";


export const defaultFilterImages = {
    queryType: "FILTER",
    FileName:null,
    MediaType:null,
    DocumentFormat:null,
    Title:null,
    Description:null,
    CategoryId:null,
};
const _imageFilter = ({openModal, setOpenModal,filter,setFilter}) => {

    const [modalFilter, SetModalFilter] = useState(defaultFilterFinance);
    const error = useContext(ErrorContext);

    useEffect(() => {
        SetModalFilter(filter);
    }, [openModal]);

    function submitForm(e){
        e.preventDefault()
        setFilter(modalFilter);
        setOpenModal(false);
    }

    const promiseCategories = (inputValue) => {
        return new Promise((resolve) => {
            multimediacategory_getAll()
                .then((data) => {
                    resolve(data.data.Data.map(itm => {
                        return {label: itm.Name, value: itm.Id}
                    }));
                })
                .catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        });
    }
    return (<>

            <Modal show={openModal} onHide={() => setOpenModal(false)}>
                <Form onSubmit={(e) => submitForm(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"فیلتر تراکنش ها"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <TextField
                            label="عنوان تصویر"
                            sx={{mt:2}}
                            placeholder="عنوان تصویر"
                            value={modalFilter.Title}
                            onChange={(e)=>SetModalFilter({...modalFilter,Title:e.target.value})}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <AsyncSelect cacheOptions defaultOptions
                                     label="دسته بندی"
                                     placeholder="دسته بندی"
                                     onChange={e => SetModalFilter({
                                         ...modalFilter,
                                         CategoryId: e.value
                                     })}
                                     loadOptions={promiseCategories}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={"outlined"} color={"error"} onClick={() => setOpenModal(false)}>لغو</Button>
                        <Button variant={"outlined"}  color={"success"} type={"submit"}> فیلتر </Button>
                        <Button variant={"outlined"}  color={"info"} onClick={()=>{
                            setOpenModal(false);
                            setFilter(defaultFilterImages);
                        }}>خالی کردن فیلتر</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default _imageFilter;
