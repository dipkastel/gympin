import React, {useContext, useEffect, useState} from 'react';
import UserInvoices from "../Invoice/UserInvoices";
import {Paper, Tab, Tabs} from "@mui/material";
import {buyable_query} from "../../../../../network/api/buyable.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {BuyableType} from "../../../../../helper/enums/BuyableType";
import {Purchased_query} from "../../../../../network/api/purchased.api";
import PurchasedSubscribeManagement from "../tickets/UserPurchasedSubscribe";

const UserManagementUserBuys = ({currentUser}) => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [selectedTab, setSelectedTab] = useState("USER");
    const [userBuyable, setUserBuyable] =useState(null);





    const [Page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(99);


    useEffect(() => {
        getBuyables();
    }, [Page, rowsPerPage]);

    function getBuyables() {
        Purchased_query({
            queryType: "SEARCH",
            userId:currentUser.Id,
            paging: {
                Page: Page,
                Size: rowsPerPage,
                Desc: true
            }
        }).then((result) => {
            var buyables = groupBy(result.data.Data.content,"PurchasedType");
            setUserBuyable(buyables)
            setSelectedTab(Object.keys(buyables)[0])
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };



    return (
        <>
            {currentUser && <div className="row">
                <div className="col-md-12">
                    {currentUser && <UserInvoices currentUser={currentUser} />}
                </div>
            </div>}

            <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant={"standard"}
                    aria-label="full width tabs example"
                >
                    {userBuyable&&Object.keys(userBuyable).map(item=>(
                        <Tab key={item} label={BuyableType[item]} value={item}/>
                    ))}
                </Tabs>
            </Paper>
            {selectedTab === "SUBSCRIBE" && <PurchasedSubscribeManagement currentUser={currentUser} />}
        </>
    );
};


export default UserManagementUserBuys;
