import React, {useContext, useEffect, useState} from "react";
import {Portlet, PortletBody, PortletFooter, PortletHeader,} from "../../../../partials/content/Portlet";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {corporate_getCorporateGroups} from "../../../../../network/api/corporate.api";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../helper";
import {Modal} from "react-bootstrap";
import {corporatePersonnel_addNWCreditToAll} from "../../../../../network/api/CorporatePersonnel.api";

export default function CorporatePersonnelNwCreditAction({currentCorporate, pUpdatePage}) {
    const error = useContext(ErrorContext);
    const [values, setValues] = useState(0);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [groups, SetGroups] = useState([]);
    const [selectedGroup, SetSelectedGroup] = useState("All");

    useEffect(() => {
        getGroupsOfCorporate();
    }, []);

    function getGroupsOfCorporate() {
        corporate_getCorporateGroups({Id: currentCorporate.Id}).then(data => {
            SetGroups(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getSelectedGroupName() {
        switch (selectedGroup) {
            case "All" :
                return "همه پرسنل ";
            default :
                return groups.filter(r => r.Id == selectedGroup)[0].Name
        }
    }

    function renderModalConfirm() {
        function addCreditToPersonel(e) {
            e.preventDefault()
            setOpenModalConfirm(false);
            error.showError({message: "در حال انجام ...",});
            corporatePersonnel_addNWCreditToAll({
                CorporateId: currentCorporate.Id,
                CreditAmount: toPriceWithoutComma(values),
                GroupId: (selectedGroup == "All") ? null : selectedGroup
            }).then(result => {
                error.showError({message: "افزایش اعتبار جیم پین موفق",});
                pUpdatePage();
            }).catch(ca => {
                try {
                    error.showError({message: ca.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });

        }

        return (
            <>
                <Modal show={openModalConfirm} onHide={() => setOpenModalConfirm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"افزودن اعتبار جیم پین برای پرسنل "}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {"افزودن " + toPriceWithComma(values) + " تومان برای هرکاربر از گروه " + getSelectedGroupName() + " در مرکز " + currentCorporate.Name + ". این اعتبار غیر قابل برداشت می باشد."}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className={"button_danger"}
                            type={"submit"}
                            variant={"contained"}
                            onClick={(e) => addCreditToPersonel(e)}
                        >
                            تایید
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    return (
        <><Portlet>
            <PortletHeader title="افزایش اعتبار جیم پین پرسنل"/>

            <PortletBody>

                <Typography color={"success"} variant={"body1"}>
                    افزایش اعتبار جیم پین برای پرسنل مرکز
                </Typography>
                <br/>
                <FormControl fullWidth>
                    <InputLabel id="status-select-label">وضعیت</InputLabel>
                    <Select
                        label="status"
                        value={selectedGroup}
                        onChange={(e) => SetSelectedGroup(e.target.value)}
                    >
                        <MenuItem value={"All"}>همه پرسنل</MenuItem>
                        {groups.map(item => (
                            <MenuItem key={item.Id} value={item.Id}>{item.Name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        label="مبلغ افزایش برای هر کاربر"
                        className="textField"
                        value={values}
                        onChange={(e) => setValues(toPriceWithComma(e.target.value))}
                        margin="normal"
                        variant="outlined"
                    />
                </FormControl>


            </PortletBody>
            <PortletFooter>
                <div className="text-right">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm "
                        onClick={(e) => setOpenModalConfirm(true)}
                    >
                        افزایش
                    </button>
                </div>
            </PortletFooter>
        </Portlet>

            {renderModalConfirm()}
        </>

    );
}
