import React, {useContext, useEffect, useState} from 'react';
import {Add, ListAlt} from "@mui/icons-material";
import {corporatePersonnel_addPersonnelByList} from "../../../../../network/api/CorporatePersonnel.api";
import {Form, Modal, Table} from "react-bootstrap";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Location_query} from "../../../../../network/api/location.api";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {toGregorian} from "date-fns-jalali/_lib/jalali";
import {corporate_addGroup, corporate_getCorporateGroups} from "../../../../../network/api/corporate.api";
import Select from "react-select";
import {userGenders} from "../../../../../helper/enums/genders";


const _AddPersonelByList = ({getPersonnelsOfCorporate, currentCorporate}) => {

    const error = useContext(ErrorContext);
    const [openModalAddList, setOpenModalAddList] = useState(false)
    const [sendSms, setSendSms] = useState(true)
    const [fileToAdd, setFileToAdd] = useState(null)
    const [allLocations, setAllLocations] = useState(null);
    const [allGroups, setAllGroups] = useState(null);


    useEffect(() => {
        getAllCities();
        getAllCorporateGroups();
    }, []);


    function getAllCities() {

        Location_query({Type: "City", paging: {Page: 0, Size: 900}}).then(data => {
            setAllLocations(data.data.Data.content)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getAllCorporateGroups() {
        corporate_getCorporateGroups({Id: currentCorporate.Id}).then(data => {
            setAllGroups(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function renderModalAddList() {
        function listChange(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (event) {
                const text = event.target.result;
                const json = csvToJson(text);
                setFileToAdd(json);
            };
            reader.readAsText(file)
        }

        function csvToJson(csv) {
            const lines = csv.split("\n").map(l => l.trim()).filter(l => l);
            const headers = lines[0].split(",");

            const result = [];

            for (let i = 1; i < lines.length; i++) {
                const obj = {};
                const currentLine = lines[i].split(",");
                obj["Corporate"] = {Id: currentCorporate.Id};
                obj["SendSms"] = sendSms;
                headers.forEach((header, idx) => {
                    var name = getKeyHeader(header.trim())
                    if (name == "Row")
                        var o = 0;
                    else if (name == "BirthDay")
                        obj[name] = parseJalaaliToDate(currentLine[idx]?.trim());
                    else if (name == "LocationId")
                        obj[name] = allLocations.find(o => o.Name == currentLine[idx]?.trim())?.Id;
                    else if (name == "GroupId")
                        obj[name] = allGroups.find(o => o.Name == currentLine[idx]?.trim())?.Id||currentLine[idx]?.trim();
                    else
                        obj[name] = currentLine[idx]?.trim();
                });

                result.push(obj);
            }

            return result;
        }

        function getKeyHeader(name) {
            if (name.startsWith("ردیف")) return "Row";
            if (name.startsWith("نام")) return "FullName";
            if (name.startsWith("تلفن")) return "PhoneNumber";
            if (name.startsWith("جنس")) return "Gender";
            if (name.startsWith("کد")) return "NationalCode";
            if (name.startsWith("تاریخ")) return "BirthDay";
            if (name.startsWith("نقش")) return "GroupId";
            if (name.startsWith("گروه")) return "GroupId";
            if (name.startsWith("شهر")) return "LocationId";
        }

        function parseJalaaliToDate(jalaaliString) {
            const [jy, jm, jd] = jalaaliString.split(/[\/\-]/).map(Number);
            const {gy, gm, gd} = toGregorian(jy, jm, jd);
            return new Date(gy, gm - 1, gd);
        }

        function addListFile(e) {
            e.preventDefault();
            setOpenModalAddList(false);
            console.log(fileToAdd)
            corporatePersonnel_addPersonnelByList(fileToAdd)
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    getPersonnelsOfCorporate();
                }).catch(e => {
                setOpenModalAddList(true);
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }


        return (
            <>
                <Modal size={"xl"} show={openModalAddList} onHide={() => setOpenModalAddList(false)}>
                    <form onSubmit={(e) => addListFile(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن پرسنل با فایل "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {!fileToAdd && <AddFile/>}
                            {fileToAdd && <ListToAdd/>}

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                                disabled={!fileToAdd}
                            >
                                ثبت کاربران
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );

        function AddFile() {
            return (<>

                <Form.Group>
                    <input
                        name={"file"}
                        type={"file"}
                        accept={"text/csv"}
                        onChange={event => listChange(event)}
                    />
                </Form.Group>
                <Form.Group>
                    <FormControlLabel
                        className={"mr-1"}
                        checked={sendSms}
                        onChange={e=>setSendSms(!sendSms)}
                        control={<Checkbox name={"sendSms"} color="primary"/>}
                        label={"ارسال پیامک"}
                    />
                </Form.Group>

            </>)
        }

        function ListToAdd() {
            const handleChange = (e, index, name, value) => {
                setFileToAdd(prev => {
                    const updated = [...prev];
                    updated[index] = {...updated[index], [name]: value};
                    return updated;
                });
            };

            function addGroup(e) {
                e.preventDefault()
                corporate_addGroup({
                    CorporateId: currentCorporate.Id,
                    Name: e.target.parentElement.parentElement.parentElement.firstChild.value
                })
                    .then(data => {
                        error.showError({message: "عملیات موفق",});
                        getAllCorporateGroups();
                    }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
            }

            return (<>

                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={"small"}
                    >

                        <TableHead>
                            <TableRow>
                                <TableCell align="right" padding="normal" sortDirection={false}>ردیف</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>نام و نام خانوادگی</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>موبایل</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>جنسیت</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>کدملی</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>تاریخ تولد</TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>
                                    <FormControl name={"Name"} sx={{width: '100%'}} variant="outlined">
                                        <InputLabel htmlFor="fm-corporate">گروه</InputLabel>
                                        <OutlinedInput
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={(e) => addGroup(e)}
                                                        edge="end"
                                                    ><Add/> </IconButton>
                                                </InputAdornment>
                                            }
                                            label={"سازمان"}
                                        />
                                    </FormControl>
                                </TableCell>
                                <TableCell align="right" padding="normal" sortDirection={false}>شهر</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fileToAdd.map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index.toString()}>
                                    <TableCell component="th" scope="row" padding="normal" align="right">{index}</TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            value={row?.FullName}
                                            label={"نام"}
                                            onChange={e => handleChange(e, index, "FullName", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            value={row?.PhoneNumber}
                                            onChange={e => handleChange(e, index, "PhoneNumber", e.target.value)}
                                            label={"تلفن"}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Form.Group className={"w-100"} controlId="formAddGender">
                                            <Form.Label>{row.Gender}</Form.Label>
                                            <Select
                                                className={"dropdown"}
                                                name="formGender"
                                                options={Object.keys(userGenders).map(g => {
                                                    return {label: userGenders[g], value: g}
                                                })}
                                                value={{label: userGenders[row.Gender], value: userGenders[row.Gender]}}
                                                onChange={opt => handleChange(opt, index, "Gender", opt.value)}
                                            />
                                        </Form.Group>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            value={row?.NationalCode}
                                            onChange={e => handleChange(e, index, "NationalCode", e.target.value)}
                                            label={"کد ملی"}
                                        /></TableCell>
                                    <TableCell align="right">{new Date(row.BirthDay).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}</TableCell>
                                    <TableCell align="right">
                                        {allGroups &&
                                        <Form.Group className={"w-100"} controlId="formAddGender">
                                            <Form.Label>{allGroups.find(g => g.Id == row.GroupId)?.Name||row.GroupId}</Form.Label>
                                            <Select
                                                className={"dropdown"}
                                                name="formGender"
                                                options={allGroups.map(g => {
                                                    return {label: g.Name, value: g.Id}
                                                })}
                                                value={{label: allGroups.find(g => g.Id == row.GroupId)?.Name, value: row.GroupId}}
                                                onChange={(opt) => handleChange(opt, index, "GroupId", opt.value)}
                                            />
                                        </Form.Group>}
                                        {!allGroups && <Button>{"+ " + row.GroupId}</Button>}
                                    </TableCell>
                                    <TableCell align="right">{allLocations.find(o => o.Id == row.LocationId).Name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </>)
        }
    }


    return (
        <>

            <button
                type="button"
                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                onClick={(e) => setOpenModalAddList(true)}
            >
                <ListAlt/>
            </button>

            {renderModalAddList()}
        </>
    );
};

export default _AddPersonelByList;
