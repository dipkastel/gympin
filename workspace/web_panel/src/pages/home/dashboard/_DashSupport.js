import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../partials/content/Portlet";
import {Support_query} from "../../../network/api/support.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useHistory} from "react-router-dom";
import {getUserFixedName} from "../../../helper";

const _DashSupport = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [supportList, setSupportList] = useState([])


    useEffect(() => {
        Support_query({
            queryType: "SEARCH",
            paging: {Page: 0, Size: 50, Desc: true}
        })
            .then((data) => {
                console.log(data.data.Data);
                setSupportList(data.data.Data.content.filter(s => getLastMessage(s).Status !== "COMPLETE"));
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }, []);

    function getLastMessage(support){
        try{
            return support.Messages[support.Messages.length-1]
        }catch (e){
            return null;
        }
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title="پیام های جدید پشتیبانی"
                />

                <PortletBody>

                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >

                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" padding="normal" sortDirection={false}>متن</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>ایجاد
                                        کننده</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {supportList.map((row, index) => (
                                    <TableRow hover
                                              onClick={(event) => history.push({pathname: "/support/details/" + row.Id})}
                                              role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{getLastMessage(row).Message}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{getUserFixedName(row.CreatorUser)}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _DashSupport;
